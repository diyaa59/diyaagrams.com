---
title: Filter TCP handshake packets
tags:
  - Wireshark
date: 2024-08-06
---
# Overview:

Author: Diyaa Alkanakre<br>
Published date: August 6th, 2024<br>
Last updated: August 6th, 2024<br>

This document explains how to filter only the TCP handshake packets of every TCP streams in a PCAP file with Wireshark.

I used the answer in the Wireshark forums link referenced here [^1] under [[#References]].

# Filters:

IPv4 filter:

```bash
 ip && ((tcp[13]==02) ||  (tcp[13]==12) || (tcp.seq==1 && tcp.ack==1 && tcp.len==0 && tcp.window_size_scalefactor ge 0))
```

IPv6 filter:

```bash
 ipv6 && ((tcp[13]==02) ||  (tcp[13]==12) || (tcp.seq==1 && tcp.ack==1 && tcp.len==0 && tcp.window_size_scalefactor ge 0))
```

## Demonstration In Wireshark:

![[Wireshark/Filter-3-way-TCP-handshake-packets-only/Attachments/Pasted image 20240806210854.png]]

> [!note]
> I added a column to show the TCP stream index. This is not the default view in Wireshark.

I can only see the first 3 packets in each TCP stream. This can be useful when trying to troubleshoot TCP problems with Wireshark.

# Related Notes:

- Link to [[index|Home-Page]].

# References:

[^1]: - [[https://osqa-ask.wireshark.org/questions/26174/filter-for-detecting-the-third-packet-in-a-3-way-handshake/|Wireshark forums]]

