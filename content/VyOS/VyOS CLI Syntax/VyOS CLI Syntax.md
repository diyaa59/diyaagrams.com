---
title: VyOS Router CLI Syntax
tags:
  - VyOS
date: 2024-08-16
---
# Overview:

Author: Diyaa<br>
Published date: August 3rd, 2024<br>
Last updated: August 16th, 2024<br>

This article is documentation of the basic CLI system configuration commands for VyOS Router.

# Command Line Syntax:

## Operational Mode:

> [!note]
> The `#` sign after the hostname indicate that you are in editing mode.
> This is known as ==configuration mode== on VyOS.

You will see the console look like this after you enter configure mode. This indicates that you are now in config mode. You can use the VyOS command line syntax to make changes to the system configuration.

```bash
vyos@vyos:~$ configure 
[edit]
vyos@vyos#
```

## Configuration Mode:

> [!note]
> The `:~$` sign after the hostname indicate that you are not in config mode.
> This is known as ==operational mode== on VyOS.

You must type the command below to go into configure mode.

```bash
vyos@vyos:~$ configure
```

### Operational Mode Commands in Configuration Mode:

> [!tip]
> Using this command in configuration mode allows you to run operational mode commands from configuration mode without having to exit back out to operational mode.

```bash
vyos@vyos# run show configuration commands
```

## Save Configuration:

You must commit the configuration changes to merge them into the running configuration. You can save the running configuration to the startup configuration after merging the changes into the running configuration.

### Commit Configuration Changes:

> [!tip]
> Utilize the commit comments to allow for easier system configuration revision review.

This command will merge the system changes into the running system configuration. However, This is not going to merge your configuration changes to the startup config. This means that your changes are not going to persist a reboot.

```bash
vyos@vyos# commit comment "Changing syetm interface"
```

![[VyOS/VyOS CLI Syntax/Attachments/Pasted image 20240408233652.png]]

### Show Uncommitted Configuration:

Running the following command in configuration mode will show you what changes have not been committed to the system configuration yet.

```bash
vyos@vyos# compare saved
```

![[VyOS/VyOS CLI Syntax/Attachments/Pasted image 20240409003149.png]]

### Save Configuration to Disk:

> [!tip]
> Keep in mind that this command will not merge uncommitted changes. You must merge the changes by committing them as shown in this [[#Commit Configuration Changes|section]].

You need to use the following command to save your configuration and merge it to the system startup config on the disk.

```bash
vyos@vyos# save
```

![[VyOS/VyOS CLI Syntax/Attachments/Pasted image 20240408233631.png]]

### Show Configuration:

You can use the following command to show the full system configuration in `configure` mode:

```bash
vyos@vyos# show
```

The following command will allow you to see the configuration of the router in command line style:

```bash
vyos@vyos# run show configuration commands
```

## Change Configuration Mode Hierarchy Level:

You can change the hierarchy level in configuration mode by using the `edit` command:

```bash
vyos@vyos# edit interface ethernet eth0
```

As you can see now we are in the `ethernet eth0` section of the config:

![[VyOS/VyOS CLI Syntax/Attachments/Pasted image 20240409001441.png]]

To exit out of the hierarchy configuration you can use the exit command:

```bash
vyos@vyos# exit
```

## Change hostname:

```bash
vyos@vyos# set system host-name vyos
```

## Change Interface Address:

### Physical Interface Configuration:

> [!tip]
> Once again let tab completion be your friend.

```bash
vyos@vyos# set interface ethernet eth0 address 203.0.113.1/30
vyos@vyos# set interface ethernet eth0 address 2001:db8:113:0::1/64
vyos@vyos# set interface ethernet eth0 description "Primary connection to Edge router"
```

### Dummy Interface Configuration:

> [!note]
> This interface is similar to a loopback interface. You can create multiple dummy interfaces and route their addresses. You can not create aliases to the loopback interface as you would with Cisco IOS.

```bash
vyos@vyos# set interface dummy dum1 address 192.0.2.1/32
vyos@vyos# set interface dummy dum1 address 2001:db8::1/128
vyos@vyos# set interface dummy dum1 description "Routed SSH management and BGP router ID"
```

## Show Interfaces Configuration:

Running the following command in configuration mode will show the configuration on all the interfaces:

```bash
vyos@vyos# run show interfaces
```

![[VyOS/VyOS CLI Syntax/Attachments/Pasted image 20240409002125.png]]

## Configure Static Routes:

> [!note]
> This is the simplest way to setup a static route to get the router access to the internet. Use tab completion to see more of the command syntax.

```bash
vyos@vyos# set protocols static route 0.0.0.0/0 next-hop 1.1.1.1
```

## Configure Local User:

> [!note]
> > [!tip]
> > Let tab completion be your friend.
> - I am using ed25519 SSH keys. You need to change the command to match the SSH key format you have.
> - Replace the SSH with your own key.
> - The user password will be hashed and stored in the configuration after you set it.

```bash
vyos@vyos# set system login user vyos authentication plaintext-password "P@ssw0rd"
vyos@vyos# set system login user vyos authentication public-keys "user@host" type ssh-ed25519
vyos@vyos# set system login user vyos authentication public-keys "user@host" key "AAAAC3NzaC1lZDI1NTE5AAAAIGjS9Ic88GN9s3fdouvR3b/VKJCFVXs8u8EXjBecdAC"
```

## Customize SSH Service:

Set SSH listen address and port:

```bash
vyos@vyos# set service ssh listen-address 198.51.100.1/32
vyos@vyos# set service ssh listen-address 2001:db8::1
vyos@vyos# set service ssh port 22
```

Set the allowed SSH MACs:

```bash
vyos@vyos# set service ssh mac hmac-sha2-512-etm@openssh.com
vyos@vyos# set service ssh mac hmac-sha2-256-etm@openssh.com
vyos@vyos# set service ssh mac hmac-sha2-512
vyos@vyos# set service ssh mac hmac-sha2-256
```

Set allowed SSH ciphers:  

```bash
vyos@vyos# set service ssh ciphers chacha20-poly1305@openssh.com
vyos@vyos# set service ssh ciphers aes256-gcm@openssh.com
vyos@vyos# set service ssh ciphers aes128-gcm@openssh.com
```

## Set System Configuration Revisions:

> [!note]
> My example below will save up to 100 revisions.

This command allows you to set how many system configuration revisions must be saved on the disk. You can rollback the configuration if you make a mistake.

```bash
# Must run in coniguration mode
vyos@vyos# set system config-management commit-revisions 100
```

You can show system revisions in operational mode:

```bash
vyos@vyos# show system commit
```

## Restore Default Configuration:

> [!warning]
> This will disconnect you if you are connected remotely to the VyOS router.

Load the default config:

```bash
vyos@vyos# load /opt/vyatta/etc/config.boot.default
```

Commit your change:

```bash
vyos@vyos# commit comment "restoring default config"
```

Save the configuration:

```bash
vyos@vyos# save
```

# Dynamic Routing Commands:

## BGP:

Set the BGP autonomous system number instance:

```bash
vyos@vyos# set protocols bgp 64512
```

Configure neighbors:

```bash
vyos@vyos# set protocols bgp 64512 neighbor 203.0.113.2 remote-as 64512
vyos@vyos# set protocols bgp 64512 neighbor 2001:db8:113::2 remote-as 64512
```

Set the BGP router ID:

```bash
vyos@vyos# set protocols bgp 64512 parameters router-id 192.0.2.1
```

Redistribute connected routes into BGP:

```bash
vyos@vyos# set protocols bgp 64512 address-family ipv4-unicast redistribute connected
```

Redistribute default route into BGP neighbor:

```bash
vyos@vyos# set protocols bgp 64512 neighbor 203.0.113.2 address-family ipv4-unicast default-originate
```

# Related Notes:

- Link to [[index|Home-Page]].

# References:

[VyOS 1.3 quick start documentation](https://docs.vyos.io/en/equuleus/quick-start.html)
[VyOS documentation - configuration navigation](https://docs.vyos.io/en/equuleus/cli.html#seeing-and-navigating-the-configuration)
[VyOS BGP setup documentation](https://docs.vyos.io/en/equuleus/configuration/protocols/bgp.html)
