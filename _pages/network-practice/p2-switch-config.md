---
layout: single
title: "Switch CLI Commands"
permalink: /network-practice/p2-switch-config
toc: true
breadcrumbs: true
sidebar:
  - title: "Practical Topics"
    image: /assets/images/logo.png
    image_alt: "image"
    nav: network-practice
taxonomy: markup
---
This page will expect you to know the different modes of the cisco IOS, how to identify them and how to navigate between them. For more information check [here]({{ site.baseurl }}/network-practice/p4-cisco-ios-navigation#ios-navigation). The different modes are as follows:
- `Switch>` User EXEC Mode
- `Switch#` Privileged EXEC Mode
- `Switch(config)#` Global Configuration Mode

**IMPORTANT:** This page is likely not complete but will have to most common commands you'll need.
 
# Configuration Commands

## Device Name
To configure the device name, navigate into global configuration mode and use the following command:
```
Switch(config)# hostname NAME
```
**Note:** `NAME` should be replaced with the name you want to give the device (e.g. Switch).

## Passwords

### - Console Access
To secure User EXEC mode access through a console cable navigate to global configuration mode and use the following commands: 
```
Switch(config)# line console 0
Switch(config-line)# password PASSWORD
Switch(config-line)# login
```
The 
**Note:** `PASSWORD` should be replaced with an actual password.

### - Virtual Terminal Access
Virtual Terminal (VTY) lines are used for remotely accessing the device. Many Cisco switches support up to 16 VTY lines, meaning that up to 16 people can connect to the device remotely at the same time using either Telnet or SSH. To configure and secure all 16 VTY lines (0-15) use the following commands inside global configuration mode:
```
Switch(config)# line vty 0 15
Switch(config-line)# password PASSWORD
Switch(config-line)# login
```
**Note:** `PASSWORD` should be replaced with an actual password.

To activate access through Telnet and SSH use:
```
Switch(config)# transport input ACCESS_METHOD
```
**Note:** `ACCESS_METHOD` should be replaced with either `ssh` or `telnet`.

### - Privileged EXEC Mode Access
To have administrator access to all IOS commands including configuring a device, you must gain privileged EXEC mode access. It is the most important access method because it provides complete access to the device. To secure privileged EXEC access use the following command:
```
Switch(config)# enable secret PASSWORD
```
This command will also encrypt that password.
**Note:** `PASSWORD` should be replaced with an actual password.

### - Encrypt Plain Text Passwords
The startup-config and running-config files display most passwords in plaintext. This is a security threat because anyone can discover the passwords if they have access to these files. To encrypt all plaintext passwords, use the `service password-encryption` global configuration mode command as shown in the example.
```
Switch(config)# service password-encryption
```

## Configure IP Address
Cisco IOS Layer 2 switches have physical ports for devices to connect. These ports do not support Layer 3 IP addresses. Therefore, switches have one or more switch virtual interfaces (SVIs). These are virtual interfaces because there is no physical hardware on the device associated with it. An SVI is created in software. The virtual interface lets you remotely manage a switch over a network using IPv4 and IPv6. Each switch comes with one SVI appearing in the default configuration "out-of-the-box." The default SVI is interface VLAN1. A Layer 2 switch does not need an IP address. The IP address assigned to the SVI is used to remotely access the switch. An IP address is not necessary for the switch to perform its operations.


To configure the SVI with an IPv4 Address use the following commands:
```
Switch(config)# interface vlan 1
Switch(config-if)# ip address IPv4-ADDRESS SUBNET-MASK
Switch(config-if)# no shutdown
```
**Note:** `IPv4-ADDRESS` and `SUBNET-MASK` have to replaced with the actual values, e.g. `192.168.1.20 255.255.255.0`

To configure the SVI with an IPv6 Address use these commands:
```
Switch(config)# interface vlan 1
Switch(config-if)# ipv6 address IPv6-ADDRESS/PREFIX-LENGTH
Switch(config-if)# no shutdown
```
**Note:** `IPV6-ADDRESS` and `PREFIX-LENGTH` have to be replaced with proper values, e.g. `2001:db8:acad:10::1/64`

To configure a default-gateway use the following command:
```
Switch(config)# ip default-gateway IPv4-ADDRESS
```
**Note:** `IPv4-ADDRESS` should be replaced the address of the local router on the network, e.g. `192.168.1.1`

## Banner Message

```
Switch(config)# banner motd #MESSAGE#
```
**Note:** `MESSAGE` should be replaced with the message (e.g. Unauthorized access prohibited!).

## Disable DNS Lookup
This command prevents the switch from trying to resolve misspelled commands as domain names, which can cause delays.

```
Switch(config)# no ip domain-lookup
```

## Synchronous Logging
When enabling synchronous logging, messages won't be in the middle of what you are typing.
```
Router(config)# line console 0
Router(config-line)# logging synchronous
```

## Set Clock
To set the clock use:
```
Router# clock set TIME DAY MONTH YEAR
```
**Note:** TIME, DAY, MONTH and YEAR have to be replaced with values, e.g. `10:20 18 Sep 2025` 

## Save Configuration
Whenever we change configurations of a switch or router, we have to make sure to also save them so that if the device is rebooted or looses power the changes are not lost. There are two system files that store the device configuration:
- **running-config** - This is stored in Random Access Memory (RAM). It reflects the current configuration. Modifying a running configuration affects the operation of a Cisco device immediately. RAM is volatile memory. It loses all of its content when the device is powered off or restarted.
- **startup-config** - This is the saved configuration file that is stored in Non-Volatile RAM (NVRAM). It contains all the commands that will be used by the device upon startup or reboot. Flash (a type of NVRAM) does not lose its contents when the device is powered off.

```
Switch# copy running-config startup-config
```

# Troubleshooting Commands



## Testing Connection to Another Device

```
Switch> ping IP-ADDRESS
```
**Note:** `IP-ADDRESS` has to be replaced with an IPv4 address, IPV6 address or a domain name.

## Display running-config and startup-config file

```
Switch# show running-config
```

```
Switch# show startup-config
```

## Verify Interface Configuration
The output displays all interfaces, their IP addresses, and their current status. The configured and connected interfaces should display a Status of "up" and Protocol of "up". Anything else would indicate a problem with either the configuration or the cabling.

For checking ipv4 configuration use:
```
Switch> show ip interface brief
```
For checking ipv6 configuration use:
```
Switch> show ipv6 interface brief
```

## Show Details of a Specific Interface

```
Switch> show interface INTERFACE_NAME
```

**Note:** `INTERFACE_NAME` has to be replaced with the name on an interface, e.g. `FastEthernet0/1`, `GigabitEthernet1/0/1` or `vlan1`. To see a list of all interfaces use `show ip interface brief`

## Display MAC Address Table

```
Switch# show mac address-table
```

## Clear MAC Address Table
To removes all dynamically learned (non-static) MAC addresses from the table use the following command:

```
Switch# clear mac address-table dynamic
```

## Display ARP Table

```
Switch# show arp
```

## Factory Reset
In order to reset the switch configurations delete the startup-configuration file:
```
Switch# erase startup-config
Switch# reload
```
**Note:** When asked if you want to save your configuration enter **No**.
