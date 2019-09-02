---
layout: post
title: "How I Migrated From Wordpress To Jekyll"
published: true
image: /blogarchive/assets/jekyll-logo.png
tags:
 -
---

![GitHub](/blogarchive/assets/jekyll-logo.png){: .alignright} After my [recent post](/2015/07/17/this-blog-now-on-github-pages.html) on my reasons for moving from Wordpress to Jekyll, here's an outline of my experience of the process.

This process was complicated slightly by my blog's history - having started as a Drupal site way back in 2008, then moved to Wordpress and bounced from shared web hosting to whatever VPS service I liked the most at the time.

Frankly, this made me feel a bit nervy about the whole migration process, since there were so many things to consider (permalink styles, formatting plugins, Disqus comments, etc). But the great thing about Jekyll is that it let me easily fire up a copy of my site locally and test it without worrying about pointing to the wrong database and messing things up. Not only that, but since everything was tracked in Git, I had much greater control over any changes I made, and could roll back anything that didn't work.

While your experience may (or almost certainly will) vary, you might hit some of these same bumps in the road, in which case I've provided a few code snippets and tips along the way.

## Exporting, Backing Up and Importing

The [jekyll-import documentation](http://import.jekyllrb.com/docs/wordpress/) suggests using a chunk of Ruby code to import a self-hosted Wordpress site.

This can be a bit of a pain, since it requires either running the script on your server (with associated dependencies and configuration) or opening up access to your database from your development box.

A much easier approach is to use the recommended approach for Wordpress.com, which uses an XML file you can [generate from Wordpress Admin](https://en.support.wordpress.com/export/).

Once I had this export file, I also took a backup of my whole site, just in case. I used [BackWPup](https://wordpress.org/plugins/backwpup/) to generate a zip of everything.

Running the [Wordpress.com Jekyll importer](http://import.jekyllrb.com/docs/wordpressdotcom/) will have a good crack at downloading all your images to the Jekyll assets directory, and for simple cases (which I imagine are rare) this will be all you need to do.

## Fixing the Import

After running the importer, I actually had a working version of my site, and no content was missed (even some drafts I'd forgotten about were there), but there was still a bit of cleaning up to do.

### Front Matter Formatting

On loading up a local copy of the site, the first problem was pretty obvious. At the top of every post's page was some ugly-looking markup:

`{}}"> {}}" /> {}}" />`

This was a result of the importer adding newlines to an excerpt node in each post's front matter:

{% highlight ruby %}
excerpt: !ruby/object:Hpricot::Doc
  options: {}
{% endhighlight %}

Since this was the same in each post, it was easy to remove it with a search and replace in Sublime Text 2.

### Fixing Post Permalinks

Since I didn't want to break anyone's links to my site, and would prefer to keep any resulting search rankings I'd earned, I wanted to maintain my URLs between the old site and the new. Handily, Jekyll provides [decent control over permalinks](http://jekyllrb.com/docs/permalinks/) on both a site-wide and per-post basis.

Adding the existing permalinks to my posts presented an interesting problem. My Wordpress site was using a permalink structure from Drupal, which included the node number (specifically */node/[n]*), and node numbers don't really exist in Jekyll. Not only this, but due to all content types having shared the same incrementer, the posts weren't necessarily numbered continuously. So there would be posts at */node/123* and */node/234*, but nothing in between.

I dealt with this by writing a Python script that iterated over all the posts and mapped them to the appropriate permalink by finding a live URL with a corresponding title.

Full script here: [permalinks.py](https://github.com/theothertomelliott/theothertomelliott.github.io/blob/master/_script/permalinks.py)

The upshot of this is that I can use the default Jekyll permalink format (which is more human friendly) without affecting my older posts.

### Caption Formatting

A few of my posts used captioned images, which apparently didn't come under the remit of the importer, and so I ended up with a bunch of square-bracketed caption tags littered through various posts.

I put together another Python script to find all these tags and replace them with a set of divs to show both the image and associated caption as intended.

Full script here: [captions.py](https://github.com/theothertomelliott/theothertomelliott.github.io/blob/master/_script/captions.py)

### A Final Scan

To make sure that all my old posts were now rendering correctly, I made a final visual pass over them by creating a single page that listed all posts and their entire contents.

{% highlight html %}
{% raw %}
<ul class="post-list">
<!-- This loops through the paginated posts -->
{% for post in paginator.posts %}
  <li>
    <!-- Page title, date and link -->     
    <span class="post-meta">{{ post.date | date: "%b %-d, %Y" }}</span> 
        <h2>
          <a class="post-link" href="{{ post.url | prepend: site.baseurl }}">
            {{ post.title }}
          </a>
        </h2>
  <!-- Full page content -->      
  <div class="content clearfix">
    {{ post.content }}
  </div>
  </li>
{% endfor %}
</ul>
{% endraw %}
{% endhighlight %}

Then I just had to scroll through the posts and keep an eye out for missing images or anything that looked odd.

A few images that weren't under the standard wp-content folders had been missed out, and image names with brackets in them had, for some reason, been modified during the import to remove the brackets. This was pretty quick to correct manually, pulling any missing images from the original live site.

## Theming

Wordpress is known for its sizeable community and the availability of many awesome themes and plugins. In my case, this has often led me to spend hours hunting down the perfect theme and then discovering it didn't quite fit with what I was trying to do.

Since I wanted a bit more control, and didn't feel like wading through the source of my current theme to convert it to Jekyll's format, I decided to set up a new design from scratch using [Bootstrap](http://getbootstrap.com), which I've used for a number of web projects already and am pretty comfortable with by now.

Jekyll has a fairly decent layout by default, though, so I kept hold of the existing Sass files and used Bootstrap to supplement them. End result: I had a site design I was happy with in less than an evening!

It's important to note that your posts will be imported as HTML rather than Markdown, which may require you to do some CSS massaging to keep things looking presentable.

Since I had a copy of the Wordpress theme I was using in my backup, I was able to pick and choose the pieces I needed. In my case, I just copied a couple of classes relating to how images were displayed and aligned. I could have done a search-and-replace for these classes and replaced them with corresponding ones from Bootstrap, but I figured a few extra lines of code were worth the saved time (and checking that everything was still lined up properly afterwards).

## Summary

If you're thinking of moving from Wordpress to Jekyll, my advice would be to dive in and not worry too much about getting things wrong. Git and `jekyll serve` are your best friends. Test on a local copy of the site, iterate and commit often and you'll be able to correct any mistakes you might make along the way before going live.

There were a few things I didn't cover here, like making sure my Disqus comments showed up correctly on the new site, and the process of moving my domain as well as the site itself. But this is getting a bit long as it is, so those will follow in future posts!