---
layout: post
title: "Using rbenv to install Cocoapods post El Capitan"
image: /blogarchive/assets/cocoapods-twitter-icon.png
tags:
 -
---

If you're like me, and only using Ruby to run [Cocoapods](https://cocoapods.org) (and perhaps [Jekyll](https://jekyllrb.com/)) on your Mac, it's likely you're using the built-in version of Ruby in OSX, and perhaps using sudo to install gems (which is bad, but so much simpler than reconfiguring things).

Should that sound familiar, you may well have run into some problems after updating to El Capitan. This is because Apple have locked down certain directories, so you can no longer access them even if you have root privileges.

As such, immediately after upgrading to 10.11, trying to run `pod install` resulted in the error:

> pod: command not found

I tried a bunch of changes to get things working again, including installing gems to a new location by default, changing owner on a couple of folders, and a lot of forced rebuilds, but there were always problems ranging from the annoying to the infuriating.

I finally got around the whole mess by replacing the default Ruby install with one staged by [rbenv](https://github.com/sstephenson/rbenv), an excellent tool for managing separate Ruby environments. Now everything's working smoothly, and I have far greater control over my Ruby environment and installed gems.

Here is a quick set of instructions, so you can do the same. We'll be working in the terminal, so all code blocks below can be assumed to be bash commands.

# 1. Install Xcode's command line tools

Make sure the Xcode build tools are available at the command line by running:

    xcode-select --install

Which will open an installer dialog, or inform you that the tools are already installed.

This isn't strictly necessary for Cocoapods, but some gems require building dependencies, for which you'll need the Xcode command line tools. In my case, the El Capitan update trashed these tools (either that or Xcode 7 did) so I needed to reinstall them.

# 2. Install rbenv via Homebrew

If you're not already using [Homebrew](http://brew.sh/), I'd highly recommend installing it. With Homebrew, installing rbenv takes just two commands:

    brew update
    brew install rbenv ruby-build
    
Or one if your package lists are already up to date.

# 3. Configure rbenv

rbenv needs to add a couple of directories to your PATH in order to work correctly, so you need to add the below to your ~/.bash_profile:

> eval "$(rbenv init -)"

# 4. Install and configure Ruby

Now we can install a version of Ruby under rbenv's control. Install the latest release (at the time of writing, this is 2.2.3) and set it as the global default version of Ruby you wish to use:

    rbenv install 2.2.3
    rbenv global 2.2.3

Next, we run a rehash to make sure the newly-installed version is available, and source your updated bash profile to make sure rbenv is on your path.
    
    rbenv rehash
    source ~/.bash_profile

To check that all went smoothly, running `ruby --version` should now report the version you installed. In addition, `which ruby` should also point to '.rbenv/shims/ruby' under your home directory. If not, try restarting your terminal, if it still doesn't work, or you don't see any clear errors, try repeating steps 2 and 3.

# 5. Install Cocoapods:

Now we can install Cocoapods as normal:

    gem install cocoapods

Note that there is no need to use sudo, as rbenv operates entirely under your home directory.

We're nearly there. One thing to bear in mind is that you'll have to run a rehash after installing gems (or a new Ruby version) to make sure everything new is on your PATH:

    rbenv rehash

You should now be good to go! If you now run `pod --version` you should get the latest version of cocoapods listed, without errors. At the time of writing, this is 0.39.0.