---
layout: single
title: "Lecture 1 - Intro"
permalink: /lectures/l1-intro
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
   - Enter a project name (e.g., "Blink_LED")
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
here is my code
```
