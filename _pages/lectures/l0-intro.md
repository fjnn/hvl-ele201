---
layout: single
title: "Lecture 1 - Intro"
permalink: /lectures/l0-intro
toc: true
breadcrumbs: true
sidebar:
  - title: "Lectures"
    image: /assets/images/logo.png
    image_alt: "image"
    nav: lectures
taxonomy: markup
---


# About STM32F767ZI Nucleo-144 Board
STMicroelectronics is a global hightech company based in Geneve,Switzerland. STM32 is a family of 32-bit microcontrollers which we will discuss the details of in a short while. Those STM32 mictocintrollers can have varipus ARM processor core such as Cortex-M0, Cortex-M0+, Cortex-M3, Cortex-M4 etc. You have probably heard about *Samsung uses ARM Cortex cores in their Exynos processors.* Similarly, iPhone uses ARM processors, which are based on ARM architecture. We will learn about different microcontroller architectures later on. For now, just be convinced that you are about the learn one of the most used microcontroller architecture used in todays technology, from PCs to smartphones, robot vacuum cleaners to various home appliances.

As you may have noticed, there are several letters and numbers in the name of our microcontroller (STM32F767ZI). STM names their boards following a specific convention that indicates the microcontroller's features and capabilities:

- **STM32**: Indicates it's a 32-bit microcontroller
- **F**: Represents the mainline series (other series include L for low-power, H for high-performance)
- **7**: Indicates the performance line (higher numbers mean more features)
- **67**: Specifies the specific product line within the F7 series
- **Z**: Denotes the pin count (Z = 144 pins)
- **I**: Indicates the flash memory size (I = 2MB)

This naming convention helps engineers quickly identify the key characteristics of each STM32 microcontroller. Our board, the STM32F767ZI, is a high-performance microcontroller with 144 pins (you see that the board name is Nucleo-144) and 2MB of flash memory, making it suitable for complex applications that require significant processing power and memory.

According to the [user manual](https://www.st.com/resource/en/user_manual/um1974-stm32-nucleo144-boards-mb1137-stmicroelectronics.pdf), the STM32 Nucleo-144 boards offer the following features:

**Common Features**
- STM32 Arm® Cortex® core-based microcontroller in an LQFP144 package
- 3 user LEDs
- 2 user and reset push-buttons
- 32.768 kHz crystal oscillator
- Board connectors:
  - USB with Micro-AB
  - SWD
  - ST Zio expansion connector including ARDUINO® Uno V3
  - ST morpho expansion connector
- Flexible power-supply options: ST-LINK USB VBUS or external sources
- On-board ST-LINK/V2-1 debugger/programmer with USB re-enumeration capability:
  - Mass storage
  - Virtual COM port
  - Debug port
- Comprehensive free software libraries and examples available with the STM32Cube MCU Package
- Supported by a wide choice of Integrated Development Environments (IDEs) including:
  - IAR Embedded Workbench®
  - MDK-ARM
  - STM32CubeIDE

**Board-Specific Features**
- Ethernet compliant with IEEE-802.3-2002
- USB OTG or full-speed device
- Board connectors:
  - Ethernet RJ45

![STM32 Naming Convention]({{ site.baseurl }}/assets/images/1600px-STM32_Naming.png)
*Source: [Stm32World Wiki](https://stm32world.com/images/thumb/d/de/STM32_Naming.png/1600px-STM32_Naming.png)*


# What is a Microcontroller?
We will start this course by exploring the questions of what a microcontroller is, and what it means to be developing software for a embedded system.

Simply put a microcontroller is a small computer on a single integrated circuit (a chip), containing a processor core, memory, and programmable input/output peripherals.

- Tiny, self­contained computers in an IC
- Requires few external components to maintain the core functionality
- Often contain additional peripherals
- Different packages available
- Vast array of performance categories available

A microcontroller alone is generally not a finished product. Microcontrollers are used at the core of so called *embedded systems* to facilitate control of the system. A embedded system can be used in almost unlimited number of applications, from your microwave oven, to the *Perseverance Rover* on Mars.

Not only is a microcontroller alone pretty useless, it is also typically not able to operate unless it has at least a few external components. It is not that it would be impossible to incorporate everything inside the chip, but this would lead to a dramatic reduction in the flexibility of the controller to be adapted to different applications. Of the most prominent examples of required external circuitry a regulated power supply should be mentioned.

Microcontrollers are generally not the products. The systems/products developes using microcontrollers are called as a product of *Embedded Systems*. Terms are generally confused!

A quick google search for the keyword *microcontroller* reveals some of the many integrated circuits, and some common experimentation board for microcontrollers:

![Google search for microcontroller]({{ site.baseurl }}/assets/images/microcontrollerFail.png)
*Google search for microcontroller*


Embedded Systems
--------------------

{: .notice--primary}
**Definition 1:** Information processing systems embedded into enclosing products such as cars, telecommunication or fabrication equipment. -- Main reason for buying is notinformation processing.  *[Peter Marwedel, T. U. Dortmund]*

{: .notice--primary}
**Definition 2:** Embedded software is software integrated with physical processes.  The technical problem is managing time and concurrency in computational systems.  *[Edward A. Lee,  U. C. Berkeley]*

The first definition draws a wider boundary for the embedded systems category whereas the second definition states that integration with physical processes is required for a system to be considered as embedded.  We can argue for example, whether the cellular phones are embedded systems or not.  If we were asking this question in 1990s, then the answer would more likely to be "yes".  Early cellular phones were 100% phones mostly dealing with challenges of receiving and transmitting audio signals in real-time.  Most of the today's cellular phones however, are equipped with several additional features, so that sometimes less than 10% of the price paid goes into the phone functionality.  The remaining 90% buys a color screen, a camera, an Internet browser, an audio/video player, and more.  A $499 cellular phone sold today is an embedded system according to the first definition.  According to the second definition, it is only 10% embedded system where the remaining 90% can be categorized as a miniaturized PC. The second definition is a more precise categorization of embedded systems as they are seen from the electrical engineering perspective.  

{: .notice--success}
Within the scope of this course, an embedded system is a device that answers the design challenges related to one or more of the characteristics listed in the following section. It is not really important how many of these design challenges we must deal with while working on a project. The hardware and software development methods discussed in this course are all helpful design techniques whether we call the end product an embedded system or not.


Embedded System Characteristics
---------------------------------

Common examples of embedded systems include processors used in manufacturing equipment, transportation vehicles, telecommunication equipment, and consumer electronics.  Following are the characteristics of these systems:

1. **Interaction with the physical processes:**  Sensors acquiring information about processes and actuators (or actors) controlling those processes are the connections between the most common embedded systems and the outside physical world.  Signal conditioning, data acquisition, driver electronics and transducers are important parts of these systems.

2. **Real-time constraints:**  Failure to complete system tasks within a specified time frame may result in harm to the user or degradation of system performance.  Such failures may be life-threatening in transportation vehicles.  This is a consequence of the embedded systems' interaction with the physical world. Performance of a PC is not critical while editing a document or browsing Internet.  A user can spend 100 seconds waiting in front of a PC where it may take only 5 seconds to complete the same task in ideal operating conditions.  An embedded system controlling a process on the other hand, must execute the specified computations with the required frequency and precision.  We can find average performance of a PC satisfactory even if it appears to be too slow from time to time.  Unlike a typical PC application, averaged performance is not a meaningful measure when we consider real-time systems.  An embedded system must work within specifications every time, all the time, and its performance must be guaranteed without statistical arguments.

3. **Reliability:**  Embedded systems can be safety-critical as another natural consequence of being connected to the physical environment.  Following are the major requirements of a reliable system.

   - **Availability:**  An embedded system must work within specifications as long as the system power is on.  Keeping wide tolerance limits (temperature, supply voltage, noise immunity, etc.) and implementing the necessary failure recovery procedures provide a high availability.
   - **Handling exceptions:**  Failure of a temperature sensor on a boiler should not cause a blast.  A dirty speed sensor should not result in a runaway wheel in the ABS system of a vehicle.  All similar failures of system components must be handled in the least harmful way.
   - **System start-up and recovery:**  Initial start-up and recovery after a power failure should be safe and consistent.
   - **Security:**  If necessary, access to the system controls must be restricted to the authorized users.  User data should be kept confidential whenever it is required and external communications should be protected.

4. **Efficiency:**  The following measures can be used for evaluating the efficiency of embedded systems:

   - **Power consumption:**  Many embedded systems run on batteries or they may rely on limited supplies provided through other system components.
   - **Code efficiency:**  In most cases the entire code of an embedded system is stored with the system.  The code-size to implement the required functionality should be as small as possible especially for the systems to be manufactured in large quantities.
   - **Run-time efficiency:**  The minimum amount of resources should be used for implementing the required functionality.  We should be able to meet time constraints using the least amount of hardware resources and energy. Weight, compactness, and manufacturing costs can be the other efficiency factors in embedded systems applications.  Weight of a mobile consumer electronics device may not be critical, but usually there are strict limits for the systems used on aircrafts and military equipment.

5.  **Dedicated application:**  Embedded systems are dedicated towards a certain application.  User interfaces are also specialized and optimized for that application.

Applications
=================

The following list summarizes the key areas in which embedded systems are used:

* **Industrial process control:**  Control systems used in manufacturing environments are the most typical examples of embedded systems.  Reliability of these systems is critical.
* **Household and consumer electronics:**  Home appliances, air conditioning equipment, and home security systems are the growing application areas for embedded systems.  Simple electrical or electromechanical control units have been replaced by more reliable and efficient digital controllers.

  Consumer electronics which constitutes the major part of the electronics industry relies on embedded processors.  The processing capability integrated into video and audio equipment is growing progressively with addition of high-performance digital signal processing (DSP) and memory units.  Mobile phone manufacturers have been pushing DSP and storage capabilities to the limits set by the power efficiency requirements in a very competitive market.
* **Medical equipment:**  Medical equipment used for diagnostic, therapeutic, and surgical purposes in hospitals have always been a traditional application area for embedded systems.  Home-care medical equipment and wearable devices or implants for patient monitoring and therapy purposes have growing potential for improving the quality of medical care.  Information processing power combined with the data storage and remote communication capabilities makes the embedded systems critical components of all modern medical devices .
* **Automotive electronics:**  Cars and trucks that have been sold during the last few decades contain a number of electronic control units.  A few examples are engine and emission control systems, air bag controllers, anti-lock braking systems (ABS), navigation computers with GPS.  Reliability of these systems are critical for user safety.  Embedded systems also have an important place in other transportation vehicles such as trains and all kinds of boats where user safety is critical.
* **Avionics equipment:**  All airplanes used for civil aviation or military purposes rely on electronic control and safety systems most of which can be classified as embedded systems.  An essential fraction - in some cases more than half - of the total cost of airplanes goes into the electronic components.
* **Robotics:**  Embedded systems are the essential parts of robots or robotic actuators as a natural consequence of their interaction with the physical environment.
* **Military applications:**  In many sections of the electronics industry, military applications led the development of electronic systems mainly due to the availability of financial resources for R&D.  Embedded systems have been used heavily in the military equipment for telecommunication, navigation, remote sensing, targeting, and several other applications


Microcontroller (UC), Microprocessor, Integrated Circuit (IC)
---------------------------------------------------------------
**Integrated Circuit (IC):** (sometimes called a chip or microchip) a semiconductor wafer on which thousands or millions of tiny resistors, capacitors, and transistors are fabricated. An IC can function as an amplifier, oscillator, timer, counter, computer memory, or microprocessor. A particular IC is categorized as either linear (analog) or digital, depending on its intended application.

**Microprocessor:** An IC which has only the CPU inside them i.e. only the processing powers such as Intel's Pentium 1,2,3,4, core 2 duo, i3, i5 etc. These microprocessors don't have RAM, ROM, and other peripheral on the chip. A system designer has to add them externally to make them functional. Application of microprocessor includes Desktop PC's, Laptops, notepads etc.

It should be noted that although a microprocessor requires external memory to operate, modern microprocessors often incorporate internal memory (known as cache) in order to execute operations more efficiently. In practice many modern developments challenges the traditional definitions of the various parts of a computer system.

**Microcontroller (UC):** A system of a microprocessor that is packaged with RAM, program storage and interface (I/O) circuitry to make it simple to use.  They're most used in (you guessed it) control applications. They are designed to perform specific tasks. Specific means applications where the relationship of input and output is defined.

A nice video (here)[https://www.youtube.com/watch?v=i_g1dD5fFLo&list=PLCGXHlZcvbOVHdD6hZVXdLzBcFt09UcpK&index=27&ab_channel=OliverSimon].

**Embedded System:** The product that uses a microprocessor (or microcontroller) as a component. It consists of both hardware and software.

![Embedded system block diagram]({{ site.baseurl }}/assets/images/EmbeddedSystems.png)
*Embedded system block diagram*

Also there are some other early-fundamental tools that can be comparable with microcontrollers:

**Programmable Logic Controller (PLC):** is a specialized industrial computer. It is custom programmed to monitor input signals (digital or analog), perform logical operations, and trigger specific output signals. PLCs are known to be rugged and are commonly used in extreme industrial environments or applications that have almost no room for failure. PLCs are popular because of their modular structure. This makes them easy to install in a plug-and-play manner.

**Field Programmable Gate Array (FPGA):** can be defined as a *kind of* microprocessor which doesn't have any hardwired logic blocks because that would defeat the field programmable aspect of it. An FPGA is laid out like a net with each junction containing a switch that the user can make or break. This determines how the logic of each block is determined. Programming an FPGA involves learning HDL or the Hardware Description Language; a low level language that some people say to be as difficult as assembly language. Compared to FPGAs, microprocessors have fixed instructions.


Microprocessor Processing Structure
=======================================

![Batman is awesome!]({{ site.baseurl }}/assets/images/Batman.png)
*Batman is awesome!*

All of you know the stereotype: "computers work with ones and zeros". When I was in the first grade of the engineering class, whenever some bighead told me this sentence, I always wanted to kick their face with a spade. *Everyone* knows that a computer works with ones and zeros but really, *how?*

Well, so far what we know that a processor consists of millions of transistors. It is obvious that switching on/off transistors creates those *famous* ones and zeros. But again, how when you type :code:`printf("Hello world!");` on a strange window (we will call it later IDE), thousands of transistor switches on and off in a couple of nanoseconds and a **Hello world!** appears on another strange window (typically called a Console)?

There are many levels of nested knowledge which is required to fully grasp all the details of what is going on here. Furthermore a lot of software developers live happily without an understanding of the complete picture. Still some knowledge is required, especially for the times when things are not working they way you expect.

Compilation
---------------

The program you write usually contains at least two types of instructions. First it typically contains instruction to import other code in the form of libraries which are prepared for your convenience. Secondly your code, and the libraries contains instructions (formally known as statements) which are to be interpreted by the compiler.

For nerds: (Compiler)[https://www.wikiwand.com/en/Compiler>] and for YouTuber nerds: (how does a computer read a code)[https://www.youtube.com/watch?v=QXjU9qTsYCc&ab_channel=FrameofEssence].

The compiler is a computer program which translates computer code written in one programming language (the source language) into another language (the target language). There are two versions of your program: the one you wrote but a computer can't read (source code), and the magically generated one that a computer can read (machine code). 

{: .notice--primary}
Except, a better than magic!

The following figure attempts to illustrate this process:
   
.. figure:: {{ site.baseurl }}/external/fig/Compiler.png
          :alt: Compiler illustration
          :align: center

..
   A compiler fills the gap between a human readable code and a machine readable code. Let's dive into the lovely princaple of a compiler (and assembler).
   Basically, a CPU (or microprocessor) can do a small number of things. They can read from /write to the memory and do some basic math operations (+ - * / & | ~ ^ << >>).

And this is the reason why your 32-bit programs don't work on a 64-bit computer (or they are needed to be installed into System32 folder etc). Because the controller divides all those set of 10101101's into the parts that the architecture supports. If the processors are different or the operating systems are different, then they use different machine instructions. Today things works slightly different to overcome these compatibility issues but we are not in computer architecture class now so better to stop here.


Further down the path of development the generated machine code is transferred to the microcontroller memory. When the microcontroller is started it will read and execute one instruction at a time, while traversing step by step through the memory. Special instruction are also able to instruct the controller to jump to different areas of the memory, allowing the program to take different paths depending on some external factors.

.. figure:: {{ site.baseurl }}/external/fig/microprocessororganization.png
          :alt: Microprocessor organization
          :align: center

In practice there is usually an intermediate step between the source code, and the machine code. The intermediate step is known as the assembly code, and is a low level language where each statement corresponds to a single operation which is directly supported by the CPU. For some special cases where high performance is needed, or special features not available in the programming language are needed, assembly language is used. It is also used extensively by experienced developers while debugging code, as it is not always obvious how the compiler interpret and translates our instructions.

Traditionally all software was developed using assembly language, but higher level languages (such as C/C++) have been designed to simplify the development process for all but the most advanced or special cases.


..
   How it was like in microprocessor world in the past? That is this famous **assembly** code that many old-genius engineers talk about and at the end of the discussion there is always someone says "but it is really hard". 

|pic1| |pic2| |pic3|

.. |pic1| image:: {{ site.baseurl }}/external/fig/assembly1.png
   :width: 33%

.. |pic2| image:: {{ site.baseurl }}/external/fig/assembly2.png
   :width: 33%

.. |pic3| image:: {{ site.baseurl }}/external/fig/assembly3.png
   :width: 33%


**Why assembly language?**

* It gives us direct access to machine instructions that we cannot use in high-level languages.
* It can be the best (only) way to generate efficient code in terms of speed and memory usage.
* It provides a better insight in to what is actually going on inside the computer (or microcontroller)
* It allows us to exploit hardware features not available in the programming language. One typical example is context switching of threads in a operating system.
* Provides a deeper understanding of how the system is operating. Invaluable when it comes to understanding the low level details of how the computer operates.

..
   ***Personal opinion:** it doesn't worth today.*
   Eirik disagree, but I agree that it is not worth it for a basic course such as ELE102

The embedded system is a bottomless well. It is impossible to cover everything in this course - and we don't need to. Embedded system world is a charming nerdy black hole that pulls you inside even more as you are willing to learn more. Therefore we limit have to limit for this course at some point.

For the youtubers:  `How do computers read code? <https://www.youtube.com/watch?v=QXjU9qTsYCc>`_ , The Evolution Of CPU Processing Power `Part 1 <https://www.youtube.com/watch?v=sK-49uz3lGg&t=315s>`_ `Part 2 <https://www.youtube.com/watch?v=kvDBJC_akyg>`_ `Part 3 <https://www.youtube.com/watch?v=NTLwMgak3Fk>`_ .




.. rubric:: Footnotes
.. [#f8] Strictly speaking the computer also reads the source language, but this reading process is more indirect. There is another set of instructions (another program, the compiler) running on the CPU which reads the code. The finalized program will be directly readable by the CPU without this intermediate step. Additionally for our purposes the compiler runs on your PC, while the finished program runs on the microcontroller.

References
----------
.. [#f1] "Microcontroller," Wikipedia, The Free Encyclopedia. [Online]. Available: `http://en.wikipedia.org/wiki/Microcontroller <http://en.wikipedia.org/wiki/Microcontroller>`_. [Accessed: 2024].
.. [#f2] Marwedel, Peter,  "Embedded System Design"  Springer, Boston, MA,  2006.
.. [#f3] Izmir Institute of Technology - Department of Electrical and Electronics Engineering *EE443 - Embedded Systems lecture notes - 2013*
.. [#f4] https://resources.altium.com/pcb-design-blog/plc-vs-embedded-system-when-you-should-choose-a-plc-despite-the-higher-cost-per-unit - 14 January 2020
.. [#f5] https://www.element14.com/community/groups/fpga-group/blog/2018/02/22/comparing-an-fpga-to-a-microcontroller-microprocessor-or-an-asic - 14 January 2020
.. [#f6] https://www.elprocus.com/difference-between-avr-arm-8051-and-pic-microcontroller/ - 14 January 2020.