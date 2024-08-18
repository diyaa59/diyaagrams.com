---
tags:
  - pfsense
  - Geo-blocking
date: 2024-08-17
title: Pfsense GeoIP Objects
---

# Overview:

Author: Diyaa<br>
Published date: August 17, 2024<br>
Last updated: August 18, 2024<br>

This article demonstrates how to enable and use GeoIP in pfSense. The GeoIP data is synced from [MaxMind](https://www.maxmind.com/en/solutions/ip-geolocation-databases-api-services), a third-party provider. This is done using the pfBlockerNG-devel plugin which allows for adding GeoIP contents to access control rules. 

> [!note]
> I am demonstrating this for IPv4 GeoIP objects only. The process for IPv6 is very similar. You just need to create IPv6 GeoIP objects to use in IPv6 rules. **You can not use dual-stack rules with IPv4 and IPv6 GeoIP objects in the same rule.**

![[Pfsense/Geo-blocking/Attachments/Pasted image 20240817215538.png]]

# Technical Procedure:

## Installing Geo-Blocking Plugin: 

![[Pfsense/Geo-blocking/Attachments/Pasted image 20240403235229.png]]

![[Pfsense/Geo-blocking/Attachments/Pasted image 20240404000006.png]]

## Sign up for a MaxMind account:

This is the registration link for MaxMind: [https://www.maxmind.com/en/geolite2/signup](https://www.maxmind.com/en/geolite2/signup)

### Generate A New License Key:

> [!note]
> This is using the GeoIP lite 2 database. This is the lowest tier service offered by MaxMind.

After you sign up, you will need to generate a new license key to allow your Pfsense instance to sync the GeoIP database automatically.

![[Pfsense/Geo-blocking/Attachments/Pasted image 20240404000412.png]]

> [!note]
> Be sure to copy the `Account ID` as you will need it later.

![[Pfsense/Geo-blocking/Attachments/Pasted image 20240404000457.png]]

![[Pfsense/Geo-blocking/Attachments/Pasted image 20240404000520.png]]

You need to copy this key to add it into the Pfsense configuration in a later step:

> [!warning]
> You won't be able to see this key again after you return to main menu. Make sure to copy it now.

![[Pfsense/Geo-blocking/Attachments/Pasted image 20240404000614.png]]

## Configure The `pfBlockerNG-devel` Plugin:

![[Pfsense/Geo-blocking/Attachments/Pasted image 20240403235737.png]]

Exit the default configuration Wizard. You can follow it if you would like, but I am not following it in this procedure.

![[Pfsense/Geo-blocking/Attachments/Pasted image 20240403235806.png]]

![[Pfsense/Geo-blocking/Attachments/Pasted image 20240403235844.png]]

![[Pfsense/Geo-blocking/Attachments/Pasted image 20240404000911.png]]

After scrolling down add the license key and account ID you got from the mixmind website here:

![[Pfsense/Geo-blocking/Attachments/Pasted image 20240817204354.png]]

Update the Geoblocking data on Pfsense:

![[Pfsense/Geo-blocking/Attachments/Pasted image 20240404001057.png]]

![[Pfsense/Geo-blocking/Attachments/Pasted image 20240404001127.png]]

Navigate to the IP menu to create aliases:

> [!warning]
> I am only using the alias type as I like to use the alias in multiple places. Just be aware of the de-duplication process with the "Alias Deny" option.
> This is the difference between all the alias types:
> 
> ![[Pfsense/Geo-blocking/Attachments/Pasted image 20240817205042.png]]

![[Pfsense/Geo-blocking/Attachments/Pasted image 20240817205446.png]]

You can customize your IPv4 list to your own needs. The list I have below will hold GeoIPs for Canadian and US IPs. The source fields in the section below have auto completion. You will start to see the countries names show up as you type.

> [!info]
> Any GeoIP source with the `_rep` prefix at the end is the list of IPs for that country being used in other countries. Those are known as representative IPs. You can add them to your if you would like.
> 
> If the cron update fails indicating the `_rep` objects, that maybe indicating it is not available from the upstream provider (MaxMind.)
> 
> ![[Pfsense/Geo-blocking/Attachments/Pasted image 20240817210254.png]]

![[Pfsense/Geo-blocking/Attachments/Pasted image 20240817211556.png]]

You will see the section below if you scroll down in the same window as the previous screenshot. Customize the values under the settings header to meet your own needs and save the list after that (there is a button at the very bottom to "Save IPv4 settings".)

> [!note] Important:
> Be sure to change the action as it is set to disable by default.

![[Pfsense/Geo-blocking/Attachments/Pasted image 20240817210552.png]]

Navigate to the update section to force an update of all the lists:

> [!note] Important:
> You must run an update every time you make changes to any of the objects in pfBlockerNG-devel.

![[Pfsense/Geo-blocking/Attachments/Pasted image 20240817211813.png]]

## Access Control Rule With GeoIP Object:

You will start to see the GeoIP aliases auto complete their names as you type in the source field. You do not have to use this only in the source field, this is just my use case for this demonstration.

![[Pfsense/Geo-blocking/Attachments/Pasted image 20240817213421.png]]

# Related Notes:

- Link to [[index|Home-Page]].