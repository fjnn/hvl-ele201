---
layout: single
title: "Lecture 9 - Ethernet"
permalink: /lectures/l9-ethernet
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
LWIP stack, LED ON/OFF through ethernet
<!-- https://controllerstech.com/stm32-ethernet-1-connection/ -->

# Introduction to Embedded Networking
In this lecture we will focus on embedded networking using the ethernet port on our board using LWIP stack. Let's get familiar with some terminology first:

## 1. Ethernet
Ethernet is the most common standard for wired local area networks (LANs). It defines the physical and data link layers of the network stack—essentially, the rules for transmitting data over cables.

- **Physical Connection**: The STM32F767 Nucleo board includes an Ethernet PHY (Physical Layer) chip and a standard RJ45 connector, allowing it to plug directly into a network switch or router.
- **MAC and PHY**: The microcontroller contains the MAC (Media Access Control) layer, which handles addressing (the unique 48-bit MAC address). The external PHY chip handles the actual electrical signaling over the cable. On this board, they communicate using the RMII (Reduced Media-Independent Interface).

So, ethernet provides the physical link, enabling the microcontroller to send and receive raw data packets.

## 2. LwIP (Lightweight IP)
To make sense of the raw data packets from the Ethernet link, the microcontroller needs a TCP/IP stack. Since a full operating system stack is too large and complex for a microcontroller, we use LwIP.

lwIP (lightweight IP) is a widely used open-source TCP/IP stack designed for embedded systems with limited resources (RAM and Flash). lwIP was originally developed by Adam Dunkels in 2001[3] at the Swedish Institute of Computer Science and is now developed and maintained by a worldwide network of developers. The network stack of lwIP includes an IP (Internet Protocol) implementation at the Internet layer that can handle packet forwarding over multiple network interfaces.[6] Both IPv4 and IPv6 are supported dual stack since lwIP v2.0.0 (Source: [wikipedia.org](wikipedia.org/wiki/LwIP))

**It's function** is It implements essential network protocols like IP (Internet Protocol), TCP (Transmission Control Protocol), and UDP (User Datagram Protocol), allowing the microcontroller to understand and participate in internet communication.

So for us LwIP will manage the network connection, handles the IP addressing (192.168.1.10), and serves as the foundation upon which our web server runs.

## 3. The LwIP HTTPD Web Server
The LwIP stack includes an optional application layer protocol: the HTTP Daemon (HTTPD), which is our web server.

The HTTPD listens for incoming HTTP (Hypertext Transfer Protocol) requests (a user typing the IP address into a browser) and sends back HTML/CSS files as responses.

Since microcontrollers are designed for control, not just static display, the LwIP server supports two mechanisms for real-time interaction:
- **CGI (Common Gateway Interface)**: Allows the web page to execute a function (e.g., toggle an LED) on the microcontroller when a form or button is submitted.
- **SSI (Server Side Includes)**: Allows the server to insert dynamic data (e.g., the current LED state: "ON" or "OFF") directly into the HTML page before sending it to the browser.

So the HTTPD application allows us to host our interactive web page, using CGI to toggle the LED and SSI to display the current state of the board.

# STM32F767 Nucleo Web Server
The planning of this lecture is through making a Web server tutorial. The server will host a webpage with a text field and a button.

## Part 1: STM32CubeMX Configuration
1. Create a new project without using the default mode.
1. On the left, go to ``System Core > RCC > HSE: Crystal/Ceramic Resonator`` to use the external clock source for better timing accuracy.
1. Go to ``System Core > SYS > Debug: Serial Wire`` (usually default, but good to check).