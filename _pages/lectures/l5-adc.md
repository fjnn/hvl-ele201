---
layout: single
title: "Lecture 5 - ADC (Analog-to-Digital Conversion"
permalink: /lectures/l5-adc
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
ADC. Lesing av spenninga frå eit potmeter. Lesing av temperatursensor. Lesing av datablad for temperatursensor -->

# ADC (Analog to Digital Conversion)

Analog to digital converters (ADC) and digital to analog converters (DAC) are the bridges between digital and analog worlds.
 ![adc-graph]({{site.baseurl}}/assets/images/adc_graph.png)

The analog to digital converter has many applications, some of which include:

- Reading of potentiometer settings
- Reading of temperature sensors, pressure sensors, light sensors, strain sensors, etc.
- Reading the voltage on a battery in order to determine the state of charge (sometimes combined with a temperature reading, since battery voltage can be affected by temperature)
- Measurement of EMF in order to determine the rotational speed of a motor
- Measurement of voltage and current in power systems in order to calculate active (P), and reactive (Q) power
- Reception of radio signals for use in a software defined radio (SDR)

## Analog to digital converter
An A/D converter (analog to digital converter) is a device that converts a analog signal into an approximate digital representation. It measures the ratio of an analog input value to a reference value and express it in a form of digital value. Many different technologies exists for this purpose, where each one has it’s own advantages and disadvantages. 

The simplest A/D converter is a bunch of comparator circuits. In the figure below, you see a 3-bit A/D converter.

 ![3-bit adc]({{site.baseurl}}/assets/images/3-bit_adc.png)
 Source:[www.electronics-tutorials.ws/](https://www.electronics-tutorials.ws/combination/analogue-to-digital-converter.html)

Did you realize that the whole analog signal range is divided into 8 possibilities? You can increase it, but it will cost you more, so being optimal in design is the key.

## Real-world ADC

{: .notice--success}
*Language is discrete, feelings are not*

One may think about this analog-digital trade off as an art of categorization. When I say everything in this world is continuous, I mean it. Let’s do a bit psychological brainstorming, shall we? Think about your feelings. When you experience something that makes you happy, you describe/express it with a word: Happy. What if you are really happy? Well, you can emphasize your word (very happy) or categorize and redefine your happiness with another word: Amused. If that’s not enough, you can always increase your precision: (very amused) or thrilled.

What is important in here is not the language but the limitation of the language (which has a discrete characteristic) when you want to express your feelings (which have a continuous characteristic). It is never the exact representation of what you really feel when you speak it out. This leads me to the conclusion that you will always lose when you trade off between analog and digital.

 ![3-bit adc]({{site.baseurl}}/assets/images/emotions-wheel.png)

 Digital to Analog Conversion of feelings. The *language* is discrete.
 Source:[www.simplemost.com](https://www.simplemost.com/feeling-wheel-will-help-better-describe-emotions/)

So, you can think about expressing your feelings with words as ANALOG-TO-DIGITAL conversion. Understanding what someone feel when they told you as DIGITAL-TO-ANALOG conversion.

## Quantization
Quantization is the main step in digitizing an analog signal. Basically, categorize an analog signal into subset of digital values which can be expressed in desired resolution. Let’s have a look at a quantized sinusoidal signal in 4-bits resolution.

![quantization]({{site.baseurl}}/assets/images/quantization_orig.png)

- Sampling depth is the minimum smallest analog value change that is detectable.
- Sampling rate is the number of samples taken for quantization.

<div style="display: flex; gap: 10px;">
  <img src="{{site.baseurl}}/assets/images/quantization_t.png" alt="quantization" style="width: 49%;">
  <img src="{{site.baseurl}}/assets/images/quantization_q.png" alt="quantization" style="width: 49%;">
</div>

{: .notice--info}
Note that as we discussed before that we cannot every possible analog output in digital world (as we encounter conversion error), we cannot measure every possible analog input with an infinite precision, either. ADC is used *a lot* in audio production. If you want to have a more intuitive explanation of ADC, resolution, samling frequency and quantization, please watch [this video](https://www.youtube.com/watch?v=1KBLguIXL30&ab_channel=AkashMurthy)
<!--https://embeddedthere.com/stm32-adc-interfacing-with-hal-code-example/-->

{: .notice--warning}
**Question:**Considering the fact that your reference analog voltage is 5V and you are using 10-bit ADC converter, what is the minimum analog voltage difference you can distinguish? **Answer**: 4.9mv

{: .notice--warning}
**Question:**Do you think if there is any limitation of how fast/slow you can sample a signal? What is the advantages and disadvantages of sampling fast/slow? **Answer**: Yes. See more: [Aliasing](https://jeelabs.org/article/1620b/)

## Important parameters for ADC operation

There are many important parameters one should understand when applying an A/D converter. Even if a particular ADC is selected, there are still many parameters that can be adjusted within the ADC depending on how you intend to use it. The following is a summary of a few basic ones:

- **Analog Input (V_in):** The continuous voltage signal you want to convert.
- **Digital Output (D_out):** The discrete numerical value representing the analog input.
- **Resolution:** The number of bits used to represent the analog signal digitally. This determines the smallest possible change in the analog value that the converter can detect. For example, a 12-bit ADC can represent $$2^{12} = 4096$$ distinct levels.
- **Sampling frequency:** The rate at which the analog signal is sampled and converted to digital. This limits how quickly changes in the analog signal can be detected.
- **Aliasing:** If the analog signal contains frequency components higher than half the sampling frequency, aliasing can occur. This means the digital output may contain frequency components not present in the original analog signal.
- **Reference Voltage (V_ref)**: This is the maximum voltage the ADC can measure. The digital output is a fraction of this reference voltage. For example, if V_ref is 3.3V and you have a 12-bit ADC, each step represents $$3.3V/4096 \approxeq 0.8mV$$.
- **Channels**: ADCs often have multiple input channels, allowing you to connect several analog sensors to a single ADC module.

For simple applications with slowly varying values (e.g., temperature measurements), considering just these parameters may be sufficient. For more demanding applications (e.g., real-time current measurements in a motor drive), a deeper understanding of all parameters affecting ADC performance is necessary.

The analog input or output range is determined by a reference voltage, $$V_{ref}$$. Typically for an N-bit converter with unsigned digital I/O and unipolar analog range $$(0V .. +V_{ref})$$, one step at the analog end, $$\Delta V_{LSB}$$, is given by:

$$\Delta V_{LSB} = \frac{V_{ref}}{2^N}$$

where LSB stands for Least Significant Bit. Similarly for a bipolar analog range $$(-V_{ref} .. +V_{ref})$$, one step at the analog end is:

$$\Delta V_{LSB} = \frac{V_{ref+} - V_{ref-}}{2^N}$$

{: .notice--warning}
Another important thing is that the ADC is super slow process in 108 Mhz (about 9.26 ns) levels. For comparison, ``HAL_GPIO_TogglePin()`` takes around 50ns whereas ``HAL_ADC_Start()`` + ``HAL_ADC_GetValue()`` 500ns! We can reduce the sampling times, lower the resolution and can use DMA(Direct Memory Access) etc. to make it faster. For now, we keep the ADC in our main process but there are other ways to optimize your program when you need to include such a bulky process in your applications. Just DO NOT FORGET THAT ADC IS A BULKY PROCESS AND HALTS YOUR SYSTEM WITH THE DEFAULT SETTINGS.

# Using ADC in STM32F767
In the [reference manual](https://www.st.com/resource/en/reference_manual/rm0410-stm32f76xxx-and-stm32f77xxx-advanced-armbased-32bit-mcus-stmicroelectronics.pdf) in section-15, you will find how to use ADC and the properties of the A/D converter in our microcontroller.

![adc_ref_manual]({{site.baseurl}}/assets/images/adc_ref_manual.png)

ADC input pins are generally designated as ``ADCx_INy``, where ``x`` is the ADC module number (1, 2, or 3) and ``y`` is the channel number. 

## HAL Functions for ADC
The STM32Cube HAL (Hardware Abstraction Layer) provides a set of user-friendly functions to configure and manage the ADC peripheral. Here are some of the most commonly used ones:

- `HAL_ADC_Init(ADC_HandleTypeDef* hadc)`: Initializes the ADC peripheral with the specified parameters in `hadc`. This function is typically generated by CubeMX.
- `HAL_ADC_ConfigChannel(ADC_HandleTypeDef* hadc, ADC_ChannelConfTypeDef* sConfig)`: Configures a specific ADC channel with parameters like channel number, rank (for scan mode), and sampling time. Also typically generated by CubeMX.
- `HAL_ADC_Start(ADC_HandleTypeDef* hadc)`: Starts ADC conversion in polling mode.
- `HAL_ADC_PollForConversion(ADC_HandleTypeDef* hadc, uint32_t Timeout)`: Waits for an ADC conversion to complete in polling mode. Returns `HAL_OK` if successful within the timeout period.
- `HAL_ADC_GetValue(ADC_HandleTypeDef* hadc)`: Retrieves the converted digital value from the ADC data register.
- `HAL_ADC_Start_IT(ADC_HandleTypeDef* hadc)`: Starts ADC conversion in interrupt mode.
- `HAL_ADC_Start_DMA(ADC_HandleTypeDef* hadc, uint32_t* pData, uint32_t Length)`: Starts ADC conversion in DMA mode. `pData` is the pointer to the destination buffer, and `Length` is the number of conversions.
- `HAL_ADC_Stop_IT(ADC_HandleTypeDef* hadc)`: Stops ADC conversion in interrupt mode.
- `HAL_ADC_Stop_DMA(ADC_HandleTypeDef* hadc)`: Stops ADC conversion in DMA mode.
- `HAL_ADC_ConvCpltCallback(ADC_HandleTypeDef* hadc)`: A weak callback function that gets called automatically by the HAL driver when an ADC conversion (or sequence of conversions in scan mode) completes in interrupt or DMA mode. You should override this in your `main.c` or another source file to implement your custom logic.
- `HAL_ADC_ErrorCallback(ADC_HandleTypeDef* hadc)`: A weak callback function that gets called when an ADC error occurs.


# Exercise: Read potentiometer value
In this exercise, we will read the value of a potentiometer and convert it into voltage. It is a fundamental step to be able to read many different sensors later on.

1. Connect your potentiometer as shown in the figure.
  ![pot_connection]({{site.baseurl}}/assets/images/pot_connection.png)
1. Find `PA3` on the chip and set it to `ADC1_IN3`. Change the label to `POT_IN`.
1. At this step, we won't change anything in the ADC setup and see how efficient it is with the default settings. Your default settings should look like that:
  ![adc_default_config]({{site.baseurl}}/assets/images/adc_default_config.png)
1. Do the same clock configurations: 8Mhz input frequency and 108 Mhz HCLK. Resolve Clock issues.
1. Give a proper name to your project. Do the necessary changes and generate your code.
1. Create a platformio.ini with this content:
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
1. Define necessary variables in `main.c` after `/* USER CODE BEGIN 1 */`:
  ```c
  uint32_t adc_value = 0;
  float voltage = 0.0;
  ```
1. Do the ADC work. Place this code after `/* USER CODE BEGIN 3 */`:
  ```c
    HAL_ADC_Start(&hadc1); // Start ADC conversion
    HAL_ADC_PollForConversion(&hadc1, HAL_MAX_DELAY); // Wait for conversion to complete
    adc_value = HAL_ADC_GetValue(&hadc1); // Get the converted value

    // Convert ADC value to voltage
    // Assuming V_ref is 3.3V and 12-bit resolution (4096 levels)
    voltage = (float)adc_value * (3.3f / 4095.0f);

    HAL_Delay(100); // Small delay 
  ```
1. Build and upload. 
1. Open the debugger and add both `adc_value` and `voltage` to your watch list. You can add a breakpoint at the `HAL_ADC_Start`.
1. Observe that `voltage` changes between 0-3.3V and `adc_value` changes between 0-4095.