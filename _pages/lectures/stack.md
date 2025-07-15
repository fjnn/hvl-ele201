---
layout: single
title: "Stack overflow"
permalink: /stack
breadcrumbs: true

taxonomy: markup
---

## Elaborating on Increasing Stack Size (Permanently)

Let's elaborate on increasing the stack size in an STM32CubeMX-generated PlatformIO project.

### Understanding the Stack in Embedded Systems

In a microcontroller, the **stack** is a region of RAM used for:

  * **Local variables:** When you declare a variable inside a function (e.g., `int x;` in `myFunction()`), it's typically allocated on the stack.
  * **Function call arguments:** Values passed to functions are often pushed onto the stack.
  * **Return addresses:** When one function calls another, the address to return to after the called function finishes is pushed onto the stack.
  * **Context saving during interrupts:** When an interrupt occurs, the CPU's current state (registers, program counter) is pushed onto the stack so that it can be restored when the interrupt service routine (ISR) finishes.

The stack grows downwards from a high memory address to a lower one. If too much data is pushed onto the stack (e.g., deeply nested function calls, large local arrays, frequent interrupts), it can "overflow" and overwrite other critical data in RAM, leading to unpredictable behavior, crashes, or Hard Faults (even if you don't explicitly hit `Error_Handler` if the fault handler itself is corrupted or missing).

### Why Increase Stack Size?

You experienced an issue where a high-frequency interrupt (ADC DMA complete callback) was likely causing CPU overload or a stack pressure issue. While increasing the sampling time reduced the interrupt frequency and mitigated the immediate problem, it's still a good practice to ensure your stack has enough room for your application's needs.

  * **Preventative Measure:** As your project grows and you add more features (e.g., more complex functions, more peripheral interactions, RTOS, communication protocols), your stack usage will naturally increase. A slightly larger stack provides a buffer against future stack overflow issues.
  * **Robustness:** It makes your application more robust against unexpected stack usage spikes.
  * **Debugging Ease:** A generous stack can help prevent hard-to-debug crashes that are caused by subtle stack corruption.

### How to Increase Stack Size in a PlatformIO (STM32CubeMX) Project

The stack size for STM32 microcontrollers configured via STM32CubeMX is typically defined within the **linker script** (`.ld` file) of your project.

Here's a step-by-step guide:

1.  **Locate the Linker Script (`.ld` file):**

      * In your PlatformIO project in VS Code, expand the project folders.
      * Look for a file with a `.ld` extension. Its name will usually be specific to your microcontroller and flash/RAM configuration, such as:
          * `STM32F767ZITx_FLASH.ld` (most likely for your Nucleo-F767ZI)
          * `STM32F767ZITx_RAM.ld` (if you were running solely from RAM, less common)
          * It might be in the root of your project, or sometimes in a `ldscripts` or `platformio/ldscripts` folder, depending on how PlatformIO imports the CubeMX project.

2.  **Open the Linker Script:**

      * Double-click on the `.ld` file to open it in VS Code.

3.  **Find the Stack Definition:**

      * Search (Ctrl+F or Cmd+F) for keywords like `_estack`, `_sstack`, `_Min_Stack_Size`, or `STACK_SIZE`.
      * You'll likely find a section that looks similar to this (comments might vary):

    <!-- end list -->

    ```linker
    /* Specify the memory areas */
    MEMORY
    {
      RAM (xrw) : ORIGIN = 0x20000000, LENGTH = 512K /* Main Data RAM (SRAM1+SRAM2+SRAM3) */
      FLASH (rx) : ORIGIN = 0x8000000, LENGTH = 2048K /* Flash bank 1 */
      CCMRAM (xrw) : ORIGIN = 0x20000000, LENGTH = 64K /* Core Coupled Memory */
    }

    /* Define output sections */
    SECTIONS
    {
      /* ... other sections ... */

      .stack :
      {
        . = ALIGN(8);
        __StackLimit = .;
        KEEP(*(.stack*))
        . = . + _Min_Stack_Size; /* Or sometimes a fixed size like 0x400 */
        . = ALIGN(8);
        __StackTop = .;
      } >RAM /* Or sometimes >CCMRAM if configured for it */

      /* User_heap_stack section, used to check that these two areas are not overlapping */
      .user_heap_stack :
      {
        . = ALIGN(8);
        PROVIDE( _heap_end = . );
      } >RAM
      _Min_Heap_Size = 0x200; /* required amount of heap  */
      _Min_Stack_Size = 0x400; /* required amount of stack */
    }
    ```

    In the example above, `_Min_Stack_Size` is defined as `0x400`. This is 1024 bytes (0x400 in hexadecimal is 1024 in decimal).

4.  **Increase the Value:**

      * Change the value of `_Min_Stack_Size` to a larger hexadecimal value. Common increments are:
          * `0x800` (2048 bytes)
          * `0x1000` (4096 bytes or 4KB)
          * `0x2000` (8192 bytes or 8KB)
      * For instance, change `_Min_Stack_Size = 0x400;` to `_Min_Stack_Size = 0x1000;`.

    **Important Considerations:**

      * **Available RAM:** Be mindful of the total RAM available on your F767 (512KB for main RAM, plus CCMRAM). While these values (4KB, 8KB) are usually small compared to the total RAM, ensure you don't make the stack so large that it conflicts with your heap or other static data allocations.
      * **Heap vs. Stack:** The linker script also defines a heap size (`_Min_Heap_Size`). Heap is used for dynamic memory allocation (e.g., `malloc`). The stack and heap typically grow towards each other. If you increase the stack, it reduces the maximum available heap, and vice-versa. For simple embedded applications without `malloc`, the heap might not be used much, giving you more flexibility for stack size.

5.  **Save the Linker Script.**

6.  **Clean and Rebuild the Project:**

      * In PlatformIO, click the "Clean" icon (trashcan) in the toolbar.
      * Then, click the "Build" icon (check mark).
      * Finally, "Upload" (right arrow) the new firmware to your board.

After these steps, your microcontroller will be running with a larger allocated stack space, providing more room for function calls and interrupt context saving, and hopefully preventing any future stack-related crashes due to high ADC sampling rates or added features.

*Special thanks from Gizem to Gemini.*