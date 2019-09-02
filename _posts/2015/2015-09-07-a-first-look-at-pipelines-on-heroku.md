---
layout: post
title: "A First Look at Pipelines on Heroku"
tags:
 -
---

Last Thursday, Heroku announced [Heroku Flow](http://blog.heroku.com/archives/2015/9/3/heroku_flow_pipelines_review_apps_and_github_sync), a suite of tools that bring Continuous Delivery (CD) to the forefront of their platform.

Chief amongst these features is Heroku Pipelines, which place your development, staging and productions apps into a clear visual workflow with one-click deployment from one app to the next in line.

![](/blogarchive/assets/heroku-pipeline1.png)

# The Workflow

At its simplest, your pipeline workflow would consist of a staging app and a production app. You first deploy to your staging app for testing, and once you're happy with the staging build, you "promote" the staging build to production with a single click in the UI, or a command in the CLI.

So you can double-check that you have everything in the right place before promoting, there's even a handy link to launch each app in your browser:

![](/blogarchive/assets/heroku-pipelines2.png)

The promotion process duplicates the app's "slug" to the next app in the workflow. This makes promotion faster than deployment from a source repo, and reduces the likelihood of problems being introduced by changes to third party dependencies - although this is a property I haven't yet tested in anger.

# Migrating to Pipelines

Pipelines is effectively just a layer on top of your existing apps, so all the existing app functionality remains with your apps themselves.

This makes the process of migrating to pipelines relatively painless, as you can just add an existing app into the production slot, and then fill out the rest of your pipeline appropriately with new apps. And if you already have development or staging apps, it's even easier.

Since apps behave the same in and out of a pipeline, you can configure each app's environment variables separately to point to appropriate databases and the list.

Should you decide you don't want to use pipelines any more, you can remove your apps from the pipeline entirely.

# Beta Issues

Pipelines are currently in beta, but on logging into my account this morning, I already had access without having to enable or request it, which was quite handy. Although it's important to be aware of the little "BETA" icon, warning you that there may be a few rough edges.

These rough edges are apparent, but not jarring. For example, after creating a pipeline without adding any apps to it, it didn't appear in my dashboard. As I was then able to create a new pipeline with the same name it appears it wasn't created at all.

But any issues I have seen thus far have been very minor, and didn't break my workflow, which is the important thing. 

# Conclusions

Personally, this is a feature I wasn't aware I'd been anticipating for a while, and I'm excited to see more of what it can do. Along with Pipelines, Heroku flow also includes GitHub Sync for automated deployment, and Review Apps for testing Pull Requests.

After forking one of Heroku's "Getting Started" repos, I was able to get a simple pipeline up and running in just a few minutes using the web UI, and promoting changes to production was quick and painless.

When I decided I wanted to add a development app, it was just a case of renaming and moving the staging app, then putting a new staging app in its place. A couple of minutes at most.

Granted, adding real world considerations such as databases and environment configuration will complicate matters a little, but from what I've seen, Heroku Pipelines won't get in the way.

On the whole, this is one of the most intuitive CD tools that I've seen, and incredibly polished for a beta release.

The Other Tom Elliott is not affiliated with or otherwise sponsored by Heroku or Salesforce.