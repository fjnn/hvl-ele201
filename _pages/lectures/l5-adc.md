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
An A/D converter (analog to digital converter) is a device that converts a analog signal into an approximate digital representation. It measures the ratio of an analog input value to a reference value and express it in a form of digital value. Many different technologies exits for this purpose, where each one has it’s own advantages and disadvantages. 

The simplest A/D converter is a bunch of comparator circuits. In the figure below, you see a 3-bit A/D converter.

 ![3-bit adc]({{site.baseurl}}/assets/images/3-bit_adc.png)
 Source:[www.electronics-tutorials.ws/](https://www.electronics-tutorials.ws/combination/analogue-to-digital-converter.html)

Did you realize that the whole analog signal range is divided into 8 possibilities?

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

 ![quantization]({{site.baseurl}}/assets/images/quantization.jpg)

- Sampling depth is the minimum smallest analog value change that is detectable.
- Sampling rate is the number of samples taken for quantization.

{: .notice--info}
Note that as we discussed before that we cannot every possible analog output in digital world (as we encounter conversion error), we cannot measure every possible analog input with an infinite precision, either.
<!--https://embeddedthere.com/stm32-adc-interfacing-with-hal-code-example/-->
  