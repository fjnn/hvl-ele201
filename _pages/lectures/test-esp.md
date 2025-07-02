This tutorial will guide you through connecting an STM32F767 Nucleo board to an ESP8266 Wi-Fi module and sending basic AT commands to connect to a Wi-Fi network and potentially perform a simple HTTP request.

The ESP8266 is a popular low-cost Wi-Fi microchip with full TCP/IP stack and microcontroller capability, commonly used for IoT projects. When paired with a more powerful microcontroller like the STM32F767, the ESP8266 typically acts as a Wi-Fi modem, controlled by the STM32 via AT (Attention) commands over a UART serial interface.

**Important Note on Power Supply:**
The ESP8266 modules (especially ESP-01) can draw significant current, particularly during Wi-Fi transmission peaks (up to 300mA). The 3.3V supply from the STM32 Nucleo board's ST-LINK (or even the main microcontroller itself) might **not be sufficient or stable enough** to reliably power the ESP8266, leading to erratic behavior or frequent resets.
**It is highly recommended to use a separate, stable 3.3V power supply (e.g., a dedicated 3.3V voltage regulator or a breadboard power supply) capable of delivering at least 500mA for the ESP8266.**

**Prerequisites:**

  * STM32F767 Nucleo-144 board
  * ESP8266 Wi-Fi module (e.g., ESP-01, ESP-12E/F on a breakout board like NodeMCU)
  * External 3.3V power supply (highly recommended, as noted above)
  * Jumper wires
  * Computer with STM32CubeIDE installed
  * Basic understanding of C programming and microcontrollers
  * **ESP8266 with AT Firmware:** This tutorial assumes your ESP8266 is pre-flashed with the standard AT command firmware. Most new modules come with this, but you might need to flash it yourself if you're using a bare module or custom firmware.

**1. Hardware Setup:**

We'll connect the STM32's UART peripheral to the ESP8266's UART pins. Let's use **USART1** on the STM32F767 Nucleo, which is typically mapped to **PB6 (TX)** and **PB7 (RX)**.

**ESP8266 Module Pins (Common for ESP-01, consult your specific module's datasheet):**

  * **VCC:** 3.3V Power Supply
  * **GND:** Ground
  * **RX:** Receive Data (connects to STM32 TX)
  * **TX:** Transmit Data (connects to STM32 RX)
  * **CH\_PD (EN):** Chip Enable / Power Down (must be pulled HIGH for operation, typically to 3.3V)
  * **RST:** Reset (optional, can be controlled by STM32 or pulled HIGH for normal operation)
  * **GPIO0, GPIO2:** Used for flashing firmware or boot mode. For AT command firmware, typically GPIO0 is HIGH and GPIO2 is HIGH for normal operation. You can usually leave them floating/pulled high if you're not flashing.

**Connection Table:**

| STM32F767 Nucleo Pin | ESP8266 Module Pin | Description                      |
| :------------------- | :----------------- | :------------------------------- |
| **PB6 (USART1\_TX)** | **RX** | STM32 TX to ESP8266 RX           |
| **PB7 (USART1\_RX)** | **TX** | STM32 RX to ESP8266 TX           |
| **GND** | **GND** | Common Ground                    |
| *(Connect to external 3.3V)* | **VCC** | Power for ESP8266 (3.3V)         |
| *(Connect to external 3.3V)* | **CH\_PD / EN** | Chip Enable (must be High)       |
| *(Optional: External 3.3V)* | **RST** | Reset (usually pulled High)      |
| *(Optional: External 3.3V)* | **GPIO0** | Boot Mode Select (High for AT)   |
| *(Optional: External 3.3V)* | **GPIO2** | Boot Mode Select (High for AT)   |

**Connection Steps:**

1.  Connect **PB6** on the Nucleo to **RX** on the ESP8266.
2.  Connect **PB7** on the Nucleo to **TX** on the ESP8266.
3.  Connect **GND** on the Nucleo to **GND** on the ESP8266.
4.  Connect **VCC** on the ESP8266 to your **external 3.3V power supply**.
5.  Connect **CH\_PD (EN)** on the ESP8266 to your **external 3.3V power supply**.
6.  Ensure GPIO0 and GPIO2 are in the correct state for AT firmware (usually high or floating, check your module's specifics). If you have an RST pin, you can also pull it high to 3.3V.

**2. STM32CubeIDE Project Setup:**

1.  **Create a New Project:**
      * Open STM32CubeIDE and go to `File > New > STM32 Project`.
      * Select `Board Selector` and search for `NUCLEO-F767ZI`. Select it and click `Next`.
      * Give your project a name (e.g., `STM32_ESP8266`) and click `Finish`.
2.  **Configure Clock System:**
      * In the `Pinout & Configuration` tab, navigate to `System Core > RCC`.
      * For `High Speed Clock (HSE)`, select `Crystal/Ceramic Resonator`.
      * For `Low Speed Clock (LSE)`, select `Crystal/Ceramic Resonator`.
      * Go to `Clock Configuration` tab. Ensure HCLK is set to 216 MHz.
3.  **Configure USART1 (for ESP8266 Communication):**
      * In the `Pinout & Configuration` tab, navigate to `Connectivity > USART1`.
      * Set `Mode` to `Asynchronous`.
      * In the `Parameter Settings` tab for `USART1`:
          * `Baud Rate`: `115200` (This is the standard baud rate for ESP8266 AT firmware).
          * `Word Length`: `8 Bits`.
          * `Parity`: `None`.
          * `Stop Bits`: `1`.
      * In the `NVIC Settings` tab for `USART1`:
          * Check `USART1 global interrupt` to enable the interrupt. This is crucial for non-blocking reception.
4.  **Configure USART3 (for Debugging - Optional but Recommended):**
      * Navigate to `Connectivity > USART3`.
      * Set `Mode` to `Asynchronous`.
      * In `Parameter Settings`, set `Baud Rate` to `115200`.
      * In `Advanced Settings`, enable `Global Interrupt` for `USART3 global interrupt`.
      * **Enable printf redirection:** In `Project Manager` tab, under `Code Generator`, check `Enable Trace and Debug (SWV)`.
          * *(Alternatively, for `printf` over UART, enable `_write` in `Core/Src/syscalls.c` and ensure it uses `HAL_UART_Transmit` via `huart3`.)*
5.  **Generate Code:** Save your `.ioc` file (`Ctrl+S`). STM32CubeIDE will prompt you to generate code. Click `Yes`.

**3. Application Code (`main.c`):**

Now, let's add the C code to send and receive AT commands. We'll implement a basic function to send a command and wait for a specific response.

```c
/* USER CODE BEGIN Includes */
#include <stdio.h>
#include <string.h> // For strcmp, strstr
/* USER CODE END Includes */

/* USER CODE BEGIN PV */
// ESP8266 UART buffer and flags
#define ESP_RX_BUFFER_SIZE 512
volatile char esp_rx_buffer[ESP_RX_BUFFER_SIZE];
volatile uint16_t esp_rx_idx = 0;
volatile uint8_t esp_rx_newline_flag = 0; // Set when a full line (ending with \r\n) is received
volatile uint8_t esp_rx_complete_flag = 0; // Set when a command response (OK/ERROR) is detected

// Wi-Fi Credentials (REPLACE WITH YOURS)
#define WIFI_SSID "YOUR_WIFI_SSID"
#define WIFI_PASSWORD "YOUR_WIFI_PASSWORD"
/* USER CODE END PV */

/* USER CODE BEGIN 0 */
// Redirect printf to USART3 (if not using SWV)
#ifdef __GNUC__
#define PUTCHAR_PROTOTYPE int __io_putchar(int ch)
#else
#define PUTCHAR_PROTOTYPE int fputc(int ch, FILE *f)
#endif /* __GNUC__ */

PUTCHAR_PROTOTYPE
{
  HAL_UART_Transmit(&huart3, (uint8_t *)&ch, 1, 0xFFFF);
  return ch;
}

// UART Receive Complete Callback (for ESP8266 UART - USART1)
void HAL_UART_RxCpltCallback(UART_HandleTypeDef *huart)
{
  if (huart->Instance == USART1) // Check if it's the UART connected to ESP8266
  {
    // Store the received character
    char received_char = esp_rx_buffer[esp_rx_idx];

    // Increment index, handle buffer overflow
    if (esp_rx_idx < (ESP_RX_BUFFER_SIZE - 1))
    {
      esp_rx_idx++;
    }
    else
    {
      // Buffer overflow, reset index and clear buffer
      esp_rx_idx = 0;
      memset((char*)esp_rx_buffer, 0, ESP_RX_BUFFER_SIZE);
    }

    // Null-terminate the string for easier parsing
    esp_rx_buffer[esp_rx_idx] = '\0';

    // Check for end of line (\r\n)
    if (esp_rx_idx >= 2 && esp_rx_buffer[esp_rx_idx - 2] == '\r' && esp_rx_buffer[esp_rx_idx - 1] == '\n')
    {
      esp_rx_newline_flag = 1;
      // Check for common AT command responses indicating end of command
      if (strstr((char*)esp_rx_buffer, "OK\r\n") != NULL ||
          strstr((char*)esp_rx_buffer, "ERROR\r\n") != NULL ||
          strstr((char*)esp_rx_buffer, "FAIL\r\n") != NULL ||
          strstr((char*)esp_rx_buffer, "ready\r\n") != NULL || // For AT+RST
          strstr((char*)esp_rx_buffer, "WIFI GOT IP\r\n") != NULL) // For CWJAP
      {
        esp_rx_complete_flag = 1;
      }
    }

    // Re-arm the UART receive interrupt for the next single byte
    HAL_UART_Receive_IT(&huart1, (uint8_t*)&esp_rx_buffer[esp_rx_idx], 1);
  }
}

// Function to send AT command and wait for response
// Returns 0 on success (expected response found), 1 on timeout/failure
uint8_t ESP_Send_Command(const char *cmd, const char *expected_response, uint32_t timeout)
{
  uint32_t start_time = HAL_GetTick();
  uint32_t current_time = 0;

  // Clear receive buffer and flags
  memset((char*)esp_rx_buffer, 0, ESP_RX_BUFFER_SIZE);
  esp_rx_idx = 0;
  esp_rx_newline_flag = 0;
  esp_rx_complete_flag = 0;

  printf("Sending command: %s", cmd); // Cmd already includes \r\n

  // Transmit the command
  HAL_UART_Transmit(&huart1, (uint8_t*)cmd, strlen(cmd), HAL_MAX_DELAY);

  // Wait for response or timeout
  while (!esp_rx_complete_flag)
  {
    current_time = HAL_GetTick();
    if ((current_time - start_time) > timeout)
    {
      printf("TIMEOUT!\r\n");
      printf("Received so far: %s\r\n", (char*)esp_rx_buffer);
      return 1; // Timeout
    }
  }

  // Check if expected response is in the buffer
  if (strstr((char*)esp_rx_buffer, expected_response) != NULL)
  {
    printf("Response OK: %s\r\n", (char*)esp_rx_buffer);
    return 0; // Success
  }
  else
  {
    printf("Response FAILED: %s\r\n", (char*)esp_rx_buffer);
    return 1; // Unexpected response
  }
}

// Function to initialize ESP8266 and connect to Wi-Fi
void ESP8266_Init(void)
{
  HAL_Delay(100); // Give ESP8266 time to power up

  // Start receiving first byte to enable UART interrupt
  HAL_UART_Receive_IT(&huart1, (uint8_t*)&esp_rx_buffer[esp_rx_idx], 1);

  // 1. Test AT command (basic communication check)
  if (ESP_Send_Command("AT\r\n", "OK\r\n", 2000) != 0) return;
  HAL_Delay(1000);

  // 2. Reset ESP8266
  if (ESP_Send_Command("AT+RST\r\n", "ready\r\n", 5000) != 0) return; // Wait for "ready" after reset
  HAL_Delay(1000);

  // 3. Set Wi-Fi mode to Station (client)
  if (ESP_Send_Command("AT+CWMODE=1\r\n", "OK\r\n", 2000) != 0) return;
  HAL_Delay(1000);

  // 4. Connect to Wi-Fi network
  char cmd_join[100];
  sprintf(cmd_join, "AT+CWJAP=\"%s\",\"%s\"\r\n", WIFI_SSID, WIFI_PASSWORD);
  printf("Connecting to Wi-Fi: %s\r\n", WIFI_SSID);
  if (ESP_Send_Command(cmd_join, "WIFI GOT IP\r\n", 15000) != 0) // Increased timeout for connection
  {
    printf("Failed to connect to Wi-Fi!\r\n");
    return;
  }
  printf("Connected to Wi-Fi and got IP!\r\n");
  HAL_Delay(1000);

  // 5. Get IP Address (optional)
  if (ESP_Send_Command("AT+CIFSR\r\n", "OK\r\n", 2000) != 0) return;
  HAL_Delay(1000);

  printf("ESP8266 setup complete and connected to Wi-Fi.\r\n");
}
/* USER CODE END 0 */

int main(void)
{
  /* USER CODE BEGIN 1 */

  /* USER CODE END 1 */

  /* MCU Configuration--------------------------------------------------------*/

  /* Reset of all peripherals, Initializes the Flash interface and the Systick. */
  HAL_Init();

  /* USER CODE BEGIN Init */

  /* USER CODE END Init */

  /* Configure the system clock */
  SystemClock_Config();

  /* USER CODE BEGIN SysInit */

  /* USER CODE END SysInit */

  /* Initialize all configured peripherals */
  MX_GPIO_Init();
  MX_USART1_UART_Init(); // For ESP8266
  MX_USART3_UART_Init(); // For printf debug output
  /* USER CODE BEGIN 2 */
  printf("STM32F767 - ESP8266 Wi-Fi Module Tutorial\r\n");
  ESP8266_Init(); // Initialize ESP8266 and connect to Wi-Fi
  /* USER CODE END 2 */

  /* Infinite loop */
  /* USER CODE BEGIN WHILE */
  while (1)
  {
    /* USER CODE END WHILE */

    /* USER CODE BEGIN 3 */
    // Main loop can be used for other tasks now that Wi-Fi is connected.
    // For example, you could periodically send an HTTP request or update a cloud service.
    printf("Wi-Fi connected. Looping...\r\n");
    HAL_Delay(5000); // Wait 5 seconds before next print
  }
  /* USER CODE END 3 */
}
```

**Code Explanation:**

  * **`WIFI_SSID` and `WIFI_PASSWORD`:** **CRITICAL:** Replace `"YOUR_WIFI_SSID"` and `"YOUR_WIFI_PASSWORD"` with your actual Wi-Fi network credentials.
  * **`esp_rx_buffer` and flags:** These global `volatile` variables are used to store incoming data from the ESP8266 via UART. `volatile` is important because they are accessed by both the main loop and the interrupt service routine.
  * **`HAL_UART_RxCpltCallback(UART_HandleTypeDef *huart)`:** This is the interrupt callback function for UART reception.
      * It's called every time a single character is received (because we re-arm `HAL_UART_Receive_IT` for 1 byte).
      * It stores the character in `esp_rx_buffer`.
      * It checks for `\r\n` to signify a complete line.
      * It also checks for common AT command responses like "OK", "ERROR", "ready", etc., to set `esp_rx_complete_flag`, indicating that the ESP has finished responding to a command.
      * Crucially, `HAL_UART_Receive_IT(&huart1, (uint8_t*)&esp_rx_buffer[esp_rx_idx], 1);` **re-arms the interrupt** for the *next* byte. Without this, the interrupt would only trigger once.
  * **`ESP_Send_Command(const char *cmd, const char *expected_response, uint32_t timeout)`:**
      * This is a utility function to simplify sending AT commands.
      * It clears the receive buffer.
      * It sends the `cmd` string (which *must* include `\r\n` termination).
      * It then enters a `while` loop, waiting for `esp_rx_complete_flag` to be set by the UART Rx callback or until a `timeout` occurs.
      * Finally, it checks if the `expected_response` (e.g., "OK") is found within the received data using `strstr`.
  * **`ESP8266_Init()`:** This function encapsulates the sequence of AT commands to:
    1.  Test basic communication (`AT`).
    2.  Reset the ESP8266 (`AT+RST`).
    3.  Set the Wi-Fi mode to Station (`AT+CWMODE=1`).
    4.  Connect to your Wi-Fi network (`AT+CWJAP`).
    5.  (Optional) Get the assigned IP address (`AT+CIFSR`).
  * **`main()` loop:** After `ESP8266_Init()` completes, the main loop can continue with other tasks, knowing that the ESP8266 is connected to Wi-Fi.

**4. Build and Flash:**

1.  Build your project (`Project > Build Project` or `Ctrl+B`).
2.  Flash the code to your Nucleo board (`Run > Debug` then `Run` or `Run > Run` directly).

**5. Testing the Communication:**

1.  Open a serial terminal program (e.g., PuTTY, Tera Term, RealTerm) and connect to the COM port associated with your Nucleo board (baud rate 115200).
2.  Power on your ESP8266 module using the external 3.3V supply *before* (or at the same time as) powering the Nucleo board.
3.  Observe the serial terminal output. You should see:
      * "STM32F767 - ESP8266 Wi-Fi Module Tutorial"
      * Messages for each AT command being sent.
      * Responses from the ESP8266 ("OK", "ready", "WIFI GOT IP", etc.).
      * "Connected to Wi-Fi and got IP\!" if successful.
      * Then, "Wi-Fi connected. Looping..."
4.  If you encounter issues (e.g., "TIMEOUT\!", "Failed to connect to Wi-Fi\!"), double-check:
      * **Wiring:** Especially TX/RX cross-over and all power/enable pins.
      * **ESP8266 Power Supply:** This is the most common problem. Ensure it's stable and sufficient.
      * **Baud Rate:** Both STM32 and ESP8266 must be at 115200.
      * **Wi-Fi SSID/Password:** Correct credentials.
      * **AT Firmware:** Ensure your ESP8266 has the AT command firmware.

This tutorial provides the foundation for using the ESP8266 as a Wi-Fi modem with your STM32F767. From here, you can explore sending HTTP GET/POST requests, TCP/UDP communication, and more advanced IoT applications by sending further AT commands from the STM32.