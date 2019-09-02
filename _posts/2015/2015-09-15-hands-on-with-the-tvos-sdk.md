---
layout: post
title: "Hands-on with the tvOS SDK"
image: /blogarchive/assets/xcode-icon.png
tags:
 -
---

Last Wednesday, Apple announced a slew of new products, among them was the "New Apple TV", which finally brings third party apps to the Apple TV platform. While the hardware won't be available until later in the year, a new beta of Xcode 7.1 was released immediately after the keynote, with the tvOS SDK ready to go.

I couldn't resist firing it up and having a play around, and the good news is, the SDK will be familiar to any iOS developer (or indeed OS X developer). After a couple of hours, I'd managed to port over a playable version of my [SpriteKit Space Invaders](https://github.com/theothertomelliott/SpriteKitInvaders) project:

![Space Invaders on tvOS](/blogarchive/assets/invaders-on-tvos1.png)

So here's a very early rundown of some of the things that may be familiar, and some that may not be so familiar about tvOS.

# Sharing code with iOS

First off, as I mentioned, tvOS is very similar to iOS in terms of the app SDK. Familiar frameworks like UIKit, SpriteKit and SceneKit are all there, and more or less the same as they are in iOS.

While I didn't delve too deeply, I was able to copy over most of my code from the Invaders project verbatim, just making a few tweaks for places where the  OSX APIs differed from iOS.

A cursory look at the UIKit elements available to a skeleton project suggests that UIKit is similarly compatible, although the standard controls look totally different on tvOS. `UITabBarController`, for example, appears at the top of the screen as a menu that disappears when you select a tab.

![Tab Bars on tvOS](/blogarchive/assets/tabbars-on-tvos1.png)

So while you can share a lot of code, this doesn't mean that porting your iOS apps will be 100% straightforward, as there are some major differences between the platforms.

# User Interaction

User interaction on tvOS is a vastly different affair to that on iOS. Since there aren't a whole lot of touchscreen TVs in the world, input is recevied through the remote, which includes a touch pad that recognizes touches and presses.

Touches on the pad are somewhat analogous to a laptop trackpad, in that the position on the pad itself doesn't matter, what's important is how your finger (or more likely, thumb) moves after starting a touch.

The remote also includes support for motion control, which can best be described as Wii-like. Unfortunately, it doesn't seem like the simulator provides any of this motion functionality (or at least I couldn't figure it out) so I wasn't able to play around with that.

These differences will require a serious rethink of existing interfaces on iOS, moving from direct touch interaction to a [Focus and Selection](https://developer.apple.com/tvos/human-interface-guidelines/navigation-and-focus/) model as recommended by Apple. My initial impression is that adding a mouse cursor to your app would be frowned upon.

Picking up touches is pretty straighforward, with a few gesture recognizers available for handling simple actionss, such as this example for receiving select actions on the touchpad:

        let tapRecognizer = UITapGestureRecognizer(target: self, action:"tapped:")
        tapRecognizer.allowedPressTypes = [NSNumber(integer: UIPressType.Select.rawValue)];
        self.view?.addGestureRecognizer(tapRecognizer)
        
Or this one for receiving left swipes:

        let swipeRecognizerL = UISwipeGestureRecognizer(target: self, action:"swipedLeft:")
        swipeRecognizerL.direction = .Left
        self.view?.addGestureRecognizer(swipeRecognizerL)

This will suffice for most apps, although sometimes (such as in a game) you may want something a little fine-grained. For handling more complex touch interaction, the `UIResponder` class in tvOS has a few methods you can override:

    override func touchesBegan(touches: Set<UITouch>, withEvent event: UIEvent?) { /* ... */ }
    override func touchesMoved(touches: Set<UITouch>, withEvent event: UIEvent?) { /* ... */ }
    override func touchesEnded(touches: Set<UITouch>, withEvent event: UIEvent?) { /* ... */ }
    override func touchesCancelled(touches: Set<UITouch>?, withEvent event: UIEvent?) { /* ... */ }

The [UIResponder documentation](https://developer.apple.com/library/prerelease/tvos/documentation/UIKit/Reference/UIResponder_Class/index.html#//apple_ref/occ/instm/UIResponder/touchesBegan:withEvent:) for tvOS does a pretty decent job of describing how these can be used. There are similar methods for handling [motion events](https://developer.apple.com/library/prerelease/tvos/documentation/UIKit/Reference/UIResponder_Class/index.html#//apple_ref/occ/instm/UIResponder/touchesBegan:withEvent:).

# Storage Limitations

It seems that Apple is positioning the New Apple TV as a network-first device. As such, tvOS apps are expected to use iCloud and other network-based storage instead of local storage.

Even the size of apps themselves is being severely restricted, with larger app bundles required to be broken into smaller pieces that can be loaded on demand.

From the [developer guide](https://developer.apple.com/library/prerelease/tvos/documentation/General/Conceptual/AppleTV_PG/OnDemandResources.html#//apple_ref/doc/uid/TP40015241-CH9-SW1):

> Each app stored on Apple TV is limited to a maximum of 200MB. In order to create an app greater than this amount, you must break up your app into downloadable bundles.

This will require some serious thought when designing content-rich applications.

# Conclusions

Based on my (very) early poking around, developing for tvOS will be a very familiar experience for existing iOS developers. But while porting your iOS skills and even iOS code to tvOS will be simple, you will be developing for a very different platform. Developing a quality app will be a question of forethought and design, rather than pure technical chops.
