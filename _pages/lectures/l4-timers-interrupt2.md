---
layout: single
title: "Lecture 4 - Timers and Interrupt 2"
permalink: /lectures/l4-timers-interrupt2
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
Detaljert om GPIO. Inngang og utgang, push-pull vs open-drain. Pull-up og pull-down. Bruk av tabellar (array) med fleire trykknappar og lysdiodar. -->


# Binary operations
## The Basics: Bits, Bytes, and Hexadecimal
Before we start, let's quickly review the building blocks:

- **Bit:** The smallest unit of data, either a 0 or a 1.
- **Byte:** A group of 8 bits.
- **Nibble:** A group of 4 bits (half a byte).
- **Word:** The natural unit of data used by a particular processor. For the STM32F767 (a 32-bit microcontroller), a word is typically 32 bits (4 bytes).
- **Hexadecimal (Hex):** A base-16 number system often used to represent binary data concisely. Each hexadecimal digit represents 4 bits. You will frequently see hexadecimal numbers when dealing with STM32F767 registers (e.g., GPIOA->ODR = 0x01;). It's much more readable than a long string of binary digits.

## Addition, subtraction and compliment
Adding two 4-bit numbers:
```c
  0101 (5 in decimal)
+ 0011 (3 in decimal)
------
  1000 (8 in decimal)
```
Subtracting two 4-bit numbers:
```c
  1010 (10 in decimal)
- 0011 (3 in decimal)
------
  0111 (7 in decimal)
```
1's compliment: Convert the bit to its opposite.
```c
Number: 0101
One's Complement: 1010
```
2's compliment: Two's complement is the most common method for representing signed integers in computers, including the STM32F767.
To find the two's complement:
  1. Find the one's complement.
  2. Add 1 to the one's complement.

Example: Find the two's complement of 0101 (positive 5):
```c
1. One's complement: 1010
2. Add 1: 1010 + 1 = 1011
```

So, **1011 represents -5** in a 4-bit two's complement system.

## Bitshift operators

**Left Shift (<<)** Shifts bits to the left, filling vacant positions with 0s. Each left shift is equivalent to multiplying by 2.

```c
Example: 0001 << 2
0001 (1 decimal)
0010 (2 decimal, after 1st shift)
0100 (4 decimal, after 2nd shift)
```

We use left shift operator when we create bit masks:
```c
// Enable clock for GPIOA in the RCC AHB1ENR register
// GPIOAEN is bit 0 in AHB1ENR
RCC->AHB1ENR |= (1 << 0);
```
One can also use left shift to multiply a number by 2:
```c
uint32_t value = 10;
value = value << 2; // value becomes 40 (10 * 2^2)
```

**Right Shift (>>)** Shifts bits to the right. For unsigned numbers, 0s are typically shifted in from the left. For signed numbers, the sign bit is usually replicated (arithmetic right shift) to preserve the sign.

```c
Example: 0100 >> 2
0100 (4 decimal)
0010 (2 decimal, after 1st shift)
0001 (1 decimal, after 2nd shift)
```
We use right shift to extract bit fields, but it is not as often used as left shift:
```c
// Assuming a 32-bit register where bits 8-10 represent a value
uint32_t register_value = some_register;
uint32_t extracted_value = (register_value >> 8) & 0x07; // 0x07 is 0b111 mask for 3 bits
```
One can also use right shift to divide a number by 2:
```c
uint32_t value = 40;
value = value >> 2; // value becomes 10 (40 / 2^2)
```

## Binary operators
**Bitwise AND(&)**

AND operator is the same as you know from introduction to programming and/or digital electronic courses. However in microcontrollers AND operator has two particular usages: Clearing a specific bit and checking if a pin is set.

First remember the truth table of AND:
Here is the truth table for the AND operator:

| A | B | A & B |
|---|---|-------|
| 0 | 0 |   0   |
| 0 | 1 |   0   |
| 1 | 0 |   0   |
| 1 | 1 |   1   |

The result is only 1 if **both** A and B are 1; otherwise, the result is 0.
How do we *clear bits* using AND operator? We use & with a mask to clear (set to 0) specific bits while leaving others unchanged: `REG &= ~(1 << bit_position)`
```c
// Clear bit 0 (PA0) of GPIOA->ODR register
// To turn off an LED connected to PA0
GPIOA->ODR &= ~(1 << 0); // (1 << 0) creates 0b000...0001
                         // ~(1 << 0) creates 0b111...1110 (all bits set except bit 0)
```
How do we check id a bit is set?
```c
// Check if bit 5 (PA5) of GPIOA->IDR register is set
if (GPIOA->IDR & (1 << 5)) {
    // PA5 is high
}
```
**Bitwise OR(|)**

OR operator is the same as you know from introduction to programming and/or digital electronic courses. However in microcontrollers OR operator has a particular usage: Setting a specific bit and checking if a pin is set.

First remember the truth table of AND:
Here is the truth table for the AND operator:

| A | B | A &#124; B |
|---|---|---------|
| 0 | 0 |   0     |
| 0 | 1 |   1     |
| 1 | 0 |   1     |
| 1 | 1 |   1     |

The result is 1 if **either** A or B is 1; otherwise, the result is 0.

We use | with a mask to set (set to 1) specific bits while leaving others unchanged: `REG |= (1 << bit_position)`
```c
// Set bit 0 (PA0) of GPIOA->ODR register
// To turn on an LED connected to PA0
GPIOA->ODR |= (1 << 0); // (1 << 0) creates 0b000...0001
```

So by using OR and AND operators, we manipulate registers:
```c
// Configure PA5 as output (assuming MODER is a 2-bit field)
// MODER5[1:0] = 01 (General purpose output mode)
// This example is simplified; actual register manipulation involves masks.
GPIOA->MODER |= (1 << (5 * 2)); // Sets MODER5[0]
GPIOA->MODER &= ~(1 << (5 * 2 + 1)); // Clears MODER5[1]
```

**Bitwise XOR(^)**

The bitwise XOR (exclusive OR) operator returns 1 if the corresponding bits are different. 
Here is the truth table for the XOR (exclusive OR) operator:

| A | B | A ^ B |
|---|---|-------|
| 0 | 0 |   0   |
| 0 | 1 |   1   |
| 1 | 0 |   1   |
| 1 | 1 |   0   |

The result is 1 if **A and B are different**; otherwise, the result is 0.

In microcontrollers, we use XOR to toggle a bit.

```c
// Toggle bit 0 (PA0) of GPIOA->ODR register
// To blink an LED connected to PA0
GPIOA->ODR ^= (1 << 0);
```

# External Interrupts
definition
Debugging, reading register value using platformIO.

# Edge detection
pass

# Debouncing
debouncing, oscilloscope.

# Pull-up vs Pull-down

# ISR
NVIC
Interrupr priorities
Interrupt nesting
Enabling/Disabling interrupts
<!-- https://deepbluembedded.com/stm32-interrupts-tutorial-nvic-exti/ -->
<!-- https://deepbluembedded.com/stm32-external-interrupt-example-lab/ -->

## Key Considerations in interrupt usage
- **Keep ISRs Short and Fast:** This is the most crucial rule for any interrupt handler. Avoid:
  - Long delays (e.g., `HAL_Delay()`).
  - Complex calculations.
  - Blocking operations (e.g., waiting for peripherals).
  - Printing to serial (e.g., `printf`) if it's blocking.
  - If you have extensive work to do, set a flag in the ISR and handle the work in your main loop or a dedicated task (if using an RTOS).
- **Debouncing:** Buttons are mechanical and create electrical noise (bouncing) when pressed/released. Without debouncing, a single button press can trigger multiple interrupts. Implement either:
  - Hardware debouncing (RC circuit), or
  - Software debouncing (like the example above, or a more robust state machine).
- **Volatile Keyword:** If you use a global variable (like `last_button_press_time` or `button_pressed_flag`) that is modified inside an ISR and read elsewhere (e.g., in `main`), declare it as `volatile`. This tells the compiler not to optimize away reads/writes, ensuring the latest value is always used.
- **Interrupt Priority:** In STM32CubeMX, configure the NVIC (Nested Vectored Interrupt Controller) priority for your EXTI line. Higher priority interrupts can preempt lower priority ones.
- **Re-entrancy:** Be careful if your ISR modifies variables that are also accessed by the main loop or other ISRs. Use appropriate synchronization mechanisms (like briefly disabling interrupts, or using RTOS semaphores/mutexes) if necessary, but generally, keep it simple for GPIO toggling.

# Exercise: SOS
Any port, any pin, SOS exercise with button.

# Exercise (Home/Lab): Tilt sensor with LED blink
<!-- Look at some digital sensors, IR count maybe? -->
Make a project that your where you will blink two LEDs: one green one red. Additionally you will have a tilt sensor. As the project stays horizontal, a only green LED will blink at 2 Hz. As the project tilted, the only red LED will blink at 5 Hz.
1. You should figure our which pin numbers are connected to green and red LEDs using user manual.
  Alternatively, you can connect external LEDs.
2. You should choose an input pin as GPIO_Input for the tilt sensor.
3. Make sure the clock calculations are correct and you get desired blink frequencies.