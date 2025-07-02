Okay, let's connect your STM32F767 Nucleo board to a **HC-05 Bluetooth module** for wireless serial communication. This is a common setup for simple data exchange between your microcontroller and devices like smartphones, tablets, or computers.

The HC-05 is a versatile Bluetooth module that acts as a serial port bridge. It typically operates in two modes:

1.  **AT Command Mode:** Used for configuring the module (e.g., setting baud rate, name, passcode, master/slave role).
2.  **Data Mode:** After configuration, it acts as a transparent serial data pipe, sending whatever it receives on its RX pin out wirelessly, and sending whatever it receives wirelessly out on its TX pin.

**Important Pre-configuration of HC-05:**
Before connecting to the STM32, it is **highly recommended** to first configure your HC-05 module using a separate USB-to-TTL serial converter and a serial terminal program (like PuTTY or Tera Term) on your computer. The most crucial setting to ensure is the **baud rate** of the HC-05, which must match the baud rate you'll configure on the STM32's UART.

  * **Common Default Baud Rate for Data Mode:** 9600 bps.
  * **Common Baud Rate for AT Command Mode:** 38400 bps (when holding the button during power-up).

**Tutorial assumes your HC-05 is configured to 9600 baud for data mode.**

**Prerequisites:**

  * STM32F767 Nucleo-144 board
  * HC-05 Bluetooth module (often on a small breakout board)
  * Jumper wires
  * Computer with STM32CubeIDE installed
  * Basic understanding of C programming and microcontrollers
  * (Optional but Recommended for HC-05 Pre-config): USB-to-TTL Serial Converter

**1. Hardware Setup:**

We'll use **USART2** on the STM32F767 Nucleo, which is typically mapped to **PD5 (TX)** and **PD6 (RX)** on the Morpho headers.

**HC-05 Module Pins (Common, consult your specific module's datasheet):**

  * **VCC:** Power Supply (Typically 3.3V to 6V, many breakout boards have an onboard 3.3V regulator allowing 5V input)
  * **GND:** Ground
  * **RXD (RX):** Receive Data (connects to STM32 TX)
  * **TXD (TX):** Transmit Data (connects to STM32 RX)
  * **STATE / LED:** Indicates connection status.
  * **KEY / EN:** Used to enter AT command mode.

**Connection Table:**

| STM32F767 Nucleo Pin | HC-05 Module Pin | Description                      |
| :------------------- | :----------------- | :------------------------------- |
| **PD5 (USART2\_TX)** | **RXD** | STM32 TX to HC-05 RX (data from STM32) |
| **PD6 (USART2\_RX)** | **TXD** | STM32 RX to HC-05 TX (data to STM32) |
| **GND** | **GND** | Common Ground                    |
| **VBUS (or 5V)** | **VCC** | Power for HC-05 (5V is often fine for breakout boards) |

**Important Notes:**

  * **Voltage Levels:** STM32F767 operates at 3.3V logic. Most HC-05 breakout boards accept 5V VCC and have built-in level shifters on their RXD pin, making direct connection to 3.3V TX from STM32 safe. If your HC-05 module does *not* have a level shifter, you might need a voltage divider on the HC-05 RXD pin when connecting to a 5V TX. However, since the STM32 is 3.3V, direct connection is fine.
  * **RX/TX Crossover:** Always remember that the Transmit (TX) pin of one device connects to the Receive (RX) pin of the other, and vice-versa.

**2. STM32CubeIDE Project Setup:**

1.  **Create a New Project:**
      * Open STM32CubeIDE and go to `File > New > STM32 Project`.
      * Select `Board Selector` and search for `NUCLEO-F767ZI`. Select it and click `Next`.
      * Give your project a name (e.g., `STM32_HC05_BT`) and click `Finish`.
2.  **Configure Clock System:**
      * In the `Pinout & Configuration` tab, navigate to `System Core > RCC`.
      * For `High Speed Clock (HSE)`, select `Crystal/Ceramic Resonator`.
      * For `Low Speed Clock (LSE)`, select `Crystal/Ceramic Resonator`.
      * Go to `Clock Configuration` tab. Ensure HCLK is set to 216 MHz.
3.  **Configure USART2 (for HC-05 Communication):**
      * In the `Pinout & Configuration` tab, navigate to `Connectivity > USART2`.
      * Set `Mode` to `Asynchronous`.
      * In the `Parameter Settings` tab for `USART2`:
          * `Baud Rate`: `9600` (This *must* match your HC-05's configured data mode baud rate).
          * `Word Length`: `8 Bits`.
          * `Parity`: `None`.
          * `Stop Bits`: `1`.
      * In the `NVIC Settings` tab for `USART2`:
          * Check `USART2 global interrupt` to enable the interrupt for non-blocking reception.
4.  **Configure USART3 (for Debugging - Optional but Recommended):**
      * Navigate to `Connectivity > USART3`.
      * Set `Mode` to `Asynchronous`.
      * In `Parameter Settings`, set `Baud Rate` to `115200`.
      * In `Advanced Settings`, enable `Global Interrupt` for `USART3 global interrupt`.
      * **Enable printf redirection:** In `Project Manager` tab, under `Code Generator`, check `Enable Trace and Debug (SWV)`.
          * *(Alternatively, for `printf` over UART, enable `_write` in `Core/Src/syscalls.c` and ensure it uses `HAL_UART_Transmit` via `huart3`.)*
5.  **Generate Code:** Save your `.ioc` file (`Ctrl+S`). STM32CubeIDE will prompt you to generate code. Click `Yes`.

**3. Application Code (`main.c`):**

Now, let's add the C code for simple data exchange. The STM32 will periodically send a message over Bluetooth and will print any data it receives from the Bluetooth module.

```c
/* USER CODE BEGIN Includes */
#include <stdio.h>
#include <string.h> // For memset, strlen
/* USER CODE END Includes */

/* USER CODE BEGIN PV */
// Bluetooth UART buffer and flags
#define BT_RX_BUFFER_SIZE 64
volatile char bt_rx_buffer[BT_RX_BUFFER_SIZE];
volatile uint16_t bt_rx_idx = 0;
volatile uint8_t bt_data_received_flag = 0; // Set when data is received from BT
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

// UART Receive Complete Callback (for HC-05 UART - USART2)
void HAL_UART_RxCpltCallback(UART_HandleTypeDef *huart)
{
  if (huart->Instance == USART2) // Check if it's the UART connected to HC-05
  {
    // Store the received character
    char received_char = bt_rx_buffer[bt_rx_idx];

    // Increment index, handle buffer overflow
    if (bt_rx_idx < (BT_RX_BUFFER_SIZE - 1))
    {
      bt_rx_idx++;
    }
    else
    {
      // Buffer overflow, reset index and clear buffer
      bt_rx_idx = 0;
      memset((char*)bt_rx_buffer, 0, BT_RX_BUFFER_SIZE);
      printf("BT RX buffer overflow!\r\n");
    }

    // Null-terminate the string for easier parsing/printing
    bt_rx_buffer[bt_rx_idx] = '\0';

    // Check for newline or if a reasonable amount of data has accumulated
    // For simplicity, we'll process if newline is received or buffer is nearly full.
    // In a real app, you might have specific protocols or delimiters.
    if (received_char == '\n' || received_char == '\r' || bt_rx_idx >= (BT_RX_BUFFER_SIZE - 1))
    {
      bt_data_received_flag = 1; // Indicate data is ready for processing in main loop
    }

    // Re-arm the UART receive interrupt for the next single byte
    HAL_UART_Receive_IT(&huart2, (uint8_t*)&bt_rx_buffer[bt_rx_idx], 1);
  }
}
/* USER CODE END 0 */

int main(void)
{
  /* USER CODE BEGIN 1 */
  uint8_t tx_msg_counter = 0;
  char tx_buffer[32];
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
  MX_USART2_UART_Init(); // For HC-05
  MX_USART3_UART_Init(); // For printf debug output
  /* USER CODE BEGIN 2 */
  printf("STM32F767 - HC-05 Bluetooth Module Tutorial\r\n");
  printf("Waiting for Bluetooth connection...\r\n");

  // Start the non-blocking UART receive for HC-05
  HAL_UART_Receive_IT(&huart2, (uint8_t*)&bt_rx_buffer[bt_rx_idx], 1);
  /* USER CODE END 2 */

  /* Infinite loop */
  /* USER CODE BEGIN WHILE */
  while (1)
  {
    /* USER CODE END WHILE */

    /* USER CODE BEGIN 3 */

    // Check if data has been received from Bluetooth
    if (bt_data_received_flag == 1)
    {
      printf("Received from BT: %s\r\n", (char*)bt_rx_buffer);

      // Reset flag and buffer for next reception
      bt_data_received_flag = 0;
      bt_rx_idx = 0;
      memset((char*)bt_rx_buffer, 0, BT_RX_BUFFER_SIZE);
      // Reception is already re-armed in the callback
    }

    // Send a message over Bluetooth periodically
    sprintf(tx_buffer, "Hello BT from STM32! Counter: %d\r\n", tx_msg_counter++);
    HAL_UART_Transmit(&huart2, (uint8_t*)tx_buffer, strlen(tx_buffer), 100);
    printf("Sent to BT: %s", tx_buffer); // tx_buffer already includes \r\n

    HAL_Delay(2000); // Wait 2 seconds before sending next message
  }
  /* USER CODE END 3 */
}
```

**Code Explanation:**

  * **`bt_rx_buffer` and flags:** These `volatile` global variables manage the incoming data from the HC-05 via UART.
  * **`HAL_UART_RxCpltCallback(UART_HandleTypeDef *huart)`:** This interrupt service routine (ISR) is triggered every time a single character is received from `USART2` (connected to HC-05).
      * It stores the received character into `bt_rx_buffer`.
      * It checks for a newline (`\n` or `\r`) or if the buffer is nearly full, to signal that a complete message (or segment) is ready for processing by setting `bt_data_received_flag`.
      * Crucially, `HAL_UART_Receive_IT(&huart2, (uint8_t*)&bt_rx_buffer[bt_rx_idx], 1);` **re-arms the interrupt** for the *next* single byte. This allows continuous reception.
  * **`HAL_UART_Receive_IT(...)` in `main()`:** The first call to this function in `main()` initializes the non-blocking receive process.
  * **`HAL_UART_Transmit(&huart2, ...)`:** This function sends data from the STM32 to the HC-05. The HC-05 then transmits this data wirelessly over Bluetooth.
  * **`if (bt_data_received_flag == 1) {...}` in `main()`:** The main loop periodically checks this flag. If data has been received and processed by the ISR, this block executes, printing the received data and resetting the flags and buffer for the next incoming message.
  * **`HAL_Delay(2000);`**: A 2-second delay controls how often the STM32 sends messages over Bluetooth.

**4. Build and Flash:**

1.  Build your project (`Project > Build Project` or `Ctrl+B`).
2.  Flash the code to your Nucleo board (`Run > Debug` then `Run` or `Run > Run` directly).

**5. Testing the Communication:**

1.  Open a serial terminal program (e.g., PuTTY, Tera Term) and connect to the COM port associated with your Nucleo board (baud rate 1155200).
2.  Power on your HC-05 module (if not already powered by the Nucleo). Its status LED should typically blink rapidly, indicating it's waiting to be paired.
3.  **On your smartphone/computer:**
      * Enable Bluetooth.
      * Scan for new devices. You should find a device named "HC-05" (or whatever name you configured it with, e.g., "STM32\_BT").
      * Pair with the HC-05. The default passcode is usually "1234" or "0000". Once paired, the HC-05's status LED should blink slowly (often two blinks per second), indicating it's connected.
      * Install a **Bluetooth Serial Terminal app** (e.g., "Serial Bluetooth Terminal" on Android, "BLE Terminal" on iOS, or use a desktop Bluetooth serial port client like PuTTY if your PC has Bluetooth serial support).
      * Connect to the HC-05 from your Bluetooth terminal app.
4.  **Observe:**
      * On your STM32's serial terminal, you should see "Sent to BT: Hello BT from STM32\! Counter: X".
      * On your Bluetooth terminal app (on phone/PC), you should receive these messages.
      * Type messages into your Bluetooth terminal app and send them. You should see "Received from BT: [your message]" appear on the STM32's serial terminal.

This setup provides a robust foundation for wireless serial communication between your STM32F767 and other Bluetooth-enabled devices. You can now use this to send sensor data, control actuators, or build simple remote control applications.