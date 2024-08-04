---
tags:
  - WireGuard
Author: Diyaa Alkanakre
title: WireGuard general documentation
date: 2024-08-03
---
# Wireguard configuration generation:

## Keys generation:

### Generate client private, public keys and save them into files:

Files:

```bash
wg genkey | tee private-key-client | wg pubkey > public-key-client > /dev/null
```

Generate server and client key pairs:

```bash
SERV_PRIV_KEY=$(wg genkey); \
SERV_PUB_KEY=$(echo "${SERV_PRIV_KEY}" | wg pubkey); \
CLIENT_PRIV_KEY=$(wg genkey); \
CLIENT_PUB_KEY=$(echo "${CLIENT_PRIV_KEY}" | wg pubkey); \
PRESHARED_KEY=$(wg genpsk); \
echo "Server private key: ${SERV_PRIV_KEY}"; \
echo "Server public Key: ${SERV_PUB_KEY}"; \
echo "Client private key: ${CLIENT_PRIV_KEY}"; \
echo "Client public Key: ${CLIENT_PUB_KEY}"; \
echo "Preshared Key: ${PRESHARED_KEY}"
```

Generate client key pairs:

```bash
CLIENT_PRIV_KEY=$(wg genkey); \
CLIENT_PUB_KEY=$(echo "${CLIENT_PRIV_KEY}" | wg pubkey); \
PRESHARED_KEY=$(wg genpsk); \
echo "Client private key: ${CLIENT_PRIV_KEY}"; \
echo "Client public Key: ${CLIENT_PUB_KEY}"; \
echo "Preshared Key: ${PRESHARED_KEY}"
```

Generate private and public keys only:

```bash
CLIENT_PRIV_KEY=$(wg genkey); \
CLIENT_PUB_KEY=$(echo "${CLIENT_PRIV_KEY}" | wg pubkey); \
echo "Client private key: ${CLIENT_PRIV_KEY}"; \
echo "Client public Key: ${CLIENT_PUB_KEY}"
```

### Generate server private, public keys and save them into files:

```bash
wg genkey | tee private-key-server | wg pubkey > public-key-server > /dev/null
```

### Generate a preshared key and save to file:

```bash
wg genpsk | tee preshared-key > /dev/null
```

### Generate a preshared key and output to terminal:

```bash
wg genpsk
```

## Configuration examples:

### Example of all possible configuration options:

```bash
[Interface]
# Name = node1.example.tld
Address = 192.0.2.3/32
ListenPort = 51820
PrivateKey = localPrivateKeyAbcAbcAbc=
DNS = 1.1.1.1,8.8.8.8
Table = 12345
MTU = 1500
PreUp = /bin/example arg1 arg2 %i
PostUp = /bin/example arg1 arg2 %i
PreDown = /bin/example arg1 arg2 %i
PostDown = /bin/example arg1 arg2 %i

[Peer]
# Name = node2-node.example.tld
AllowedIPs = 192.0.2.1/24
Endpoint = node1.example.tld:51820
PublicKey = remotePublicKeyAbcAbcAbc=
PresharedKey = presharedkeyabcabcabc=
PersistentKeepalive = 25
```

### Server configuration example:

```bash
[Interface]
# link = https://github.com/diyaa59/wireguard-docs
Address = xx
ListenPort = xx
PrivateKey = xx
#
PreUp = echo 1 > /proc/sys/net/ipv4/ip_forward
PreUp = echo 1 > /proc/sys/net/ipv6/conf/all/forwarding
#
PreDown = echo 0 > /proc/sys/net/ipv4/ip_forward
PreDown = echo 0 > /proc/sys/net/ipv6/conf/all/forwarding
#
[Peer]
PublicKey = xx
PresharedKey = xx
AllowedIPs = a.b.c.d/x,a.b.c.d/x
```

### Client configuration example:

```bash
[Interface]
PrivateKey = xx
Address = xx
DNS = xx (optional)

[Peer]
PublicKey = server public key
PresharedKey = preshared key
Endpoint = <IP>:<Port>
AllowedIPs = what to push up the tunnel
```

## Server config:

```yaml
[Interface]
# Name = server
Address = 10.0.0.254/24
ListenPort = 51820
PrivateKey = <private Key>
# Public key is not required in the config. I just like to have it here
# PublicKey = <Public Key>
DNS = 1.1.1.1
MTU = 1420
# Table is optional, not required for most deployments
Table = 12345
PreUp = <run before tunnel come up>
PreDown = <run before bringing the tunnel down>
PostUp = <run after tunnel come up>
PostDown = <run after tunnel go down>

[Peer]
# Name = Client-01
# All traffic without forcing default route through wireguard
AllowedIPs = 0.0.0.0/1, 128.0.0.0/1, ::/1, 8000::/1
# specific allowed route
AllowedIPs = 10.0.0.1/32
PublicKey = <Public key of peer node>
# Don't include endpoint for dynamic endpoint
Endpoint = domain.com:51820
# Keep alive isn't recommended, but can be used for NAT traversal
PersistentKeepalive = 25
# Preshared key is not required, but can be used for enhanced security
PresharedKey = <preshared key>

```

## Client config:

```yaml
[Interface]
# Name = server
Address = 10.0.0.1/24
# Don't include ListenPort to allow the client to use a random port
ListenPort = 51820
PrivateKey = <private Key>
# Public key is not required in the config. I just like to have it here
# PublicKey = <Public Key>
DNS = 1.1.1.1
MTU = 1420
# Table is optional, not required for most deployments
Table = 12345
PreUp = <run before tunnel come up>
PreDown = <run before bringing the tunnel down>
PostUp = <run after tunnel come up>
PostDown = <run after tunnel go down>

[Peer]
# Name = Client-01
AllowedIPs = 10.0.0.254/32
PublicKey = <Public key of peer node>
# Don't include endpoint for dynamic endpoint
Endpoint = domain.com:51820
# Keep alive isn't recommended, but can be used for NAT traversal
PersistentKeepalive = 25
# Preshared key is not required, but can be used for enhanced security
PresharedKey = <preshared key>
```

---

# Wireguard troubleshooting:

## Routing:

### DNS routing:

[DNS routing with wireguard](https://www.procustodibus.com/blog/2022/03/wireguard-dns-config-for-systemd/)

DNS can be setup with a server and a search domain as well:

```bash
[interface]
DNS = 10.0.0.2, internal.example.com
# or this way
PostUp = resolvectl dns %i 10.0.0.2; resolvectl domain %i ~internal.example.com
```

### Avoid DNS from DHCP:

```bash
nmcli modify 'Network name' ipv4.ignore-auto-dns yes
```

### show WireGuard routing table and peer connections:

```bash
wg show
wg show wg0 allowed-ips
```

### show system routing table:

```bash
ip route show table main
ip route show table local
```

### show system route to specific address:

```bash
ip route get 192.0.2.3
```

## Bandwidth:

### install iperf:

```bash
sudo apt install -y iperf
```

### check bandwidth over public internet to relay server

```bash
iperf -s # start iperf in server mode
iperf -c 10.11.1.254 # connect from client to iperf server
```

## DNS:

### Lookup DNS:

```bash
dig wireguard.com A
```

or

```bash
nslookup wireguard.com
```

---

# Custom routing table:

## Add specific routes with `ip rule` and `ip route`:

The following commands can be used to specify Wireguard routes with specific routing tables:

> [!warning]
> Doing this leads to the use of Policy Based Routing (PBR)

```bash
[interface]
PreUp = ip rule add from 10.10.1.0/24 lookup 200
PostUp = ip route add default dev wg0 table 200
```

## Setup custom routing tables:

[source](https://git.zx2c4.com/wireguard-tools/about/src/man/wg-quick.8)

```bash
[interface]

Table = 1234
```

---

# Generate QR Code Config:

Install QR generator package:

```bash
sudo apt install -y qrencode
```

Generate QR picture of the configuration:

```bash
qrencode -r phone.conf -o client1.conf.png
```

Display QR image of the config on the CLI:

```bash
cat phone.conf | qrencode -t UTF8
```
