---
layout: single
title: "Lecture 13 - Efficiency"
permalink: /lectures/l13-efficiency
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
Energieffektivitet. Batteridrift av mikrokontroller. Minnebruk og minneteknologi.

# Efficiency
In the embedded world, we are not as lucky as the software engineers who work with PCs on an operating system when it comes to efficiency. Surely, as a software designer,  either in the embedded side or operative system side, you *have to* think about efficiency. However, we have quite limitted resources when it comes to 2 things: Memory and Battery.

Planning your algorithm such that you will process the data as fast as possible is also efficiency. We care about it in the embedded world a lot, but today we will focus on the 2 types aspects of efficiency when it comes to embedded systems:

1. **Memory efficiency**: Don't use the memory unless you *really* need it.
2. **Power efficiency**: Make things go to sleep unless you use it.

To understand intuitively how to be efficient in these two, we should first understand how they work.


# What is memory?
We know the concept of a memory quite well: the components which store the data in a digital system. We also know that there are different types of memory and different memory storage devices, RAM, ROM, HDD, SDD, CD, DVD, disket, vinyl :)

Yes, the variation that we can store the data is immense, right?

## History of memory evolution
pass

<!-- vacuum tubes, vinyl, cd, dvd, butning, magnetic, transistors etc.  -->

## What does it really mean that everything consists of transistors?
We have agreed on that everything is ones and zeros. All the process in a digital system is about moving ones and zeros from one memory, but how electronically are they stored? 

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







