---
layout: post
title: "Phone Status Glance: View Phone Battery and Network State On Your Watch"
image: /blogarchive/media/phone-status-glance-view-phone-battery-and-network-state-on-your-watch/icon-transparent.png
---

A quick project from my recent vacation: Phone Status Glance is a free and open source iOS app that puts your phone's battery and network status (down to whether you have LTE or Edge) on your watch for quick viewing. Phone Status Glance is available today on the App Store!

![Glance running on a watch](/blogarchive/media/phone-status-glance-view-phone-battery-and-network-state-on-your-watch/Watch-Screenshot-Small.png){: .aligncenter}

While travelling in the UK recently, I found myself in a tea room with very spotty reception. Feeling lost without constant access to cat videos and movie trivia, I anxiously took my phone out every few minutes, hoping weather conditions had improved enough to let the signals through. This seemed like something of a waste of my time. So I wrote a quick app to put that info on my watch. Now I'm just a glance away from knowing that I still haven't got a signal.

I put the app together over a couple of days while travelling, so there are a couple of rough edges which I should have smoothed out before too long. And then I'll have to do a complete rewrite ready for [watchOS 3](http://9to5mac.com/2016/06/20/the-dock-watchos-3-breathes-new-life-into-apple-watch-video/) when Glances are replaced by the Dock.

There are a few tools I can recommend that made building this app much faster and easier:

* The excellent [Fastlane](https://fastlane.tools/) by [Felix Krause](https://krausefx.com/) was a massive time-saver. If you're not familiar, Fastlane is a suite of tools that automate a lot of the more tedious tasks involved in launching an app. In particular, the snapshot tool will automatically generate screenshots from your app (via UI Testing) for multiple device types.
* [Adobe Draw](http://www.adobe.com/products/draw.html) is a free drawing package, optimized for touch. Having recently bought an iPad Pro and Pencil for work, I was able to put together a simple logo in just a few minutes.

[![App Store](/blogarchive/assets/appstore-badge.svg)](https://itunes.apple.com/us/app/phone-status-glance-see-battery/id1123372716?ls=1&mt=8)

[[Source on Github]](https://github.com/theothertomelliott/PhoneStatusGlance)
