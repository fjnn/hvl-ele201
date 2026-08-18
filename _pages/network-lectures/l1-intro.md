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

<hr>

The lecture notes on this website provide you with all the information you need for this course along with references for further reading. Additionally, content on this page is based on the Cisco Networking Academy (NetAcad) course **CCNA: Introduction to Networks**. If you want to learn about the topics in greater detail, a dedicated **Reference** section at the end of each page lets you know which modules in the NetAcad course cover the discussed content. <br/>

This first lecture provides a brief overview over networking history and the creation of standards for the development of networking related hardware and software.


## 1.1 Motivation

Internet communication has become ubiqitous with more than 30 billion devices connected to the internet worldwide [in 2025](https://www.statista.com/statistics/1559435/connected-devices-worldwide/.). This includes mobile phones and personal computers but also a large number of Internet of Things (IoT) devices. In order for all of these devices to exchange information and provide services to the end users, connections to communication networks are required. The internet as we know it today has evolved from a small network connecting a handful of machines to a global network of networks on which many applications of daily life depend: Map services, messaging, social media and even government services. Understanding the underlying concepts of modern communication networks not only enables you to design and set up networks, both industrial and home networks, but also gives you the tools to troubleshoot, extend and adapt existing networks. This course covers the essentials of the TCP/IP Internet Protocol Suite, which is often just referred to as TCP/IP. Although defined as a communication standard more than 40 years ago, this set of standards continues being used today and defines how two devices can communicate which each other across different networks.

## 1.2 Networking History

The first computer network dates back to 1965 when to computers, one at the Massachusetts Institute of Technology and the other at the University of California, were connected by dial-up telephone lines by Roberts and Maril. What followed was a rapid evolution of the way machines are connected and able to communicate with each other. Already in 1967 the concept for a network which was based on exchanging "packets" of information instead of always maintaining a line connection, as was the case for the two aforementioned machines, was published by Roberts, forming the base for the ARPANET. This led to work on standardising the way of connecting to and com municating on the network. With the first communication protocols implemented in the 1970s, the network quickly expanded to 23 hosts that were able to exchange data. The motiovation for standardising the communication protocols was to allow a variety of different machines to communicate with eather other on a shared network in a predefined, favorite and efficient way. With a growing number of devices came the need to agree on communication protocols and the ongoing development of the network. The institutions that were part of ARPANET were in different locations and had different hardware manufacturers deliver and install their devices. The solution
was found in Request For Comments (RFC)s. These were first circulated as meeting minutes or memos via email but later published electronically. Still today, these open
access documents represent the definitiv reference for all protocols defined for the internet. RFCs defined for example the HyperText Transfer Protocol (HTTP). The RFCs
are managed by the Internet Engineering Task Force (IETF) and can be accessed via a [dedicated webpage](https://www.rfc-editor.org/).

![ARPANET]({{ site.baseurl }}/assets/images/arpanet.png){:style="display:block; margin-left:auto; margin-right:auto"}
*Early ARPANET evolution over time. (a) In 1969 only four machines (nodes) were part of the network. (b) 18 nodes where communicating with each other on ARPANET in 1970. Note that not all nodes are directly connected to each other.*

Besides the ARPANET, several other networks were in operation in the 1970s, for example the NSFNET used by the US National Science Foundation and the German DATEX-P network which the postal services developed for commercial services. Following the need to connect different networks, Cerf and Kahn proposed in 1974 what is referred to as the TCP/IP Internet Protocol Suite (or short just: TCP/IP), a set of rules for communication between machines across networks. These rules included for example managing data loss and flow control (who has acess to how many resources and when) as well as and are still the ground rules of the internet standards today. The first deployment of TCP/IP occured in 1981 and the ARPANET switched to TCP/IP two years later in 1983. From there on the Internet as we know it today took shape, with milestone protocol proposals arriving in the 1980s (DNS and FTP), 1990s (HTTP and HTML for example), 2000s (P2P file sharing) and 2010s (Voice over IP).

## 1.3 Network Structure

Network types can be defined by the type of communication the network provides. In this context the two predminant network types are connection-oriented and connectionless networks. The TCP/IP Internet Protocol Suite is fundamentally based on connectionless networking using packet switching, as opposed to early telephone networks which were based on circuit switching. In circuit switching networks (also sometimes referred to as connection-oriented networking), a dedicated line is reserved between two end devices. For example, to establish a phone call, a switching board had to be dialed where an operator would further connect the caller (the sender) to the callee (the receiver of the call). Once the connection was established, the two parties could talk to each other until one of them would disconnect, i.e. hang up. The communication would in this case always follow the same path once this path has been established.

![Circuit Switching vs Packet Switching]({{ site.baseurl }}/assets/images/switching.png){:style="display:block; margin-left:auto; margin-right:auto"}
*Comparison of swtiching techniques to forward network traffic. (a) Circuit Switching where a connection is established between caller and callee and maintained throughout the data exchange. (b) Packet Switching where data is split into discrete packages which are individually forwarded together with other packages in the network.*

The early ARPANET, much like todays internet, did rely on packet switching (or connectionless networking) instead of circuit switching. The idea stems from telegraph networks where a telegram would be forwareded as a whole to a relay station whichwould in turn forward the message via other relay stations to the recipient. This way of communicating is also referred to as a connectionless service, since the two communicating parties do not have to maintain a connection while exchanging information. A major advantage of packet switching is that packets, i.e. telegrams, can be rerouted if a connection is not available, making the network very robust. A major bottleneck for tlephone service providers was that all connections had to go through manual switching boards with hman operators, which became unfeasible as more and more people had access to telephones. This led to the development of automatic switching stations and later digitisation of the whole system as for example implemented with Voice over IP, which uses the Internet for telephone communication.

Networks can be further categorised into the actual geographic distance they cover. Accordingly, we distinguish mainly between Wide Area Networks (WANs) and Local Area Networks (LANs). WANs connect two endpoints that can be as far apart as physically possible, using for example fiber optics on the ocean floor. Compared to LANs however, the operate at much lower speeds. This is also due to the shorter delay in local networks where the time it takes the physical signal to travel between machines becomes almost negligible.

To summarise: Connection-oriented networking can provide better service at the cost of having to maintain the connection state throughout the data exchange. However, if the network becomes congested it may not be possible to establish a connection in the first place. Connectionless networking will allow communication even if the network is congested (but the transfer might experience some delay). This is because no state has to be maintained, which also makes this type of networking very scalable. What is more, it is possible to build a connection-oriented service on top of a connectionless service. As such, except if specifically mentioned, the networks we discuss in this lecture are all connectionless. Networks can further be categorised by their geographical extend into WANs and LANs. Local networks tend to be faster than newtorks having to connect devices that are physically very far apart.

## 1.4 The ISO OSI Model

In order to handle the many challenges that come with connecting different machines in a global network of networks, a way of organising different solutions to the problems is needed. Some of the obvious problems are:

- possible failure of devices along the communication chain
- loss and delay of data during the transfer between devices
- corruption of data during the pysical transfer of the signal
- splitting and assembling the packets that make up the data at sender and receiver

To tackle the problems, a set of protocols is defined in order to help organise the solutions. This splitting into protocols relates to other Software Enineering paradigms, such as pre-defined interfaces in Operating Systems for system calls and generating machine code for a program on a computer. As a whole a compilation process is very complex, but splitting it into preprocessing, compilation, assembling and linking for example, helps organise the solutions.

![compilation process]({{ site.baseurl }}/assets/images/compilation.png){:style="display:block; margin-left:auto; margin-right:auto"}
*Process for generating executable code from a source file.*

What is more, splitting the solution allows the single parts to be exchangeable without changing all the rest of the solution. For example, using a different compiler with the same assembler and linker is possible as long as it is well defined what the output of the compiler has to look like for the assembler to be able to work with it (in the illustrated case of C compilation it would be a .s file). We can organise this process generically into layers where each layer can exchange data with another layer through an interface.

![layering]({{ site.baseurl }}/assets/images/layers.png){:style="display:block; margin-left:auto; margin-right:auto"}
*Layers as abstraction for multiple components working together and passing information according to predefined formats.*

Communicating over networks does in fact work much the same way in a multi-layer process: Software encodes, for example, a request from a browser application and passes it down multiple layers on the machine until the hardware can take care of sending the packets over a wire or wireless connection to another machine. On the receiving machine the process is run through in reverse, converting packets to an actual request the host software can process (Fig. 1.6). The software and hardware stack that is required to communicate via the internet is functionally devided into layers.

![layered communication]({{ site.baseurl }}/assets/images/layered-comm-2dev.png){:style="display:block; margin-left:auto; margin-right:auto"}
*Communication via a shared network where data pases through layers before it can be sent as a signal to the network.*

Before the advent of the Internet, the International Organisation for Standardisa-
tion (ISO) defined what is commonly known as the Reference Model of Open System
Interconnection (OSI), or ISO OSI model. The ISO OSI model defines 7 layers:

- Application Layer (7): application related services
- Presentation Layer (6): data presentation independent from system
- Session Layer (5): support "sessions" over longer time
- Transport Layer (4): connection source to destination application
- Network Layer (3): connection end system to end system
- Data Link Layer (2): data transfer between machines
- Physical Layer (1): physical signal between machines

However, since the ISO OSI model was defined before the internet proliferated, it has since been de-facto replaced by the TCP/IP reference model which followed actual protocol testing and is thus in practice more useful to apply. In the TCP/IP reference model, 5 layers are defined (as opposed to the 7 in the ISO OSI model). Layer 5 factually plays the role of layers 7 to 5 from the ISO OSI model. From here on, we refer to the software running on a specific layer as protocol. The 5-Layer TCP-/IP reference model defines also the format of the data passed between layers .

![TCP/IP reference model]({{ site.baseurl }}/assets/images/tcp-ip-ref.png){:style="display:block; margin-left:auto; margin-right:auto"}
*The TCP/IP reference model with names for the data formats for data passed between layers.*

This separates the basic functionality of the internet into the layers. The name of the reference model stems from the two main protocols Transport Control Protocol (TCP) (on layer 4, i.e. the transport layer) and Internet Protocol (IP) (on layer 3, the network layer).

In reality the packets that are routed through a network pass multiple Intermedite Systems,
i.e. other machines such as routers and swtiches before arriving at the destination.
These intermediate systems do not pass the received signal all the way up to an
application layer implementation but rather pass on the signal only up to the network
layer which is enough to decide where to forward the package to

<br/>
<br/>

<hr>

<br/>
<br/>


<!-- # What is Networking?
Networking is the practice of connecting two or more computing devices, such as computers, laptops, printers, and mobile devices, so they can exchange data and share resources. These devices are linked together using a system of rules called communication protocols, which govern how information is transmitted over physical or wireless connections.

# Why is it important to learn about Networking?
Computer networks are the backbone of the modern digital world and these days almost all electronic devices are connected to some network like phones, vacuum cleaners, cars and many more. It is just as important in industry since most automated systems are not isolated but rather require communication between machines, robots, sensors and monitoring systems.

# The Big Picture
Basically, any time data has to go from one device to another networking protocols are involved. We will use a website as an example but the same is true for any data. When you see a website in your browser it has human-readable coding languages like HTML, CSS and JavaScript. But a computer operates on electrical signals that are either on or off. Therefore, the website code is transformed into a series of 1s and 0s. When the data is sent to another device, this stream of 1s and 0s goes through the following process:
1. It gets split into packages.
2. Additional information is added to each package (e.g. the address of the receiving device)
3. The packages get encoded into a physical signal, e.g. electrical signal for Ethernet communication, and sent to the destination device.

When the receiving device receives the packages, it then goes through the same process in reverse to reconstruct the original data.

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
- **Copper Cable:** Also known as Ethernet cables. It transmits data using electrical impulses. It can be susceptible to electromagnetic interference and therefore sometimes requires shielding.
- **Fiber-optics:** Transmits data using light pulses through thin strands of glass or plastic. It offers extremely high speeds, can travel long distances without signal degradation, and is immune to electromagnetic interference. It is the preferred choice for long-distance communication backbones.
- **Wireless:** Transmits data through the air using electromagnetic waves. This is the transmission method most prone to interference. 

We will learn more about Media in [Lecture 8]({{ site.baseurl }}/network-lectures/l8-physical-layer).

![Physical Media]({{ site.baseurl }}/assets/images/media_simple.png)





# OSI Reference Model
We discussed previously that data must go through a process before it can be transmitted to another device. The details of this process can vary depending on the protocol that is being used, e.g. how to split the data, what information is added to each package and how to encode the package into a physical signal. A network protocol is a standardized set of rules. Meaning that if I tell the receiving device which protocol I’m using to encode my data, it then knows how to decode what it receives to reconstruct the original data.
In reality, there are multiple protocols used when communicating between devices, where each protocol works on a different level in the encoding/decoding process. The different levels, also called layers, have been developed and specified by the International Organization for Standardization (ISO) in a model called Open System Interconnection (OSI) model. The different layers look as follows:

![OSI Layer Model]({{ site.baseurl }}/assets/images/osi_model.png)

Throughout the semester we will learn what happens in each layer and in [Lecture 9]({{ site.baseurl }}/network-lectures/l9-transport-layer) we will discuss in more detail the different types of protocols and their function. -->

<!-- 
# Cisco IOS
The operating system (OS) of a device allows the user to interact with the hardware. Commonly known operating systems for computer are Windows, macOS or Ubuntu. These are example of a graphical user interface (GUI), where the user can interact with the system using graphical icons, menus and windows. Another way of interacting with the operating system is through a command line interface (CLI), where the user uses text commands through a software often called terminal. In general, a GUI requires less knowledge of the underlying command structure and is therefore more intuitive to use for the User. CLIs, on the other side, tends to be more powerful for controlling the hardware, less resource intensive and more stable. For this reasons, network devices are typical accessed through a CLI. The OS used by Cisco devices is called the Cisco Intenetwork Operating System (IOS).

![GUI vs. CLI]({{ site.baseurl }}/assets/images/gui_cli.png)

## Access Methods
Even though some networking devices, like a switch, may work out of the box, they should still be configured for security reasons. There are three main ways of connecting to a network device in order to configure it:
- **Console:** This connection method uses a special console cable to connect the computer and the networking device. A terminal emulation software, e.g. PuTTY, is used on the computer to send commands. This method provides access to the device even when the network is not working and is therefore used for initial configuration of a device. But it requires physical access to the device.
- **Telnet:** Is a method that allows the User to remotely access a device over the network. Therefore if network is not working this method won't work either. The connection is also not secured through encryption but rather just send commands, passwords and user authentications in plane text. It is therefore recommended to user SSH instead.
- **Secure Shell (SSH):** is similar to Telnet in that it establishes a remote connection to a device over the network. Unlike Telnet, SSH communication is secured through encryption and is therefore the recommended method for remote access. However, it still requires a function network and a configured interface on the device.

![Console Cables and Port]({{ site.baseurl }}/assets/images/console_connection.png)

## IOS Navigation
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
Console access will now require a password before allowing access to the user EXEC mode. We want to also secure the virtual terminal (VTY) lines if remote access through SSH or Telnet is enabled. Many Cisco switches support up to 16 VTY lines, meaning that up to 16 people can connect to the device remotely at the same time. To configure and secure all 16 VTY lines (0-15) use the `line vty 0 15` command in global config mode. After that a password can be configured with the same commands as when securing the console line before:
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

To check if the passwords are encrypted or not, use the `show running-config` command, in privileged EXEC mode:
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
- 2.9.2 -->