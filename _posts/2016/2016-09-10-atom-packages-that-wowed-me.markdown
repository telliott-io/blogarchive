---
layout: post
title: "Atom Packages That Wowed Me"
date: "2016-09-10 18:44:52 -0400"
image: /blogarchive/media/logos/atom.png
---

After about a year of using Vim for a sizable chunk of my text editing, last week I got a bit frustrated with a weird autocomplete bug and started playing around with Atom. I've been mightily impressed. Atom is surprisingly zippy for a JavaScript-based application, has a nice intuitive split/tab mechanism and gives me absolute control over my keyboard shortcuts so I can set up some approximations of the shortcuts I had in Vim.

But the most useful feature in Atom is the package management system. Finding, installing and configuring packages is a snap, and after a couple of years there is already a rich ecosystem of packages available. These are a few that I'm already finding essential:

# [go-plus](https://atom.io/packages/go-plus)

Go Plus is an aggregation of packages that enhance the Go development experience, providing features like:

* Autocompletion using gocode
* Formatting, adding imports and linting on save
* Symbol renaming
* Test coverage highlighting

This is far from a complete list (the rest are on the package page). The last one of these is by far my favorite, and not something I'd seen before. Whenever you save a go source file, the tester-go package will run the tests in the same package and display coverage information right there in the editor:

![not all code covered by tests]({{ site.github.url | replace:'http://','//' }}/blogarchive/media/atom-packages-that-wowed-me/coverage.png){: .aligncenter}

This is a huge help when writing tests, giving an up-to-the-second view on how many more tests you probably need to write.

# [go-outline](https://atom.io/packages/go-outline)

Another one for the list of tools I didn't know I was missing. go-outline provides an outline view of the symbols in the current Go file or package alongside your editor view. This can be invaluable when working on a large Go file.

This package does require that you install the go-outline-parser tool to your PATH yourself, so be sure to check the README.

![go-outline view beside code]({{ site.github.url | replace:'http://','//' }}/blogarchive/media/atom-packages-that-wowed-me/go-outline.png){: .aligncenter}

# [seti](https://atom.io/themes/seti-ui) / [monokai-seti](https://atom.io/themes/monokai-seti)

A nice pairing of a UI theme and a syntax theme that makes code in Atom look a lot like my configuration of Vim, which looked a bit like Sublime...

![monokai-seti in action]({{ site.github.url | replace:'http://','//' }}/blogarchive/media/atom-packages-that-wowed-me/monokai-seti.png){: .aligncenter}

# [jekyll-atom](https://atom.io/packages/jekyll)

I dug this one out specifically to work on this blog post, and it's saved me a huge amount of time. jekyll-atom is a suite of tools for working on Jekyll sites, with:

* New post/draft creation
* Shortcut to your config file
* Local serve (with status notification when rebuilding)
* Snippets galore

![Your site has rebuilt]({{ site.github.url | replace:'http://','//' }}/blogarchive/media/atom-packages-that-wowed-me/jekyll.png){: .aligncenter}

# [platformio-ide-terminal](https://atom.io/packages/platformio-ide-terminal)

No matter how many packages you have, there will probably be something you need to dive into the terminal for, but luckily, there are packages to help with just that.

PlatformIO IDE Terminal is a fork of another popular terminal package that I unfortunately couldn't get to work. It provides a full terminal right below your editor, so it's not a huge context switch to go over and run that script you're tweaking.

# And more than a couple more

There are plenty of other great packages out there, but if I listed all the ones I've found useful, I'd be here all day (go-plus itself is kind of cheating). Explore for yourself on [atom.io](https://atom.io/packages), and if you're considering giving Atom a try, don't delay! I can heartily recommend it.
