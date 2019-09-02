---
layout: post
title: "Docker for Mac: First Impressions"
image: /blogarchive/assets/docker-for-mac-first-impressions/icon.png
tags:
 -
---

Late last month, the good folks at [Docker](https://blog.docker.com/2016/03/docker-for-mac-windows-beta/) announced a private beta for their new "Docker for Mac" and "Docker for Windows" releases. These tools provide an alternative to the VirtualBox hosted status quo, and aim to create a more seamless environment for running containers closer to the experience available on Linux.

I signed up for the beta and got my hands on Docker for Mac a little over a week ago. Since then I've been toying around with some of the in-built containers as well as one or two of my own. My experience has ranged from enlightening, to infuriating, because, well, beta.

## The Good

Starting off with a huge positive, with Docker for Mac, you don't have to launch a Quickstart terminal or SSH into a VM. You just launch your favorite terminal and run `docker` commands directly. This removes a huge barrier to using Docker for development in my eyes, as you can now just add Docker to the workflow you've grown comfortable with, rather than having to re-shape your workflow to suit Docker.

![Start Typing Docker Commands!](/blogarchive/assets/docker-for-mac-first-impressions/docker_for_mac_beta.png)

It's clear there's a lot of excitement around this release, and in the space of a month, the [Feedback Forum](https://forums.docker.com/c/docker-for-mac) has become highly active. Any questions that I had (more on those later) were asked and answered before I got there, which is highly encouraging.

Despite this more "native" feel, it is important to note that you're still running your containers in a VM. Specifically, Docker for Mac runs a daemon on [xhyve](https://github.com/mist64/xhyve), a lightweight hypervisor. This means that the VM still needs to boot up when Docker for Mac starts, creating a small but noticeable lag if you try to run Docker commands soon after starting the daemon. However, the new VM starts much faster than the VirtualBox Docker VM, and if you've got Docker configured to start on login, you'll hardly ever notice.

## The Not So Good

There are a few places where the abstraction does break down more severely, though. Firstly, Docker for Mac uses processor features that are only available in newer Macs (from late 2012 onward). My Mac Pro at work lacks these features, and my Macbook Pro at home only just made the cut.

There is also the potential for clashes with other software using hypervisor features. I found that Android Studio would refuse to start a Simulator while Docker for Mac was running, and according to the documentation this was also a problem with some earlier versions of VirtualBox.

My main source of frustration was related to networking. By default, Docker for Mac exposes ports via a separate IP (as opposed to the loopback address), which is accessible from the address 'docker.local'. Having failed to read through the Getting Started guide thoroughly, I missed this and spent a few minutes trying to figure out why the port wasn't being forwarded. Once I'd figured this out, it was all fine and dandy for a while, until suddenly (either due to being on a hotel network with a captive portal or some configuration change I missed), I found that all my containers weren't getting their ports forwarded, and were showing up in `docker ps` with an IP of 'None'.

![Docker PS output "None:9000->9000tcp"](/blogarchive/assets/docker-for-mac-first-impressions/none.png)

After a lot of fruitless fiddling, the forums came to the rescue, and [this post](https://forums.docker.com/t/docker-for-mac-ip-change-to-none-after-update/9690/6) provided a simple fix, by changing the port forwarding setting via the pinata tool:

    pinata set native/port-forwarding true

This had the added advantage of forwarding container ports directly to localhost, which greatly improved my development experience. For example, if I'm building a web service that uses OAuth, I won't have to have separate configurations for running the service locally vs. testing the container locally. It seems as if this may become the default behavior in later updates, but for now it seems to be very much experimental.

## Conclusions

Overall, Docker for Mac looks very promising. Granted, there are some rough edges, as is to be expected from beta software, but with the community as active as it is, I have high hopes that the final release will be well worth the wait.

Unfortunately, due to the system requirements, it's unlikely this solution will completely replace VirtualBox VMs for many users, as there are still many older Macs out there.

**UPDATE (04/23/2016):** Docker for Mac beta 9 was just released, and this makes localhost the default for port mapping. Not only that, but I’ve noticed something of a speed boost when building my current project!
