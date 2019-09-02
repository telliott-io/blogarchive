---
layout: post
title: "Adding SwiftLint to an Established Project"
image: /blogarchive/assets/swiftlogo.png
tags:
 -
---

In the interests of doing a little pre-Spring cleaning, I recently added [SwiftLint](https://github.com/realm/SwiftLint) (unsurprisingly, a Swift Linter) to my [Speaker Alert](https://itunes.apple.com/us/app/speaker-alert-speech-presentation/id488585337?mt=8) project. After getting set up, my project was littered with hundreds of warnings, and not a few errors.

Seeing 700 warnings on any project is daunting, and enough to make any developer consider putting off or avoiding this linting business. Not only that, but these warnings can mask more serious issues and make it harder to correct real compilation problems. But a day or so later, I'd whittled down the warnings and rid myself of the errors. Along the way, I picked up a few practices that might make things easier when adding a linter to any non-trivial project.

## Installation tips

The SwiftLint readme file does a great job of getting you up and running quickly, but there are a couple of gotchas I discovered.

### Use the pkg installer

You can install SwiftLint using Homebrew, but I found this version to be a bit behind the current release. As of writing, the pace of development is pretty rapid, so if you download the pkg file direct from GitHub you'll be sure to get all the latest features and rules.

### Run the script after linking

SwiftLint is included in a project by adding a "Run Script" phase that executes the `scriptlint` command, adding any errors or warning to your build results.

I recommend putting this run script after the linking step, since errors during linting will stop the compilation process and mask any compilation errors, which are important if you're trying to correct these very linting errors.

![The Run Script Phase](/blogarchive/assets/swiftlintrunphase.png)

## Autocorrect is your friend

Some of the more basic issues (such as whitespace at the end of a line) can be automatically fixed by SwiftLint. Just use the command: `swiftlint autocorrect` in your source directory.

You could also add this to your "Run Script" phase, but I've been holding off on doing this for the time being, to maintain more control as I get used to how the tool behaves. 

## Fixing everything

Now comes the daunting part: fixing all the issues that SwiftLint can't fix itself! Helpfully, SwiftLint provides configuration options to allow rules to be turned off (since not everyone's going to agree 100% with their ruleset), and you can use this to your advantage when making a first pass at correcting issues in your project.

My approach was to disabled every rule, and then enable them one at a time, fixing issues as I went. This breaks down the problem into small pieces, which can be spread across time, or across a team.

To get started, just create *.swiftlint.yml* in your project's main source directory (where swiftlint is run) with a disable directive for all rules:

    disabled_rules:
        - trailing_newline
        - opening_brace
        - empty_count
        - comma
        - colon
        - force_cast
        - type_name
        - variable_name_min_length
        - trailing_semicolon
        - force_try
        - function_body_length
        - nesting
        - variable_name
        - conditional_binding_cascade
        - variable_name_max_length
        - operator_whitespace
        - control_statement
        - legacy_constant
        - line_length
        - return_arrow_whitespace
        - trailing_whitespace
        - closing_brace
        - statement_position
        - type_body_length
        - todo
        - legacy_constructor
        - valid_docs
        - missing_docs
        - file_length
        - leading_whitespace

As rules are frequently added, you can get a full list for the current version with the command `swiftlint rules`.

Once you have all of the rules disabled and you can build without errors or warnings, you can remove rules from this list one-by-one, fixing the issues as you go. This simplifies the task, allows it to be distributed, and makes commits small so there's less chance a mistake somewhere down the line will force you to revert a huge piece of work.

This has the added advantage that you can more easily identify rules that you don't want to be run on your code. Personally, I don't have a problem with using TODO: statements, for example.

## Conclusions

I'd heartily recommend adding SwiftLint to your project. Granted, many of the rules are a matter of preference and aesthetics (I think future me will be glad of having more readable code), but some can highlight serious bugs - forced casting comes to mind.

It can seem like a huge chore to get started, but if you break down the problem it won't be particularly onerous and you'll quickly reap the benefits of keeping your code clean and readable.

As a side benefit, SwiftLint is written in Swift, and structured to make adding rules easy. So it's fairly straightforward to fork the project for your organization and create rules to suit your own guidelines.