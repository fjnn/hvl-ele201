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
