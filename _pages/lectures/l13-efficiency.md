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

Short on Efficiency, more on exam prep.

# Efficiency
In the embedded world, we are not as lucky as the software engineers who work with PCs on an operating system when it comes to efficiency. Surely, as a software designer,  either in the embedded side or operative system side, you *have to* think about efficiency. However, we have quite limitted resources when it comes to 2 things: Memory and Battery.

Planning your algorithm such that you will process the data as fast as possible is also efficiency. We care about it in the embedded world a lot, but today we will focus on the 2+1 types aspects of efficiency when it comes to embedded systems:

1. **Memory efficiency**: Don't use the memory unless you *really* need it.
2. **Power efficiency**: Make things go to sleep unless you use it.
3. (+1) **Component efficiency**: Explore simpler alternatives - you might not even need a microcontroller sometimes. A simple timer circuit can solve your problems. Cheaper and faster.

To understand intuitively how to be efficient in these two, we should first understand how they work.


# What is memory?
We know the concept of a memory quite well: the components which store the data in a digital system. We also know that there are different types of memory and different memory storage devices, RAM, ROM, HDD, SDD, CD, DVD, disket, vinyl :)

Yes, the variation that we can store the data is immense, right?

## History of memory evolution
pass

vacuum tubes, vinyl, cd, dvd, butning, magnetic, transistors etc. 

# Alternatives to microcontrollers
I am not going to tell "you can use PLC or FPGA instead". You know that they also capable of processing pretty much all types of data that a simple microcontroller can.

What I highlight here is whether you need a processor component. For instance, you can use a JK flip flop for a toggle task. You can use a NE555 timer for simple interrupt tasks. Those are much cheaper and simpler. In a big company, you try to save even 1 cent whenever you can.
<!-- https://www.youtube.com/watch?v=PVNAPWUxZ0g&ab_channel=CoreDumped -->


## Where is main.c

the main.c file, after it's compiled and linked, absolutely ends up stored in the Flash memory of a microcontroller.

Here's the breakdown of why and how:

Source Code (.c files): Your main.c file (and all other .c and .h files) are human-readable text files. They are stored on your development computer's hard drive.

Compilation: When you build your project, a compiler (like GCC for ARM) converts your .c files into machine code (object files, typically .o or .obj). This machine code is specific instructions that the microcontroller's CPU can understand.

Linking: A linker then takes all these object files, along with any necessary library files (like the STM32 HAL library, CMSIS, etc.), and combines them into a single executable file. This executable file contains:

Program Code (Instructions): The actual machine instructions derived from your main.c and other source files.

Initialized Data: Global and static variables that have an initial value (e.g., int x = 10;).

Read-Only Data: Constants, string literals, etc.

Flash Memory (Non-Volatile Storage): Microcontrollers use Flash memory (also known as Program Flash or Code Flash) as their primary non-volatile storage for the program. "Non-volatile" means it retains its contents even when power is removed. This is crucial because you want your microcontroller to execute your program as soon as it powers on.

Programming/Flashing: When you "flash" or "program" the microcontroller (e.g., using an ST-Link debugger, J-Link, or a programmer in your IDE like STM32CubeIDE), you are essentially transferring this executable file from your development computer and writing it into the microcontroller's internal Flash memory.

Execution: When the microcontroller powers up or is reset, its CPU's program counter is typically initialized to the start of the Flash memory where your program's reset handler is located. The CPU then fetches instructions directly from Flash memory and executes them.


# Power efficiency
Talk about ALU, clock cycle etc.

