---
layout: single
title: "Lecture 3 - Timers and Interrupt"
permalink: /lectures/l3-timers-interrupt
toc: true
breadcrumbs: true
sidebar:
  - title: "Lectures"
    image: /assets/images/logo.png
    image_alt: "image"
    nav: lectures
taxonomy: markup
---

{: .notice--info}
Peikarar forts. Timing og avbrudd.

# Register reading
pass

# Bit masking
pass



# Clock
Undeniably *the most important thing* in a digital system. Therefore, it is fundamental to understand the concept of clock, to understand how an embedded system works. A clock is the heartbeat of your controller. Imagine your microcontroller as a tiny orchestra. For every instrument (or peripheral) to play in perfect harmony, they need a conductor keeping the beat. That conductor is the clock.

The clock is essentially an oscillating signal that synchronizes all operations within the microcontroller. Every instruction, every data transfer, every peripheral action happens in sync with this clock signal. The faster the clock, generally, the faster your microcontroller can execute instructions.

{: .notice--info} Nice to watch: [Why clock is everything?](https://www.youtube.com/watch?v=PVNAPWUxZ0g&ab_channel=CoreDumped)

On the STM32F767, we have a sophisticated clock system. It's not just one clock; there's a whole hierarchy:

- HSE (High-Speed External): This is typically an external crystal oscillator. It's very accurate and stable, making it a good choice for the main system clock.
- HSI (High-Speed Internal): An internal RC oscillator. It's less accurate than an external crystal but is ready to use immediately upon power-up, making it useful for initial startup or applications where high precision isn't critical.
- LSE (Low-Speed External): Another external crystal, usually for real-time clock (RTC) applications due to its low frequency and power consumption.
- LSI (Low-Speed Internal): An internal RC oscillator, primarily used for the independent watchdog and the RTC in low-power modes.
- PLL (Phase-Locked Loop): This is a frequency multiplier. We often use the PLL to take a relatively low-frequency source (like HSE or HSI) and multiply it up to a much higher frequency to drive the main system clock (SYSCLK) and various peripherals.

In STM32 microcontrollers, SYSCLK (System Clock) is the main clock source for the entire system, while HCLK (AHB Clock) is a derived clock used by the CPU and AHB bus. SYSCLK can be generated from various sources like HSI, HSE, or PLL, and then HCLK is derived from SYSCLK by a configurable prescaler. This means that HCLK runs at a lower frequency than SYSCLK, and it is used to clock the core and other AHB peripherals. 

**SYSCLK (System Clock):**
It is the main clock for the STM32 microcontroller. It's source can be selected from:
  - Internal high-speed oscillator (**HSI**)
  - External high-speed oscillator (**HSE**)
  - **PLL** (Phase-Locked Loop)

Usually the highest frequency at which the microcontroller operates.

**HCLK (AHB Clock):**
It is a clock derived from SYSCLK. Clocks the CPU core, the AHB bus, and some AHB peripherals. Its frequency is typically lower than SYSCLK, as it is divided down using a **prescaler**. This helps:
  - Optimize power consumption
  - Allow different peripherals to run at different speeds
If **SYSCLK** = 100 MHz and the prescaler is set to divide by 2, then **HCLK** = 50 MHz.

- **APB1 (Advanced Peripheral Bus 1):** This bus typically runs at a lower frequency than HCLK, set by a prescaler. It connects to peripherals like timers (TIM2–TIM7, TIM12–TIM14), USART2/3, I2C1/2/3, SPI2/3, and others. The lower frequency helps reduce power consumption for slower peripherals.
- **APB2 (Advanced Peripheral Bus 2):** This bus can run at the same frequency as HCLK or at a divided rate, depending on the prescaler setting. It connects to higher-speed peripherals such as TIM1, TIM8, USART1/6, SPI1, and the ADCs.

The prescaler values for APB1 and APB2 are set in the RCC (Reset and Clock Control) registers. For example, if HCLK is 100 MHz and the APB1 prescaler is set to 4, then the APB1 clock will be 25 MHz. This means that all peripherals on APB1 will operate at 25 MHz.

# Timer

While the clock provides the constant beat, timers are like sophisticated stopwatches or alarm clocks within your microcontroller. They are specialized peripherals designed to:
- Measure time intervals (e.g., how long did that button press last?)
- Generate delays (e.g., wait for 500 milliseconds before turning on an LED)
- Trigger events at regular intervals (e.g., blink an LED every second)
- Generate PWM (Pulse Width Modulation) signals (e.g., control the brightness of an LED or the speed of a motor)
- Count external events (e.g., how many times was that sensor tripped?)

The STM32F767 is equipped with a rich set of timers:
- General-purpose timers (TIMx): very versatile, used for most timing applications
- Advanced-control timers (TIMx): offer more advanced features, particularly useful for motor control and power conversion
- Basic timers (TIMx): simpler timers, often used for basic time-base generation
- SysTick timer: a 24-bit down-counter built into the ARM Cortex-M core, often used for operating system ticks or simple delays

**Why does this matter?**
- Some peripherals (especially timers) have their own internal logic to compensate for the prescaler. For example, if a timer is on APB1 and the prescaler is not 1, the timer's input clock is automatically doubled to maintain correct timing. This is important when configuring timer frequencies and baud rates for communication peripherals.
- When you configure peripherals in STM32CubeMX or in your code, you must be aware of which bus they are attached to and what their actual clock frequency is. This ensures that your timing calculations (for delays, baud rates, PWM, etc.) are accurate.

**Summary Table:**

| Bus   | Typical Peripherals           | Derived From | Prescaler | Example Frequency |
|-------|------------------------------|--------------|-----------|------------------|
| AHB   | CPU, DMA, RAM, Flash         | SYSCLK       | Yes       | 216 MHz          |
| APB1  | TIM2–TIM7, USART2/3, I2C1/2  | HCLK         | Yes       | 54 MHz           |
| APB2  | TIM1/8, USART1/6, ADCs       | HCLK         | Yes       | 108 MHz          |

Always check the reference manual and your clock configuration to know exactly how fast each peripheral is running!





# Which timer to use?
Let's look at the block diagram of our microcontroller in the [datasheet](https://www.st.com/resource/en/datasheet/stm32f765zi.pdf). In Figure 2 on page 20, you can see how the pins are connected:

![STM32F7XX pinout diagram]({{ site.baseurl }}/assets/images/pinout.png)

Section 3.23 explains which timers are available in our microcontroller. Let's have a look at Table 6.

![Timer table]({{site.baseurl}}/assets/images/timer-table.png)

**Overall Structure:**
There are three main timer types:
- Advanced-control: These are the most feature-rich timers, typically used for complex applications like motor control, power conversion, and high-resolution PWM.
- General purpose: These are versatile timers suitable for a wide range of applications, including general-purpose timing, PWM generation, input capture, output compare, and more.
- Basic: These are simpler timers, primarily used for basic timing and delay generation.

# LED blink with correct clock settings
In the previous exercises, we haven't done anything with the clock settings. Our code worked just fine but it is time to stop "default settings". As you remember the blink rate is a bit slower than 500ms, right? It is because we haven't configured the clock settings properly and we have lots of pins configured by default even if we don't use. We will fix the blink rate issue NOW!.

1. Open a new STM32CubeMX project.
2. Select STM32F767 board, start project, but DO NOT SELECT default mode.
3. You should see some pins are orange. We want these to be gone, as well:` Pinout (at the top) > Clear pinouts`
4. Set PB0 as GPIO_Output.
5. On the left ``System Core > RCC > HSE: Crystal/Ceramic Resonator``
  (RCC: Reset and Clock Control)
6. Master Clock Output: Checked.
7. On the left ``System Core > GPIO > Configuration > PB0 >`` Change user label to `LD1`
8. Go to Clock Configuration. Set these values:
 ![Timer Clock]({{ site.baseurl }}/assets/images/timer_clock.png)
10. Go to Project Manager
  a. Give descriptive name to your project
  b. Application structure: Basic
  c. Toolchain/IDE: STM32CubeIDE (Uncheck "Generate under root" box)
11. Generate project.
12. Copy platformio.ini file from your prior projects.
13. Open the project in PlatformIO.
14. Add this code after `/*USER CODE BEGIN 3*/` in **main.c**:
  ```c
    HAL_GPIO_TogglePin(LD1_GPIO_Port, LD1_Pin);
    HAL_Delay(500);
  ```
15. Build and Upload

{: .notice--info}
**Notice:** IDK why the default clock configuration doesn't work properly. Let me know if you find out the error.

# LED blink with timers
So far we *manually* changed the value of out GPIO pin to blink the LED. Although `HAL_GPIO_WritePin()` function has a very low CPU cycle, it is still a task for our microprocessor. We can blink our LED only using timers.

For this example, we will use TIM3, which is a general-purpose timer. It can count upto 16-bits, both upwards and downwards. It does not intervene with any other features that we need in this project.

{: .notice--info}
DO NOT MESS WITH SYSTICK TIMER! It sources the main delay. In some cases one might want to use it, especially real-time operations, but then, don't forget to assign your timebase source, as well.
![TIM3 block diagram]({{ site.baseurl }}/assets/images/systick-change.png)


{: .notice--info}
Any timers current value can be found in TIMx_CNT register.