---
layout: post
title: "Why images never show up in my WatchKit apps first time"
image: /blogarchive/assets/xcode-icon.png
tags:
 -
---

Whenever I'm working with Apple's WatchKit, I'm often frustrated to find that an image I've added to a Watch Interface isn't actually showing up when the app is running. The filename autocompletes in Inteface Builder, and it shows up in the storyboard, but when I launch the app in the simulator, nada.

![The problem: Image shows in Interface Builder but not the app!](/blogarchive/assets/why-images-never-show-up-in-my-watchkit-apps-first-time/theproblem.png){: .aligncenter}

(Image: disguise by Matthew Waite from the Noun Project)

The solution for this is annoyingly simple. When dropping an image into a project in XCode, it is usually only included in the build for the main target, in this case the iOS app. In order to make it accessible on the watch, it needs to be added to the WatchKit App build as well. Just select the image and check the WatchKit App target under "Target Membership". Be sure to choose the WatKit App rather than the WatchKit Extension.

![Select the WatchKit App in the file's target membership](/blogarchive/assets/why-images-never-show-up-in-my-watchkit-apps-first-time/target_membership.png){: .aligncenter}

Alternatively, you can make sure the WatchKit App is checked when first importing the file into your project.

![Select the WatchKit App target when importing your image](/blogarchive/assets/why-images-never-show-up-in-my-watchkit-apps-first-time/importing.png){: .aligncenter}

Now it works perfectly.

![Image displayed in watch app](/blogarchive/assets/why-images-never-show-up-in-my-watchkit-apps-first-time/working.png){: .aligncenter}
