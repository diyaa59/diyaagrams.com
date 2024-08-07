---
title: Let's Encrypt P12 certificate with DNS validation
tags:
  - Lets-Encrypt
  - Certificates
  - TLS
date: 2024-08-03
---
# Overview:

This repository explains how to get a free valid and publicly signed certificate (`p12`) from Let's Encrypt by using their `certbot` script. The example I have below is using the `certbot` DNS challenge extension to generate the certificate.

# Download Required Packages:

Download the required packages:

```bash
sudo apt install -y python-is-python3 python3 certbot; \
wget https://github.com/joohoi/acme-dns-certbot-joohoi/raw/master/acme-dns-auth.py; \
chmod +x acme-dns-auth.py; \
sudo mv acme-dns-auth.py /etc/letsencrypt/
```

# Generate Certificate:

Wild card certificate:

```bash
sudo certbot certonly --manual --manual-auth-hook /etc/letsencrypt/acme-dns-auth.py --preferred-challenges dns --debug-challenges -d \*.domain.com
```

FQDN certificate:

```bash
sudo certbot certonly --manual --manual-auth-hook /etc/letsencrypt/acme-dns-auth.py --preferred-challenges dns --debug-challenges -d fqdn.domain.com
```

You will see the following message asking you to add a `CNAME` record to your zone.

![[Lets-Encrypt/Let's-Encrypt-DNS-P12-cert/Attachments/Pasted image 20240418152031.png]]

Add the `CNAME` record and wait for about 60 seconds before hitting enter. You can visit [https://nslookup.io](https://nslookup.io) to validate that your record propagated world wide.

![[Lets-Encrypt/Let's-Encrypt-DNS-P12-cert/Attachments/Pasted image 20240418152254.png]]

> [!info]
> There is more information about each certificate file/extension format in the following file `/etc/letsencrypt/live/<domain-name>/README`.

You will see the output in the screenshot shown above if the certificate request is successful. The certs will be stored in `/etc/letsencrypt/live/<domain-name>/`.

# Convert Certificate To `P12`:

> [!note]
> `.p12` and `.pfx` file formats are exactly the same. The only difference is the file extension name.
> You can get a `.p12` out of a `.pfx` by renaming the file extension name (yes that simple).

## Check OpenSSL version:

```bash
openssl version
```

![[Lets-Encrypt/Let's-Encrypt-DNS-P12-cert/Attachments/Pasted image 20240418154612.png]]

## OpenSSL version 1.1.x:

```bash
openssl pkcs12 -export -in fullchain.pem -inkey privkey.pem -out domain.pfx
```

## OpenSSL version 3.x:

> [!warning]
> Attempt to not use the `-legacy` flag first. However, if you face an issue where the password is getting rejected and you are able to import the certificate into your Browser or windows certificate manager, you will need to use the `-legacy` option as the vendor you are working with does not support imports from the latest version of `openssl` yet.

Try this first:

```bash
openssl pkcs12 -export -in fullchain.pem -inkey privkey.pem -out domain.pfx
```

If the above does not work try this:

> [!danger]
> Using the legacy option to export a full chain is not recommended. Try this as a last resort option.

```bash
openssl pkcs12 -export -legacy -in fullchain.pem -inkey privkey.pem -out domain.pfx
```