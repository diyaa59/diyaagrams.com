---
title: OSPFv2 Theory
date: 2024-08-11
tags:
  - routing
  - OSPF
aliases:
  - OSPFv2-theory-notes
---
# Overview:

Author: Diyaa<br>
Published date: August 7th, 2024<br>
Last updated: August 11th, 2024<br>

>[!warning]
>You are reading an incomplete article.

This article will have my personal knowledge and notes on OSPFv2. I enjoy writing technical documentation and that is why I am spending my personal time writing this.

![[index#About Me|Home-Page]]

# Introduction To OSPFv2:

The Open Shortest Path First version 2 (OSPFv2) protocol is an Interior Gateway Protocol (IGP) for routing IPv4 routed traffic at layer 3 of the OSI module. It was developed as a replacement for RIP. OSPFv2 has the ability to scale by dividing an Autonomous System (AS) to different areas (This would be know as multi-area OSPFv2) allowing it to scale within an enterprise network.

Imagine OSPFv2 areas as LEGO blocks that connect to form bigger objects. However, OSPFv2 requires that all non-backbone areas connect to the backbone area. It is a best practice to always set area 0 as the backbone area in an OSPFv2 instance.

OSPFv2 designs must set the backbone area as the center of the network. What does that mean? It means that traffic in between non-backbone areas has to transit through the backbone area. I will be showing diagrams of OSPFv2 designs I made later in this article.

# Features of OSPFv2:

Here are some of the rich features that OSPFv2 has to provide:

- Areas - This allows for more efficiency and scalability.
- classless  - route subnets outside of the classful ranges (class A,B,C.)
- VLSM - support for Variable Length Subnet Masking (VLSM).
- supernetting - The aggregation of smaller contiguous networks into a larger network to increase routing efficiency.
- ECMP - Equal Cost Multi-Path (ECMP) forwarding. However, the links must have equal speeds.
- Use of multicast for OSPF control packets - OSPFv2 will use the muticast addresses of `224.0.0.5` and `224.0.0.6` for sending and receiving control packets.
- Authentication - OSPF has support for authentication to allow for secure routing.
- Route tagging - Allows for adding tags to specific routes.

# OSPFv2 Technical Specifications:

## Link State vs Distance Vector Routing:

[[Routing/Network-Routing#Link State Routing Protocols|Link State]] routing protocols like OSPF are usually more trust worthy than [[Routing/Network-Routing#Distance Vector Routing Protocols|distance vector]] routing protocols like RIP. Routing by link state is usually referred to as =="routing by road map"==, where as distance vector routing protocols would be referred to as =="routing by rumor"==.

OSPFv2 (**==link state routing==**) routers know the map to the entire network and they calculate their preference for the best route based on the cost (will be discussed later.) OSPF routers route by looking at their "GPS map" ( this is known as link state database in OSPF terms) and say "Hey, ==I know== what is the shortest path to get to network xyz. You need to go to my neighbor in this direction...."

RIP (**==distance vector routing==**) routers route by rumor they hear from their neighbors. They route by saying "Hey, I ==heard== from my neighbor up north that network xyz is that way...."

Just imagine when you get lost on the street and stop someone to ask them "Do you know how to get to place xyz?". You might end up regretting listening to them if they act as a RIP router that learned their routes by "rumor". You should have used some map application on your phone, link state routing will never fail you.

## Administrative Distance:

Understanding administrative distance is important when working with a route table containing multiple routing protocols such as OSPF, EIGRP, BGP, etc. This section is here to explain the role of administrative distance in routing. **OSPF** has an administrative distance of **110**.

![[Routing/Network-Routing#Administrative Distance (AD)|Administrative Distance]]

## Route Preference (Cost):

OSPF uses the Shortest Path First (SPF) Dijkstra algorithm to calculate the route preference value that is known as the "cost". It is trying to take the "cheapest" path to the destination. The lower the cost the higher the preference.

The mathematical formula that OSPF uses to calculate the cost is listed below:

$$ \text{Cost} = \frac{\text{Reference Bandwidth}}{\text{Interface Bandwidth}} $$

The reference bandwidth cost is known as the auto-cost reference bandwidth. This value is set in the router's OSPF configuration to enforce the use of that value across all the links of the router. **==It is recommended to set the same auto-cost reference bandwidth value across all OSPF routers within the same area==**. 

**==The default OSPF configuration sets the reference bandwidth to 100 megabit==**. This value **SHOULD** be changed to the highest interface speed that is expected in the network.

## OSPF Router-ID:

The router ID is a 32 bit long number represented in dotted decimal. It is important to understand that this is NOT an IP address. This value is just the unique name OSPF will use to identify a router within the autonomous system.

The router ID can not be identical on more than one router within an OSPF autonomous system. Are you wondering why? If there are 2 John's in a room and I call John, which one of them is going to answer? Exactly, both are going to answer at the same time which will result in a conflict. Therefore, It is important that each router has a unique name within an OSPF autonomous system.

#### Router-ID Selection Process:

The OSPF process on the router has multiple ways of defining the router ID in a specific order. The ordered process listed below is specific to Cisco and might not be similar on other vendors equipment.

> [!note] Important:
> [RFC2328](https://www.rfc-editor.org/rfc/rfc2328) recommended the use of the largest or the smallest IP on an interface for the second and the third fallback. Cisco decided to use the largest IP. Other vendors might choose to use the smallest IP for the second and third fallback in their implementation of OSPF.

1. Manually configured router ID from the OSPF configuration on the router.
2. Highest IP address on a loopback interface.
3. Highest IP on a non-loopback interface.

If the router does not have any IPs configured on loopback or non-loopback interfaces, and the OSPF configuration does not specify a router ID, the OSPF process will fail to start on the router. 

**Changing the Router-ID requires a restart of the OSPF routing process on the router regardless of the vendor. This is mentioned in [RFC2328](https://www.rfc-editor.org/rfc/rfc2328).**

## Protocol Functionality:

The steps below outline how OSPF functions at a high level. The process is a lot more complicated than the steps listed below. However, these steps are an overview of the process.

1. OSPF routers send hello packets to all OSPF routers listening on the multicast address of `224.0.0.5`.
2. OSPF routers agree on the configuration parameters in the hello packets. They need to agree on the configuration parameters to avoid issues.
3. OSPF routers establish neighborship adjacencies based on the network type.
4. Each router sends their Link State Advertisements (LSAs) to every other router they have established a neighborship adjacency with.
5. Each router receiving an LSA from a neighbor will add that LSA to their link state database and send a copy of the LSA to all of the other neighbors. 
6. The flooding of LSAs through an area will help all routers to maintain an identical link state database.
7. After all the LSAs in an area have been synced and injected to the database of every router within the area, each router will run the SPF algorithm to calculate the cost of each route.
8. Each router builds its own route table from the previous processes after completing the SPF algorithm calculations.

> [!note]
> OSPF will only exchange hello packets in the background based on the agreed hello timer and retransmit all the LSAs every 30 minutes assuming that the network is stable. This makes OSPF less chatty.

%%
## Areas:

## Network Types:

## OSPF Packets Types:

This section will have sub-sections about all the OSPFv2 packets and their properties.

### Hello Packet:


## LSA Types:
%%

# Related Notes:

- [[index|Home-Page]].
- [[Routing/Network-Routing|TCP/IP Routing]]

# References:

- Book: CCIE Professional Development Routing TCP/IP Volume I, Second Edition by Jeff Doyle.
- Book: CCIE Professional Development Routing TCP/IP Volume II, Second Edition by Jeff Doyle.
- Book: CCNA 200-301 Portable Command Guide, Fifth Edition by Scott Empson.
- [OSPFv2 RFC2328](https://www.rfc-editor.org/rfc/rfc2328).