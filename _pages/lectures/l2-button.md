---
layout: single
title: "Lecture 2 - Button read"
permalink: /lectures/l2-button
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
Lesing av trykknapp og skriving til LED. Header-filar og eksterne bibliotek. typedef og struct. Introduksjon til peikerar. Deklarasjon og definisjon av funksjonar, parameter og returtype.

# Some important C++ concepts
## Function definitions
pass

## Parameter and return types
pass

## Pointers
pass


# GPIO and registers
Getting more familiar with registers and reading datasheet.




# Exercise: User button - LED control
1. Look at the reference manual which port the user LEDs are connected.
2. Start a new STM32CubeMX project. If you select the default mode, the LED assignments will be already done.
3. Skip clock configurations (for now).
4. Do the necessary changes in the Project Manager tab and generate the source code.
5. Create a platformio.ini and Copy the necessary content in it.
6. Open the project using PlatformIO home page.
7. Do these necessary changes after `/*USER CODE BEGIN 3*/` in **main.c**.
```c
    /* USER CODE BEGIN 3 */
    if(HAL_GPIO_ReadPin(USER_Btn_GPIO_Port, USER_Btn_Pin)){
      HAL_GPIO_WritePin(LD2_GPIO_Port, LD2_Pin, GPIO_PIN_SET);
    }
    else{
      HAL_GPIO_WritePin(LD2_GPIO_Port, LD2_Pin, GPIO_PIN_RESET);
    }
```
8. Build and upload.
9. Observe the blue LED state as you press user button (blue button) on your board.

<!-- 
MUST WATCH! https://www.youtube.com/watch?v=zvTd3Zxtiek&ab_channel=pointer-x -->
<!-- https://www.youtube.com/watch?v=Hffw-m9fuxc&t=1s&ab_channel=MitchDavis -->



<!-- https://wiki.st.com/stm32mcu/wiki/STM32StepByStep:Step2_Blink_LED
https://deepbluembedded.com/stm32-gpio-write-pin-digital-output-lab/ -->


<!-- ## Button debounce
https://deepbluembedded.com/stm32-button-debounce-code-examples-tutorial/ -->
<!-- https://howtomechatronics.com/how-it-works/electrical-engineering/schmitt-trigger/ -->