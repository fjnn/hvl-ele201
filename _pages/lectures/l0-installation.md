---
layout: single
title: "Lecture 0 - Installation"
permalink: /lectures/l0-install
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
**Formål**:
Installasjon og introduksjon til C++.


# Requirements
You need VScode, Platformio and preferably STM32CubeMX.
- VScode is going to be the IDE, where we write our code. 
- PlatformIO is an extension that allows us to compile our code and send it to our STM32-Nucleo board.
- STM32CubeMX is a software that allows us configure the pins on the board using a GUI, which will make the initial programming tasks much easier.


# Install VSCode
1. Download Visual Studio Code from [https://code.visualstudio.com/download](https://code.visualstudio.com/download)
2. Choose the appropriate installer for your operating system:
   - Windows: Download the "User Installer" (recommended) or "System Installer"
   - macOS: Download the appropriate version for your chip (Intel chip or Apple silicon)
   - Linux: Download the .deb (Debian/Ubuntu) or .rpm (Red Hat/Fedora) package
3. Run the installer and follow the installation wizard
4. Launch VSCode after installation
5. (Optional) During first launch, you may be prompted to install additional components - these are recommended for a better development experience

PS: You can watch this video tutorial on how to install VSCode.

## Install PlatformIO extension
Platformio is an extension for VSCode that allows you to write microcontroller codes and send them to your device. We will be using STM32F767 Nucleo board in this course, but you can program many more microcontrollers including Arduino using this powerful extension.

![PlatformIO Installation]({{ site.baseurl }}/assets/images/platformio-install.png)

1. Open VSCode
2. Click on the Extensions icon in the left sidebar (or press `Ctrl+Shift+X`)
3. In the search bar, type "PlatformIO"
4. Look for "PlatformIO IDE" by PlatformIO
5. Click "Install" and wait for the installation to complete
6. After installation, you may need to reload VSCode
7. Once reloaded, you should see the PlatformIO icon in the left sidebar
8. The first time you open PlatformIO, it will download and install necessary tools - this might take a few minutes

Make sure that you see the PlatformIO icon on the left after the installation. If not, restart the VS Code.

![PlatformIO Installation Complete]({{ site.baseurl }}/assets/images/platformio-install2.png)

Note: The first project creation might take longer as PlatformIO downloads all necessary libraries and tools. Subsequent projects will be faster.

# Install STM32CubeMX
This is an interactive GUI developed by STM to easily assign roles to your microcontroller pins as well as do fine time-related modifications before you start a new project. It generated a template code and it will be very useful later.

1. Download STM32CubeMX from [ST's official website](https://www.st.com/en/development-tools/stm32cubemx.html#st-get-software)
2. Create an [ST account](https://my.st.com/cas/login?lang=en&service=https%3A%2F%2Fwww.st.com%2Fcontent%2Fst_com%2Fen%2Fuser-registration.html%3Freferrer%3Dhttps%253a%252f%252fwww.st.com%252fen%252fdevelopment-tools%252fstm32cubemx.html)  if you don't have one (required for download) or login your ST account.
3. Choose the appropriate version for your operating system:
   - Windows: Download the Windows installer
   - macOS: Download the macOS package
   - Linux: Download the Linux package
4. Run the installer and follow the installation wizard
5. During installation:
   - Accept the license agreement
   - Choose the installation directory (default is recommended)
   - Select components to install (all are recommended)
6. After installation:
   - Launch STM32CubeMX
   - The first time you run it, it will download additional packages
   - This initial setup might take several minutes depending on your internet connection
7. Once installed, you can start creating new projects by:
   - Clicking "New Project"
   - Selecting your board (STM32F767 Nucleo)
   - Configuring pins and peripherals as needed

Note: Keep STM32CubeMX updated as new versions are released regularly with bug fixes and new features.

After the installation is completed, make sure that you can see STM32CubeMX in your apps.

![STM32CubeMX Installation Complete]({{ site.baseurl }}/assets/images/stmcubemx.png)

