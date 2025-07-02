
This tutorial will guide you through connecting an STM32F767 Nucleo board to an LSM9DS1 IMU (Inertial Measurement Unit) from SparkFun using the I2C communication protocol. We'll cover the necessary hardware connections, STM32CubeIDE configuration, and basic code to read sensor data.

**Understanding the Components:**

  * **STM32F767 Nucleo-144 Board:** A powerful development board featuring an ARM Cortex-M7 microcontroller, suitable for various embedded applications.
  * **LSM9DS1 IMU (SparkFun Breakout):** A 9-axis IMU combining a 3-axis accelerometer, 3-axis gyroscope, and 3-axis magnetometer. It supports both I2C and SPI communication. For this tutorial, we'll focus on I2C.
  * **I2C (Inter-Integrated Circuit):** A two-wire serial communication protocol widely used for short-distance communication between integrated circuits. It uses a Serial Data Line (SDA) and a Serial Clock Line (SCL).

**Prerequisites:**

  * STM32F767 Nucleo-144 board
  * SparkFun LSM9DS1 Breakout (or similar LSM9DS1 module)
  * Jumper wires (male-to-female and male-to-male)
  * Breadboard (optional, but recommended for easy connections)
  * Computer with STM32CubeIDE installed
  * Basic understanding of C programming and microcontrollers

**1. Hardware Setup:**

The LSM9DS1 breakout board typically operates at 3.3V, which is compatible with the STM32F767 Nucleo board.

**LSM9DS1 Pinout (SparkFun Breakout - common connections):**

  * **VCC/VDD:** Power supply (3.3V)
  * **GND:** Ground
  * **SDA:** Serial Data Line (I2C)
  * **SCL:** Serial Clock Line (I2C)

**Connection Table:**

| LSM9DS1 Pin | STM32F767 Nucleo Pin | Description               |
| :---------- | :------------------- | :------------------------ |
| **VCC** | **3V3** (on Nucleo)  | Power supply for LSM9DS1  |
| **GND** | **GND** (on Nucleo)  | Ground                    |
| **SDA** | **PB7** (or PB9)     | I2C Data Line             |
| **SCL** | **PB6** (or PB8)     | I2C Clock Line            |

**Important Note on I2C Pins:** The STM32F767 Nucleo-144 board offers multiple I2C peripherals. We will use `I2C1`, which is commonly mapped to **PB6 (SCL)** and **PB7 (SDA)** on the Morpho connectors. PB8/PB9 can also be used for I2C1 if preferred. Refer to your Nucleo board's pinout diagram for other I2C options if needed.

**Connection Steps:**

1.  Connect **VCC** on the LSM9DS1 to the **3V3** pin on the Nucleo board.
2.  Connect **GND** on the LSM9DS1 to any **GND** pin on the Nucleo board.
3.  Connect **SDA** on the LSM9DS1 to **PB7** on the Nucleo board.
4.  Connect **SCL** on the LSM9DS1 to **PB6** on the Nucleo board.

**2. STM32CubeIDE Project Setup:**

  * **Create a New Project:**

      * Open STM32CubeIDE and go to `File > New > STM32 Project`.
      * Select `Board Selector` and search for `NUCLEO-F767ZI`. Select it and click `Next`.
      * Give your project a name (e.g., `LSM9DS1_I2C_Test`) and click `Finish`.

  * **Configure Clock System:**

      * In the `Pinout & Configuration` tab, navigate to `System Core > RCC`.
      * For `High Speed Clock (HSE)`, select `Crystal/Ceramic Resonator`.
      * For `Low Speed Clock (LSE)`, select `Crystal/Ceramic Resonator`.
      * Go to `Clock Configuration` tab. The tool will automatically suggest optimal clock settings. Click `Resolve Clock Issues` if prompted, and ensure the HCLK is set to 216 MHz.

  * **Configure I2C1:**

      * In the `Pinout & Configuration` tab, navigate to `Connectivity > I2C1`.
      * Set `Mode` to `I2C`.
      * In the `Parameter Settings` tab for `I2C1`:
          * `Speed Mode`: Select `Fast Mode` (400 kHz). This is generally suitable for the LSM9DS1.
          * `Duty Cycle`: `I2C_DUTYCYCLE_2` is common.
      * Observe that PB6 and PB7 are now automatically configured as I2C1\_SCL and I2C1\_SDA respectively.

  * **Configure USART (for Debugging - Optional but Recommended):**

      * To see the sensor readings, it's very helpful to use a UART connection for serial output.
      * Navigate to `Connectivity > USART3`.
      * Set `Mode` to `Asynchronous`.
      * In `Parameter Settings`, set `Baud Rate` to `115200` (or your preferred speed).
      * Observe that PD8 (TX) and PD9 (RX) are configured. Connect PD8 to the RX pin of your USB-to-TTL serial converter, and PD9 to the TX pin. Connect the converter's GND to Nucleo's GND.
      * In `Advanced Settings`, enable `Global Interrupt` for `USART3 global interrupt`.
      * **Enable printf redirection:** In `Project Manager` tab, under `Code Generator`, check `Enable Trace and Debug (SWV)`. This helps with `printf` output through SWO.
          * *Alternatively, for `printf` over UART, you'll need to enable `_write` in `syscalls.c`. Go to `Core/Src/syscalls.c` and uncomment the `_write` function, ensuring it uses `HAL_UART_Transmit`.* (This is often easier for quick setup).

  * **Generate Code:**

      * Save your `.ioc` file (`Ctrl+S`). STM32CubeIDE will prompt you to generate code. Click `Yes`.

**3. Application Code (`main.c` and LSM9DS1 Driver Basics):**

The LSM9DS1 communicates by reading and writing to specific registers. We'll define these registers and then create functions to read data.

**Key Registers for LSM9DS1 (simplified for this tutorial):**

  * `0x6A` (Accelerometer/Gyroscope): `SA0_XM` bit sets I2C address to `0x6B` or `0x6A`. SparkFun's breakout sets it to `0x6B`.
  * `0x1C` (Magnetometer): `SA0_M` bit sets I2C address to `0x1E` or `0x1C`. SparkFun's breakout sets it to `0x1C`.
  * `WHO_AM_I_XG` (Accel/Gyro ID): `0x0F` - Should return `0x68`
  * `WHO_AM_I_M` (Magnetometer ID): `0x0F` - Should return `0x3D`
  * `CTRL_REG6_XL` (Accelerometer control): `0x20` - Used to enable accelerometer and set data rate/scale.
  * `CTRL_REG5_XL` (Accelerometer control): `0x1F` - Used for accelerometer configuration.
  * `OUT_X_L_XL` (Accelerometer X-axis low byte): `0x28`
  * `OUT_X_H_XL` (Accelerometer X-axis high byte): `0x29`
    *(...and similarly for Y, Z axes of Accel, Gyro, and Mag)*

**Add the following code to `Core/Src/main.c`:**

```c
/* USER CODE BEGIN Includes */
#include <stdio.h> // For printf
/* USER CODE END Includes */

/* USER CODE BEGIN PV */
// Define I2C addresses for LSM9DS1 (assuming SparkFun's breakout configuration)
#define LSM9DS1_ACCEL_GYRO_ADDRESS  (0x6B << 1) // 0x6B shifted left by 1 for 8-bit address
#define LSM9DS1_MAG_ADDRESS         (0x1C << 1) // 0x1C shifted left by 1 for 8-bit address

// LSM9DS1 Register Addresses (simplified for this tutorial)
#define WHO_AM_I_XG                 0x0F
#define WHO_AM_I_M                  0x0F
#define CTRL_REG6_XL                0x20 // Accelerometer control register
#define CTRL_REG1_G                 0x10 // Gyroscope control register
#define CTRL_REG3_M                 0x22 // Magnetometer control register (for operating mode)
#define CTRL_REG2_M                 0x21 // Magnetometer control register (for data rate, scale)

#define OUT_X_L_XL                  0x28 // Accelerometer X-axis low byte
#define OUT_X_H_XL                  0x29 // Accelerometer X-axis high byte
#define OUT_Y_L_XL                  0x2A
#define OUT_Y_H_XL                  0x2B
#define OUT_Z_L_XL                  0x2C
#define OUT_Z_H_XL                  0x2D

#define OUT_X_L_G                   0x18 // Gyroscope X-axis low byte
#define OUT_X_H_G                   0x19 // Gyroscope X-axis high byte
#define OUT_Y_L_G                   0x1A
#define OUT_Y_H_G                   0x1B
#define OUT_Z_L_G                   0x1C
#define OUT_Z_H_G                   0x1D

#define OUT_X_L_M                   0x28 // Magnetometer X-axis low byte
#define OUT_X_H_M                   0x29 // Magnetometer X-axis high byte
#define OUT_Y_L_M                   0x2A
#define OUT_Y_H_M                   0x2B
#define OUT_Z_L_M                   0x2C
#define OUT_Z_H_M                   0x2D

// Raw sensor data variables
int16_t accel_x_raw, accel_y_raw, accel_z_raw;
int16_t gyro_x_raw, gyro_y_raw, gyro_z_raw;
int16_t mag_x_raw, mag_y_raw, mag_z_raw;

/* USER CODE END PV */

/* USER CODE BEGIN 0 */
// Redirect printf to UART (if not using SWV and printf redirection is enabled in syscalls.c)
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

// I2C Write function
HAL_StatusTypeDef LSM9DS1_I2C_Write(uint8_t device_addr, uint8_t reg_addr, uint8_t *data, uint16_t len)
{
  return HAL_I2C_Mem_Write(&hi2c1, device_addr, reg_addr, I2C_MEMADD_SIZE_8BIT, data, len, 100);
}

// I2C Read function
HAL_StatusTypeDef LSM9DS1_I2C_Read(uint8_t device_addr, uint8_t reg_addr, uint8_t *data, uint16_t len)
{
  return HAL_I2C_Mem_Read(&hi2c1, device_addr, reg_addr, I2C_MEMADD_SIZE_8BIT, data, len, 100);
}

// Initialize LSM9DS1 (minimal configuration for this tutorial)
void LSM9DS1_Init(void)
{
  uint8_t reg_data;
  HAL_StatusTypeDef status;

  // Check WHO_AM_I for Accel/Gyro
  status = LSM9DS1_I2C_Read(LSM9DS1_ACCEL_GYRO_ADDRESS, WHO_AM_I_XG, &reg_data, 1);
  if (status != HAL_OK || reg_data != 0x68)
  {
    printf("Accel/Gyro WHO_AM_I check failed! Status: %d, Data: 0x%X\r\n", status, reg_data);
  }
  else
  {
    printf("Accel/Gyro WHO_AM_I: 0x%X (OK)\r\n", reg_data);
  }

  // Check WHO_AM_I for Magnetometer
  status = LSM9DS1_I2C_Read(LSM9DS1_MAG_ADDRESS, WHO_AM_I_M, &reg_data, 1);
  if (status != HAL_OK || reg_data != 0x3D)
  {
    printf("Magnetometer WHO_AM_I check failed! Status: %d, Data: 0x%X\r\n", status, reg_data);
  }
  else
  {
    printf("Magnetometer WHO_AM_I: 0x%X (OK)\r\n", reg_data);
  }

  // Configure Accelerometer: Enable and set output data rate
  // CTRL_REG6_XL: ODR_XL = 100Hz (0b011), FS_XL = +/-2g (0b00) -> 0x30
  reg_data = 0x30;
  LSM9DS1_I2C_Write(LSM9DS1_ACCEL_GYRO_ADDRESS, CTRL_REG6_XL, &reg_data, 1);
  printf("Configured Accel ODR to 100Hz, FS to +/-2g\r\n");

  // Configure Gyroscope: Enable and set output data rate
  // CTRL_REG1_G: ODR_G = 100Hz (0b011), FS_G = +/-245dps (0b00) -> 0x30
  reg_data = 0x30;
  LSM9DS1_I2C_Write(LSM9DS1_ACCEL_GYRO_ADDRESS, CTRL_REG1_G, &reg_data, 1);
  printf("Configured Gyro ODR to 100Hz, FS to +/-245dps\r\n");

  // Configure Magnetometer: Operating mode, data rate, scale
  // CTRL_REG3_M: MD = Continuous-conversion mode (0b00) -> 0x00
  reg_data = 0x00;
  LSM9DS1_I2C_Write(LSM9DS1_MAG_ADDRESS, CTRL_REG3_M, &reg_data, 1);
  printf("Configured Mag to continuous conversion mode\r\n");

  // CTRL_REG2_M: FS = +/-4 gauss (0b00) -> 0x00 (default)
  // CTRL_REG5_M: ODR = 10Hz (0b010) -> 0x04
  reg_data = 0x04; // ODR_M = 10Hz (0b010)
  LSM9DS1_I2C_Write(LSM9DS1_MAG_ADDRESS, 0x24, &reg_data, 1); // CTRL_REG5_M is at 0x24
  printf("Configured Mag ODR to 10Hz\r\n");
}


// Read Accelerometer data
void LSM9DS1_ReadAccel(void)
{
  uint8_t buffer[6];
  LSM9DS1_I2C_Read(LSM9DS1_ACCEL_GYRO_ADDRESS, OUT_X_L_XL | 0x80, buffer, 6); // Set MSB for auto-increment

  accel_x_raw = (int16_t)(buffer[1] << 8 | buffer[0]);
  accel_y_raw = (int16_t)(buffer[3] << 8 | buffer[2]);
  accel_z_raw = (int16_t)(buffer[5] << 8 | buffer[4]);
}

// Read Gyroscope data
void LSM9DS1_ReadGyro(void)
{
  uint8_t buffer[6];
  LSM9DS1_I2C_Read(LSM9DS1_ACCEL_GYRO_ADDRESS, OUT_X_L_G | 0x80, buffer, 6); // Set MSB for auto-increment

  gyro_x_raw = (int16_t)(buffer[1] << 8 | buffer[0]);
  gyro_y_raw = (int16_t)(buffer[3] << 8 | buffer[2]);
  gyro_z_raw = (int16_t)(buffer[5] << 8 | buffer[4]);
}

// Read Magnetometer data
void LSM9DS1_ReadMag(void)
{
  uint8_t buffer[6];
  LSM9DS1_I2C_Read(LSM9DS1_MAG_ADDRESS, OUT_X_L_M | 0x80, buffer, 6); // Set MSB for auto-increment

  mag_x_raw = (int16_t)(buffer[1] << 8 | buffer[0]);
  mag_y_raw = (int16_t)(buffer[3] << 8 | buffer[2]);
  mag_z_raw = (int16_t)(buffer[5] << 8 | buffer[4]);
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
  MX_I2C1_Init();
  MX_USART3_UART_Init(); // Initialize UART for printf
  /* USER CODE BEGIN 2 */
  printf("Starting LSM9DS1 I2C Test...\r\n");
  LSM9DS1_Init(); // Initialize the LSM9DS1 sensor
  /* USER CODE END 2 */

  /* Infinite loop */
  /* USER CODE BEGIN WHILE */
  while (1)
  {
    /* USER CODE END WHILE */

    /* USER CODE BEGIN 3 */
    LSM9DS1_ReadAccel();
    LSM9DS1_ReadGyro();
    LSM9DS1_ReadMag();

    printf("Accel: X=%d Y=%d Z=%d | ", accel_x_raw, accel_y_raw, accel_z_raw);
    printf("Gyro: X=%d Y=%d Z=%d | ", gyro_x_raw, gyro_y_raw, gyro_z_raw);
    printf("Mag: X=%d Y=%d Z=%d\r\n", mag_x_raw, mag_y_raw, mag_z_raw);

    HAL_Delay(100); // Read every 100ms
  }
  /* USER CODE END 3 */
}
```

**Code Explanation:**

  * **`#define LSM9DS1_ACCEL_GYRO_ADDRESS` and `#define LSM9DS1_MAG_ADDRESS`:** These define the 7-bit I2C addresses shifted left by 1 to become 8-bit addresses required by HAL functions (which expect the R/W bit to be part of the address).
  * **`PUTCHAR_PROTOTYPE`:** This block (along with `__io_putchar`) redirects `printf` output to the `USART3` peripheral, allowing you to see debug messages on your serial terminal.
  * **`LSM9DS1_I2C_Write` and `LSM9DS1_I2C_Read`:** These are wrapper functions around `HAL_I2C_Mem_Write` and `HAL_I2C_Mem_Read`.
      * `HAL_I2C_Mem_Write(&hi2c1, device_addr, reg_addr, I2C_MEMADD_SIZE_8BIT, data, len, 100)`: Writes `len` bytes from `data` to `reg_addr` of `device_addr` using `hi2c1`.
      * `HAL_I2C_Mem_Read(&hi2c1, device_addr, reg_addr, I2C_MEMADD_SIZE_8BIT, data, len, 100)`: Reads `len` bytes into `data` from `reg_addr` of `device_addr`.
      * `I2C_MEMADD_SIZE_8BIT`: Indicates that the register address is 8-bit.
      * `100`: Timeout in milliseconds.
  * **`LSM9DS1_Init()`:**
      * Reads the `WHO_AM_I` registers for both the accelerometer/gyroscope and magnetometer to verify communication. These should return specific device IDs (0x68 and 0x3D respectively).
      * Configures the accelerometer and gyroscope with basic settings (output data rate and full-scale range) by writing to their control registers (`CTRL_REG6_XL`, `CTRL_REG1_G`).
      * Configures the magnetometer with basic settings (`CTRL_REG3_M`, `CTRL_REG5_M`).
  * **`LSM9DS1_ReadAccel()`, `LSM9DS1_ReadGyro()`, `LSM9DS1_ReadMag()`:**
      * These functions read 6 bytes of data (low and high bytes for X, Y, and Z axes) from the respective sensor's output registers.
      * `OUT_X_L_XL | 0x80`: This sets the MSB (Most Significant Bit) of the register address. For many I2C sensors like the LSM9DS1, setting the MSB enables auto-incrementing of the register address during sequential reads. This allows reading X, Y, and Z data in a single I2C transaction.
      * The raw 16-bit sensor values are reconstructed from the low and high bytes using bit shifting and ORing. `(int16_t)(buffer[1] << 8 | buffer[0])` combines the high byte (`buffer[1]`) shifted left by 8 bits with the low byte (`buffer[0]`).
  * **`main()` loop:**
      * Continuously calls the read functions.
      * Prints the raw sensor values to the serial terminal using `printf`.
      * `HAL_Delay(100)`: Introduces a delay to control the reading frequency.

**4. Build and Flash:**

  * Build your project (`Project > Build Project` or `Ctrl+B`).
  * Flash the code to your Nucleo board (`Run > Debug` then `Run` or `Run > Run` directly).

**5. Testing the Communication:**

  * Open a serial terminal program (e.g., PuTTY, Tera Term, RealTerm) on your computer.
  * Configure the terminal to connect to the COM port associated with your Nucleo board's ST-LINK Virtual COM Port (check Device Manager on Windows, or `ls /dev/ttyACM*` or `ls /dev/ttyUSB*` on Linux/macOS).
  * Set the baud rate to **115200**.
  * You should start seeing the "WHO\_AM\_I" messages, followed by a continuous stream of accelerometer, gyroscope, and magnetometer raw data. Try moving the sensor around to see the values change.

-----

### Exercise with Solution

**Exercise 1: Convert Raw Accelerometer Data to G's**

**Objective:** Modify the code to convert the raw 16-bit accelerometer data into acceleration values in g's (gravitational force).

**Background:** The LSM9DS1's full-scale range (FS\_XL) determines the sensitivity of the accelerometer. In our current configuration (`CTRL_REG6_XL = 0x30`), we set FS\_XL to `+/-2g`. This means a raw value of `32767` (maximum 16-bit signed integer) corresponds to 2g, and `-32768` corresponds to -2g.

**Formula:**
$$Acceleration (g) = \frac{Raw\ Value \times Full\ Scale\ Range (g)}{32768}$$
(Using 32768 for the denominator because `int16_t` ranges from -32768 to 32767, and the full range spans 65536 units, but the maximum positive value is 32767. It's often simpler to think of the range as $\\pm FS$ and divide by the max absolute raw value). A more precise approach:

$$Acceleration (g) = \frac{Raw\ Value}{Scale\ Factor}$$

For $\\pm 2g$, the scale factor (sensitivity) is 0.061 mg/LSB. So $0.061 \\times 10^{-3} \\frac{g}{LSB} \\times Raw\\ Value$.
However, it's easier to use the simpler fraction:

$$Acceleration (g) = Raw\ Value \times \frac{Full\ Scale\ (g)}{Max\ Raw\ Value}$$
Where `Max Raw Value` for $\\pm 2g$ is `32767`.
So, $Scale\\ Factor\\ (LSB/g) = \\frac{32767}{2g} = 16383.5 LSB/g$.

Let's use the $0.061 \\frac{mg}{LSB}$ factor as it's standard from the datasheet.

**Solution:**

**1. Add Definitions and Variables:**

```c
/* USER CODE BEGIN PV */
// ... (existing defines) ...

// Accelerometer scale factor for +/-2g (from LSM9DS1 datasheet, Table 3)
// Sensitivity = 0.061 mg/LSB = 0.000061 g/LSB
#define ACCEL_2G_SENSITIVITY_LSB_TO_G   0.000061f

// ... (existing raw sensor data variables) ...

// Converted sensor data variables
float accel_x_g, accel_y_g, accel_z_g;

/* USER CODE END PV */
```

**2. Modify `main.c` (inside the `while(1)` loop):**

```c
/* USER CODE BEGIN 3 */
    LSM9DS1_ReadAccel();
    LSM9DS1_ReadGyro();
    LSM9DS1_ReadMag();

    // Convert raw accelerometer data to g's
    accel_x_g = (float)accel_x_raw * ACCEL_2G_SENSITIVITY_LSB_TO_G;
    accel_y_g = (float)accel_y_raw * ACCEL_2G_SENSITIVITY_LSB_TO_G;
    accel_z_g = (float)accel_z_raw * ACCEL_2G_SENSITIVITY_LSB_TO_G;


    printf("Accel Raw: X=%d Y=%d Z=%d | ", accel_x_raw, accel_y_raw, accel_z_raw);
    printf("Accel G: X=%.3f Y=%.3f Z=%.3f | ", accel_x_g, accel_y_g, accel_z_g); // Print with 3 decimal places
    printf("Gyro: X=%d Y=%d Z=%d | ", gyro_x_raw, gyro_y_raw, gyro_z_raw);
    printf("Mag: X=%d Y=%d Z=%d\r\n", mag_x_raw, mag_y_raw, mag_z_raw);

    HAL_Delay(100); // Read every 100ms
```

**Explanation:**

  * We define `ACCEL_2G_SENSITIVITY_LSB_TO_G` as the conversion factor.
  * Inside the loop, after reading the raw data, we cast the `int16_t` raw value to `float` before multiplying by the sensitivity factor to perform floating-point arithmetic.
  * We use `%.3f` in `printf` to display the floating-point values with three decimal places.

**Test:** Flash the updated code. When the board is flat on a surface, the Z-axis accelerometer reading should be approximately `1.000 g` (due to gravity), and X and Y should be close to `0.000 g`. Rotating the board will change the readings accordingly.

-----

### Exercise for Students to Solve

**Exercise 2: Implement Gyroscope and Magnetometer Conversion**

**Objective:** Extend the previous solution to convert the raw gyroscope data into degrees per second (dps) and the raw magnetometer data into Gauss (Gs).

**Hints:**

1.  **Gyroscope:**

      * Refer to the LSM9DS1 datasheet (Table 3: Accelerometer and Gyroscope characteristics).
      * Locate the "Sensitivity" for the gyroscope. Our current configuration (`CTRL_REG1_G = 0x30`) sets the full-scale to $\\pm 245$ dps.
      * The sensitivity for $\\pm 245$ dps is `8.75 mdps/LSB` (millidegrees per second per LSB).
      * You'll need a similar conversion factor (`GYRO_245DPS_SENSITIVITY_LSB_TO_DPS`) as for the accelerometer.
      * Define `gyro_x_dps`, `gyro_y_dps`, `gyro_z_dps` as `float` variables.

2.  **Magnetometer:**

      * Refer to the LSM9DS1 datasheet (Table 4: Magnetometer characteristics).
      * Our current configuration (`CTRL_REG2_M` for FS) sets the full-scale to $\\pm 4$ Gauss (this is the default after reset, so we don't explicitly set it in the provided code, but it's good practice to understand it).
      * The sensitivity for $\\pm 4$ Gauss is `0.14 mGauss/LSB` (milligauss per LSB).
      * Define `mag_x_gs`, `mag_y_gs`, `mag_z_gs` as `float` variables.

3.  **Implementation:**

      * Add the necessary `#define` for the sensitivity factors.
      * Add `float` variables for the converted data.
      * Perform the conversion calculations in the `while(1)` loop, similar to the accelerometer conversion.
      * Update the `printf` statement to display the converted gyroscope and magnetometer values with appropriate formatting (e.g., `%.3f`).

By completing this exercise, you'll have a more comprehensive understanding of how to interpret data from the LSM9DS1 and apply scaling factors based on the sensor's configuration.