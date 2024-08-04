---
title: Cloudflare DDNS bash script
Author: Diyaa Alkanakre
tags:
  - Cloudflare
  - DDNS
date: 2024-08-03
---
# Overview:

This document explains how to use the DDNS-Cloudflare-bash script to dynamically update DDNS with CloudFlare using API keys. I am using a bash script from this public Github repository [DDNS-Cloudflare-Bash](https://github.com/fire1ce/DDNS-Cloudflare-Bash). This repository is simply the documentation of how to use the script in the [DDNS-Cloudflare-Bash](https://github.com/fire1ce/DDNS-Cloudflare-Bash) repository. 

I am using this script to update a FQDN DNS record automagically through crontab on multiple Linux virtual private servers in different cloud regions.

> [!warning]
> I am using a TTL of `120` seconds on the FQDN record. You might see this TTL value as low. Feel free to change it when modifying the script variables.

# Technical procedure:

## Get an API token from Cloudflare:

Login to your Cloudflare account and navigate to the home page (websites tab):

![[Cloudflare/DDNS-Cloudflare-Bash-Documentation/Attachments/Pasted image 20240406161905.png]]

Navigate to the DNS zone records:

![[Cloudflare/DDNS-Cloudflare-Bash-Documentation/Attachments/Pasted image 20240406162027.png]]

Create the record you wish to modify with DDNS (the record must exist before using it with the script):

> [!note]
> You can add an invalid IP or a documentation IP in the type A record. Example: 198.51.100.1 (documentation range IP).
> Tip: Do not try to resolve the record before it updates.

![[Cloudflare/DDNS-Cloudflare-Bash-Documentation/Attachments/Pasted image 20240406162203.png]]

Get the zone id from cloudflare:

![[Cloudflare/DDNS-Cloudflare-Bash-Documentation/Attachments/Pasted image 20240406162737.png]]

Navigate to your profile to create an API key for the script:

![[Cloudflare/DDNS-Cloudflare-Bash-Documentation/Attachments/Pasted image 20240406162939.png]]


![[Cloudflare/DDNS-Cloudflare-Bash-Documentation/Attachments/Pasted image 20240406163000.png]]

Create a new API token:

![[Cloudflare/DDNS-Cloudflare-Bash-Documentation/Attachments/Pasted image 20240406163034.png]]

![[Cloudflare/DDNS-Cloudflare-Bash-Documentation/Attachments/Pasted image 20240406163100.png]]

Change the name of the token to something you will recognize in the future in case you need to create more tokens:

![[Cloudflare/DDNS-Cloudflare-Bash-Documentation/Attachments/Pasted image 20240406163157.png]]
It should look similar to this at the end:

![[Cloudflare/DDNS-Cloudflare-Bash-Documentation/Attachments/Pasted image 20240406163515.png]]

Create the token:

![[Cloudflare/DDNS-Cloudflare-Bash-Documentation/Attachments/Pasted image 20240406163603.png]]
Make sure to copy the API token as you won't be able to view it again when you go to API tokens in your account:

![[Cloudflare/DDNS-Cloudflare-Bash-Documentation/Attachments/Pasted image 20240406163700.png]]

# Modify the variables in the script:

Add a user for the script (non-privileged user):

```bash
sudo adduser --disabled-password --gecos "" cloudflare-ddns
```

Switch to the new user:

```
sudo su cloudflare-ddns
```

Install the script in the non-privileged user directory:

```bash
mkdir $HOME/cloudflare-ddns/; cd $HOME/cloudflare-ddns/; \
wget https://raw.githubusercontent.com/fire1ce/DDNS-Cloudflare-Bash/main/update-cloudflare-dns.sh; \
wget https://raw.githubusercontent.com/fire1ce/DDNS-Cloudflare-Bash/main/update-cloudflare-dns.conf; \
chown $USER:$USER -R $HOME/cloudflare-ddns; chmod 600 update-cloudflare-dns.conf; \
chmod 700 update-cloudflare-dns.sh
```

Edit the config file to add your parameters to it:

```bash
nano $HOME/cloudflare-ddns/update-cloudflare-dns.conf
```

Modify the variables in the config file:

> [!Important]
> You only need to modify the following variables:
> - `dns_record`: The fully qualified domain name of the record the script should update in your DNS zone (example: test.mydomain.com)
> - `zoneid`: The Zone ID you copied in the previous section.
> - `cloudflare_zone_api_token`: The API token you generated in the previous section.
> - `proxied`: Keep set to `false` if you need this record to be a DNS only record without Cloudflare proxy.
> - `ttl`: This is the Time To Live (TTL) for your DNS record. The minimum allowed by this script is 120 seconds (2 minutes).

![[Cloudflare/DDNS-Cloudflare-Bash-Documentation/Attachments/Pasted image 20240406165642.png]]

run the script to test it:

```bash
./update-cloudflare-dns.sh ./update-cloudflare-dns.conf
```

If you do not get any errors proceed to adding a crontab for this script:

> [!important]
> Do not run this command with `sudo`. The whole point of creating a new user for the script is so that it runs as an unprivileged user.

```bash
crontab -e
```

Add the following line to the bottom of the user crontab:

```bash
* * * * * $HOME/cloudflare-ddns/update-cloudflare-dns.sh update-cloudflare-dns.conf
```

Save the crontab and exit from the user account:

```bash
exit
```

# References:

[Github DDNS-Cloudflare-Bash](https://github.com/fire1ce/DDNS-Cloudflare-Bash)