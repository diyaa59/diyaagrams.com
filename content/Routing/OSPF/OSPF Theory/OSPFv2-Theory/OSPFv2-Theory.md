---
title: OSPFv2 Theory
date: 2024-08-07
tags:
  - routing
  - OSPF
aliases:
  - OSPFv2-theory-notes
---
# Overview:

Author: Diyaa Alkanakre<br>
Published date: August 7th, 2024<br>
Last updated: August 7th, 2024<br>

>[!warning]
>You are reading an incomplete article.

This is my personal notes on OSPFv2.

![[index#About Me|Home-Page]]

This article will have my personal knowledge and notes on OSPFv2. Oh, I forgot one more thing... I will have to warn you that I have a sense of humor and English is not my first language. I enjoy writing technical documentation and that is why I am spending my personal time writing this.

# Introduction To OSPFv2:

The Open Shortest Path First version 2 (OSPFv2) protocol is an Interior Gateway Protocol (IGP) for routing IPv4 routed traffic at layer 3 of the OSI module. OSPFv2 has the ability to scale by dividing an Autonomous System (AS) to different areas (This would be know as multi-area OSPFv2) allowing it to scale within an enterprise network.

Imagine OSPFv2 areas as LEGO blocks that connect to form bigger objects. However, OSPFv2 requires that all non-backbone areas connect to the backbone area. It is a best practice to always set area 0 as the backbone area in an OSPFv2 instance.

OSPFv2 designs must set area 0 as the center of the network. What does that mean? It means that traffic in between non-backbone areas has to transit through the backbone area. I will be showing diagrams of OSPFv2 designs I made later in this article.

# OSPFv2 Technical Specifications:

## Link State vs Distance Vector Routing:

[[Routing/Network-Routing#Link State Routing Protocols|Link State]] routing protocols like OSPFv2 are usually more trust worthy than [[Routing/Network-Routing#Distance Vector Routing Protocols|distance vector]] routing protocols like RIP. Routing by link state is usually referred to as =="routing by road map"==, where as distance vector routing protocols would be referred to as =="routing by rumor"==.

OSPFv2 (**==link state routing==**) routers know the map to the entire network and they calculate their preference for the best route based on the cost (will be discussed later.) OSPF routers route by looking at their GPS map (link state database) and say "Hey, ==I know== what is the shortest path to get to network xyz. You need to go to my neighbor in this direction...."

RIP (**==distance vector routing==**) routers route by rumor they hear from their neighbors. They route by saying "Hey, I ==heard== from my neighbor up north that network xyz is that way...."

Just imagine when you get lost on the street and stop someone to ask them "Do you know how to get to place xyz?". You might end up regretting listening to them if they are a RIP router. You should have used your phone and asked some map application, link state routing will never fail you.

## Administrative Distance:

**OSPFv2** has an administrative distance of **110**.

![[Routing/Network-Routing#Administrative Distance (AD)|Administrative Distance]]

## Route preference (cost):

To be continued.

# Related Notes:

- Link to [[index|Home-Page]].

# References:


