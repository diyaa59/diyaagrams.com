---
title: Network Diyaagrams
tags:
  - diyaagrams
  - network-documentation
  - homelab
Author: Diyaa Alkanakre
date: 2024-08-06
---
# Overview:

This page contains multiple diagrams that I have created in the past. I will continue to add more diagrams to this page as I find them in my offline Obsidian vault (There are some that I didn't even know I made. I have over 3000 files in my Obsidian vault 🙂).

# Diyaagrams:

I am mostly adding the names of the diagrams. Some of them have descriptions and legends. I am not changing issues that I see to show the differences between good and bad diagrams 🙂 (Yes, they are not perfect and they will never be. I always have things to add, but there is only 24 hours in a day 😉. I will make the next one better......).

---
## HeadScale Lab:

This lab is a demonstration of [[https://headscale.net/|HeadScale]]. HeadScale is a NAT traversal VPN that uses the [[https://www.wireguard.com/|WireGuard]] protocol as its VPN underlay.

![[NAIT-NET-labs/HeadScale-lab/HeadScale_Research_Project.drawio.svg]]

---

## NET Year 2 classroom lab:

This environment was built and maintained by me and a lab partner. We had to create it from scratch and add advancements to it as the classes progress.

![[NAIT-NET-labs/NET_Classroom_Lab_Environment/Classroom_Environment.drawio.svg]]

---
## NET Year 2 Development Network:

I deployed this network at home to test network functionalities that needed to be deployed in my capstone project at NAIT. Testing outside of the production network is a "real world" best practice.

![[NAIT-NET-labs/NET_Year_2_Sandbox_Environment/NET_Year2_Capstone_sandbox.drawio.svg]]

---
## Pfsense CARP with OSPF:

This lab was mostly to understand how OSPF would function in a network with gateway redundancy. [[https://docs.netgate.com/pfsense/en/latest/highavailability/index.html|CARP]] is a common address redundancy protocol that is similar to VRRP. It is the only protocol that is used for redundancy on Pfsense.

OSPF is a link state dynamic routing protocol. It advertises the links rather than the network attached to the link as a subnet.

![[NAIT-NET-labs/Pfsense_CARP_With_OSPF/Pfsense_CARP_with_Single_Area_OSPF-Page-1.drawio.svg]]

---
## Pfsense HA With Dual WAN:

> [!note:]
> I have a note on this website that explains how to use Pfsense as a VPN router. You might be interested in checking it out 🙂.
> [[Pfsense/WireGuard-Pfsense-Policy-Based-Routing/WireGuard-Pfsense-policy-based-routing|WireGuard-Pfsense-policy-based-routing]]

This lab was about understanding how WAN redundancy functions in Pfsense.

![[NAIT-NET-labs/Pfsense_HA_dual_WAN/Pfsense_HA_CARP-Page-1.drawio.svg]]

---
## Pfsense OSPF over IPsec:

I used this lab to gain a better understanding of how OSPF functions over an IPsec tunnel. YES, OSPF can be used over an IPsec layer 3 tunnel.

Knowing that OSPF is using Multicast does NOT mean that it can't run on layer 3 interfaces. OSPF has an interface type of `point-to-point`. This mode would send all the OSPF control packets to `224.0.0.5` (All OSPF routers on the interface).

![[NAIT-NET-labs/Pfsense_OSPF_over_IPsec/OSPF_over_Hub-in-Spoke-IPsec_VTI_Pfsense.drawio.svg]]

---
## Proxmox HCI Cluster with Ceph Network Storage:

This lab is a setup of [[https://proxmox.com/|Proxmox]] in Hyper-Converged Infrastructure (HCI) mode. This would allow the storage to be synced between the nodes rather than needing storage servers for the virtualization cluster. Proxmox uses [[https://ceph.io/|Ceph]] in HCI clusters environments.

![[NAIT-NET-labs/Proxmox_HCI_Cluster/Proxmox_HCI_Lab_exported.drawio.svg]]

---
## VMware Private Cloud Project:

This was an assignment in my infrastructure management class in the Network Engineering Technology (NET) program at NAIT. This was about understanding how to manage a virtualized VMware environment. VMware vCenter was used for centralized management of the ESXi nodes.

![[NAIT-NET-labs/VMware_Private_Cloud_Project/VMware_Private_Cloud_Diyaa_Alkanakre_COMP2000.drawio.svg]]

---
## MTPutty Demo:

This lab was to demonstrate how easier it would be to manage multiple SSH sessions to network equipment using [[https://ttyplus.com/multi-tabbed-putty/|MTPutty]].

![[Diyaagrams/svgs/MTPutty_CML_Demo/MTPutty_CML_Demo.drawio.svg]]

---
## Simple Routing:

This is one of the labs that I used to understand how traffic flows between interfaces on a router. This involved tcpdumps on the router and analyzing the PCAPs in Wireshark.

![[Diyaagrams/svgs/Simple-Routing/Simple-Routing.drawio.svg]]

---
## StarWind vSAN 2 Nodes HCI:

This was a proof of concept for the capstone project (PROJ2000) in the Network Engineering Technology (NET) program at NAIT.

![[Diyaagrams/svgs/StarWind-vSAN-Hyperconverged_2_ESXi_Nodes/Starwind_2_Nodes_Cluster.drawio.svg]]

---
## VyOS Routing:

This lab was to learn more about the [[https://vyos.io/|VyOS router]] for more advanced labs in the future. VyOS has multiple advanced routing protocols which makes it the best open-source router for learning routing.

![[Diyaagrams/svgs/VyOS-Routing/VyOS-Routing.drawio.svg]]

---
## WireGuard dual-stack MTU testing:

This lab was a part of testing and understanding the [[https://www.wireguard.com/|WireGuard]] VPN tunneling protocol MTU encapsulation in a dual-stacked (IPv4 and IPv6 being friends) environment.

![[Diyaagrams/svgs/Wireguard_MTU_Problem/Wireguard_MTU_Testing.drawio.svg]]

---

# Home Network:

> [!Note:]
> I will be adding more to this section.

These are all the diagrams of how my home network looks and also the diagrams of how it looked in the past. I like to try and change my design every year. However, that may become a challenge as time progresses.

## Home Network 2021:

This is my home network in 2021. Looking at this today (August 08, 2024), I think there are about a 100 things that I could have done better 🙂.

![[NAIT-NET-labs/Homelab/2021/Home_Network-Primary_Slide.drawio.svg]]