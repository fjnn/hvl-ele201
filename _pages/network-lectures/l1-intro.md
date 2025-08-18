---
layout: single
title: "Introduction to Networking and Basic Concepts"
permalink: /network-lectures/l1-intro
toc: true
breadcrumbs: true
sidebar:
  - title: "Lectures"
    image: /assets/images/logo.png
    image_alt: "image"
    nav: network-lectures
taxonomy: markup
---
# Foreword
The content of the Network part of this course is mostly based on the Cisco Networking Academy (netacad) course **CCNA: Introduction to Networks**. If you want to learn about the topics in greater detail, I will always include a **Reference** section at the end that lets you know which modules cover the discussed content. 

# What is Networking?
Networking is the practice of connecting two or more computing devices, such as computers, laptops, printers, and mobile devices, so they can exchange data and share resources. These devices are linked together using a system of rules called communication protocols, which govern how information is transmitted over physical or wireless connections.

# Why is it important to learn about Networking?
Computer networks are the backbone of the modern digital world and these days almost all electronic devices are connected to some network like phones, vacuum cleaners, cars and many more. It is just as important in industry since most automated systems are not isolated but rather require communication between machines, robots, sensors and monitoring systems.

# The Big Picture
Basically, any time data has to go from one device to another networking protocols are involved. We will use a website as an example but the same is true for any data. When you see a website in your browser it has human-readable coding languages like HTML, CSS and JavaScript. But a computer operates on electrical signals that are either on or off. Therefore, the website code is transformed into a series of 1s and 0s. When the data is sent to another device, this stream of 1s and 0s goes through the following process:
1. It gets split into packages.
2. Additional information is added to each package (e.g. the address of the receiving device)
3. The packages get encoded into a physical signal, e.g. electrical signal for Ethernet communication, and sent to the destination device.

When the recieving device recieves the packages, it then goes through the same process in reverse to reconstruct the original data.

![Big Picture]({{ site.baseurl }}/assets/images/big_picture.png)


# Networking Hardware

## Switch
A network switch is a piece of hardware that connects multiple devices on a computer network. Its main job is to receive data packets from one device and forward them to the correct destination device on the same network. Unlike an older device called a hub, which broadcasts data to all connected devices, a switch intelligently sends data only to the specific device it's intended for. This makes the network more efficient and secure. It is important to understand that a switch can only forward packages to other devices in the same network. If the package destination is on another network a router is needed. The decision of where to forward the package is made based on the MAC Address.

![Cisco Switch]({{ site.baseurl }}/assets/images/cisco_switch.jpg)

## MAC Address
A MAC address (Media Access Control address) is a unique, hard-coded identifier assigned to a network interface controller (NIC), like an Ethernet or Wi-Fi card. It's used for communication within a local network segment, such as between your computer and a router. Think of it as a physical, permanent serial number for your device's network card. We will learn more about switches and MAC Addresses in [Lecture 2]({{ site.baseurl }}/network-lectures/l2-data-link-and-network-layer).

![MAC and IP Address]({{ site.baseurl }}/assets/images/ip_mac_address.png)

## Router
A router is a networking device that forwards data packets between different computer networks. Its primary job is to act as a traffic director on the internet, ensuring that data sent from one network reaches its correct destination on another network. This is a key difference from a network switch, which only forwards data within a single network. The router makes routing decisions based on the IP address of the destination, which is a logical address that identifies a device and the network it belongs to.

![Cisco Router]({{ site.baseurl }}/assets/images/cisco_router.jpg)

## IP Address
An IP address (Internet Protocol address) is a unique numerical label assigned to every device connected to a computer network that uses the Internet Protocol for communication. Think of it as a digital address for your device, allowing it to send and receive data across a network, much like a street address allows mail to be delivered to your home. An IP address defines both the network address (street number) and the host address (house number). The subnetmask is used to identify which part of the IP address is for network and which part is for host identification. The default gateway is the address of the router connected to the local network. Packages that are sent to an IP Address that is in another network will be sent to the default gateway. There are two main versions of IP addresses: IPv4 and IPv6. We will learn more about the details of IP Addresses in [Lecture 3]({{ site.baseurl }}/network-lectures/l3-ip-address-p1) and [Lecture 5]({{ site.baseurl }}/network-lectures/l5-ip-address-p2).


## Media
In networking, media refers to the physical or wireless communication channels through which data travels from one device to another. It is the "medium" that carries information, such as electrical signals, light pulses, or radio waves, across a network. There are there main types of media:
- **Copper Cable:** Also known as Ethernet cables. It transmits data using electrical impulses. It can be susceptible to eletromagnetic interference and therefore sometimes requires shielding.
- **Fiber-optics:** Transmits data using light pulses through thin strands of glass or plastic. It offers extremely high speeds, can travel long distances without signal degradation, and is immune to electromagnetic interference. It is the preferred choice for long-distance communication backbones.
- **Wireless:** Transmits data through the air using electomagnetic waves. This is the transmission method most prone to interferance. 

We will learn more about Media in [Lecture 8]({{ site.baseurl }}/network-lectures/l8-physical-layer).

![Physical Media]({{ site.baseurl }}/assets/images/media_simple.png)





# OSI Reference Model
We discussed previously that data must go through a process before it can be transmitted to another device. The details of this process can vary depending on the protocol that is being used, e.g. how to split the data, what information is added to each package and how to encode the package into a physical signal. A network protocol is a standardized set of rules. Meaning that if I tell the receiving device which protocol I’m using to encode my data, it then knows how to decode what it receives to reconstruct the original data.
In reality, there are multiple protocols used when communicating between devices, where each protocol works on a different level in the encoding/decoding process. The different levels, also called layers, have been developed and specified by the International Organization for Standardization (ISO) in a model called Open System Interconnection (OSI) model. The different layers look as follows:

![OSI Layer Model]({{ site.baseurl }}/assets/images/osi_model.png)

Throughout the semester we will learn what happens in each layer and in [Lecture 9]({{ site.baseurl }}/network-lectures/l9-transport-layer) we will discuss in more detail the different types of protocols and their function.


# Cisco IOS
The operating system (OS) of a device allows the user to interact with the hardware. Commonly known operating systems for computer are Windows, macOS or Ubuntu. These are example of a graphical user interface (GUI), where the user can interact with the system using graphical icons, menus and windows. Another way of interacting with the operating system is through a command line interface (CLI), where the user uses text commands through a software often called terminal. In general, a GUI requires less knowledge of the underlying command structure and is therefore more inuetive to use for the User. CLIs, on the other side, tends to be more powerful for controlling the hardware, less resource intensive and more stable. For this reasons, network devices are typicall accessed through a CLI. The OS used by Cisco devices is called the Cisco Intenetwork Operating System (IOS).

![GUI vs. CLI]({{ site.baseurl }}/assets/images/gui_cli.png)

## Access Methods
Even though some networking devices, like a switch, may work out of the box, they should still be configured for security reasons. There are three main ways of connecting to a network device in order to configure it:
- **Console:** This connection method uses a special console cable to connect the computer and the networking device. A terminal emulation software, e.g. PuTTY, is used on the computer to send commands. This method provides access to the device even when the network is not working and is therefore used for initial configuration of a device. But it requires physical acces to the device.
- **Telnet:** Is a method that allows the User to remotly access a device over the nework. Therefore if network is not working this method won't work either. The connection is also not secured through encryption but rather just send commands, passwords and user authications in plane text. It is therefore recommended to user SSH instead.
- **Secure Shell (SSH):** is similar to Telnet in that it establishes a remote connection to a device over the network. Unlike Telenet, SSH communication is secured through encryption and is therefore the recommended method for remote access. However, it still requires a function network and a configured interface on the device.

![Console Cables and Port]({{ site.baseurl }}/assets/images/console_connection.png)

## IOS Navigation
Previously we discussed that network devices require an operating system (OS) and that we can configure those devices through either a CLI or a GUI. In this course we will use the CLI to configure our devices. The Cisco IOS software has multiple levels which can be protected through passwords. The levels are as follows:

1. **User EXEC Mode:**
  This mode has limited capabilities but is useful for basic operations. It allows only a limited number of basic monitoring commands but does not allow the execution of any commands that might change the configuration of the device. It is therefore often referred to as "view-only" mode. The user EXEC mode is identified by the CLI prompt that ends with the `>` symbol. The name before is the name assigned to the device (hostname).
  ```
  Switch>
  ```
  
  
2. **Priviliged EXEC Mode:**
  This mode allows access to all commands and features. The user can use any monitoring commands and execute configuration and management commands. Higher configuration modes, like global configuration mode, can only be reached from privileged EXEC mode. The privileged EXEC mode can be identified by the prompt ending with the `#` symbol. To go from User EXEC Mode to Privilged EXEC Mode the command is `enable`.
  ```
  Switch> enable
  Switch#
  ```
  To return to User EXEC Mode from Priviliged EXEC Mode the command is `disable`.
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
  To return to Priviliged EXEC Mode from Global Configuration Mode use either `end` or `exit`.
  ```
  Switch(config)# end
  Switch#
  ```
4. **Subconfiguration Modes:**
   From global config mode, the user can enter different subconfiguration modes. Each of these modes allows the configuration of a particular part or function of the IOS device. Two common subconfiguration modes include Line Configuration Mode and Interface Configuration Mode.
  - **Line Configuration Mode:**
    Is used to configer Console, SSH or Telnet access. Line Configuration Mode is intentified by a prompt ending with `(config-line)#`. To move from global config mode to line config mode use the `line` command followed by a specification of what line to configure.
    ```
    Switch(config)# line console 0
    Switch(config-line)#
    ```
    To move from any subconfiguration mode back to global configuration mode use the `exit` command.
    ```
    Switch(config-line)# exit
    Switch(config)#
    ```
    To move from any subconfiguration mode directly back to priviliged EXEC mode use the `end` command.
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
    Is used to configure any switch port or router network interface. Interface Configuration Mode is intentified by a prompt ending with `(config-if)#`. To move to interface configuration mode use the `interface` command followed by the port type and ID number.
    ```
    Switch(config)# interface FastEthernet 0/1
    Switch(config-if)#
    ```

# Basic Device Configuration
In this chapter we look at some of the basic device configuration that should be done on any router or switch.
## Device Name
The first configuration command on any device should be to give it a unique device name or hostname. By default, all devices are assigned a factory default name. For example, a Cisco IOS switch is "Switch." The problem is if all switches in a network were left with their default names, it would be difficult to identify a specific device. For instance, how would you know that you are connected to the right device when accessing it remotely using SSH? The hostname provides confirmation that you are connected to the correct device. An organization must choose a naming convention that makes it easy and intuitive to identify a specific device. For example if we have one switch per floor the naming could look like this: Sw-Floor-1, Sw-Floor-2, Sw-Floor-3. To change the hostname, use the `hostname` command inside the global configuration mode.
```
Switch# configure terminal
Switch(config)# hostname Sw-Floor-1
Sw-Floor-1(config)# 
```
Notice the change in the command prompt name.

## Passwords
The use of weak or easily guessed passwords continues to be the biggest security concern of organizations. Network devices, including home wireless routers, should always have passwords configured to limit administrative access. Cisco IOS can be configured to use hierarchical mode passwords to allow different access privileges to a network device. All networking devices should limit administrative access by securing privileged EXEC, user EXEC, and remote Telnet access with passwords. In addition, all passwords should be encrypted and legal notifications provided. In the following example we use and in most exercises we use simple passwords like **cisco** and **class** for ease of use. Note that these are **not** considered strong passwords und should not be used when configuring real devices.

To secure user EXEC mode access, enter line console configuration mode using the `line console 0` global configuration command, as shown in the example. The zero is used to represent the first (and in most cases the only) console interface. Next, specify the user EXEC mode password using the `password`. Finally, enable user EXEC access using the `login` command.
```
Sw-Floor-1# configure terminal
Sw-Floor-1(config)# line console 0
Sw-Floor-1(config-line)# password cisco
Sw-Floor-1(config-line)# login
Sw-Floor-1(config-line)# end
Sw-Floor-1#
```
Console access will now require a password before allowing access to the user EXEC mode. We want to also secure the virtual terminal (VTY) lines if remote access through SSH or Telnet is enabled. Many Cisco switches support up to 16 VTY lines, meaning that up to 16 people can connect to the device remotly at the same time. To configure and secure all 16 VTY lines (0-15) use the `line vty 0 15` command in global config mode. After that a password can be configured with the same commands as when securing the console line before:
```
Sw-Floor-1# configure terminal
Sw-Floor-1(config)# line vty 0 15
Sw-Floor-1(config-line)# password cisco
Sw-Floor-1(config-line)# login
Sw-Floor-1(config-line)# end
Sw-Floor-1#
```

The startup-config and running-config files display most passwords in plaintext. This is a security threat because anyone can discover the passwords if they have access to these files. To encrypt all plaintext passwords, use the `service password-encryption` global config command as shown in the example.
```
Sw-Floor-1# configure terminal
Sw-Floor-1(config)# service password-encryption
Sw-Floor-1(config)#
```

To have administrator access to all IOS commands including configuring a device, you must gain privileged EXEC mode access. It is the most important access method because it provides complete access to the device. To secure privileged EXEC access, use the `enable secret` global config command, as shown in the example. Note that using the `secret` command will encrypt the password.
```
Sw-Floor-1# configure terminal
Sw-Floor-1(config)# enable secret class
Sw-Floor-1(config)# exit
Sw-Floor-1#
```

To check if the passwords are encrypted or not, use the `show running-config` command, in priviliged EXEC mode:
```
Sw-Floor-1# show running-config
```

## Banner Message
Although requiring passwords is one way to keep unauthorized personnel out of a network, it is vital to provide a method for declaring that only authorized personnel should attempt to access the device. To do this, add a banner to the device output. Banners can be an important part of the legal process in the event that someone is prosecuted for breaking into a device. Some legal systems do not allow prosecution, or even the monitoring of users, unless a notification is visible.

To create a banner message of the day on a network device, use the `banner motd #` *the message of the day* `#` global config command. The `#` in the command syntax is called the delimiting character. It is entered before and after the message. The delimiting character can be any character as long as it does not occur in the message. For this reason, symbols such as the `#` are often used. After the command is executed, the banner will be displayed on all subsequent attempts to access the device until the banner is removed.
```
Sw-Floor-1# configure terminal
Sw-Floor-1(config)# banner motd #Authorized Access Only#
```

## Save Configurations
Whenever we change configurations of a switch or router, we have to make sure to also save them so that if the device is rebooted the changes are not lost. There are two system files that store the device configuration:
- **running-config** - This is stored in Random Access Memory (RAM). It reflects the current configuration. Modifying a running configuration affects the operation of a Cisco device immediately. RAM is volatile memory. It loses all of its content when the device is powered off or restarted.
- **startup-config** - This is the saved configuration file that is stored in Non-Volatile RAM (NVRAM). It contains all the commands that will be used by the device upon startup or reboot. Flash (a type of NVRAM) does not lose its contents when the device is powered off.

If power to the device is lost, or if the device is restarted, all configuration changes will be lost unless they have been saved. To save changes made to the running configuration to the startup configuration file, use the `copy running-config startup-config` privileged EXEC mode command. You will be asked to specify the destination name. To accept the default (written in the `[]` brackets) simply press enter.
```
Sw-Floor-1# copy running-config startup-config
Destination filename [startup-config]?
Building configuration...
[OK]
Sw-Floor-1# 
```

If changes made to the running config do not have the desired effect and the running-config has not yet been saved, you can restore the device to its previous configuration. Remove the changed commands individually, or reload the device using the `reload` privileged EXEC mode command to restore the startup-config.
```
Sw-Floor-1# reload
```

## Configure IP Address
Cisco IOS Layer 2 switches have physical ports for devices to connect. These ports do not support Layer 3 IP addresses. Therefore, switches have one or more switch virtual interfaces (SVIs). These are virtual interfaces because there is no physical hardware on the device associated with it. An SVI is created in software. The virtual interface lets you remotely manage a switch over a network using IPv4 and IPv6. Each switch comes with one SVI appearing in the default configuration "out-of-the-box." The default SVI is interface VLAN1. A Layer 2 switch does not need an IP address. The IP address assigned to the SVI is used to remotely access the switch. An IP address is not necessary for the switch to perform its operations.

To configure an SVI on a switch, use the `interface vlan 1` global configuration command. Vlan 1 is not an actual physical interface but a virtual one. Next assign an IPv4 address using the `ip address` *ip-address subnet-mask* interface configuration command. Finally, enable the virtual interface using the `no shutdown` interface configuration command. Similar to Windows hosts, switches configured with an IPv4 address will typically also need to have a default gateway assigned. This can be done using the `ip default-gateway` *ip-address* global configuration command. The *ip-address* parameter would be the IPv4 address of the local router on the network.
```
Sw-Floor-1# configure terminal
Sw-Floor-1(config)# interface vlan 1
Sw-Floor-1(config-if)# ip address 192.168.1.20 255.255.255.0
Sw-Floor-1(config-if)# no shutdown
Sw-Floor-1(config-if)# exit
Sw-Floor-1(config)# ip default-gateway 192.168.1.1
```


## Verify Connectivity
To verify that your configurations are working or to troubleshoot a network we can use the following commands. In a command prompt on your computer you can use the `ipconfig /all` command to verify network configurations of a PC host. 
```
C:\> ipconfig
```

The `ping` command can be used to test connectivity to another device on the network or a website on the internet.
```
C:\> ping 192.168.1.2
```

On a switch or router we can use the `show ip interface brief` command to verify the condition of the switch interfaces.
```
Sw-Floor-1# show ip interface brief
```



# References
If you want to learn more about these topics you can check out Modules 1, 2 and 3 in the netacad course (CCNA: Introduction to Networks).

# Exercises
For practicing what we have learned during this lecture do the following packet tracer exercises from the netacad course:
- 2.3.7
- 2.9.1
- 2.9.2
