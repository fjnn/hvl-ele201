---
layout: single
title: "Lecture 3 - Timers and Interrupt 1"
permalink: /lectures/l3-timers-interrupt1
toc: true
breadcrumbs: true
sidebar:
  - title: "Lectures"
    image: /assets/images/logo.png
    image_alt: "image"
    nav: lectures
taxonomy: markup
---

<!-- {: .notice--info}
Peikarar forts. Timing og avbrudd. -->

# Some important C concepts

In this course, we are using the **HAL (Hardware Abstraction Layer) libraries** provided by STMicroelectronics for STM32 microcontrollers. They are high-level, user-friendly interface to the hardware features of the microcontroller. Instead of writing low-level code to directly manipulate hardware registers (which can be error-prone and difficult to maintain), the HAL provides functions that abstract away the hardware details. This makes your code more portable, easier to read, and less dependent on the specific microcontroller model. They are often sufficient for many of the projets but sometimes, we might need small modifications on our registers. 

If you look at `stm32f7xx_hal_gpio.h` or other HAL library headers, you will see that all HAL functions are intrinsically do some register manipulations. 
![HAL_GPIO_TogglePin]({{site.baseurl}}/assets/images/HAL_GPIO_TogglePin.png)

{: .notice--info}
Even though HAL is written in C, you can use it in C++ projects as well. C++ is fully compatible with C, but you need to tell the C++ compiler that the HAL functions have C linkage. This is done using the `extern "C"` keyword in your code. For example, in your C++ source file:


# Clock
Undeniably *the most important thing* in a digital system. Therefore, it is fundamental to understand the concept of clock, to understand how an embedded system works. A clock is the heartbeat of your controller. Imagine your microcontroller as a tiny orchestra. For every instrument (or peripheral) to play in perfect harmony, they need a conductor keeping the beat. That conductor is the clock.

The clock is essentially an oscillating signal that synchronizes all operations within the microcontroller. Every instruction, every data transfer, every peripheral action happens in sync with this clock signal. The faster the clock, generally, the faster your microcontroller can execute instructions.

{: .notice--info}
Nice to watch: [Why clock is everything?](https://www.youtube.com/watch?v=PVNAPWUxZ0g&ab_channel=CoreDumped)

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




## Which timer to use?
Let's look at the block diagram of our microcontroller in the [datasheet](https://www.st.com/resource/en/datasheet/stm32f765zi.pdf). In Figure 2 on page 20, you can see how the pins are connected:

![STM32F7XX pinout diagram]({{ site.baseurl }}/assets/images/pinout.png)

Section 3.23 explains which timers are available in our microcontroller. Let's have a look at Table 6.

![Timer table]({{site.baseurl}}/assets/images/timer-table.png)

**Overall Structure:**
There are three main timer types:
- Advanced-control: These are the most feature-rich timers, typically used for complex applications like motor control, power conversion, and high-resolution PWM.
- General purpose: These are versatile timers suitable for a wide range of applications, including general-purpose timing, PWM generation, input capture, output compare, and more.
- Basic: These are simpler timers, primarily used for basic timing and delay generation.

## SysTick timer
The SysTick timer on the STM32F767 microcontroller is a 24-bit down-counting timer embedded within the Cortex-M7 core itself, making it a highly integrated and essential component for real-time operating systems (RTOS) and general-purpose timing. It offers a simple yet effective mechanism for generating periodic interrupts, typically configured to fire at a regular interval (e.g., every millisecond) to drive the OS tick. Its preloader value is derived directly from the system clock (HCLK), ensuring precise and synchronized timing. 

{: .notice--warning}
DO NOT MESS WITH SYSTICK TIMER! It sources the main delay. In some cases one might want to use it, especially real-time operations, but then, don't forget to assign your timebase source, as well.
<img src="{{ site.baseurl }}/assets/images/systick-change.png" alt="TIM3 block diagram" width="600"/>
<!-- https://www.youtube.com/watch?v=VfbW6nfG4kw&ab_channel=DigiKey -->

## Watchdog timer
A watchdog timer (WDT) is a crucial hardware or software component designed to enhance the reliability and robustness of embedded systems. It acts like a "watchdog" (hence the name) that constantly monitors the microcontroller's (or your PC's in this matther) operation to detect and recover from malfunctions, such as software crashes, infinite loops, or system hangs.

Imagine you have a computer or a device that needs to run continuously, like a medical device, a factory robot, or even your car's engine control unit. What if the software inside it gets "stuck" or freezes, maybe due to a tiny glitch or a bug? If it just stops, it could cause big problems or even be dangerous. That's where a watchdog timer comes in! Think of it like a loyal guard dog for your computer. This "dog" is always watching to make sure the computer is doing its job.

The STM32F767 microcontroller incorporates two types of watchdog timers to enhance system reliability and prevent software malfunctions: the Independent Watchdog (IWDG) and the Window Watchdog (WWDG). Both are designed to reset the microcontroller if the application code enters an undesirable state, such as an infinite loop or a deadlock. The IWDG operates from its own independent low-speed internal RC oscillator (LSI), making it robust against failures of the main system clock. It's a simple down-counter that triggers a reset if not "fed" (reloaded) within a defined timeout period. In contrast, the WWDG offers more sophisticated control, requiring the application to refresh it only within a specific "window" of time. If the WWDG is refreshed too early or too late, it will trigger a system reset, allowing detection of both abnormally slow and abnormally fast execution, which can be crucial for safety-critical applications. If you are curious about the details, [controllerstech.com](https://controllerstech.com/iwdg-and-wwdg-in-stm32/) has a nice tutorial. However, the details of the SysTick and Watchdog timer are outside the scope of this course.


# Exercise: LED blink with correct clock settings
<!-- blink_rate_test.ioc -->
In the previous exercises, we haven't done anything with the clock settings. Our code worked just fine but it is time to stop "default settings". As you remember the blink rate is a bit slower than 500ms, right? It is because we haven't configured the clock settings properly and we have lots of pins configured by default even if we don't use. We will fix the blink rate issue NOW!.

1. Open a new STM32CubeMX project.
2. Select STM32F767 board, start project, but DO NOT SELECT default mode.
3. You should see some pins are orange. We want these to be gone, as well:` Pinout (at the top) > Clear pinouts`
4. Set PB0 as GPIO_Output.
5. On the left ``System Core > RCC > HSE: Crystal/Ceramic Resonator``
  (RCC: Reset and Clock Control)
6. Master Clock Output: Checked. *(only for a possible debugging)*
7. On the left ``System Core > GPIO > Configuration > PB0 >`` Change user label to `LD1`
8. Go to Clock Configuration. Set these values:
 ![Timer Prescalars]({{site.baseurl}}/assets/images/timer_led_blink_clock108.png)
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

<!-- So far we *manually* changed the value of out GPIO pin to blink the LED. Although `HAL_GPIO_WritePin()` function has a very low CPU cycle, it is still a task for our microprocessor. We can blink our LED only using timers without our CPU wasting cycles for that. -->
# Interrupts
In the previous LED blink example, we have done *nothing* between toggles. We put a simple delay with `HAL_Delay(500);`, which literally halted the system for an entire 500 milliseconds! Do you realize how wasteful it is? Well, in such a simple project, it is not an issue. We have some *500 ms* to spend, however, it might not be the case. Therefore, we need to figure our can we do this timed tasks more efficiently.

Similarly, in the button-LED example, we checked the button state in every loop. It is called "polling". However, we did it so many unnecessary times. Couldn't it be better if our button *gives us a heads up* if something changes on its side.

Welcome to the world of INTERRUPTS!
A interrupt is some form of external signal that interrupts the main process. When an interrupt occurs the current execution state of the main process is stored, before a different process (the ISR, or interrupt service routine) takes over. When the interrupt service routine has completed, execution control is returned to the main process.

Interrupts are useful for making the system responsive to external events while avoiding constant polling of the possible external event sources. Sometimes the ISR may simply set a flag, or publish a message in a event queue such that the main process can take appropriate action when it is ready to do so.

Polling:
![check phone]({{site.baseurl}}/assets/images/check-phone.gif)

Interrupt:
![check phone]({{site.baseurl}}/assets/images/phone-rings.gif)

An interrupt is a signal that tells the processor to immediately stop what it is doing and handle some high priority processing. That high priority processing is called an Interrupt Handler. An interrupt handler is like any other void function. If you write one and attach it to an interrupt, it will get called whenever that interrupt signal is triggered. When you return from the interrupt handler, the processor goes back to continue what it was doing before.

Interrupts can be generated from several sources:

1. Timer interrupts from one of the microcontrollers timers.
2. External Interrupts from a change in state of one of the external interrupt pins.
3. Pin-change interrupts from a change in state of any one of a group of pins.

# Exercise: LED blink with timers
In this exercise we willt toggle the LED *when the time is right.* rather than *waiting for the rignt time to come*

For this example, we will use **TIM2**, which is a general-purpose timer. It can count upto 32-bits, both upwards and downwards. It does not intervene with any other features that we need in this project.

<!-- timer_led_blink.ioc -->
1. Open a new STM32CubeMX project.
2. Select STM32F767 board, start project, but DO NOT SELECT default mode.
3. You should see some pins are orange. We want these to be gone, as well:` Pinout (at the top) > Clear pinouts`
4. Set PB0 as GPIO_Output.
5. On the left ``System Core > RCC > HSE: Crystal/Ceramic Resonator``
  (RCC: Reset and Clock Control)
6. Master Clock Output: Checked. *(only for a possible debugging)*
7. Find PB0 on the chip, and set it to GPIO_Output. And then, right click on the pin > edit user label
  - Make sure the settings look like this so far on the left ``System Core > GPIO > Configuration > PB0 >``
  ![GPIO Settings]({{site.baseurl}}/assets/images/timer_blink.png)
8. On the left ``Timers > TIM2 > Clock source -> Internal clock `` and in Parameter settings `Prescalar -> 108-1`
9. Go to Clock Configuration. Set these values:
 ![Timer Prescalars]({{site.baseurl}}/assets/images/timer_led_blink_clock108.png)
10. Go to Project Manager
  a. Give descriptive name to your project
  b. Application structure: Basic
  c. Toolchain/IDE: STM32CubeIDE (Uncheck "Generate under root" box)
11. Generate project.
12. Create a platformio.ini file and copy this:
    ```c
    [env:nucleo_f767zi]
    platform = ststm32
    board = nucleo_f767zi
    framework = stm32cube
    build_flags = 
    -IInc
    upload_protocol = stlink
    debug_tool = stlink
    debug_build_flags = -O0 -g -ggdb
    ```
13. Open the project in PlatformIO.
14. Add this code after `/* USER CODE BEGIN 1 */` in **main.c**:
  ```c
  // volatile keyword is very important!
  // it is not the MCU but a timer responsible in changing this variable
  // So your compiler optimizes this variable out
  // thinking that it is unused. Yeah, pretty stupid.
  volatile uint32_t timer_val;
  ```

15. Add this code after `/* USER CODE BEGIN 2 */` in **main.c**:
    ```c
    // Start timer
    HAL_TIM_Base_Start(&htim2);

    // Get current time (microseconds)
    timer_val = __HAL_TIM_GET_COUNTER(&htim2);
    ```
16. Add this code after `/* USER CODE BEGIN 3 */` in **main.c**:
  ```c
  if (__HAL_TIM_GET_COUNTER(&htim2) - timer_val >= 100000)
    {
      HAL_GPIO_TogglePin(LD1_GPIO_Port, LD1_Pin);
      timer_val = __HAL_TIM_GET_COUNTER(&htim2);
    }
  ```
17. Build and Upload


# Timer calculations
As you realized, we wrote down some numbers like 108 Hz for HCLK, 108-1 for prescalar, `(__HAL_TIM_GET_COUNTER(&htim2) - timer_val >= 100000)` in our code, but how can we decide what to write? How can we calculate them? Let's break down the essential components for accurate timer configurations.

## Timer Frequency Calculation

![Prescalar diagram]({{site.baseurl}}/assets/images/prescalar_diagram.png)

Note that HCLK is our main clock. It means that this clock will ignite other busses like APB (Advanced Perpheral Bus) to set PCLKs (Peripheral Clocks). Look at the clock configuration on CubeMX. By setting it to 108 MHz, our main clock generates $$108\times 10^6$$ ticks every second!

Each timer has an internal counter that increments based on a clock source. The rate at which this counter increments is the "timer tick frequency." The timer's input clock is first divided by the Prescaler and then used to increment the counter.

The relationship between HCLK and PCLK is like this:
 $$PCLKx = \dfrac{HCLK}{APBx\_Prescaler + 1}$$

which means that if you set your HCLK = 108 Mhz, and AHBx Prescalar to /2, then your peripheral clock will work at half speed of your main clock.

## Prescalar

A Prescaler Value (PSC) is a 16-bit or 32-bit register value. The timer's input clock is divided by (PSC+1) before it increments the counter.
  - Example: If PSC = 107, the division factor is (107+1)=108.

Each timer has its own prescalar. This is what we adjusted in timer configurations. We sat it 108-1. We could have set it 107 directly but writing like is a bit more obvious how we come up there.

Based on the datasheet TIM2 is connected to ABP1:
  ![Slave Modes]({{site.baseurl}}/assets/images/apb1-tim2.png)

We can see that we sat APB1 Timer clocks to 108 Mhz.

With ``Prescaler = 108 - 1 = 107``, the timer clock frequency will be:

 $$108,000,000 Hz / (107 + 1) = 108,000,000 Hz / 108 = 1,000,000 Hz$$.

This means each tick of the counter is $$1 / 1,000,000 Hz = 1 us$$.

Our condition if ``(__HAL_TIM_GET_COUNTER(&htim2) - timer_val >= 100000)`` checks for 100,000 timer ticks.

Therefore, the delay will be 100000 ticks * 1 us/tick = 100000 us = 100 milliseconds. The LED will toggle every 100ms, so a full blink cycle (on and off) will be 200ms. We can see that by checking the positive side of LD1 on our logic analyzer.
![Slave Modes]({{site.baseurl}}/assets/images/timer_led_blink_logic.png)

## Timer overload
So, we know that our timer counter has a limited capacity. The counter value is stored in a 32-bits register. It is obvious (at least I hope) that after the register ``0xFF``, it will restart counting from ``0x00`` again. The highest bit (33th bit) will overflow and we will lose it *forever*.

Then the question: what is the maximum time that we can measure with this timer?

  $$2^{32} - 1 = 4,294,967,295$$

and each tick was calculated 1 us, so converting to Larger Units (for better understanding):

- **Milliseconds (ms):** 4,294,967,295 µs ÷ 1,000 µs/ms = 4,294,967.295 ms
- **Seconds (s):** 4,294,967.295 ms ÷ 1,000 ms/s = 4,294.967295 s
- **Minutes (min):** 4,294.967295 s ÷ 60 s/min ≈ 71.58 minutes
- **Hours (h):** 71.58 min ÷ 60 min/h ≈ 1.19 hours

Therefore, we need to choose a different prescalar if we want to measure longer time.


# Timer modes
As you might have realized, timers have various purposes, and therefore, they are used extensively! By setting the timer into correct mode, the majority of your task will be done. Here you will find what those modes are and when to use them.
### Slave modes:
  A timer operating in a slave mode does not simply count on its own. Instead, its behavior (starting, stopping, resetting, or operating as an external clock) is dictated by an external trigger signal, which comes from a "Trigger Source" (as shown in the line below "Slave Mode").

  ![Slave Modes]({{site.baseurl}}/assets/images/slave-modes.png)

  - Disable: The timer is not operating in any slave mode. It functions independently, based solely on its internal clock source and its own configuration (e.g., counting up continuously, generating PWM, etc.). It does not respond to external triggers as a slave. We use it for basic timer operations where no external synchronization or control is needed.
  - External Clock Mode 1: The timer's internal counter is clocked by an external signal provided via a specific timer input pin (often referred to as TIx, where x is the channel number). Each active edge of the external signal (e.g., rising edge) increments (or decrements) the timer's counter. The internal clock (from the APB bus) is effectively ignored for counting. We use it to use the timer as an event counter, where we want to count pulses or events from an external source (e.g., a sensor, a quadrature encoder, a frequency meter).
  - Reset Mode: When the selected trigger signal occurs, the timer's internal counter (CNT) is immediately reset to 0. It then continues counting from 0. We use it to synchronize the start of the timer's counting period with an external event. For example, resetting a timer on the start of a new frame in a communication protocol, or resetting multiple timers simultaneously with a single trigger.
  - Gated Mode: The timer's counter only increments (or decrements) when the selected trigger signal is active (e.g., high or low, depending on configuration). When the trigger signal is inactive, the counter pauses and holds its current value. We use it to measure the duration of an external signal, or to gate the timer's operation based on an enable/disable signal from another peripheral. For example, counting pulses only when a specific enable signal is present.
  - Trigger Mode: The timer starts counting when the selected trigger signal occurs. Once started, it continues counting independently until it's explicitly stopped or reset by software, or it reaches its auto-reload value. It only reacts to the first trigger, or subsequent triggers only after it has stopped. We use it to initiate a timing sequence based on an external event. For example, starting a delay timer when a button is pressed, or beginning a measurement period when a sensor goes active.
  - Combined Reset Trigger Mode: This is a combination of Reset Mode and Trigger Mode, often found on advanced timers. We will not do anything with these timers in this course. It is often used when you want to both reset and start (or restart) the timer's counting sequence on a single trigger event.

### Channel modes:
  It is about how that particular channel will behave on this timer. A channel refers to an independent, configurable sub-unit within a single timer peripheral. Think of a timer as a multi-lane highway, and each channel as a separate lane that can handle its own specific traffic (timing-related operations).
  ![Channel Modes]({{site.baseurl}}/assets/images/channel-modes.png)
  - **Disable**: Completely deactivates the specific channel.
  - **Input Capture direct mode**: Configures the channel for Input Capture (IC). In "direct mode," the timer directly captures the value of its internal counter when an event (e.g., a rising edge, falling edge, or both) occurs on the associated input pin. The captured value is stored in the channel's Capture/Compare Register (CCR). We use this mode for measuring the period, frequency, or pulse width of an external signal that is directly connected to the timer input pin. This is the most common Input Capture setup.
  - **Input Capture indirect mode**: Also configures for Input Capture, but in an "indirect mode." This typically means that one channel is configured as the active input, and another channel is configured to capture based on the same input signal but with a different trigger. This allows for measuring both high and low pulse durations or the period using a single input signal and two channels. Not as often used.
  - **Input Capture triggered by TRC**: This is another variation of Input Capture where the capture event is not directly tied to a specific input pin, but rather to an internal trigger event (TRC stands for Trigger Controller). This allows the timer to capture its counter value when an event occurs from another internal peripheral (e.g., a trigger output from another timer, an ADC conversion complete event, etc.). We use this mode for advanced synchronization scenarios where the timer needs to timestamp an event that is generated by another part of the microcontroller, rather than an external pin.
  - **Output Compare No Output**: Configures the channel for Output Compare (OC) mode, but without directly affecting an external output pin. When the counter matches the channel's CCR value, an internal event is generated (e.g., an interrupt, or a DMA request), but no change occurs on the physical output pin associated with that channel. We use this mode when we need a precise internal timing event or trigger without driving an external pin. For example, to trigger an ADC conversion at a specific time, or to schedule a software task.
  - **Output Compare CH1**: Configures the channel for Output Compare (OC) mode, and critically, it will use the settings of Channel1 for its output behavior. This implies a scenario where multiple channels might be linked or synchronized to Channel1's settings or its output. This option might be available if channels can be grouped or if a channel's output can be driven based on another channel's comparison. Note: This specific phrasing is a bit unusual; typically, you'd configure a channel to directly produce an output based on its own CCR. It could suggest a slave mode where this channel mirrors or is controlled by Channel1's output compare event, or it might be a simplified selection for an initial configuration to use CH1 settings. It is not as often used. Sometimes in specific synchronization or linked-channel scenarios defined by the STM32's timer architecture.
  - **PWM Generation No Output**: Configures the channel for Pulse Width Modulation (PWM) generation, but similar to "Output Compare No Output," it does not drive an external pin. The PWM signal is generated internally (based on the timer's counter and the channel's CCR value), but its effect is only on internal events (interrupts, DMA). Next mode is more often used compared to this one.
  - **PWM Generation CH1**: Configures the channel for PWM generation. We will learn more about PWM in [L6 DAC and PWM](https://fjnn.github.io/hvl-ele201/lectures/l6-dac-pwm) later on. We use this mode when we want to generate a *fake analog output* for example to control a DC motor, changing the brightness of an LED etc.

{: .notice--info}
Any timers current value can be found in TIMx_CNT register.

## Exercise (Home/Lab): Measure time and print
<!-- internal_timer_uart2.ioc -->
In this exercise we will learn how to measure the time of events and print the elapsed time on the terminal. In fact, this exercise will make more sense after Lecture-7 since we are using serial print. However, we can give a try to set up UART without going into details yet.


1. Create a new project without using the default mode.
2. On the left, go to `System Core > RCC > HSE: Crystal/Ceramic Resonator`.
3. Set `TIM2 > Clock source > Internal clock` so that we use the HCLK. Also change the prescaler in the configurations. Set it to 108 - 1 as shown in the figure below.  
   ![timer-prescalar.png]({{site.baseurl}}/assets/images/timer-prescalar.png)
4. Go to `Connectivity > USART3 > Mode > Asynchronous`.  
   - In this exercise, we will print something on the screen. Therefore, we use UART for only visualization. We will learn more about it later in [Lecture 7 - UART: Universal Asynchronous Read and Write](https://fjnn.github.io/hvl-ele201/lectures/l7-uart).
5. Replace PB10->PD8 and PB11->PD9 by dragging the pin while holding Ctrl.
6. Make sure the clock configurations look like this:  
   ![timer-uart-clock.png]({{site.baseurl}}/assets/images/timer-uart-clock.png)
7. Give a good name to your project, do the necessary project settings and generate the code.
8. Create a `platformio.ini` file in your project and paste the following content in it.
    ```c
    [env:nucleo_f767zi]
    platform = ststm32
    board = nucleo_f767zi
    framework = stm32cube
    build_flags = 
      -IInc
    upload_protocol = stlink
    debug_tool = stlink
    debug_build_flags = -O0 -g -ggdb
    monitor_speed = 115200
    ```
9. Paste this code after `/* USER CODE BEGIN Includes */`
    ```c
    #include<string.h> // for strlen()
    #include<stdio.h> // for sprintf()
    ```
10. Paste this code after `/* USER CODE BEGIN 1 */`
    ```c
    char uart_buf[50];
    int uart_buf_len;
    uint16_t timer_val;
    ```
11. Paste this code after  `/* USER CODE BEGIN 2 */`
    ````c
    // Initial text on the screen
    uart_buf_len = sprintf(uart_buf, "Timer Test\r\n");
    HAL_UART_Transmit(&huart3, (uint8_t *)uart_buf, uart_buf_len, 100);

    // Start timer
    HAL_TIM_Base_Start(&htim2);
    ````
12. Paste this code after  `/* USER CODE BEGIN 3 */`
    ```c
    // Get current time (microseconds)
    timer_val = __HAL_TIM_GET_COUNTER(&htim16);

    // Wait for 50 ms
    HAL_GPIO_WritePin(GPIOA, GPIO_PIN_5, GPIO_PIN_SET);
    HAL_Delay(50);
    HAL_GPIO_WritePin(GPIOA, GPIO_PIN_5, GPIO_PIN_RESET);

    // Get time elapsed
    timer_val = __HAL_TIM_GET_COUNTER(&htim16) - timer_val;

    // Show elapsed time
    uart_buf_len = sprintf(uart_buf, "%u us\r\n", timer_val); // unfortunately there is no str() func. in C.
    HAL_UART_Transmit(&huart2, (uint8_t *)uart_buf, uart_buf_len, 100);

    // Wait again so we don't flood the Serial terminal
    HAL_Delay(1000);
    ```


{: .notice--info}
This exercise is taken from [www.digikey.com](https://www.digikey.com/en/maker/projects/getting-started-with-stm32-timers-and-timer-interrupts/d08e6493cefa486fb1e79c43c0b08cc6). Check it out if you want to learn more in depth. However, pay attention that the board is different than the one we use.