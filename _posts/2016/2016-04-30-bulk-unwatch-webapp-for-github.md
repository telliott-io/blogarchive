---
layout: post
title: "Bulk Unwatch Webapp for GitHub"
image: /blogarchive/assets/bulk-unwatch-webapp-for-github/eyecon.png
tags:
 -
---

Not long back, I joined a GitHub organization at work and discovered that being added to the organization had automatically added every repository to my watch list.

This wouldn't have been so bad, but this particular organization had over 160 repositories! After getting a raft of emails over a couple of days (every time someone updated anything...), I went into my account settings and discovered that GitHub only allows you to unwatch one repository at a time.

Faced with the wonderfully monotonous task of clicking through the better part of 200 links, I took a look at the [GitHub API](https://developer.github.com/v3/) and built myself a [bulk unwatch webapp](https://github-unwatch.herokuapp.com/).

![Screenshot](/blogarchive/assets/bulk-unwatch-webapp-for-github/screenshot.png)

If you find yourself being annoyed by floods of repo update emails, this might be the app for you!

It turned into a nice little project to get to grips with [Revel](https://revel.github.io/) (and by extension, [Go](https://golang.org/)), and [Vue.js](https://vuejs.org/). The [source is available on GitHub](https://github.com/theothertomelliott/github-unwatch), with a bit more detail on the implementation.

Hope it comes in handy!