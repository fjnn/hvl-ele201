Okay, let's dive into another fundamental concept in embedded systems: **Interrupts**.

An interrupt is a signal to the processor emitted by hardware or software indicating an event that needs immediate attention. When an interrupt occurs, the processor temporarily suspends its current task, handles the interrupt, and then resumes its previous task. This allows microcontrollers to be much more efficient by not constantly polling for events, but rather reacting to them as they happen.

This tutorial will show you how to configure an external interrupt (triggered by a button press) and use it to toggle an on-board LED on the STM32F767 Nucleo board.

**Tutorial: External Interrupts - Button Press to LED Toggle**

**Objective:** Configure a GPIO pin as an external interrupt input. When the on-board User button (Blue Button) is pressed, it will trigger an interrupt, and the microcontroller will respond by toggling an on-board LED.

**Components:**

  * STM32F767 Nucleo-144 board
  * USB cable (for power and programming)

**No external wiring is required for this tutorial, as we'll use the on-board User button and LED\!**

  * **User Button:** Connected to pin **PC13**. This button is active low (connects to GND when pressed, otherwise pulled high).
  * **LED1 (Green LED):** Connected to pin **PB0**.

**1. Hardware Setup:**

  * Simply connect your STM32F767 Nucleo-144 board to your computer via the USB cable.

**2. STM32CubeIDE Project Setup:**

1.  **Create a New Project:**
      * Open STM32CubeIDE and go to `File > New > STM32 Project`.
      * Select `Board Selector` and search for `NUCLEO-F767ZI`. Select it and click `Next`.
      * Give your project a name (e.g., `Button_LED_Interrupt`) and click `Finish`.
2.  **Configure Clock System:**
      * In the `Pinout & Configuration` tab, navigate to `System Core > RCC`.
      * For `High Speed Clock (HSE)`, select `Crystal/Ceramic Resonator`.
      * For `Low Speed Clock (LSE)`, select `Crystal/Ceramic Resonator`.
      * Go to `Clock Configuration` tab. The tool will automatically suggest optimal clock settings. Click `Resolve Clock Issues` if prompted, and ensure the HCLK is set to 216 MHz.
3.  **Configure GPIO Output (for LED):**
      * In the `Pinout & Configuration` tab, navigate to `System Core > GPIO`.
      * Find pin **PB0** (LED1) and click on it. Select `GPIO_Output`.
      * In the `GPIO Settings` tab for `PB0`:
          * `GPIO output level`: `Low` (LED is initially off).
          * `GPIO mode`: `Output Push Pull`.
          * `GPIO Pull-up/Pull-down`: `No pull-up and no pull-down`.
          * `Maximum output speed`: `Low`.
4.  **Configure GPIO External Interrupt (for Button):**
      * In the `Pinout & Configuration` tab, navigate to `System Core > GPIO`.
      * Find pin **PC13** (User Button) and click on it. Select `GPIO_EXTI13`.
      * In the `GPIO Settings` tab for `PC13`:
          * `GPIO mode`: `External Interrupt Mode with Falling edge trigger detection`. (The button pulls the pin low when pressed).
          * `GPIO Pull-up/Pull-down`: `Pull-up` (This ensures the pin is held high when the button is not pressed).
5.  **Configure NVIC (Nested Vectored Interrupt Controller):**
      * In the `Pinout & Configuration` tab, navigate to `System Core > NVIC`.
      * Find `EXTI line[15:10] interrupts` and check its `Enabled` checkbox. This enables the interrupt line corresponding to PC13.
6.  **Configure USART (for Debugging - Optional):**
      * Navigate to `Connectivity > USART3`.
      * Set `Mode` to `Asynchronous`.
      * In `Parameter Settings`, set `Baud Rate` to `115200`.
      * In `Advanced Settings`, enable `Global Interrupt` for `USART3 global interrupt`.
      * **Enable printf redirection:** In `Project Manager` tab, under `Code Generator`, check `Enable Trace and Debug (SWV)`. (Alternatively, if you prefer `printf` over UART, you'll need to enable `_write` in `Core/Src/syscalls.c` and ensure it uses `HAL_UART_Transmit`).
7.  **Generate Code:** Save your `.ioc` file (`Ctrl+S`). STM32CubeIDE will prompt you to generate code. Click `Yes`.

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

// External Interrupt Callback Function
// This function is automatically called by the HAL library when an EXTI interrupt occurs.
void HAL_GPIO_EXTI_Callback(uint16_t GPIO_Pin)
{
  // Check if the interrupt was from the User Button (PC13)
  if (GPIO_Pin == GPIO_PIN_13) // GPIO_PIN_13 is the define for the User Button on PC13
  {
    printf("User Button Pressed! Toggling LED...\r\n");

    // Toggle the state of LED1 (PB0)
    HAL_GPIO_TogglePin(GPIOB, GPIO_PIN_0); // GPIOB is the port for PB0

    // IMPORTANT NOTE ON DEBOUNCING:
    // Mechanical buttons bounce (create multiple short pulses) when pressed/released.
    // In a real application, you'd typically implement software debouncing
    // (e.g., using a timer or checking the state after a short delay)
    // to prevent multiple triggers from a single press.
    // For this simple tutorial, we are directly toggling, which might show
    // multiple toggles if the button bounces significantly.
  }
}
/* USER CODE END 0 */
```

**Inside `main()` function:**

```c
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
  MX_USART3_UART_Init(); // Initialize UART for printf
  /* USER CODE BEGIN 2 */
  printf("System Ready. Press the User Button (Blue Button) to toggle the LED.\r\n");
  /* USER CODE END 2 */

  /* Infinite loop */
  /* USER CODE BEGIN WHILE */
  while (1)
  {
    /* USER CODE END WHILE */

    /* USER CODE BEGIN 3 */
    // The main loop can be empty or perform other tasks.
    // The LED toggling logic is handled entirely by the interrupt.
    HAL_Delay(100); // Small delay to prevent constant printing in a real application,
                    // but not strictly necessary for interrupt demo if no other code is here.
    // printf("Waiting for interrupt...\r\n"); // Uncomment if you want to see main loop running
  }
  /* USER CODE END 3 */
}
```

**Code Explanation:**

  * **`HAL_GPIO_EXTI_Callback(uint16_t GPIO_Pin)`**: This is a **weakly defined function** in the HAL library. When you enable an EXTI interrupt in CubeIDE, the HAL library provides a default empty version of this function. By implementing your own version with the exact same signature, you override the weak definition, and your function will be called automatically by the HAL interrupt handler when any EXTI interrupt occurs.
  * **`if (GPIO_Pin == GPIO_PIN_13)`**: Inside the callback, we check which specific GPIO pin triggered the interrupt. This is important if you have multiple EXTI interrupts enabled. `GPIO_PIN_13` is a HAL-defined constant for the pin number.
  * **`HAL_GPIO_TogglePin(GPIOB, GPIO_PIN_0);`**: This function is called within the interrupt service routine (ISR) to toggle the state of the LED. `GPIOB` is the port handle, and `GPIO_PIN_0` is the pin number for LED1.
  * **`printf("User Button Pressed! Toggling LED...\r\n");`**: Demonstrates that code inside the interrupt callback is executed.
  * **`while(1)` loop**: In this example, the main loop can be completely empty (or have a simple `HAL_Delay` to reduce CPU usage if nothing else is running). The core logic (LED toggling) is executed *only* when the interrupt occurs, showcasing the event-driven nature of interrupts.

**4. Build and Flash:**

1.  Build your project (`Project > Build Project` or `Ctrl+B`).
2.  Flash the code to your Nucleo board (`Run > Debug` then `Run` or `Run > Run` directly).

**5. Testing the Interrupt:**

1.  Open a serial terminal program (e.g., PuTTY, Tera Term) and connect to the COM port associated with your Nucleo board (baud rate 115200).
2.  You should see the "System Ready..." message.
3.  **Press the Blue User Button (PC13)** on your Nucleo board.
4.  Each time you press the button, you should see the Green LED1 (PB0) toggle its state (on/off), and a "User Button Pressed\! Toggling LED..." message will appear in your serial terminal.

This tutorial provides a basic understanding of how to use external interrupts. For more robust applications, especially with mechanical buttons, remember to consider debouncing techniques to prevent multiple, rapid triggers from a single button press.