---
title: Proxmox 2 Nodes HA Cluster
date: 2024-11-29
tags:
  - Folder-index
draft: "true"
---
# Overview:

Author: Diyaa<br>
Published date: November 29th, 2024<br>
Last updated: November 29th, 2024<br>

This is a proof of concept demonstration for the Northern Alberta Institute of Technology on the capabilities of Proxmox for the CNA and NET programs capstone projects. I promised Chris Redford (The chair of the NET program at NAIT) to make a demonstration note on how Proxmox can be used as a high availability cluster with 2 nodes.

Why not use ESXi? Broadcom's acquisition of VMware earlier this year has marked the **death** of ESXi for educational institutions. VMware ESXi is no longer free for educational institutions.

> [!warning] Disclaimer:
> This is not recommended in production. However, capstone students have only 2 servers to work with, making this a practical solution.

# Diagram:

![[Proxmox/2-nodes-cluster/Attachments/Proxmox-2-node-cluster-Physical Topology.drawio.svg]]

VM-01 and VM-02 are the virtual machines (containers) that I will be using to demonstrate live migration and clustering with 2 nodes.

# Prerequisites :

> [!warning]
> Make sure you turn off all hardware controllers on your servers if you plan on using ZFS for the OS installation or any of the local data stores managed by a Proxmox node.

I assume that you know how to install Proxmox from a flash drive on a server. You can read the official Proxmox documentation on how to install Proxmox [here](https://pve.proxmox.com/wiki/Installation).

# Quorum Device:

## Function of a Quorum Device (QDevice):

A Qdevice allows a Proxmox cluster to get extra votes to prevent running into a split-brain scenario. A cluster requires at least 3 nodes to function properly. However, a Qdevice can send heart beats (for 1 vote) to a cluster of 2 nodes which would allow a Proxmox cluster to function with a minimum of 2 nodes.

## Configure Quorum Device (QDevice) Host:



# Related Notes:

- Link to [[index|Home-Page]].