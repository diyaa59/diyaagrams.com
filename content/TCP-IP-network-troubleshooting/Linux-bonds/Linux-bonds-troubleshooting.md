---
title: Linux bond Interfaces
date: 2024-11-14
tags:
  - Main-Page
---
# Overview:

Author: Diyaa<br>
Published date: November 14, 2024<br>
Last updated: November 14, 2024<br>

This article contains helpful commands that can be used for troubleshooting bond interface issues on most Linux operating systems.

# CLI Commands:

> [!note] Tip:
> This command will show you how the bond interface settings are functioning. It is possible to modify the network settings without applying them. This will result in a mismatch between the network settings file and the bond interface functionality as displayed by the command below. 

The following command will list the status of all the slave interfaces participating in a bond group:

> [!important]
> `bond0` is the id of the bond interface. You might need to change this to match your bond interface.

```bash
cat /proc/net/bonding/bond0
```

![[TCP-IP-network-troubleshooting/Linux-bonds/Attachments/Pasted image 20241114182855.png]]

The bonding mode might be set to something other than `802.3ad` (Also known as LACP.) However, LACP is the most adopted open standard out there.

![[TCP-IP-network-troubleshooting/Linux-bonds/Attachments/Pasted image 20241114183832.png]]

This indicates that the interfaces of my bond group are functioning as expected (status up). I have the LACP mode set to fast (send an LACP control packet every 1 second.)

![[TCP-IP-network-troubleshooting/Linux-bonds/Attachments/Pasted image 20241114183731.png]]

The hashing algorithm will indicate how the LACP channel will send packets down the interfaces.

# References:

[Proxmox network configuration documentation](https://pve.proxmox.com/wiki/Network_Configuration)
