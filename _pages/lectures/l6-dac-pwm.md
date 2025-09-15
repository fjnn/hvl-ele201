---
layout: single
title: "Lecture 6 - DAC and PWM"
permalink: /lectures/l6-dac-pwm
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
Skriving av analog verdi til utgang ved hjelp av DAC og PWM.



<!-- https://www.youtube.com/watch?v=zkrVHIcLGww&ab_channel=EmbeddedSystemsandDeepLearning -->
<!-- https://www.youtube.com/watch?v=0RsL_F3Nxn0&t=88s&ab_channel=ControllersTech -->


Here is the step-by-step guide for the STM32F767 Nucleo board in Markdown format, ready for you to copy and paste.

-----

### **Step-by-Step Guide for STM32F767 Nucleo Board**

This guide shows you how to set up the STM32F767 Nucleo board to generate a basic analog output and a sine wave using the DAC.

#### **Part 1: Basic DAC Operation**

1.  **CubeMX Setup:**

      * Create a new project in STM32CubeIDE for the **STM32F767ZI** Nucleo board.
      * In the **Clock Configuration** tab, set the High-Speed Clock (HSE) to **Crystal/Ceramic Resonator** and ensure the PLL is configured to output a HCLK of **108 MHz**.
      * Under "Pinout & Configuration," go to **Analog \> DAC**.
      * Enable **DAC\_OUT1**. This will automatically configure pin **PA4**.
      * Leave the output buffer and trigger settings in their default states for this basic example.
      * Generate the code.

2.  **Programming the DAC:**

      * Open `main.c`.
      * Create a variable to represent the desired DAC output, for example: `uint16_t dac_value = 0;`
      * In the `main()` function, add the following line to start the DAC:
        ```c
        HAL_DAC_Start(&hdac, DAC_CHANNEL_1);
        ```
      * Create a `for` loop to increment the DAC output in the main `while(1)` loop. The digital value ranges from 0 to 4095.
        ```c
        for(dac_value = 0; dac_value <= 4095; dac_value++) {
            HAL_DAC_SetValue(&hdac, DAC_CHANNEL_1, DAC_ALIGN_12B_R, dac_value);
            HAL_Delay(1); // Small delay to observe the change
        }
        ```
      * Compile and flash the code to the board.

3.  **Demonstration:**

      * Connect a voltmeter or oscilloscope to pin **PA4** and observe the voltage sweep from 0V to 3.3V (or your VREF+ voltage).

-----

#### **Part 2: Sine Wave Generation with DMA**

1.  **CubeMX Setup:**

      * In the "Pinout & Configuration" tab, go back to the **DAC** settings.
      * Set the trigger to **TIM6 Trigger Out**.
      * Under the DMA settings, add a new DMA request for **DAC1**.
      * Set the **Mode** to `Circular` and the **Data Width** to `Half Word`.
      * Next, configure the timer. Navigate to **Timers \> TIM6**.
      * Set the **Clock Source** to **Internal Clock**.
      * Under "Trigger Event Selection," set the trigger to `Update Event`.
      * For a 100 Hz sine wave with 100 samples, set the **Prescaler** to `107` and the **Counter Period (ARR)** to `99`. This will achieve a 10 kHz DAC trigger frequency.
      * Generate the code.

2.  **Programming the Sine Wave:**

      * Open `main.c`.
      * Include the `math.h` library.
      * Create a sine wave lookup table array to store the digital values.
        ```c
        #define NUM_SAMPLES 100
        uint16_t sine_wave_table[NUM_SAMPLES];

        void build_sine_wave(void) {
            for (int i = 0; i < NUM_SAMPLES; i++) {
                // Formula to convert a sine wave (-1 to 1) to a DAC value (0 to 4095)
                sine_wave_table[i] = (uint16_t)((sin(i * 2 * M_PI / NUM_SAMPLES) + 1.0) * 2047.5);
            }
        }
        ```
      * Call the `build_sine_wave()` function once in the `main()` function before the `while(1)` loop.
      * Start the DAC with DMA using the following function call:
        ```c
        HAL_DAC_Start_DMA(&hdac, DAC_CHANNEL_1, (uint32_t*)sine_wave_table, NUM_SAMPLES, DAC_ALIGN_12B_R);
        ```
      * Start the timer:
        ```c
        HAL_TIM_Base_Start(&htim6);
        ```
      * Compile and flash the code.

3.  **Demonstration:**

      * Connect an oscilloscope to pin **PA4**. You should see a clean 100 Hz sine wave. You can modify the timer settings in CubeMX to change the frequency.

