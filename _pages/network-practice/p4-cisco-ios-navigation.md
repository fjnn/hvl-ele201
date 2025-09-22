---
layout: single
title: "Cisco IOS Navigation"
permalink: /network-practice/p4-cisco-ios-navigation
toc: true
breadcrumbs: true
sidebar:
  - title: "Practical Topics"
    image: /assets/images/logo.png
    image_alt: "image"
    nav: network-practice
taxonomy: markup
---

The operating system (OS) of a device allows the user to interact with the hardware. Commonly known operating systems for computer are Windows, macOS or Ubuntu. These are example of a graphical user interface (GUI), where the user can interact with the system using graphical icons, menus and windows. Another way of interacting with the operating system is through a command line interface (CLI), where the user uses text commands through a software often called terminal. In general, a GUI requires less knowledge of the underlying command structure and is therefore more intuitive to use for the User. CLIs, on the other side, tends to be more powerful for controlling the hardware, less resource intensive and more stable. For this reasons, network devices are typical accessed through a CLI. The OS used by Cisco devices is called the Cisco Internetwork Operating System (IOS).

![GUI vs. CLI]({{ site.baseurl }}/assets/images/gui_cli.png)

# Access Methods
Even though some networking devices, like a switch, may work out of the box, they should still be configured for security reasons. There are three main ways of connecting to a network device in order to configure it:
- **Console:** This connection method uses a special console cable to connect the computer and the networking device. A terminal emulation software, e.g. PuTTY, is used on the computer to send commands. This method provides access to the device even when the network is not working and is therefore used for initial configuration of a device. But it requires physical access to the device.
- **Telnet:** Is a method that allows the User to remotely access a device over the network. Therefore if the network is not working this method won't work either. The connection is also not secured through encryption but rather just send commands, passwords and user authentications in plane text. It is therefore recommended to use SSH instead.
- **Secure Shell (SSH):** is similar to Telnet in that it establishes a remote connection to a device over the network. Unlike Telnet, SSH communication is secured through encryption and is therefore the recommended method for remote access. However, it still requires a function network and a configured interface on the device.

![Console Cables and Port]({{ site.baseurl }}/assets/images/console_connection.png)

# IOS Navigation
Previously we discussed that network devices require an operating system (OS) and that we can configure those devices through either a CLI or a GUI. In this course we will use the CLI to configure our devices. The Cisco IOS software has multiple levels which can be protected through passwords. The levels are as follows:

1. **User EXEC Mode:**
  This mode has limited capabilities but is useful for basic operations. It allows only a limited number of basic monitoring commands but does not allow the execution of any commands that might change the configuration of the device. It is therefore often referred to as "view-only" mode. The user EXEC mode is identified by the CLI prompt that ends with the `>` symbol. The name before is the name assigned to the device (hostname).
  ```
  Switch>
  ```
  
  
2. **Privileged EXEC Mode:**
  This mode allows access to all commands and features. The user can use any monitoring commands and execute configuration and management commands. Higher configuration modes, like global configuration mode, can only be reached from privileged EXEC mode. The privileged EXEC mode can be identified by the prompt ending with the `#` symbol. To go from User EXEC Mode to Privileged EXEC Mode the command is `enable`.
  ```
  Switch> enable
  Switch#
  ```
  To return to User EXEC Mode from Privileged EXEC Mode the command is `disable`.
  ```
  Switch# disable
  Switch> 
  ```
3. **Global Configuration Mode:**
  To configure the device, the user must enter global configuration mode, which is commonly called global config mode. From global config mode, CLI configuration changes are made that affect the operation of the device as a whole. Global configuration mode is identified by a prompt that ends with `(config)#` after the device name. To access global config mode use the command `configure terminal`.
  ```
  Switch# configure terminal
  Switch(config)# 
  ```
  To return to Privileged EXEC Mode from Global Configuration Mode use either `end` or `exit`.
  ```
  Switch(config)# end
  Switch#
  ```
4. **Subconfiguration Modes:**
   From global config mode, the user can enter different subconfiguration modes. Each of these modes allows the configuration of a particular part or function of the IOS device. Two common subconfiguration modes include Line Configuration Mode and Interface Configuration Mode.
  - **Line Configuration Mode:**
    Is used to configure Console, SSH or Telnet access. Line Configuration Mode is identified by a prompt ending with `(config-line)#`. To move from global config mode to line config mode use the `line` command followed by a specification of what line to configure.
    ```
    Switch(config)# line console 0
    Switch(config-line)#
    ```
    To move from any subconfiguration mode back to global configuration mode use the `exit` command.
    ```
    Switch(config-line)# exit
    Switch(config)#
    ```
    To move from any subconfiguration mode directly back to privileged EXEC mode use the `end` command.
    ```
    Switch(config-line)# end
    Switch#
    ```
    You can also move directly from one subconfiguration mode to another. Notice how after selecting an interface, the command prompt changes from `(config-line)#` to `(config-if)#`.
    ```
    Switch(config-line)# interface FastEthernet 0/1
    Switch(config-if)#
    ```
  - **Interface Configuration Mode:**
    Is used to configure any switch port or router network interface. Interface Configuration Mode is identified by a prompt ending with `(config-if)#`. To move to interface configuration mode use the `interface` command followed by the port type and ID number.
    ```
    Switch(config)# interface FastEthernet 0/1
    Switch(config-if)#
    ```