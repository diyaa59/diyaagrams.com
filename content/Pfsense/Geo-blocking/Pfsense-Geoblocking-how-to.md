---
tags:
  - pfsense
  - Geo-blocking
draft: true
---

# Overview:

Author: Diyaa<br>
Published date: August 12, 2024<br>
Last updated: August 12, 2024<br>


>[!warning]
>You are reading an incomplete article.

This article demonstrates how to enable and use Geo-blocking on Pfsense. The Geo-blocking data is being synced from [MaxMind](https://www.maxmind.com/en/solutions/ip-geolocation-databases-api-services). MixMind is a third-party provider.

The Pfblocker-NG plugin allows for adding BGP autonomous system numbers and/or GeoIP contents to access control rules. Access control is simply the process of controlling access from or to a specific set of layer 3 and/or layer 4 addresses (IPs and ports).

# Technical Procedure:

## Installing Geo-Blocking Plugin: 

![[Attachments/Pasted image 20240403235229.png]]

![[Attachments/Pasted image 20240404000006.png]]

## Sign up for a Maxmind account:

This is the registration link: [https://www.maxmind.com/en/geolite2/signup](https://www.maxmind.com/en/geolite2/signup)

### Generate a new license key:

After you sign up, you will need to generate a new license key to allow your firewall to fetch the geo files automatically.

![[Attachments/Pasted image 20240404000412.png]]

![[Attachments/Pasted image 20240404000457.png]]

![[Attachments/Pasted image 20240404000520.png]]

You need to copy this key so that you paste it into Pfsense:

> [!warning]
> You won't be able to see this key again after you return to main menu. Make sure to copy it now and paste it into Notepad 😉.

![[Attachments/Pasted image 20240404000614.png]]

# Enable the PfblockerNG-devel plugin:

![[Attachments/Pasted image 20240403235737.png]]

![[Attachments/Pasted image 20240403235806.png]]

![[Attachments/Pasted image 20240403235844.png]]

![[Attachments/Pasted image 20240404000911.png]]

After scrolling down as instructed in the previous screenshot add the license key you got from the mixmind website here:

![[Attachments/Pasted image 20240404001008.png]]

Update the Geoblocking data on Pfsense:

![[Attachments/Pasted image 20240404001057.png]]

![[Attachments/Pasted image 20240404001127.png]]

Now go back to the geoblocking settings:

![[Attachments/Pasted image 20240404001203.png]]

Set the following settings and make sure to hit the save button in the bottom right of the screenshot:

![[Attachments/Pasted image 20240404001337.png]]

Now you need to specify what countries you want to allow in each region (I am going to show you North America as an example):

![[Attachments/Pasted image 20240404001533.png]]

Please read the text on this screenshot (very important to understand this part) 😉:

![[Attachments/Pasted image 20240404001816.png]]

Scroll to the bottom and save:

![[Attachments/Pasted image 20240404001918.png]]

Go back and update the PfblockerNG tables:

![[Attachments/Pasted image 20240404001952.png]]

![[Attachments/Pasted image 20240404002007.png]]

# Create a firewall rule with Geo-blocking object:

You will start to see the geo location aliases auto complete their names as you type:

![[Attachments/Pasted image 20240404002206.png]]

You can set the Geo location alias as the source or destination in your rule and you have just implemented Geo blocking on Pfsense 😊.