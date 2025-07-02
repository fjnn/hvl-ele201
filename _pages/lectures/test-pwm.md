Here's a short tutorial on using **Timers and Pulse Width Modulation (PWM)** on the STM32F767 Nucleo board. PWM is a powerful technique for controlling the average power delivered to a load by varying the duty cycle of a square wave, commonly used for dimming LEDs, controlling motor speed, generating audio, and more.

**Tutorial: LED Brightness Control with PWM**

**Objective:** Control the brightness of an LED connected to a GPIO pin using a Timer in PWM mode.

**Components:**

  * STM32F767 Nucleo-144 board
  * LED (any color)
  * Current-limiting resistor (e.g., 220 Ohm to 1k Ohm)
  * Jumper wires

**1. Hardware Setup:**

We'll use Timer 2, Channel 1, which is typically mapped to pin **PA0** on the Nucleo-144 board.

  * Connect the **long leg (anode)** of the LED to one end of the current-limiting resistor.
  * Connect the other end of the resistor to pin **PA0** on the STM32F767 Nucleo board.
  * Connect the **short leg (cathode)** of the LED to a **GND** pin on the Nucleo board.

**(Resistor value: For a typical 3.3V power supply and a red LED with \~2V forward voltage and 20mA current, a 68-75 Ohm resistor would be ideal. However, 220 Ohm to 1k Ohm is a safer starting point to prevent damaging the LED or microcontroller pin and will still allow visible brightness.)**

**2. STM32CubeIDE Project Setup:**

1.  **Create a New Project:**
      * Open STM32CubeIDE and go to `File > New > STM32 Project`.
      * Select `Board Selector` and search for `NUCLEO-F767ZI`. Select it and click `Next`.
      * Give your project a name (e.g., `PWM_LED_Control`) and click `Finish`.
2.  **Configure Clock System:**
      * In the `Pinout & Configuration` tab, navigate to `System Core > RCC`.
      * For `High Speed Clock (HSE)`, select `Crystal/Ceramic Resonator`.
      * For `Low Speed Clock (LSE)`, select `Crystal/Ceramic Resonator`.
      * Go to `Clock Configuration` tab. The tool will automatically suggest optimal clock settings. Click `Resolve Clock Issues` if prompted, and ensure the HCLK is set to 216 MHz.
3.  **Configure Timer 2 for PWM:**
      * In the `Pinout & Configuration` tab, navigate to `Timers > TIM2`.
      * Set `Clock Source` to `Internal Clock`.
      * Under `Channel1`, set `Mode` to `PWM Generation Channel 1`.
      * Observe that pin PA0 is now configured as `TIM2_CH1`.
      * In the `Parameter Settings` tab for `TIM2`:
          * **Prescaler:** Set to `107`. (This will divide the APB1 Timer clock (108MHz) by 108, resulting in a 1MHz counter clock, meaning 1 tick per microsecond).
          * **Counter Period (ARR):** Set to `999`. (The counter will count from 0 to 999, so 1000 ticks. With a 1MHz counter clock, this gives a PWM frequency of 1MHz / 1000 = **1 kHz**).
          * **Pulse (CCR1):** Set an initial value, e.g., `500`. (This means the output will be high for 500 out of 1000 ticks, giving a 50% duty cycle).
4.  **Configure USART (for Debugging - Optional):**
      * Navigate to `Connectivity > USART3`.
      * Set `Mode` to `Asynchronous`.
      * In `Parameter Settings`, set `Baud Rate` to `115200`.
      * In `Advanced Settings`, enable `Global Interrupt` for `USART3 global interrupt`.
      * **Enable printf redirection:** In `Project Manager` tab, under `Code Generator`, check `Enable Trace and Debug (SWV)`. (Alternatively, if you prefer `printf` over UART, you'll need to enable `_write` in `Core/Src/syscalls.c` and ensure it uses `HAL_UART_Transmit`).
5.  **Generate Code:** Save your `.ioc` file (`Ctrl+S`). STM32CubeIDE will prompt you to generate code. Click `Yes`.

**3. Application Code (`main.c`):**

Open `Core/Src/main.c`. Add the following code snippets.

**For `printf` redirection (if using UART method, not SWV):**

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

**Inside `main()` function:**

```c
int main(void)
{
  /* USER CODE BEGIN 1 */
  uint16_t pwm_duty_cycle = 0; // Variable to control LED brightness
  int8_t duty_cycle_direction = 1; // 1 for increasing, -1 for decreasing
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
  MX_TIM2_Init();
  MX_USART3_UART_Init(); // Initialize UART for printf
  /* USER CODE BEGIN 2 */
  printf("Starting PWM LED Control...\r\n");

  // Start the PWM signal on TIM2 Channel 1
  HAL_TIM_PWM_Start(&htim2, TIM_CHANNEL_1);
  /* USER CODE END 2 */

  /* Infinite loop */
  /* USER CODE BEGIN WHILE */
  while (1)
  {
    /* USER CODE END WHILE */

    /* USER CODE BEGIN 3 */
    // Change the duty cycle to fade the LED
    __HAL_TIM_SET_COMPARE(&htim2, TIM_CHANNEL_1, pwm_duty_cycle);

    // Update duty cycle
    pwm_duty_cycle += duty_cycle_direction * 10; // Change by 10 units each step

    // Reverse direction if limits are reached
    if (pwm_duty_cycle >= 999) // Max duty cycle (Counter Period value)
    {
      duty_cycle_direction = -1;
      pwm_duty_cycle = 999; // Ensure it doesn't go over
      printf("Fading down...\r\n");
    }
    else if (pwm_duty_cycle <= 0) // Min duty cycle
    {
      duty_cycle_direction = 1;
      pwm_duty_cycle = 0; // Ensure it doesn't go under
      printf("Fading up...\r\n");
    }

    HAL_Delay(50); // Delay for a smooth fade effect
  }
  /* USER CODE END 3 */
}
```

**Code Explanation:**

  * **`uint16_t pwm_duty_cycle`**: This variable will hold the current pulse value for the PWM signal. It ranges from 0 (0% duty cycle, LED off) to 999 (100% duty cycle, LED full brightness).
  * **`HAL_TIM_PWM_Start(&htim2, TIM_CHANNEL_1);`**: This function call (placed in `USER CODE BEGIN 2`) starts the PWM generation on the specified timer and channel. `htim2` is the handle for Timer 2, automatically generated by CubeIDE.
  * **`__HAL_TIM_SET_COMPARE(&htim2, TIM_CHANNEL_1, pwm_duty_cycle);`**: This macro is the core of controlling the PWM. It sets the `Pulse` value (also known as the Compare Register value, `CCR`) for `TIM2_CH1` to `pwm_duty_cycle`. This directly changes the duty cycle of the generated PWM signal.
  * **`pwm_duty_cycle += duty_cycle_direction * 10;`**: This line increments or decrements the `pwm_duty_cycle` by 10 in each loop iteration, creating a fading effect.
  * **`if (pwm_duty_cycle >= 999) ... else if (pwm_duty_cycle <= 0) ...`**: These `if` statements check if the duty cycle has reached its maximum or minimum limits and reverse the `duty_cycle_direction` accordingly, causing the LED to fade up and down continuously.
  * **`HAL_Delay(50);`**: A 50ms delay between updates makes the fading effect visible to the human eye.

**4. Build and Flash:**

1.  Build your project (`Project > Build Project` or `Ctrl+B`).
2.  Flash the code to your Nucleo board (`Run > Debug` then `Run` or `Run > Run` directly).

**5. Testing the PWM Control:**

After flashing, you should observe the LED connected to PA0 continuously fading up and down in brightness. If you enabled `printf` over UART, you'll also see "Fading up..." and "Fading down..." messages in your serial terminal as the fade direction changes.

This simple example demonstrates the power of hardware timers for precise control in embedded systems. You can extend this concept to control multiple LEDs, motors, or other devices requiring variable power.