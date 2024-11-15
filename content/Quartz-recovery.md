---
title: Quartz 4.3.0 Recovery
date: 2024-08-18
tags:
  - Quartz
---
# Overview:

This article has instruction to help me rebuild Quartz in the event my local repository is lost.
# Steps:

> [!warning]
> The instruction below are for Quartz 4.3.0 which uses nodejs `lts/iron`.

Install prerequisites:

```bash
sudo apt update; sudo apt upgrade -y; \
sudo apt install curl git; \
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash - ; \
sudo apt-get install -y nodejs; \
sudo npm install -g npm@latest; \
node -v; npm -v
```

Pull the repository:

```bash
git clone git@github.com:diyaa59/diyaagrams.com.git
```

Initialize `npm`:

```bash
npm i
```

Build and serve Quartz to ensure everything is working as expected:

```bash
npx quartz build --serve
```

You can now sync any changes you make with:

```bash
npx quartz sync
```

# Related Notes:

- Link to [[index|Home-Page]].

# References:

[Quartz 4](https://quartz.jzhao.xyz/#-get-started)