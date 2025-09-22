---
layout: single
title: "IP Network Case Study"
permalink: /network-lectures/l6-ip-network-case-study
toc: true
breadcrumbs: true
sidebar:
  - title: "Lectures"
    image: /assets/images/logo.png
    image_alt: "image"
    nav: network-lectures
taxonomy: markup
---
<!-- ## Variable Length Subnet Mask (VLSM)
Because of the depletion of public IPv4 address space, making the most out of the available host addresses is a primary concern when subnetting IPv4 networks. Using traditional subnetting, the same number of addresses is allocated for each subnet. If all the subnets have the same requirements for the number of hosts, or if conserving IPv4 address space is not an issue, these fixed-size address blocks would be efficient. Typically, with public IPv4 addresses, that is not the case. For example, the topology shown in the figure requires seven subnets, one for each of the four LANs, and one for each of the three connections between the routers.

<img src="{{ site.baseurl }}/assets/images/address_conservation.png" alt="Address Conservation" width="1000"/>

A standard /16 subnetting scheme creates subnets that each have the same number of hosts. Not every subnet you create will need this many hosts, leaving many IPv4 addresses unused. Perhaps you will need one subnet that contains many more hosts. This is why the variable-length subnet mask (VLSM) was developed. In all of the previous subnetting examples, the same subnet mask was applied for all the subnets. This means that each subnet has the same number of available host addresses. As illustrated in the left side of the figure, traditional subnetting creates subnets of equal size. Each subnet in a traditional scheme uses the same subnet mask. As shown in the right side of the figure, VLSM allows a network space to be divided into unequal parts. With VLSM, the subnet mask will vary depending on how many bits have been borrowed for a particular subnet, thus the “variable” part of the VLSM.

<img src="{{ site.baseurl }}/assets/images/vlsm.png" alt="VLSM" width="1000"/> -->


## Case Study
[Instructions and Packet Tracer File for the Case Study](https://hvl.instructure.com/courses/34142/pages/ip-network-case-study)