---
title: OSPFv2 Theory
date: 2024-08-07
tags:
  - routing
  - OSPF
---
# Overview:

Author: Diyaa Alkanakre<br>
Published date: August 7th, 2024<br>
Last updated: August 7th, 2024<br>

>[!warning]
>You are reading an incomplete article. This is a draft.

This is my personal notes on OSPFv2. I graduated from the Network Engineering Technology ([[https://www.nait.ca/programs/network-engineering-technology|NET]]) program at the Northern Institute of Alberta ([[https://www.nait.ca/nait/home|NAIT]]) in 2023. I fell in love with routing after attending the classes of [[https://www.linkedin.com/in/scottempson/|Scott Empson]] and [[https://www.linkedin.com/in/monica-ciobanu-61649517/|Monica Ciobanu]] at NAIT.

This article will have my personal knowledge and notes of OSPFv2. Oh, I forgot one more thing... I will have to warn you that I have a sense of humor and English is not my first language  🙂. I enjoy writing technical documentation and that is why I am spending my personal time writing this 🙂. I lied, that wasn't the last thing I was going to say.... looking at emojis when writing my notes makes me think better 🙂. Therefore, the emojis aren't going away anytime soon 🙃.

# Introduction To OSPFv2:

The Open Shortest Path First version 2 (OSPFv2) protocol is an Interior Gateway Protocol (IGP) for routing IPv4 routed traffic at layer 3 of the OSI module. OSPFv2 has the ability to scale by dividing an Autonomous System (AS) to different areas (This would be know as multi-area OSPFv2) allowing it to scale within an enterprise network.

Imagine OSPFv2 areas as LEGO blocks that connect to form bigger objects. However, OSPFv2 requires that all non-backbone areas to be connected to the backbone area. It is a best practice to always set area 0 as the backbone area in an OSPFv2 instance.

OSPFv2 designs must set area 0 as the center of the network. What does that mean? It means that traffic in between non-backbone areas has to flow through the backbone area. Area 0 is basically the capital city of an OSPFv2 country. The most powerful politicians (routers) make their decisions in the capital city 🙂. I will be showing diyaagrams of OSPFv2 designs I made later in this article.

# OSPFv2 Technical Specifications:

## Link State vs Vector Distance Routing:

Link state routing protocols like OSPFv2 are usually more trust worthy than vector distance routing protocols like RIP. Routing by link state is usually referred to as =="routing by road map"==, where as vector distance routing protocols would be referred to as =="routing by rumor"==.

OSPFv2 (**==link state routing==**) routers know the map to the entire network and they calculate their preference for the best route based on the cost (will be discussed later.) OSPF routers never lie. They look at their GPS map and say "Hey, I know what is the shortest path to get to network xyz. You need to go to my neighbor in this direction...."

RIP (**==vector distance routing==**) routers on the other hand can lie 🙂. They are basically routing by saying "Hey, I heard from my neighbor up north that network xyz is that way...."

Just imagine when you get lost on the street and stop someone to ask them "Do you know how to get to place xyz?". You might end up regretting listening to them if they are a RIP router 🙃. You should have used your phone and asked Google Maps, link state routing will never fail you 🙂.

## Administrative Distance:


The administrative distance is the trustworthiness of a routing protocol. It is basically how a router tells which route to trust more in the event there are matching routes (subnet wise) from 2 different routing protocol.

The table below shows the administrative distance of routing protocols on Cisco IOS (most vendors follow the same implementation, but not every vendor has these values).

> [!note]
> This section is being linked from another note on this site.

![[Routing/BGP/BGP primary notes/BGP primary notes#Administrative Distance|A1]]

## Route preference (cost):

To be continued 🙂.




