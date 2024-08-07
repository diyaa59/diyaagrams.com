---
title: BGP notes
tags:
  - BGP
  - routing
date: 2024-08-03
Author: Diyaa Alkanakre
---
# Overview:

Author: Diyaa Alkanakre.

Last updated: December 25th, 2023.

This document will outline the theory behind how BGP operates. I plan on having all of my BGP notes in single document for ease of access/use.

# Theory:
## Introduction:

**External Gateway Protocols (EGP)** is mostly going to work with an **Interior Gateway Protocol (IGP)**.

> [!note]
> - *You can see an overview about BGP autonomous systems and routes allocation/distribution if you follow the link in footnote [^3] in the [[#References]] section.*
> - A large portion of my notes are coming from the video linked in footnote [^2] in the [[#References]] section.

### IGP protocols:

Distance vector:
- RIPv1
- RIPv2

Link state:
- OSPFv2 and/or OSPFv3
- IS-IS

Advanced distance vector:
- EIGRP


### EGP protocols:

BGP is an example of an exterior gateway protocol that can connect public autonomous systems together.

> [!important] What is the difference between eBGP and iBGP?
> BGP has an internal version and an external version.
> 
> External Boarder Gateway Protocol (eBGP):
>  - Runs within an Autonomous System (AS).
> 
> Internal Boarder Gateway Protocol (iBGP):
> - Runs between Autonomous Systems (AS).

BGP can be seen as
- **Path-vector** routing protocol:
    - Reliable updates - However, this makes it slowwwwww.
    - Triggered updates only - BGP won't be sending updates periodically.
    - Uses attributes to determine the best path.
- **inter-domain routing protocol**.
- External BGP is used between service providers as a transit in between autonomous system.
- **Multihomed**: A client can have multiple ISPs and advertise the same subnet.
- Large enterprise scale network routing protocol.
- Very scalable: Can handle a massive amount of routes.
- Not the fastest routing protocol. It was meant to be scalable.
- Non-trusting protocol: You don't trust the service provider, the service provider doesn't trust you. The trust here is more in terms of implementation.
- Policy-based.
- Multi-protocol support: Some examples of that can be - IPv6, IPv4, VXLAN, etc.....
- Uses **Autonomous Systems** (AS) numbers.

## IP Addresses Allocation:

![[Routing/BGP/BGP-primary-notes/Attachments/Pasted image 20231221185354.png]]

The internet public IP addresses are distributed by the following organizations.

**IANA**:
- Internet Assigned Numbers Authority.
- Top of the hierarchy.
- Assigns blocks to RIR. 

**RIR**: 
- Reginal Internet Registry.
- They are second in command after IANA.
- There are 5 of them world wide.
- The North American one is **ARIN**.
- Assigns AS numbers and IPv4/IPv6 ranges in their perspective region. 

## BGP Autonomous Systems:

> [!tip]
> The private ASN numbers are reserved for internal use just like the RFC1918 ranges in IPv4.

- 16 or 32 bit numbers - Note: It was updated to 32 bits after the exhaustion of public AS numbers.

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

Note: reference for this table is footnote [^1].

### Autonomous System Number 2-bytes format:

The 2-bytes ASN has $65,536$ ($2^{16}$) possible AS numbers. IANA reserves 1026 of these numbers (64512-65534) for private ASN use. You can look at the table under [[#BGP Autonomous Systems]] for more information about the allocation of the ASNs.

ASNs in between 0 and 65535 are called **==mappable ASNs==**, because they can be presented in 2-bytes.

*Note: the information in this section is mainly taken from the article by Jeff Doyle linked in footnote [^4] under the [[#References]] section. This is also explained in a video on the packet pusher blog linked in footnote [^5] under the [[#References]] section.*

### Autonomous System Number 4-bytes format:

The 4-bytes ASN has $4,294,967,296$ ($2^{32}$) possible AS numbers. IANA reserves the range of 4,200,000,000–4,294,967,294 for private ASN use. You can look at the table under [[#BGP Autonomous Systems]] for more information about the allocation of the ASNs.


*Note: the information in this section is mainly taken from the article by Jeff Doyle linked in footnote [^4] under the [[#References]] section. This is also explained in a video on the packet pusher blog linked in footnote [^5] undern the [[#References]] section.*

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
> - This calculation doesn't apply for AS number 65536. The reason is that computers believe in 0 and see it as a number, but humans do not believe in 0 🙂. 
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
> You now simply place the numbers on the correct side of the dot 🙂.
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
> ![[Routing/BGP/BGP-primary-notes/Attachments/Pasted image 20231222193357.png]]
> 

#### Autonomous System dot (asdot) presentation of the ASN:

Asdot is combines the presentation of asplain and asdot+. The ASNs that fit in the first 16-bit low-order value are written in asplain ([[#Autonomous System plain (asplain) decimal presentation of the ASN]]) (0 to 65535). Anything over 65535 is written in asdot+ ([[#Autonomous System dot plus (asdot+) presentation of the ASN]]).

## Administrative Distance:

> [!important]
> - Administrative distance indicate the trust worthiness of a routing.
> - **==The lower the administrative distance the more trust worthy the routing protocol.==**

| Routing source | Administrative distance |
| --- | --- |
| Directly connected (IP on the interface) | 0 |
| Static route | 1 |
| eBGP | 20 |
| EIGRP (Internal) | 90 |
| OSPF | 110 |
| IS-IS | 115 |
| RIP | 120 |
| EIGRP (External) | 190 |
| iBGP | 200 | 


## BGP Characteristics:

> [!important]
> NLRI is usually referred to as a **==Route Advertisement (RA)==**. In BGP NLRI has similar characteristics of the OSPF route advertisements. However, it is not the same thing.

- Forms Neighborships.
- Neighbor's IP address must be set explicitly in the configuration of the router.
- Establishes a TCP session on port 179.
- Advertises address prefix and length.
    - This is known as: **==Network Layer Reachability Information (NLRI).==**
- Advertises a collection of **==path attributes==** used for **==path selection==**.
    - BGP has **==11 path attributes==**.
- It is called a **==path vector==** routing protocol, because it tells the entire path to the destination.

## BGP Route Reflector:

In iBGP there is an issue that requires the route reflector. By default iBGP **==assumes==** that if a neighbor advertises a route, that it advertised it to everyone else. This is because iBGP **==assume full internal mesh topology==** in between all the routers. The issue with full mesh connectivity is that it requires a large number of neighborships to form when scaling.

**==The route reflector tells an iBGP router to advertise a route it learned to all of it's neighbors.==**

![[Routing/BGP/BGP-primary-notes/Attachments/Pasted image 20231221212102.png]]

> [!tip]
> If you are familiar with the idea of the designated router in OSPF, you can look at the route reflector in BGP the same one. *Assume that R4, R5, and R3 are DROTHERs.*

![[Routing/BGP/BGP-primary-notes/Attachments/Pasted image 20231221212943.png]]

*Note: the screenshot(s) above is taken from the video linked in footnote [^2] under the [[#References]] section.*

## BGP Confederation:

BGP confederation allows the use of **==sub-autonomous systems==**. **==A full mesh connectivity is required within a sub-autonomous system, but not in between the autonomous systems.==**

![[Routing/BGP/BGP-primary-notes/Attachments/Pasted image 20231221212809.png]]

*Note: the screenshot(s) above is taken from the video linked in footnote [^2] under the [[#References]] section.*

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

![[Routing/BGP/BGP-primary-notes/Attachments/Pasted image 20231221214904.png]]

*Note: the screenshot(s) above is taken from the video linked in footnote [^2] under the [[#References]] section.*

### BGP Open Message:

> [!important] Default BGP timers:
> Keepalive: 60 seconds.
> Hold-time: 180 seconds.

This message contains the following:

- ==BGP version number== (This will be version 4 most of the time).
- ==Local autonomous system number==.
- ==Hold time==.
- ==BGP router ID==.
- ==Optional parameters==.

### BGP Keepalive Message:

> [!important]
> If BGP doesn't hear from a neighbor after the keepalive timer expires. It will wait until the Hold-time timer expires before revoking the neighborship.

This message is sent to keep the hold-time timer from expiring.

### BGP Update Message:

This message can contain:

- withdrawn routes.
- Path attributes.
- Network Layer Reachability Information (NLRI).

### BGP Notification Message:

This message can contain:

- An error code.
- An error subcode.
- Information about the error.

## BGP Path Selection:

> [!important]
> The 8 path selection attributes I have in this section aren't the only path selections attributes for BGP out there. However, the majority of these path selection attributes are the most common across multiple vendor's implementation of BGP.

![](Routing/BGP/BGP-primary-notes/Attachments/Pasted%20image%2020240803110323.png)

*Note: the screenshot(s) above is taken from the video linked in footnote [^2] under the [[#References]] section.*

One of the phrase that could be used to remember the path selection attributes is: ==W==e ==L==ove ==O==ranges ==A==s Oranges ==M==ean ==P==ure ==R==efreshment.

> [!warning]
> Do not mistake the path selection attribute (prefers the lowest router ID) with the router ID election process.

| Order of matching | Path selection attribute           | Description                                                                                                                                                                             | Influence                                            |     |
| ----------------- | ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- | --- |
| 1                 | ==W==eight                         | Locally significant, ==Cisco-specific parameter==. Commonly used to influence outbound routing decisions. Can be used to prioritize one link over the other.                            | A higher value is preferred                          |     |
| 2                 | ==L==ocal Preference               | Communicated through the a ==single AS== to ==influence outbound routing decisions==.                                                                                                   | A higher value is preferred                          |     |
| 3                 | ==O==riginate                      | Paths ==sourced locally== are preferred.                                                                                                                                                | ==Directly connected== links are preferred           |     |
| 4                 | ==A==S path length                 | The number of autonomous systems in the "AS_PATH" attribute. Lower AS path lengths are preferred. Commonly used to influence inbound routing decisions.                                 | Lower value is preferred                             |     |
| 5                 | ==O==rigin type                    | Indicates how the route was injected into BGP. i (network command), e (EGP), or ? (redistributed).                                                                                      | (i) is preferred to (e), and (e) is preferred to (?) |     |
| 6                 | ==M==ulti-Exit Discriminator (MED) | set and advertised by routers in one AS to influence the BGP path selection decision of routers in another AS. This might be known as ==Metric== in some vendor's implementation of BGP | A lower MED is preferred                             |     |
| 7                 | ==P==aths                          | Prefer eBGP path over iBGP path.                                                                                                                                                        | eBGP has an AD of 20. However iBGP has an AD of 200  |     |
| 8                 | ==R==outer ID                      | A tie breaker. The route received from the router with the lowest router ID.                                                                                                            | Lowest router ID is preferred                        |     |


## BGP Synchronization:

- BGP synchronization is a rule that avoids an unintentional network (aka, black hole).
- This feature tells the router to ==only advertise a route learned from an iBGP peer to an eBGP peer when there is an exact match of that route learned from an IGP in the routing table==.

![[Routing/BGP/BGP-primary-notes/Attachments/Pasted image 20231224221602.png]]

*Note: the screenshot(s) above is taken from the video linked in footnote [^2] under the [[#References]] section.*

> [!Warning] 
> BGP Synchronization might be turned off on most vendor equipment by default. This feature can cause issues.

An example of BGP synchronization is shown in the screenshot above. In this case, R2 will not advertise `3.3.3.3/32` to router R1 through eBGP if synchronization is turned on and that network isn't advertise to R2 from R3 through an Interior Gateway Protocol (IGP). This guarantees that R2 won't advertise a network that it doesn't know.

## BGP Summarization:

> [!info] Personal opinion:
> ==If the routes you are trying to summarize aren't contagious, that might cause routing loops== 😉. I have done that in my home lab multiple times.
> You might ask.. What is an example of a contagious set of networks?
> - 172.16.0.0/24
> - 172.16.1.0/24
> - 172.16.2.0/24
> - 172.16.3.0/24
>
> The networks listed above are ==contagious== and can be summurized as a single /22 summary.
> 
> ---
> You might also ask.. What is an example of a ==non-contagious== set of networks? 
> - 172.16.0.0/24
> - 172.16.2.0/24
> - 172.16.3.0/24
>
> In the above example, the network of `172.16.1.0/24` is missing. Therefore, this is a ==non-contagious set of networks==.

- Route summarization is the idea of turning ==multiple contagious routes== into a ==single route==. This helps ==improve the efficiency== of the routers by ==reducing the size of the routing table==.
- Some vendor's implementation of BGP might refer to route summarization as ==route aggregation==.

## eBGP Multihop:

The multihop feature in BGP allows for a router to ==establish BGP neighborship with a non-adjacent router==. That means, the routers don't share the same broadcast domain at layer 2. ==This is only needed/available in eBGP and not in iBGP==.

## BGP Path Hunting/Exploration:

In BGP, the routers can't afford to have a flapping link. A flapping link will result in ==route dampening==. If there is a ==flapping interface== on a router that has formed a BGP neighborship with another router, that router might get their routes dampened. ==BGP dampens the path to the AS==. This BGP feature is known as ==BGP Route Flap Dampening (RFD)==. 

![[Routing/BGP/BGP-primary-notes/Attachments/Pasted image 20231225145422.png]]

BGP is fully converged in the first state of the network in the diagram above. The moment a link connected to a peer becomes unavailable. The following steps are taken:

- BGP sends ==withdrawn messages== to its neighbors.
- The upstream BGP routers in the neighboring autonomous system will run the ==path selection algorithm== again to determine what is the best path.
- The route to the network is placed in the routing table and BGP will send an ==announcement message== to it's neighbors.

The issues with route dampening is that there may be multiple paths to an autonomous system with a downed link. This could lead to BGP taking minutes to hours before it reconverges again.

There are multiple factors that affect the speed at which a route is dampened:

- Processing.
- Queuing.
- Propagation delays.
- Minimum Route Advertisement Interval (MRAI).

==A flapping interface/routes on a BGP peer might result in that peer having its routes dampened from BGP==. Some ISPs might implement ==penalties and  suppression threshold timers==. That can ==reduce== the number of ==announcements and withdrawn messages== the "ISP" peer has to send to it's upstream neighbors. However, the issue is when an ==AS has redundant links to multiple service providers==. That can result in BGP taking hours to stabilize the path selection process for the flapping route(s).

### Aggressive BGP route flap dampening:

Some service providers might choose to implement aggressive route flap dampening policies. This might include ==thresholds of timers based on the length of the prefix being advertised==. ==A== `/24`  ==network might get a higher suppression timer than a== `/19` ==network==. This approach maybe required when the ISP is doing prefix aggregation (summarization) into BGP to improve the efficiency and reduce the number of routes of the "internet".



*Note: the notes in this section are from the link referenced in footnote [^6] under the [[#References]] section.*

---
# Technical Configuration:

> [!note]
> All the configuration syntax I will be using in my documentation is referencing the Cisco IOS syntax. However, a large portion of the commands and what they do might be similar to other vendor syntax.

> [!tip]
> In the real world. An organization with an AS assigned to them by their RIR provider CAN NOT advertise to BGP unless they have a minimum prefix of `/24`. This is to reduce the size of the internet routing table and increase routing efficiency.
## Basic BGP Configuration:

![[Routing/BGP/BGP-primary-notes/Attachments/BGP-Labs-diagrams.drawio.svg]]

*Note: the screenshot(s) above is taken from the video linked in footnote [^2] under the [[#References]] section.*

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

Pick up here [video URL copied with pick up time | `1:21:11`](https://youtu.be/SVo6cDnQQm0?list=PLyt5OhlhlmJUGZ9kM45QWX5ZrCLoXVQXD&t=4871)
<div style="page-break-after: always;"></div>

# References:

## Indirectly referenced links:

-  [The Basics of BGP: Border Gateway Protocol Explained | CBT Nuggets | Video](https://youtu.be/4e3E5sjItWM?list=PLyt5OhlhlmJUGZ9kM45QWX5ZrCLoXVQXD)
-  [[https://www.rfc-editor.org/rfc/rfc6793 | BGP support for four-octet Autonomous System (AS) Number Space]] 
-  [A Border Gateway Protocol 4 | RFC4271 | Document](https://www.rfc-editor.org/rfc/rfc4271)
-  [Micro Nugget: BGP Configuration Explained | CBT Nugget | Video | Keith Barker](https://youtu.be/XRetkD4UUL4?list=PLyt5OhlhlmJUGZ9kM45QWX5ZrCLoXVQXD)
- [BGP session establishment | PacketPushers | article](https://packetpushers.net/demystifying-bgp-session-establishments/)

## Footnote references:

[^1]: [AS numbers allocation | Wiki](https://en.wikipedia.org/wiki/Autonomous_system_%28Internet%29)
[^2]: [BGP Deep Dive | Kevin Wallace Training | video](https://youtu.be/SVo6cDnQQm0?list=PLyt5OhlhlmJUGZ9kM45QWX5ZrCLoXVQXD)
[^3]: [BGP AS allocation monitor](https://www.cidr-report.org/)
[^4]: [Understanding the 4-byte AS numbers in BGP | by Jeff Doyle](https://www.networkworld.com/article/760079/understanding-4-byte-autonomous-system-numbers.html)
[^5]: [Packet Pusher blog about the 4-byte BGP ASN](https://packetpushers.net/packet-pushers-labs-bgp-4-byte-asns-video/)
[^6]: [Packet Pusher blog BGP Path hunting/Exploration | BGP route dampening](https://packetpushers.net/bgp-path-huntingexploration/)
