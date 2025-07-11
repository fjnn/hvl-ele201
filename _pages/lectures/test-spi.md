This tutorial will guide you through establishing Serial Peripheral Interface (SPI) communication between two STM32F767 Nucleo-144 boards. SPI is a synchronous serial data protocol used for short-distance communication, primarily in embedded systems. It operates in a Master-Slave configuration, where one device (the Master) controls the communication, and other devices (Slaves) respond to the Master's commands.

**Key Concepts of SPI:**

  * **Master-Slave:** One device acts as the Master, initiating and controlling data transfers. All other devices are Slaves, responding to the Master.
  * **Four Wires:**
      * **SCK (Serial Clock):** Generated by the Master to synchronize data transfer.
      * **MOSI (Master Out, Slave In):** Data line from Master to Slave.
      * **MISO (Master In, Slave Out):** Data line from Slave to Master.
      * **NSS (Negative Slave Select) / CS (Chip Select):** An active-low signal from the Master to select a specific Slave device. Each Slave needs its own CS line.
  * **Full-Duplex:** Data can be sent and received simultaneously.
  * **Clock Polarity (CPOL) & Clock Phase (CPHA):** These define how data is sampled relative to the clock signal. They must match between Master and Slave.

**Prerequisites:**

  * Two STM32F767 Nucleo-144 boards
  * Jumper wires (male-to-male)
  * Computer with STM32CubeIDE installed
  * Basic understanding of C programming and microcontrollers
  * Two USB cables (one for each board)

**1. Hardware Setup:**

We will connect the two Nucleo boards directly using jumper wires. One board will be configured as the **Master**, and the other as the **Slave**.

**Pin Connections (using SPI1 on both boards):**

| Master Board (Nucleo 1) Pin | Slave Board (Nucleo 2) Pin | Description                  |
| :-------------------------- | :------------------------- | :--------------------------- |
| **PA5 (SPI1\_SCK)** | **PA5 (SPI1\_SCK)** | Serial Clock                 |
| **PA7 (SPI1\_MOSI)** | **PA6 (SPI1\_MISO)** | Master Out, Slave In         |
| **PA6 (SPI1\_MISO)** | **PA7 (SPI1\_MOSI)** | Master In, Slave Out         |
| **PA4 (GPIO\_Output - CS)** | **PA4 (SPI1\_NSS)** | Chip Select (Master controls) |
| **GND** | **GND** | Common Ground                |

**Important Note:**

  * **MOSI** on Master connects to **MISO** on Slave.
  * **MISO** on Master connects to **MOSI** on Slave.
  * The **Chip Select (CS)** pin on the Master will be configured as a general-purpose output (GPIO) to manually control the Slave's selection. The Slave's **NSS** pin will be configured as a hardware input.

**2. STM32CubeIDE Project Setup (for both boards):**

You will create two separate projects in STM32CubeIDE, one for the Master board and one for the Slave board.

**Common Configuration Steps (for both Master and Slave projects):**

1.  **Create a New Project:**
      * Open STM32CubeIDE and go to `File > New > STM32 Project`.
      * Select `Board Selector` and search for `NUCLEO-F767ZI`. Select it and click `Next`.
      * Give your first project a name (e.g., `SPI_Master`) and the second one `SPI_Slave`. Click `Finish`.
2.  **Configure Clock System:**
      * In the `Pinout & Configuration` tab, navigate to `System Core > RCC`.
      * For `High Speed Clock (HSE)`, select `Crystal/Ceramic Resonator`.
      * For `Low Speed Clock (LSE)`, select `Crystal/Ceramic Resonator`.
      * Go to `Clock Configuration` tab. The tool will automatically suggest optimal clock settings. Click `Resolve Clock Issues` if prompted, and ensure the HCLK is set to 216 MHz.
3.  **Configure USART (for Debugging - Optional but Recommended):**
      * To see debug messages, configure `USART3`.
      * Navigate to `Connectivity > USART3`.
      * Set `Mode` to `Asynchronous`.
      * In `Parameter Settings`, set `Baud Rate` to `115200`.
      * Observe that PD8 (TX) and PD9 (RX) are configured.
      * In `Advanced Settings`, enable `Global Interrupt` for `USART3 global interrupt`.
      * **Enable printf redirection:** In `Project Manager` tab, under `Code Generator`, check `Enable Trace and Debug (SWV)`.
          * *Alternatively, for `printf` over UART, you'll need to enable `_write` in `Core/Src/syscalls.c`. Uncomment the `_write` function, ensuring it uses `HAL_UART_Transmit`.*

**Master Board Specific Configuration:**

1.  **Configure SPI1:**
      * In the `Pinout & Configuration` tab, navigate to `Connectivity > SPI1`.
      * Set `Mode` to `Full-Duplex Master`.
      * In the `Parameter Settings` tab for `SPI1`:
          * `Frame Format`: `Motorola`
          * `Data Size`: `8 Bits`
          * `First Bit`: `MSB First`
          * `Clock Polarity (CPOL)`: `Low` (important: must match Slave)
          * `Clock Phase (CPHA)`: `1 Edge` (important: must match Slave)
          * `NSS`: `Software slave management` (This allows us to control the CS pin manually using GPIO).
          * `Prescaler (for Baud Rate)`: Select `PCLK/16` (This will give a clock speed of 216MHz / 16 = 13.5 MHz, which is fast but generally fine).
2.  **Configure CS Pin (PA4):**
      * In the `Pinout & Configuration` tab, navigate to `System Core > GPIO`.
      * Click on `PA4` and set it as `GPIO_Output`.
      * In the `GPIO Settings` tab for `PA4`:
          * `GPIO output level`: `High` (This keeps the Slave deselected initially).
          * `GPIO mode`: `Output Push Pull`.
          * `GPIO Pull-up/Pull-down`: `No pull-up and no pull-down`.
          * `Maximum output speed`: `High`.
3.  **Generate Code:** Save your `.ioc` file (`Ctrl+S`). Click `Yes` to generate code.

**Slave Board Specific Configuration:**

1.  **Configure SPI1:**
      * In the `Pinout & Configuration` tab, navigate to `Connectivity > SPI1`.
      * Set `Mode` to `Full-Duplex Slave`.
      * In the `Parameter Settings` tab for `SPI1`:
          * `Frame Format`: `Motorola`
          * `Data Size`: `8 Bits`
          * `First Bit`: `MSB First`
          * `Clock Polarity (CPOL)`: `Low` (match Master)
          * `Clock Phase (CPHA)`: `1 Edge` (match Master)
          * `NSS`: `Hardware NSS Input` (The Slave's NSS pin will be controlled by the Master's CS GPIO).
2.  **Configure NVIC (Interrupts):**
      * In the `Pinout & Configuration` tab, navigate to `System Core > NVIC`.
      * Enable the `SPI1 global interrupt`. This is crucial for the Slave to receive data in a non-blocking manner.
3.  **Generate Code:** Save your `.ioc` file (`Ctrl+S`). Click `Yes` to generate code.

**3. Application Code (`main.c` for both boards):**

**Common Code (for both `main.c` files):**

Add the following `printf` redirection code to `Core/Src/main.c` (if you chose the UART redirection method):

```c
/* USER CODE BEGIN Includes */
#include <stdio.h> // For printf
/* USER CODE END Includes */

/* USER CODE BEGIN 0 */
// Redirect printf to UART
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
/* USER CODE END 0 */
```

**Master Board (`SPI_Master` project - `Core/Src/main.c`):**

```c
/* USER CODE BEGIN PV */
uint8_t master_tx_buffer[] = "Hello Slave from Master!";
uint8_t master_rx_buffer[32]; // Buffer to receive data from Slave
/* USER CODE END PV */

/* USER CODE BEGIN 2 */
printf("SPI Master Initialized.\r\n");
/* USER CODE END 2 */

/* Infinite loop */
/* USER CODE BEGIN WHILE */
while (1)
{
  /* USER CODE END WHILE */

  /* USER CODE BEGIN 3 */
  printf("Master: Sending data...\r\n");

  // Drive CS low to select the Slave
  HAL_GPIO_WritePin(GPIOA, GPIO_PIN_4, GPIO_PIN_RESET);
  HAL_Delay(1); // Small delay for CS to settle

  // Transmit and Receive data simultaneously (Full-Duplex)
  // The size should be the maximum of data to send or receive
  HAL_StatusTypeDef status = HAL_SPI_TransmitReceive(&hspi1, master_tx_buffer, master_rx_buffer, sizeof(master_tx_buffer), HAL_MAX_DELAY);

  // Drive CS high to deselect the Slave
  HAL_GPIO_WritePin(GPIOA, GPIO_PIN_4, GPIO_PIN_SET);

  if (status == HAL_OK)
  {
    printf("Master: Transmit/Receive successful!\r\n");
    printf("Master: Received from Slave: %s\r\n", master_rx_buffer);
  }
  else
  {
    printf("Master: Transmit/Receive failed with status: %d\r\n", status);
  }

  // Clear receive buffer for next transfer
  memset(master_rx_buffer, 0, sizeof(master_rx_buffer));

  HAL_Delay(1000); // Wait for 1 second before next transfer
}
/* USER CODE END 3 */
```

**Slave Board (`SPI_Slave` project - `Core/Src/main.c`):**

```c
/* USER CODE BEGIN PV */
uint8_t slave_rx_buffer[32]; // Buffer to receive data from Master
uint8_t slave_tx_buffer[] = "Hi Master from Slave!";
volatile uint8_t spi_rx_cplt_flag = 0; // Flag to indicate reception complete
/* USER CODE END PV */

/* USER CODE BEGIN 0 */
// SPI Receive Complete Callback
void HAL_SPI_RxCpltCallback(SPI_HandleTypeDef *hspi)
{
  if (hspi->Instance == SPI1)
  {
    spi_rx_cplt_flag = 1; // Set flag when reception is complete
  }
}
/* USER CODE END 0 */

/* USER CODE BEGIN 2 */
printf("SPI Slave Initialized.\r\n");

// Start the first non-blocking receive operation
// The slave needs to be ready to receive data before the master sends
HAL_SPI_Receive_IT(&hspi1, slave_rx_buffer, sizeof(slave_rx_buffer));
/* USER CODE END 2 */

/* Infinite loop */
/* USER CODE BEGIN WHILE */
while (1)
{
  /* USER CODE END WHILE */

  /* USER CODE BEGIN 3 */
  if (spi_rx_cplt_flag == 1)
  {
    printf("Slave: Received from Master: %s\r\n", slave_rx_buffer);

    // Now, transmit data back to the Master (this will happen during the Master's next TransmitReceive)
    // For full-duplex, the slave's transmit buffer should be ready before the master initiates the transfer
    // In this simple example, we'll just prepare the buffer.
    // The actual transmission happens when the master initiates the next HAL_SPI_TransmitReceive
    // For a more robust system, you'd manage this with a state machine or a dedicated transmit buffer.

    // For now, let's just re-enable reception
    spi_rx_cplt_flag = 0; // Clear flag
    // Re-arm the receive interrupt for the next incoming data
    HAL_SPI_Receive_IT(&hspi1, slave_rx_buffer, sizeof(slave_rx_buffer));

    // If you want to respond immediately using blocking transmit, you could do:
    // HAL_SPI_Transmit(&hspi1, slave_tx_buffer, sizeof(slave_tx_buffer), HAL_MAX_DELAY);
    // But this would require the Master to also be in a receive state.
    // For full-duplex, the Master's TransmitReceive handles both sides.
  }
  // You might add a small delay here if the loop is too tight without much work
  // HAL_Delay(1);
}
/* USER CODE END 3 */
```

**Explanation of the Code:**

  * **Master Code:**
      * `master_tx_buffer`: Contains the data the Master will send.
      * `master_rx_buffer`: Will store the data received from the Slave.
      * `HAL_GPIO_WritePin(GPIOA, GPIO_PIN_4, GPIO_PIN_RESET);`: Pulls the CS line low, selecting the Slave.
      * `HAL_SPI_TransmitReceive(&hspi1, master_tx_buffer, master_rx_buffer, sizeof(master_tx_buffer), HAL_MAX_DELAY);`: This is the core SPI transaction. It sends `master_tx_buffer` and simultaneously receives data into `master_rx_buffer`. The `sizeof(master_tx_buffer)` determines the number of bytes exchanged. `HAL_MAX_DELAY` means it will block until the transfer is complete.
      * `HAL_GPIO_WritePin(GPIOA, GPIO_PIN_4, GPIO_PIN_SET);`: Pulls the CS line high, deselecting the Slave.
      * `memset(master_rx_buffer, 0, sizeof(master_rx_buffer));`: Clears the receive buffer to ensure fresh data in the next transfer.
  * **Slave Code:**
      * `slave_rx_buffer`: Will store data received from the Master.
      * `slave_tx_buffer`: Contains data the Slave will send *when the Master initiates a transfer*.
      * `volatile uint8_t spi_rx_cplt_flag`: A flag to signal when a non-blocking receive operation is complete. `volatile` is important because it's modified within an interrupt service routine.
      * `HAL_SPI_RxCpltCallback(SPI_HandleTypeDef *hspi)`: This is an interrupt callback function provided by the HAL library. It's automatically called when a `HAL_SPI_Receive_IT` operation completes. We set `spi_rx_cplt_flag` here.
      * `HAL_SPI_Receive_IT(&hspi1, slave_rx_buffer, sizeof(slave_rx_buffer));`: This initiates a non-blocking receive operation. The Slave will wait for incoming data from the Master. When data arrives and the specified number of bytes are received, `HAL_SPI_RxCpltCallback` will be called.
      * The `while(1)` loop continuously checks `spi_rx_cplt_flag`. When it's set, it prints the received data and re-arms the receive interrupt to be ready for the next Master transmission.

**4. Build and Flash:**

1.  **Build both projects:** For each project (`SPI_Master` and `SPI_Slave`), go to `Project > Build Project` or press `Ctrl+B`.
2.  **Flash the Slave board first:**
      * Connect the USB cable to the Nucleo board intended as the Slave.
      * Select the `SPI_Slave` project in the Project Explorer.
      * Go to `Run > Debug` (this will flash the board and start a debug session). Once flashed, you can terminate the debug session and run it normally, or just let it run.
3.  **Flash the Master board second:**
      * Connect the USB cable to the Nucleo board intended as the Master.
      * Select the `SPI_Master` project in the Project Explorer.
      * Go to `Run > Debug`.

**5. Testing the Communication:**

1.  Open two separate serial terminal programs (e.g., PuTTY, Tera Term, RealTerm), one for each Nucleo board.
2.  Configure each terminal to connect to the COM port associated with its respective Nucleo board's ST-LINK Virtual COM Port (check Device Manager on Windows, or `ls /dev/ttyACM*` or `ls /dev/ttyUSB*` on Linux/macOS).
3.  Set the baud rate to **115200** for both.

You should observe the following:

  * **Master Terminal:** You'll see "Master: Sending data..." followed by "Master: Transmit/Receive successful\!" and "Master: Received from Slave: Hi Master from Slave\!". This will repeat every second.
  * **Slave Terminal:** You'll see "Slave: Received from Master: Hello Slave from Master\!". This will also repeat every second, indicating it's successfully receiving data.

This demonstrates basic one-way communication (Master sending, Slave receiving). The full-duplex nature of SPI means data is exchanged simultaneously. In this example, the Slave's `slave_tx_buffer` is implicitly sent back to the Master during the `HAL_SPI_TransmitReceive` call.

-----

### Exercise with Solution

**Exercise 1: Bi-directional Data Exchange**

**Objective:** Modify the code so that the Master sends a counter value, and the Slave receives it, increments its own counter, and sends that back to the Master.

**Solution:**

**1. Master Board (`SPI_Master` project - `Core/Src/main.c`):**

```c
/* USER CODE BEGIN PV */
uint8_t master_tx_counter = 0; // Master's counter to send
uint8_t master_tx_buffer[1];   // Only sending 1 byte
uint8_t master_rx_buffer[1];   // Receiving 1 byte from Slave
/* USER CODE END PV */

/* USER CODE BEGIN 2 */
printf("SPI Master Initialized.\r\n");
/* USER CODE END 2 */

/* Infinite loop */
/* USER CODE BEGIN WHILE */
while (1)
{
  /* USER CODE END WHILE */

  /* USER CODE BEGIN 3 */
  master_tx_buffer[0] = master_tx_counter; // Put counter into transmit buffer
  printf("Master: Sending counter: %d\r\n", master_tx_counter);

  // Drive CS low to select the Slave
  HAL_GPIO_WritePin(GPIOA, GPIO_PIN_4, GPIO_PIN_RESET);
  HAL_Delay(1); // Small delay for CS to settle

  // Transmit and Receive 1 byte
  HAL_StatusTypeDef status = HAL_SPI_TransmitReceive(&hspi1, master_tx_buffer, master_rx_buffer, 1, HAL_MAX_DELAY);

  // Drive CS high to deselect the Slave
  HAL_GPIO_WritePin(GPIOA, GPIO_PIN_4, GPIO_PIN_SET);

  if (status == HAL_OK)
  {
    printf("Master: Received incremented counter from Slave: %d\r\n", master_rx_buffer[0]);
  }
  else
  {
    printf("Master: Transmit/Receive failed with status: %d\r\n", status);
  }

  master_tx_counter++; // Increment master's counter
  HAL_Delay(1000); // Wait for 1 second before next transfer
}
/* USER CODE END 3 */
```

**2. Slave Board (`SPI_Slave` project - `Core/Src/main.c`):**

```c
/* USER CODE BEGIN PV */
uint8_t slave_rx_buffer[1]; // Receiving 1 byte from Master
uint8_t slave_tx_counter = 0; // Slave's counter to send back
uint8_t slave_tx_buffer[1];   // Only sending 1 byte
volatile uint8_t spi_rx_cplt_flag = 0; // Flag to indicate reception complete
/* USER CODE END PV */

/* USER CODE BEGIN 0 */
// SPI Receive Complete Callback
void HAL_SPI_RxCpltCallback(SPI_HandleTypeDef *hspi)
{
  if (hspi->Instance == SPI1)
  {
    spi_rx_cplt_flag = 1; // Set flag when reception is complete
  }
}
/* USER CODE END 0 */

/* USER CODE BEGIN 2 */
printf("SPI Slave Initialized.\r\n");

// Start the first non-blocking receive operation
// The slave needs to be ready to receive data before the master sends
// The slave's transmit buffer must also be ready for the master's simultaneous receive
slave_tx_buffer[0] = slave_tx_counter; // Initialize tx buffer with current slave counter
HAL_SPI_TransmitReceive_IT(&hspi1, slave_tx_buffer, slave_rx_buffer, 1); // Use TransmitReceive_IT for bi-directional non-blocking
/* USER CODE END 2 */

/* Infinite loop */
/* USER CODE BEGIN WHILE */
while (1)
{
  /* USER CODE END WHILE */

  /* USER CODE BEGIN 3 */
  if (spi_rx_cplt_flag == 1)
  {
    printf("Slave: Received counter from Master: %d\r\n", slave_rx_buffer[0]);

    // Increment slave's counter
    slave_tx_counter = slave_rx_buffer[0] + 1; // Increment master's counter + 1

    // Prepare the transmit buffer for the NEXT transfer
    slave_tx_buffer[0] = slave_tx_counter;

    spi_rx_cplt_flag = 0; // Clear flag
    // Re-arm the receive/transmit interrupt for the next incoming data
    HAL_SPI_TransmitReceive_IT(&hspi1, slave_tx_buffer, slave_rx_buffer, 1);
  }
}
/* USER CODE END 3 */
```

**Explanation of Solution:**

  * **Master:** Sends `master_tx_counter` and expects to receive `master_rx_buffer[0]` which should be the Slave's incremented value.
  * **Slave:**
      * Uses `HAL_SPI_TransmitReceive_IT` to be ready for both sending and receiving simultaneously in a non-blocking manner.
      * In `HAL_SPI_RxCpltCallback` (which is also called for `TransmitReceive_IT` when the transfer completes), it processes the received byte, increments it, and prepares its `slave_tx_buffer` with this new value for the *next* transaction.
      * It then re-arms `HAL_SPI_TransmitReceive_IT` to be ready for the Master's next transfer.

**Test:** Flash both boards. You should see the Master sending `0`, `1`, `2`, ... and receiving `1`, `2`, `3`, ... from the Slave. The Slave will receive `0`, `1`, `2`, ... and print them.

-----

### Exercise for Students to Solve

**Exercise 2: Command-Response Protocol**

**Objective:** Implement a simple command-response protocol over SPI. The Master will send a command byte (e.g., `0x01` for "GET\_STATUS", `0x02` for "GET\_TEMPERATURE"). The Slave will interpret the command and send back a corresponding response (e.g., a status byte or a simulated temperature value).

**Hints:**

  * **Master:**
      * Define constants for your command bytes (e.g., `#define CMD_GET_STATUS 0x01`).
      * Use a `switch` statement or `if-else if` to send different command bytes.
      * The Master will need to send the command byte, then potentially send dummy bytes to clock out the Slave's response.
  * **Slave:**
      * In `HAL_SPI_RxCpltCallback`, check the received command byte.
      * Based on the command, prepare a specific response in its `slave_tx_buffer`.
      * The Slave needs to be ready to send its response when the Master initiates the next part of the transaction (e.g., by sending dummy bytes). This might involve a small state machine on the Slave side to know what kind of response to prepare.
      * Consider how to handle multi-byte responses if your simulated data (like temperature) requires more than one byte. This might involve the Master sending multiple dummy bytes after the command to receive the full response.

This exercise will challenge you to think about basic protocol design and state management in SPI communication. Good luck\!