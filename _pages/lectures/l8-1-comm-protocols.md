---
layout: single
title: "Communication Protocols"
permalink: /lectures/l8-1-commprotocol
toc: true
breadcrumbs: true
sidebar:
  - title: "Lectures"
    image: /assets/images/logo.png
    image_alt: "image"
    nav: lectures
taxonomy: markup
---
A communication protocol is a system of rules administer how two entities are to communicate with each other. Often it is useful to separate the protocol into various layers to manage different aspects of the communication. Some layers may be general in nature, and applicable to many systems, while others may be very application specific.

A communication protocol is sometimes linked to a specific physical means of transmission, e.g. som specific voltage levels on the wires connecting two devices. Other protocols can be agnostic to the transport medium.

{: .notice--info}
A interesting example of a protocol which is agnostic to the physical layer is the internet protocol (IP) which is fundamental in the operation of the Internet. Several standards exists for how the IP data could be transmitted, and during normal internet usage the traffic likely passes through multiple different physical layers such as ethernet (WiFi, or cables), or LTE, WiMax. There is even the [RFC 1149 standard for IP over Avian Carriers](https://www.wikiwand.com/en/articles/IP_over_Avian_Carriers), which describes how IP traffic should be carried over birds such as pigeons.

A communication protocol is often associated with some physical connector, such as the USB-C, RS32, Ethernet etc. connectors. There are many others, but luckily standardization is slowly limiting the number of different ports which are used in consumer electronics.

{: .notice--info}
Why do we need ports? There was a dark era before we started to converge to some standards…
![port_fuck.jpeg]({{site.baseurl}}/assets/images/port_fuck.jpeg)

## Understanding communication protocols via letter analogy
Imagine you're trying to send a letter. You can't just throw ink on paper and expect it to arrive. You need a standard format: an envelope, the recipient's address in a specific location, your return address, and the correct postage. The postal service uses its own protocol to sort and deliver it.

In the digital world, data exchange is similar. A protocol defines:
- Format: How the data should be structured (e.g., how many bits for the address, how many for the actual data).
- Timing: When and how fast the data can be sent.
- Error Handling: How to detect and deal with missing or corrupted data.
- Sequencing: The order of messages for a successful exchange (e.g., "Hello," "Are you ready?," "Send data").

It's the language and etiquette of digital communication.

## What Common Protocols Exist?
Protocols are everywhere, and we can group them based on their application:

### Serial/Bus Protocols (The Short-Distance Talkers) 
These are common in embedded systems for device-to-device communication on a single circuit board or within a single device:

- UART (Universal Asynchronous Receiver-Transmitter): A basic, widely used method for simple point-to-point data exchange, often used for debugging (think of the basic serial console).
- I²C (Inter-Integrated Circuit): A two-wire protocol often used to talk to sensors, memory chips, and display drivers. It's relatively slow but simple.
- SPI (Serial Peripheral Interface): A faster, more complex protocol often used for communication with flash memory or display controllers.


### Network Protocols (The Long-Distance Talkers) 
These govern communication across large networks, including the internet:

- Ethernet: Defines how data is transmitted over a wired local area network (LAN).
- IP (Internet Protocol): Defines how devices are addressed and how data is routed across the internet. This is the bedrock of the entire internet.
- TCP (Transmission Control Protocol): Works with IP to ensure reliable, ordered, and error-checked delivery of data (used for web browsing, email).
- UDP (User Datagram Protocol): Works with IP but offers unreliable, faster communication, often used for applications where speed is paramount, like video streaming or online games.
- HTTP/HTTPS (HyperText Transfer Protocol/Secure): The foundation of the World Wide Web, defining how clients (browsers) request and servers send web content.
- DNS	(Domain Name System)	Translating human-readable domain names into IP addresses.	The "phonebook" of the internet. While it's a critical network service, the protocol itself operates at the application layer to handle the queries and responses.

### Application Protocols (The Specific Purpose Talkers) 
These are designed for very specific application needs:

- Bluetooth/BLE (Bluetooth Low Energy): Protocols for short-range wireless communication, used for headsets, smartwatches, and local device control.
- POP3	(Post Office Protocol v3):	Retrieving email from a mail server to a local client (usually by downloading and deleting).	A simple way for your email client to collect new messages.
IMAP	(Internet Message Access Protocol):	Retrieving and managing email messages directly on the server.	The modern standard; it allows multiple devices to access the same email box and keep it synchronized (like a Google/Outlook account).
- DDS	(Data Distribution Service)	High-performance, real-time data exchange for mission-critical systems.	Used in robotics, autonomous vehicles, defense, and air traffic control where latency and reliability are absolutely non-negotiable. It uses a data-centric publish/subscribe model. ROS2 is using this protocol and finally supports Real-time!!
- SSH	(Secure Shell)	Secure remote command-line login and data tunnel.	The indispensable tool for engineers! It allows you to securely manage a Linux server or embedded device from anywhere over an encrypted channel.






