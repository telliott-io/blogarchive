---
layout: post
published: true
title: "This blog now on GitHub Pages!"
image: /blogarchive/assets/Octocat.jpg
tags:
 -
---

![GitHub](/blogarchive/assets/Octocat.jpg){: .alignright} After a few years with [Wordpress](https://wordpress.org/) on a VPS server, I've moved this site over to [Jekyll](http://jekyllrb.com/) running on [GitHub Pages](https://pages.github.com/).

Jekyll is a framework for building static sites from template files, which is vastly different to the database-oriented CMS model of Wordpress. As such, it lacks some of the more dynamic features of Wordpress (such as locally-hosted comments), but for this site the switch made a lot of sense for a number of reasons:

* Jekyll has code highlighting support built-in. In contrast I spent a whole evening trying to find a decent plugin for Wordpress.
* Jekyll supports markdown, so I can write my posts in [Macdown](http://macdown.uranusjr.com/) to get a decent "live" preview as I write.
* Wordpress uses a combination of filesystem storage and database storage to hold content, which is a bit of a pain when it comes to migration and backups. Jekyll keeps everything in one filesystem, which means...
* I can keep a full history for the site in Git, so I can keep track of post changes and easily roll back if I break anything
* Jekyll has a built in command for running a local server, so it's far easier to fiddle with theme changes without messing up the live site
* Being static, all the work is done up-front, so pages are served blazingly-fast
* Lacking dynamic content is no biggie. I've been using [Disqus](https://disqus.com/) for comments for years.
* No need to manage my own server, just set up my repo in GitHub for serving the site via GitHub Pages.
* GitHub Pages is **FREE**


The move was complicated a little by the history of this site, namely that it was originally a Drupal project prior to Wordpress, so I had some iffy legacy permalink stuff going on. But the problems weren't insurmountable, especially given just how flexible Jekyll is. More on that over my next few posts...

