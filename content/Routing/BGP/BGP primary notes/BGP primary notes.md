---
title: BGP notes
tags:
  - BGP
  - routing
date: 2024-08-04
aliases:
  - A1
  - BGP-routing-notes
---
# Overview:

Author: Diyaa Alkanakre<br>
Published date: August 4th, 2024<br>
Last updated: August 10th, 2024<br>

This document will outline the theory behind how BGP operates. I plan on having all of my BGP notes in single document for ease of access/use. 

![[index#About Me|Home-Page]]

# Routing Theory:

## Interior Gateway Routing Protocols:

![[Routing/Network-Routing#Interior Gateway Routing Protocols (IGP)|routing-master-note]]

## Exterior Gateway Routing Protocols:

![[Routing/Network-Routing#Exterior Gateway Routing Protocols (EGP)|routing-master-note]]

## Administrative Distance:

**eBGP** has an administrative distance of **20** and **iBGP** has an administrative distance of **200**.

![[Routing/Network-Routing#Administrative Distance (AD)|Administrative Distance]]

## IP Addresses and public ASNs Allocation:

![[Routing/Network-Routing#Public IPs and BGP ASNs allocation|routing-master-note]]

# BGP Routing Theory:

> [!note]
> A large portion of my notes are from Kevin Wallace training videos [^kevin-wallace-01].

## Introduction To BGP:

Boarder Gateway Protocol (BGP) is known as an **Exterior Gateway Protocol (EGP)** that is capable of sharing routes in between autonomous systems. There are $2^{32}$ BGP autonomous system numbers available (Not all the ASNs are available for public use).

BGP is capable of doing interior and exterior routing as well. The famous BGP that runs the internet is the External Boarder Gateway Protocol (eBGP). There is another type of BGP that runs as an **Interior Gateway Protocol (IGP)**, it is the Internal Boarder Gateway Protocol (iBGP).

### Difference Between eBGP and iBGP:

The External Boarder Gateway Protocol (eBGP) runs across different Autonomous System (AS), while Internal Boarder Gateway Protocol (iBGP) runs between Autonomous Systems (AS).

iBGP routers assume that all the other routers within the autonomous system have the routes of the AS. However, there is a [[#BGP Route Reflector]] configuration option to force iBGP to share routers to neighboring routers. eBGP will naturally share routes to neighboring routers since they are in an external autonomous system.  

### BGP Features and Advantages:

BGP has the following features and advantages:
- **Path-vector** routing protocol:
- Reliable updates - However, this makes it slow.
- Triggered updates only - BGP won't be sending updates periodically.
- Uses attributes to determine the best path.
- **inter-domain routing protocol**.
- External BGP is used between service providers as a transit in between autonomous system.
- **Multihomed**: A client can have multiple ISPs and advertise the same subnet.
- Large enterprise scale network routing protocol.
- Very scalable: Can handle massive amount of routes.
- Not the fastest routing protocol. It was meant to be scalable.
- Non-trusting protocol: You don't trust the service provider, the service provider doesn't trust you. The trust here is more in terms of implementation.
- Policy-based.
- Multi-protocol support: Some examples of that can be - IPv6, IPv4, VXLAN, etc.....
- Uses **Autonomous System** (AS) numbers.

## BGP Characteristics:

> [!important]
> NLRI is usually referred to as a **==Route Advertisement (RA)==**. In BGP NLRI has similar characteristics of the OSPF route advertisements. However, it is not the same thing.

These are some of the characteristics of BGP:
- Neighbor's IP address must be set explicitly in the configuration of the router.
- Establishes TCP sessions on port 179.
- Advertises address prefix and length. This is known as **==Network Layer Reachability Information (NLRI).==**
- Advertises a collection of **==path attributes==** used for **==path selection==**. It has **==11 path attributes==**.
- It is called a **==path vector==** routing protocol, because it records the entire path to the destination.

## BGP Autonomous System Numbers:

> [!tip]
> The private ASN numbers are reserved for internal use just like the RFC1918 ranges in IPv4.

The ASN field was updated to 32 bits after the exhaustion of public AS numbers when it was 16 bits long.

This is a table of all the ASN ranges and their assignments by IANA.

| Number                | Bits | Description                                               | Reference          |
| --------------------- | ---- | --------------------------------------------------------- | ------------------ |
| 0                     | 16   | Reserved for RPKI unallocated space invalidation          | RFC 6483, RFC 7607 |
| 1–23455               | 16   | **==Public ASNs==**                                       |                    |
| 23456                 | 16   | Reserved for AS Pool Transition                           | RFC 6793           |
| 23457–64495           | 16   | **==Public ASNs==**                                       |                    |
| 64496–64511           | 16   | Reserved for use in **==documentation==** and sample code | RFC 5398           |
| 64512–65534           | 16   | Reserved for **==private==** use                          | RFC 1930, RFC 6996 |
| 65535                 | 16   | Reserved                                                  | RFC 7300           |
| 65536–65551           | 32   | Reserved for use in **==documentation==** and sample code | RFC 5398, RFC 6793 |
| 65552–131071          | 32   | Reserved                                                  |                    |
| 131072–4199999999     | 32   | **==Public 32-bit ASNs==**                                |                    |
| 4200000000–4294967294 | 32   | Reserved for **==private==** use                          | RFC 6996           |
| 4294967295            | 32   | Reserved                                                  | RFC 7300           |

Reference for the table above [^1].

### Autonomous System Number 2-bytes format:

The 2-bytes ASN has $65,536$ ($2^{16}$) possible AS numbers. IANA reserves 1026 of these numbers (64512-65534) for private ASN use. You can look at the table under [[#BGP Autonomous System Numbers]] for more information about the allocation of the ASNs.

ASNs in between 0 and 65535 are called **==mappable ASNs==**, because they can be presented in 2-bytes.

References for this section [^4] [^5].

### Autonomous System Number 4-bytes format:

The 4-bytes ASN has $4,294,967,296$ ($2^{32}$) possible AS numbers. IANA reserves the range of 4,200,000,000–4,294,967,294 for private ASN use. You can look at the table under [[#BGP Autonomous Systems]] for more information about the allocation of the ASNs.

References for this section [^4] [^5].

#### Autonomous System plain (asplain) decimal presentation of the ASN:

This is the simplest way of representing an ASN. You simply type the number in decimal format. The range is in between 0 and 4,294,967,295.

#### Autonomous System dot plus (asdot+) presentation of the ASN:

This form of representation breaks the ASN into two 16-bit sections with a dot in the middle.

The presentation of asdot+ contains the following values:
- **==low-order value==**: First 16 bits
- **==high-order value==**: Last 16 bits

> [!example]
> `6.65535`
> low-order value: 6
> high-order value: 65535
> 

##### Converting values below 65536:

To convert an asplain value below 65536 to asdot+, you simply write the value in the high-order field with the low-order field being set to 0.

> [!example]
> - Asplain: 65535
> - Asdot+: 0.65535
 
##### Converting values over 65535:

> [!bug]
> - This calculation doesn't apply for AS number 65536. The reason is that computers believe in 0 and see it as a number, but humans do not believe in 0 as a number. 
> - 65536 in asplain is presented as 1.0 in asdot+.

> [!tip] Low-order value calculation:
>
> > [!caution]
> > Do not round the value up or down. Just use the whole number and ignore everything else.
> $$
> \text{low order value} = \text{whole number value of }  \left[ \frac{\text{asplain notation value}}{65536} \right]
> $$

> [!tip] high-order value calculation:
> $$
> (\text{high order value }) = (\text{asplain notation value}) - ( (\text{low order value}) * (65536) )
> $$

> [!tip] Representation of asdot+:
> You now simply place the numbers on the correct side of the dot.
> `low-order.high-order`

> [!Example]
> Convert 1,540,564,551 from asplain representation to asdot+ representation.
> $$
> \text{low order value} = \text{whole number value of}  \left[\frac{1,540,564,551}{65536}\right] = 23,507.1495208740234375
> $$
> 
> $$
> \text{low order value} = 23,507
> $$
> 
> $$
> \text{high order value} = (1,540,564,551) - (23,507 * 65,536) = 9,799
> $$
> 
> $$
> \text{asdot+ value representation} = 23507.9799
> $$
> You can validate the answer on the following website: [asplain to asdot+ BGP converter](https://www.networkers-online.com/tools/bgp-asn-4byte-converter/)
> 
> ![[Routing/BGP/BGP primary notes/Attachments/Pasted image 20231222193357.png]]
> 

#### Autonomous System dot (asdot) presentation of the ASN:

Asdot is combines the presentation of asplain and asdot+. The ASNs that fit in the first 16-bit low-order value are written in asplain ([[#Autonomous System plain (asplain) decimal presentation of the ASN]]) (0 to 65535). Anything over 65535 is written in asdot+ ([[#Autonomous System dot plus (asdot+) presentation of the ASN]]).

## BGP Route Reflector:

In iBGP there is an issue that requires the route reflector. By default iBGP **==assumes==** that if a neighbor advertises a route, that it advertised it to everyone else within the autonomous system. This is because iBGP **==assumes full internal mesh topology==** in between all the routers. The issue with full mesh connectivity is that it requires a large number of neighborships to form when scaling.

**==The route reflector tells an iBGP router to advertise a route it learned to all of it's neighbors without a full mesh connectivity.==**

The screenshot below shows how BGP assumes the network is configured without the route reflector configuration.

![[Routing/BGP/BGP primary notes/Attachments/Pasted image 20231221212102.png]]

The screenshot below shows how BGP would function with the route reflector configuration.

![[Routing/BGP/BGP primary notes/Attachments/Pasted image 20231221212943.png]]

> [!tip]
> If you are familiar with the role of the Designated Router (DR) in OSPF, you can look at the route reflector in BGP the same way. *Assume that R4, R5, and R3 are DROTHERs.*

Reference for screenshots in this section [^kevin-wallace-01].

## BGP Confederation:

BGP confederation allows the use of **==sub-autonomous systems==**. **==A full mesh connectivity is required within a sub-autonomous system, but not in between the sub-autonomous systems.==**

![[Routing/BGP/BGP primary notes/Attachments/Pasted image 20231221212809.png]]

Reference for screenshots in this section [^kevin-wallace-01].

## Neighborship Formation:

The neighborship formation in BGP starts with the TCP 3-way handshake.

BGP states:

> [!important]
> The port that BGP uses is TCP/179.

- ==Idle==: sent the SYN packet of the TCP handshake.
- ==Connect==: received the SYN/ACK packet of the TCP handshake.
- ==Active==: sent the ACK packet and completed the 3-way TCP handshake.
- ==Open Sent==: BGP Open relationship message.
- ==Open Confirm==: BGP confirms the relationship.
- ==Established==: BGP neighborship has been formed and routes can be exchanged now.

![[Routing/BGP/BGP primary notes/Attachments/Pasted image 20231221214904.png]]

Reference for screenshots in this section [^kevin-wallace-01].

### BGP Open Message:

> [!important] Default BGP timers:
> Keepalive: 60 seconds.
> Hold-time: 180 seconds.

The BGP open message contains the following information:

- ==BGP version number== (This will be version 4 most of the time).
- ==Local autonomous system number==.
- ==Hold time==.
- ==BGP router ID==.
- ==Optional parameters==.

### BGP Keepalive Message:

> [!important]
> If BGP doesn't hear from a neighbor after the keepalive timer expires. It will wait until the hold-time timer expires before revoking the neighborship.

This message is sent to keep the hold-time timer from expiring.

### BGP Update Message:

The BGP update message may contain the following information (depending on the update):

- withdrawn routes.
- Path attributes.
- Network Layer Reachability Information (NLRI).

### BGP Notification Message:

The BGP notification message may contain the following information:

- An error code.
- An error subcode.
- Information about the error.

## BGP Path Selection:

> [!important]
> The 8 path selection attributes I have in this section aren't the only path selections attributes for BGP out there. However, the majority of these path selection attributes are the most common across multiple vendor's implementation of BGP.

![[Routing/BGP/BGP primary notes/Attachments/Pasted image 20240803110323.png]]

Reference for screenshots in this section [^kevin-wallace-01].

One of the phrase that could be used to remember the path selection attributes is: ==W==e ==L==ove ==O==ranges ==A==s Oranges ==M==ean ==P==ure ==R==efreshment. This passphrase is used by Kevin Wallace in his training videos.

> [!warning]
> Do not mistake the path selection attribute (prefers the lowest router ID) with the router ID election process.

| Order of matching | Path selection attribute           | Description                                                                                                                                                                             | Influence                                            |     |
| ----------------- | ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- | --- |
| 1                 | ==W==eight                         | Locally significant, ==Cisco-specific parameter==. Commonly used to influence outbound routing decisions. Can be used to prioritize one link over the other.                            | A higher value is preferred                          |     |
| 2                 | ==L==ocal Preference               | Communicated through a ==single AS== to ==influence outbound routing decisions==.                                                                                                   | A higher value is preferred                          |     |
| 3                 | ==O==riginate                      | Paths ==sourced locally== are preferred.                                                                                                                                                | ==Directly connected== links are preferred           |     |
| 4                 | ==A==S path length                 | The number of autonomous systems in the "AS_PATH" attribute. Lower AS path lengths are preferred. Commonly used to influence inbound routing decisions.                                 | Lower value is preferred                             |     |
| 5                 | ==O==rigin type                    | Indicates how the route was injected into BGP. `i` (network command), `e` (EGP), or `?` (redistributed).                                                                                      | (i) is preferred to (e), and (e) is preferred to (?) |     |
| 6                 | ==M==ulti-Exit Discriminator (MED) | set and advertised by routers in one AS to influence the BGP path selection decision of routers in another AS. This might be known as ==Metric== in some vendor's implementation of BGP | A lower MED is preferred                             |     |
| 7                 | ==P==aths                          | Prefer eBGP path over iBGP path.                                                                                                                                                        | eBGP has an AD of 20. However iBGP has an AD of 200  |     |
| 8                 | ==R==outer ID                      | A tie breaker. The route received from the router with the lowest router ID.                                                                                                            | Lowest router ID is preferred                        |     |


## BGP Synchronization:

BGP synchronization is a rule that avoids an unintentional network (aka, black hole). This feature tells the router to ==only advertise a route learned from an iBGP peer to an eBGP peer when there is an exact match of that route learned from an IGP in the routing table==.

![[Routing/BGP/BGP primary notes/Attachments/Pasted image 20231224221602.png]]

Reference for screenshots in this section [^kevin-wallace-01].

> [!Warning] 
> BGP Synchronization might be turned off on most vendor equipment by default. This feature can cause issues.

An example of BGP synchronization is shown in the screenshot above. In this case, `R2` will not advertise `3.3.3.3/32` to router `R1` through eBGP if synchronization is turned on and that network isn't advertise to `R2` from `R3` through an Interior Gateway Protocol (IGP). This guarantees that `R2` won't advertise a network that it doesn't know.

## BGP Summarization:

> [!info] Personal opinion:
> ==If the routes you are trying to summarize aren't contagious, that might cause routing loops==. I have done that in my home lab multiple times.
> You might ask.. What is an example of a contagious set of networks?
> - 172.16.0.0/24
> - 172.16.1.0/24
> - 172.16.2.0/24
> - 172.16.3.0/24
>
> The networks listed above are ==contagious== and can be summarized as a single 172.16.0.0/22 summary route.
> 
> ---
> You might also ask.. What is an example of a ==non-contagious== set of networks? 
> - 172.16.0.0/24
> - 172.16.2.0/24
> - 172.16.3.0/24
>
> In the above example, the network of 172.16.1.0/24 is missing. Therefore, this is a ==non-contagious set of networks==. Advertising these networks as a 172.16.0.0/22 summary might result in routing loops for traffic to the 172.16.1.0/24 network. 

Route summarization is the idea of turning ==multiple contagious routes== into a ==single route==. This helps ==improve the efficiency== of the routers by ==reducing the size of the routing table==. Some vendor's implementation of BGP might refer to route summarization as ==route aggregation==.

## eBGP Multihop:

The multihop feature in BGP allows for a router to ==establish BGP neighborship with a non-adjacent router==. That means, the routers don't share the same broadcast domain at layer 2. ==This is only needed/available in eBGP and not in iBGP==.

## BGP Path Hunting/Exploration:

In BGP, the routers can't afford to have a flapping link. A flapping link will result in ==route dampening==. If there is a ==flapping interface== on a router that has formed a BGP neighborship with another router, that router might get their routes dampened. ==BGP dampens the path to the AS==. This BGP feature is known as ==BGP Route Flap Dampening (RFD)==. 

![[Routing/BGP/BGP primary notes/Attachments/Pasted image 20231225145422.png]]

BGP is fully converged in the first state of the network in the diagram above. The moment a link connected to a peer becomes unavailable. The following steps are taken:

- BGP sends ==withdrawn messages== to its neighbors.
- The upstream BGP routers in the neighboring autonomous system will run the ==path selection algorithm== again to determine what is the best path.
- The route to the network is placed in the routing table and BGP will send an ==announcement message== of the updated path to it's neighbors.

The issues with route dampening is that there may be multiple paths to an autonomous system with a downed link. This could lead to BGP taking minutes to hours before it reconverges again.

There are multiple factors that affect the speed at which a route is dampened:

- Processing.
- Queuing.
- Propagation delays.
- Minimum Route Advertisement Interval (MRAI).
- Violation policy penalties applied by neighbors based on specified thresholds.

==A flapping interface/routes on a BGP peer might result in that peer having its routes dampened from BGP==. Some ISPs might implement ==penalties and  suppression threshold timers==. That can ==reduce== the number of ==announcements and withdrawn messages== the "ISP" peer has to send to it's upstream neighbors. However, the issue is when an ==AS has redundant links to multiple service providers==. That can result in BGP taking hours to stabilize the path selection process for the flapping route(s).

Reference for this section [^6].

### Aggressive BGP route flap dampening:

Some service providers might choose to implement aggressive route flap dampening policies. This might include ==thresholds of timers based on the length of the prefix being advertised==. ==A== `/24`  ==network might get a higher suppression timer than a== `/19` ==network==. This approach maybe required when the ISP is doing prefix aggregation (summarization) into BGP to improve the efficiency and reduce the number of routes on the "internet".



Reference for this section [^6].

---
# Technical Configuration:

> [!note]
> All the configuration syntax I will be using in my documentation is referencing the Cisco IOS syntax. However, a large portion of the commands and what they do might be similar to other vendors syntax.

> [!tip]
> In the real world. An organization with an AS assigned to them by their RIR provider CAN NOT advertise to BGP unless they have a minimum prefix size of `/24`. This is to reduce the size of the internet routing table and increase routing efficiency.

## Basic BGP Configuration:

![[Routing/BGP/BGP primary notes/Attachments/BGP-Labs-diagrams.drawio.svg]]

Reference for screenshots in this section [^kevin-wallace-01].

R1 configuration:

```config
R1# configuration terminal
R1(config)# router bgp 64500
R1(config-router)# neighbor 198.51.100.2 remote-as 64495
R1(config-router)# network 192.0.2.0 mask 255.255.255.0
```

R2 configuration:

```config
R2# config term
R2(config)# router bgp 64495
R2(config-router)# neighbor 198.51.100.1 remote-as 64500
R2(config-router)# network 203.0.113.0 mask 255.255.255.0
```

Commands for validating BGP is working:

- Show the routing table:

```config
Rx# show ip route
```

- Show the BGP table:

```config
Rx# show ip bgp
```

## Advanced BGP Configuration:

To be continued...

Pick up [here](https://youtu.be/SVo6cDnQQm0?list=PLyt5OhlhlmJUGZ9kM45QWX5ZrCLoXVQXD&t=4871)

# Related Notes:

- Link to [[index|Home-Page]].

# References:

- [RFC6793](https://www.rfc-editor.org/rfc/rfc6793)
- [RFC4271](https://www.rfc-editor.org/rfc/rfc4271)
- [PacketPushers - BGP session establishment](https://packetpushers.net/demystifying-bgp-session-establishments/)

[^Kevin-Wallace-01]: [BGP Deep Dive](https://youtu.be/SVo6cDnQQm0?list=PLyt5OhlhlmJUGZ9kM45QWX5ZrCLoXVQXD)
[^1]: [AS numbers allocation](https://en.wikipedia.org/wiki/Autonomous_system_%28Internet%29)
[^3]: [BGP AS allocation monitor](https://www.cidr-report.org/)
[^4]: [Understanding the 4-byte AS numbers in BGP by Jeff Doyle](https://www.networkworld.com/article/760079/understanding-4-byte-autonomous-system-numbers.html)
[^5]: [Packet Pusher - 4-byte BGP ASN](https://packetpushers.net/packet-pushers-labs-bgp-4-byte-asns-video/)
[^6]: [Packet Pusher -  BGP Path hunting/Exploration](https://packetpushers.net/bgp-path-huntingexploration/)
