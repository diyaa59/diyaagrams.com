---
Author: Diyaa Alkanakre
tags:
  - VyOS
title: VyOS general CLI syntax
date: 2024-08-03
---
# Table of Contents:

```table-of-contents
style: nestedList # TOC style (nestedList|inlineFirstLevel)
minLevel: 0 # Include headings from the specified level
maxLevel: 0 # Include headings up to the specified level
includeLinks: true # Make headings clickable
debugInConsole: false # Print debug info in Obsidian console
```

# Overview:

This document outlines the CLI system configuration on VyOS operating system.

# Basic Command Line Syntax:

## Change to configuration mode:

> [!note]
> The `:~$` sign after the hostname indicate that you are not in config mode.
> This is known as ==operational mode==.

You must type the command below to go into configure mode.

```bash
vyos@vyos:~$ configure
```

> [!note]
> The `#` sign after the hostname indicate that you are in edit mode.
> This is known as ==configuration mode==.

You will see the console look like this after you enter configure mode. This indicates that you are now in config mode. You can use the VyOS command line syntax to make changes to the system configuration.

```bash
vyos@R-ISP:~$ configure 
[edit]
vyos@R-ISP#
```

### Run operation mode commands in configuration mode:

Using the run command in configuration mode allows you to run operational mode commands from configuration mode without having to exit back out to operational mode.

```bash
run show configuration commands
```

## Save config:

### Commit configuration changes:

> [!tip]
> Utilize the commit comments to allow for easier system configuration revision.

This command will merge the system changes into the running system configuration. However, This is not going to merge your configuration changes to the startup config. This means that your changes are not going to persist a reboot.

```bash
vyos@vyos# commit comment "Changing syetm interface"
```

![[VyOS/VyOS-CLI-Syntax/Attachments/Pasted image 20240408233652.png]]

### Show uncommitted configuration:

Running the following command in configuration mode will show you what configurations have not been committed to system configuration yet.

```bash
compare saved
```

![[VyOS/VyOS-CLI-Syntax/Attachments/Pasted image 20240409003149.png]]
### Save configuration to disk:

You need to use the following command to save your configuration and merge it to the system startup config on disk. Keep in mind that this command will not merge uncommitted changes.

```bash
vyos@vyos# save
```

![[VyOS/VyOS-CLI-Syntax/Attachments/Pasted image 20240408233631.png]]

### Show configuration:

You can use the following command to show the full system configuration in `configure` mode:

```bash
vyos@vyos# show
```

You can exit the configuration mode to see the configuration of the router in command format:

```bash
vyos@vyos:~$ show configuration commands
```

## Change Hierarchy Level:

You can change the hierarchy level in configuration mode by using the `edit` command:

```bash
edit interface ethernet eth0
```

As you can see now we are in the `ethernet eth0` section of the config:

![[VyOS/VyOS-CLI-Syntax/Attachments/Pasted image 20240409001441.png]]

To exit out of the hierarchy configuration you can use the exit command:

```bash
exit
```

## Change hostname:

```bash
set system host-name vyos
```

## Change interface address:

### Physical interface:

> [!Note]
> Once again let tab completion be your friend 😉.

```bash
set interface ethernet eth0 address 203.0.113.1/30
set interface ethernet eth0 address 2001:db8:113:0::1/64
set interface ethernet eth0 description "Primary connection to Edge router"
```

## Dummy interface:

> [!note]
> This interface is similar to a loopback interface. You can not create loopback interfaces on VyOS (There is only one that you can modify). You can create multiple dummy interfaces and route their addresses.

```bash
set interface dummy dum1 address 192.0.2.1/32
set interface dummy dum1 address 2001:db8::1/128
set interface dummy dum1 description "Routed SSH management and BGP router ID"
```

## Show interfaces configuration:

Running the following command in configuration mode will show the configuration on all the interfaces:

```bash
run show interfaces
```

![[VyOS/VyOS-CLI-Syntax/Attachments/Pasted image 20240409002125.png]]

## Setup a static route:

> [!note]
> This is the simplest way to setup a static route to get the router access to the internet. Use tab completion to see more of the command syntax.

```bash
set protocols static route 0.0.0.0/0 next-hop 1.1.1.1
```
## Set a local user:

> [!note]
> - I am using ed25519 SSH keys. You need to change the command to match your SSH key format. Let tab completion be your friend 😉.
> - The SSH key in the commands below is a random key I generated for this documentation demo. Please replace it with your own SSH key.
> - The user password will be hashed and stored as an encrypted password in the config after you set it.

```bash
set system login user vyos authentication plaintext-password "P@ssw0rd"
set system login user vyos authentication public-keys "user@admin-vm" type ssh-ed25519
set system login user vyos authentication public-keys "user@admin-vm" key "AAAAC3NzaC1lZDI1NTE5AAAAIGjS9Ic88GN9itiyouvR3b/VKJCFVXs8u8EXjBezhVZQ"
```

## Customize SSH service:

Set SSH listen address and port:

```bash
set service ssh listen-address 198.51.100.1/32
set service ssh listen-address 2001:db8::1
set service ssh port 22
```

Set the allowed SSH MACs (The ones listed below are recommended):

```bash
set service ssh mac hmac-sha2-512-etm@openssh.com
set service ssh mac hmac-sha2-256-etm@openssh.com
set service ssh mac hmac-sha2-512
set service ssh mac hmac-sha2-256
```

Set allowed SSH ciphers (The ones listed below are recommended):

> [!warning]
> ChaCha20-Poly1305 has a vulnerability on VyOS 1.3 (I didn't test it on any other versions). Only use this cipher in isolated lab environments.
>  

```bash
set service ssh ciphers chacha20-poly1305@openssh.com
set service ssh ciphers aes256-gcm@openssh.com
set service ssh ciphers aes128-gcm@openssh.com
```

## Set system configuration revisions:

> [!note]
> My example below will save up to 100 revisions.

This command allows you to set how many system configuration revisions must be saved on the disk. You can rollback the configuration if you make a mistake.

```bash
# Must run in coniguration mode
set system config-management commit-revisions 100
```

You can show system revisions in operational mode:

```bash
show system commit
```

## Restore default configuration:

> [!warning]
> This will disconnect you if you are connected remotely to the VyOS router.

Load the default config:

```bash
load /opt/vyatta/etc/config.boot.default
```

Commit your change:

```bash
commit comment "restoring default config"
```

Save the configuration:

```bash
save
```
# Dynamic routing:

## BGP:

Set the BGP autonomous system number instance:

```bash
set protocols bgp 64512
```

Configure neighbors:

```bash
set protocols bgp 64512 neighbor 203.0.113.2 remote-as 64512
set protocols bgp 64512 neighbor 2001:db8:113::2 remote-as 64512
```

Set the BGP router ID:

```bash
set protocols bgp 64512 parameters router-id 192.0.2.1
```

Redistribute connected routes into BGP:

```bash
set protocols bgp 64512 address-family ipv4-unicast redistribute connected
```

Redistribute default route into BGP neighbor:

```bash
set protocols bgp 64512 neighbor 203.0.113.2 address-family ipv4-unicast default-originate
```

# References:

[VyOS 1.3 quick start documentation](https://docs.vyos.io/en/equuleus/quick-start.html)
[[https://docs.vyos.io/en/equuleus/cli.html#seeing-and-navigating-the-configuration]]
[VyOS BGP setup documentation](https://docs.vyos.io/en/equuleus/configuration/protocols/bgp.html)
