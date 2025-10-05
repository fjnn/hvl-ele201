---
layout: single
title: "Miscellaneous"
permalink: /lectures/miscellaneous
toc: true
breadcrumbs: true
sidebar:
  - title: "Lectures"
    image: /assets/images/logo.png
    image_alt: "image"
    nav: lectures
taxonomy: markup
---

# Direct Memory Access (DMA) Modes

## DMA Modes and Configuration for DAC Sine Wave Output

### DMA Transfer Modes

- **Normal Mode:**  
  The DMA controller performs a single transfer (or a fixed number of transfers) and then stops. You must manually re-enable it for the next transfer.  
  *Not ideal for continuous signals like a sine wave.*

- **Circular Mode:**  
  After reaching the end of the buffer, the DMA automatically wraps around to the beginning and continues transferring.  
  *Best for generating continuous waveforms with DAC (e.g., sine wave) or reading constant ADC, as the DMA endlessly loops through your pre-calculated table without CPU intervention.*

---

### Address Increment Settings

- **Peripheral Increment Address:**  
  - *What it does:* Determines if the peripheral's address register (e.g., the DAC data register) should be incremented after each transfer.  
  - *Setting:* **Disable**  
  - *Why:* The DAC data register is always at a fixed address; the DMA should always write to the same place.

- **Memory Increment Address:**  
  - *What it does:* Determines if the memory address (your sine wave table in RAM) should be incremented after each transfer.  
  - *Setting:* **Enable**  
  - *Why:* This allows the DMA to step through each value in your sine wave data array.

---

### Data Direction

- **Memory to Peripheral:**  
  - Data moves from your memory buffer (f.ex in out DAC-Sine wave generation example, sine wave array) to the peripheral (DAC register).  
  - *Setting:* **Memory to Peripheral**  
  - *Why:* This is the only direction that makes sense for feeding data from your sine wave table to the DAC.

---

### Data Width

- **Byte (8-bit):** Transfers 1 byte at a time  
- **Half Word (16-bit):** Transfers 2 bytes at a time  
- **Word (32-bit):** Transfers 4 bytes at a time  

The STM32F767 DAC is a 12-bit converter, but it can be accessed in 16-bit or 32-bit format.  
To match the `DAC_ALIGN_12B_R` alignment used with `HAL_DAC_SetValue`, choose **Half Word (16-bit)** data width. This matches the format used by the HAL library.

---

### **Summary Table: Ideal DMA Settings for Continuous Sine Wave Output**

| Setting                     | Value                |
|-----------------------------|----------------------|
| **Mode**                    | Circular             |
| **Peripheral Increment**     | Disable              |
| **Memory Increment**         | Enable               |
| **Direction**               | Memory to Peripheral |
| **Data Width**              | Half Word (16-bit)   |


# What does it really mean that everything consists of transistors?
We have agreed on that everything is ones and zeros. All the process in a digital system is about moving ones and zeros from one memory, but how electronically are they stored? 

Memory is about how to retain information.

How do transistors run code? 
<!-- https://www.youtube.com/watch?v=HjneAhCy2N4&t=1s&ab_channel=CoreDumped -->
How do transistors remember data?
<!-- youtube.com/watch?v=rM9BjciBLmg -->

Power of abstraction! [Source](https://youtu.be/HjneAhCy2N4?si=j8sORhxI8XWrvCdj)
![XOR gate compact representation]({{ site.baseurl }}/assets/images/xor_compact.png)
![XOR gate with transistor]({{ site.baseurl }}/assets/images/xor_transistors.png)

By using different gates, we create amazingly beautiful and useful circuits to process the data or signal. One of the most fundamental circuits for a digital system is an adder. 

![Adder circuit]({{ site.baseurl }}/assets/images/adder.png)

An adder is a digital circuit that performs addition of numbers. In its simplest form, a half-adder can add two single binary digits and produce a **sum** and a **carry** value. A full-adder extends this by also taking into account a **carry input**, allowing us to chain multiple adders together to add multi-bit binary numbers, which is essential for arithmetic operations in computers.

Adders are not only used for arithmetic, but also form the basis for more complex operations such as subtraction, multiplication, and even logical operations. In fact, the arithmetic logic unit (ALU) of a microprocessor is built from a combination of adders and other logic gates. The efficiency and speed of these basic circuits directly impact the performance and power consumption of the entire system.

Understanding how these gates and circuits are constructed from transistors helps us appreciate the physical limitations and trade-offs in digital design. For example, more complex circuits require more transistors, which means more power consumption and more space on the chip. This is why, in embedded systems, we often need to carefully consider how much memory and processing power we actually need, and optimize our designs accordingly.

![Adder circuit]({{ site.baseurl }}/assets/images/adder2.png)
As you see, you can combine an XOR gate and an AND gate, and create a simple, instantaneous adder.

I think this is where the beauty of an embedded system lies. Simple and fast. Unlike programming on a general-purpose operating system, where layers of abstraction and resource management often hide the underlying hardware, embedded system design puts you in direct contact with the physical world. Every line of code you write can have a tangible effect on power consumption, speed, and reliability. 

On an operating system, you might not worry about how memory is allocated. There’s usually plenty of resources, and the OS handles much of the complexity for you. However in embedded systems, you are both the architect and the craftsman: you must carefully choose what to include, optimize for every byte and every microamp, and understand the hardware intimately. This directness is both a challenge and a joy. You get to see the immediate results of your optimizations; an LED blinks faster, a sensor uses less power, a device runs longer on a battery. The constraints force you to be creative and efficient.

Anyways, let's cut the praise and continue the actual business.
