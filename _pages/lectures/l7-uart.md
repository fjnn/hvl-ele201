---
layout: single
title: "Lecture 7 - UART: Universal Asynchronous Read and Write"
permalink: /lectures/l7-uart
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
UART. Lesing av og skriving til serieporten. Forklaring av baudrate.

# UART
pass


# Exercise: Send data from your board to PC
<!-- usart_test2.ioc -->
## On the STM32CubeMX
1. Launch STM32CubeMX.
2. Start a New Project:
  - Click **File > New Project** or click the **New Project** icon.
  - In the **Board Selector** tab, search for **NUCLEO-F767ZI**.
  - Select the board and click **Start Project**.

3. Select **No** when prompted for the default configuration.

4. Go to **System Core > RCC**: Set **HSE** to **Crystal/Ceramic Resonator**. 
  ![UART RCC settings]({{ site.baseurl }}/assets/images/uart_rcc.png)

5. Configure UART (USART3) 
  - In the **Pinout & Configuration** tab:
    - Navigate to **Connectivity > USART3**.
    - Set **Mode** to `Asynchronous`.
  - In the **Configuration** tab for USART3, set the following **Parameter Settings**:
    - **Baud Rate:** `115200`  
      (This must match your `platformio.ini` and code.)
    - **Word Length:** `8 Bits (Including parity)`  
    - **Parity:** `None`
    - **Stop Bits:** `1`
    - **Data Direction:** `Receive and Transmit`
        ![UART USART settings]({{ site.baseurl }}/assets/images/uart_usart.png)
6. To be able to see the serial port output without changing any hardware, using the same USB port we use for uploading code, we must select the right pin numbers. As you activate USART3, the default Tx and Rx pins are PB10 and PB11. However, **ST-Link uses PD8 and PD9** for this. Just click on the pin PB10 as you press Ctrl button, and drag this pin on top of the PD8. Afterwards, do the same for PB11->PD9.
7. Adjust the clock settings as needed for your board as show in figure.
  ![UART clock settings]({{ site.baseurl }}/assets/images/uart_clock.png)
8. Click **Project > Generate Code** to create your project files.
9. Give a good project name and generate code.


  

## On the Platformio

1. Inside `platformio.ini`:
```c
[env:nucleo_f767zi]
platform = ststm32
board = nucleo_f767zi
framework = stm32cube
build_flags = 
 -IInc
upload_protocol = stlink
debug_tool = stlink
monitor_speed = 115200 ; Set the baud rate for the serial monitor
```

    {: .notice--warning} 
      The UART baud rate you set in CubeMX (e.g., 115200) must match the baud rate you use in your serial terminal (such as PuTTY, Tera Term, or PlatformIO Monitor). If they do not match, you will see garbled or no output.

2. Inside `main.c`, between `/* USER CODE BEGIN Includes */`
    ```c
    #include<string.h>
    ```

3. Inside `main.c`, between `/* USER CODE BEGIN 3 */`
```c
    uint8_t value = 5;
    HAL_UART_Transmit(&huart3, &value, 1, HAL_MAX_DELAY); 
    HAL_GPIO_TogglePin(LD1_GPIO_Port, LD1_Pin);
    HAL_Delay(500);
```
Also observe the Logic analyzer output on Rx pin on CN5 connector:
 ![500ms delay]({{ site.baseurl }}/assets/images/logic_analy5.png)


### What if we want to send a string data?

```c
    const char *message = "Hello world from HAL_UART_Transmit!\r\n";
    HAL_UART_Transmit(&huart3, (uint8_t *)message, strlen(message), HAL_MAX_DELAY);
    HAL_GPIO_TogglePin(LD1_GPIO_Port, LD1_Pin);
    HAL_Delay(500);
```
After the upload, you should press the socket icon, or `Ctrl + Alt + S` to open serial monitor and see this output:
 ![Serial Monitor]({{ site.baseurl }}/assets/images/uart_serial_out.png)
Also observe the Logic analyzer output:
 ![500ms delay]({{ site.baseurl }}/assets/images/uart_string_out.png)


{: .notice--warning}
**Warning:** Pay attention that the type of your data is important. String data is converted into ASCII. When we sent data:5 as integer and observed the binary value of 5. However, if we sent data:5 as string, we wouldn't see its binary value on the logic analyzer, but it's ASCII code.
  ```const char *message = "5\n";
    HAL_UART_Transmit(&huart3, (uint8_t *)message, strlen(message), HAL_MAX_DELAY);
    ```
 ![ASCII 5]({{ site.baseurl }}/assets/images/uart_ascii_5.png)

# Exercise: Send data between two boards
pass

# Bluetooth exercise
pass (maybe)

https://deepbluembedded.com/stm32-debugging-with-uart-serial-print/