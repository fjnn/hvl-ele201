---
layout: single
title: "Lecture 1 - Intro"
permalink: /lectures/l1-firstcode
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
Blinking av lysdiode med HAL-biblioteket. main() funksjonen. Variablar og datatypar. Forskjellen på ein (const) variabel og #define. If-setningar, løkker. Enkel bruk av printf() for skriving til UART.
(Vise at ein kan velje Arduino rammeverk på Platformio)

Make sure that eveything you needed are installed: 
[Installation Guide]({{ site.baseurl }}/lectures/l0-install)


## Start your first STM32F767ZI-Nucleo Project

1. Click on the PlatformIO icon in the left sidebar
2. Click on "PIO Home" in the PlatformIO menu
3. Click on "New Project"
4. In the project wizard:
   - Enter a project name (e.g., "first_blink")
   - Select "STM32F767ZI Nucleo" from the board dropdown
   - Select "STM32Cube" as the framework
   - Choose a location for your project. *A folder in OneDrive might cause problems if the folder path is too long!*
   - Click "Finish"
5. PlatformIO will automatically:
   - Download the necessary STM32F7xx HAL libraries
   - Set up the project structure
   - Configure the build environment
6. Wait for the initialization to complete (this might take a few minutes)
7. Once completed, you'll see a new project with the following structure:
   - `src/` - Your source code files
   - `include/` - Header files
   - `platformio.ini` - Project configuration file


main.c

```c
#include "main.h"

void LED_Init();

int main(void)
{
  HAL_Init();
  LED_Init();

  while (1)
  {
    HAL_GPIO_TogglePin(LED_GPIO_PORT, LED_PIN);
    HAL_Delay(500);
  }
}

void LED_Init()
{
  LED_GPIO_CLK_ENABLE();
  GPIO_InitTypeDef GPIO_InitStruct;
  GPIO_InitStruct.Pin = LED_PIN;
  GPIO_InitStruct.Mode = GPIO_MODE_OUTPUT_PP;
  GPIO_InitStruct.Pull = GPIO_PULLUP;
  GPIO_InitStruct.Speed = GPIO_SPEED_HIGH;
  HAL_GPIO_Init(LED_GPIO_PORT, &GPIO_InitStruct);
}

void SysTick_Handler(void)
{
  HAL_IncTick();
}
```

## CubeMX + PlatformIO project
The code above is simple and easy to write. However, as we progress in the different tasks, it will be very difficult to remember all the configurations. In old times, embedded system engineers have their "own" libraries for various tasks, LCD setup, ADC initialization, PWM parameters etc. They used to copy or include these piece of codes into their projects as they need. Today, we have a tidier solutions. For our development board, we can use STM32CubeMX, which is a graphical tool that allows a very easy configuration of STM32 microcontrollers and microprocessors. Therefore, we don't need to write the code for every single configuration. We will be using STM32CubeMX *extensively* in this course.

You can watch this video to setup your first blink code using both CubeMX and PlatformIO: [Click here for the video](https://youtu.be/Ty_ekwVimHE).
<iframe width="420" height="315" src="https://youtu.be/Ty_ekwVimHE" frameborder="0" allowfullscreen></iframe>


The piece of code you need to add after `/*USER CODE BEGIN 3*/` is here:

```c
HAL_GPIO_TogglePin(LD1_GPIO_PORT, LD1_PIN);
HAL_Delay(500);
asdasd
```

The content of platformio.ini is here:

```ssh
[env:nucleo_f767zi]
platform = ststm32
board = nucleo_f767zi
framework = stm32cube
build_flags =
   -IInc
```
{: .notice--info}
**Note that**  there is a new configuration command in platformio.ini file that you didn't have when you generated the project only using PlatformIO, which is `build_flags`. We need this line because the naming convention in STM32CubeMX is different than PlatformIO. PlatformIO generated projects put the necessary header files (aka files with extension .h) are in the folder named **include** whereas the CubeMX generated projects keep the header files under **Inc**.

