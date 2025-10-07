---
layout: single
title: "Router CLI Commands"
permalink: /network-practice/p3-router-config
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
- `Router>` User EXEC Mode
- `Router#` Privileged EXEC Mode
- `Router(config)#` Global Configuration Mode

**IMPORTANT:** This page is likely not complete but will have to most common commands you'll need. In a lot of cases there will be links to the switch CLI commands page if the commands are identical.
 
# Configuration Commands

## Device Name
[Configure the device name]({{ site.baseurl }}/network-practice/p2-switch-config#device-name)

## Passwords

### - Console Access
[Secure user EXEC mode through console cable]({{ site.baseurl }}/network-practice/p2-switch-config#--console-access)

### - Virtual Terminal Access
[Secure user EXEC mode through remote Telnet or SSH access.]({{ site.baseurl }}/network-practice/p2-switch-config#--virtual-terminal-access)

### - Privileged EXEC Mode Access
[Secure privileged EXEC mode]({{ site.baseurl }}/network-practice/p2-switch-config#--privileged-exec-mode-access)

### - Encrypt Plain Text Passwords
[Encrypt all plain text passwords in the config file]({{ site.baseurl }}/network-practice/p2-switch-config#--encrypt-plain-text-passwords)

## Banner Message
[Provide legal notification]({{ site.baseurl }}/network-practice/p2-switch-config#banner-message)

## Configure Interfaces
Router are not reachable by end devices until the interface that connects to the network is configured. there are different types of interfaces available on Cisco routers depending on the model. To check which ones are available on your device you can use `show ip interface brief` in user or privileged EXEC mode.

To configure an interface use the following command:
```
Router(config)# interface INTERFACE_NAME
```
**Note:** `INTERFACE_NAME` has to be replaced with the name on an interface, e.g. `FastEthernet0/1` or `GigabitEthernet1/0/1`.

To add a description to an interface use the following command. Although the description command is not required to enable an interface, it is good practice to use it. It can be helpful in troubleshooting on production networks by providing information about the type of network connected. For example, if the interface connects to an ISP or service carrier, the description command would be helpful to enter the third-party connection and contact information.
```
Router(config-if)# description DESCRIPTION-TEXT
```
**Note:** `DESCRIPTION-TEXT` should be replaced with a description of the interface, e.g. `Link to R2`.

To configure an IPv4 address for the interface use:
```
Router(config-if)# ip address IPv4-ADDRESS SUBNET-MASK
```
**Note:** `IPv4-ADDRESS` and `SUBNET-MASK` have to replaced with the actual values, e.g. `192.168.1.20 255.255.255.0`

To configure an IPv6 address for the interface use:
```
Router(config-if)# ipv6 address IPv6-ADDRESS/PREFIX-LENGTH
```
**Note:** `IPV6-ADDRESS` and `PREFIX-LENGTH` have to be replaced with proper values, e.g. `2001:db8:acad:10::1/64`

Don't forget to activate the interface:
```
Router(config-if)# no shutdown
```
The interface must also be connected to another device, such as a switch or a router, for the physical layer to be active. On inter-router connections where there is no Ethernet switch, both interconnecting interfaces must be configured and enabled.

## Define Static Routes
Static routes are route entries that are manually configured. If there is a change in the network topology, the static route is not automatically updated and must be manually reconfigured. To define a static route use:
```
Router(config)# ip route REMOTE_NETWORK_ADDRESS REMOTE_NETWORK_SUBNET_MASK ADDRESS_NEXT_HOP_ROUTER
```
**Note:** `REMOTE_NETWORK_ADDRESS`, `REMOTE_NETWORK_SUBNET_MASK` and `ADDRESS_NEXT_HOP_ROUTER` have to be replaced with proper values, e.g. `10.1.1.0 255.255.255.0 209.165.200.226`

## Disable DNS Lookup
[Prevent the router from attempting to translate incorrect commands as though they were host names.]({{ site.baseurl }}/network-practice/p2-switch-config#disable-dns-lookup)

## Synchronous Logging
[Enable synchronous logging so that messages don't appear in the middle of command inputs]({{ site.baseurl }}/network-practice/p2-switch-config#synchronous-logging)

## Set Clock
[Change date and time of the internal clock]({{ site.baseurl }}/network-practice/p2-switch-config#set-clock)

## Save Configuration
[Save changes in the configuration file]({{ site.baseurl }}/network-practice/p2-switch-config#save-configuration)




# Troubleshooting Commands

## Testing Connection to Another Device
[Using the ping command]({{ site.baseurl }}/network-practice/p2-switch-config#testing-connection-to-another-device)

## Display running-config and startup-config file
[Print configuration file content]({{ site.baseurl }}/network-practice/p2-switch-config#display-running-config-and-startup-config-file)

## Verify Interface Configuration
[Display interfaces, their IP addresses, and their status]({{ site.baseurl }}/network-practice/p2-switch-config#verify-interface-configuration)


## Show Details of a Specific Interface
[More information here]({{ site.baseurl }}/network-practice/p2-switch-config#show-details-of-a-specific-interface)

## Display Routing Tables
Displays the contents of the IP routing tables stored in RAM

For IPv4 use:
```
Router> show ip route
```

For IPv6 use:
```
Router> show ipv6 route
```

## Verify Connectivity with Traceroute
The ping command is useful to quickly determine if there is a Layer 3 connectivity problem. However, it does not identify where the problem is located along the path. Traceroute can help locate Layer 3 problem areas in a network. A trace returns a list of hops as a packet is routed through a network. It could be used to identify the point along the path where the problem can be found.

On the router `traceroute` can be used as follows:
```
Router# traceroute IP-ADDRESS
```
On the PC use `tracert` instead:
```
C:\>: tracert IP-ADDRESS
```
**Note:** `IP-ADDRESS` has to be replaced by an actual value, e.g. `10.1.1.10`


## Factory Reset
[In order to reset the router configurations delete the startup-configuration file]({{ site.baseurl }}/network-practice/p2-switch-config#factory-reset)
