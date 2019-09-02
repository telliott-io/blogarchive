---
layout: post
title: "How I Broke Jekyll With My Gemfile"
published: true
image: /blogarchive/assets/bundler-logo.jpg
tags:
 -
---

New as I am to Jekyll, Bundler, and Ruby Gems as a whole for that matter, it was only a matter of time before I messed things up royally. Specifically, I started getting the following when running `jekyll serve`:

{% highlight bash %}
{% raw %}
      Generating...
You are missing a library required for Markdown. Please run:
  $ [sudo] gem install kramdown
  Conversion error: Jekyll::Converters::Markdown encountered an error while converting '_posts/2015-07-17-this-blog-now-on-github-pages.md/#excerpt':
                    Missing dependency: kramdown
             ERROR: YOUR SITE COULD NOT BE BUILT:
                    ------------------------------------
                    Missing dependency: kramdown
{% endraw %}
{% endhighlight %}

The suggested solution wasn't a whole lot of help, resulting in exactly the same error, and somehow I ended up with additional warnings about multiple versions of Jekyll.

I eventually figured out that this was caused by a Gemfile I'd added in order to use [Thor](http://whatisthor.com) to [create new blog posts](http://jonas.brusman.se/2012/12/28/create-jekyll-posts-from-the-command-line/).

My Gemfile as it stood contained just these lines:

{% highlight ruby %}
source 'https://rubygems.org'
gem 'thor'
gem 'stringex'
{% endhighlight %}

Which was apparently resulting in Jekyll's import path being limited to just those two gems. Hence a significant chunk of Jekyll's dependencies could not be found, resulting in an error on the first one encountered, Kramdown.

The frustratingly simple fix for this was to add the following line to my Gemfile:

{% highlight ruby %}
gem 'jekyll'
{% endhighlight %}

Or, if you're using Github Pages like me:

{% highlight ruby %}
gem 'github-pages'
{% endhighlight %}

Then run a quick `bundle install` to refresh the lock file. If it still doesn't work, it may be necessary to run `bundle clean --force` and then another install, but this will wipe **ALL** your existing installed Gems.