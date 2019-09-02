---
layout: post
title: "meetingtime: A Schedule Calculator for Go"
date: "2016-11-20 17:59:42 -0500"
image: /blogarchive/media/logos/gopher.png
---

If you're working on a Go (golang) project that deals with regular events, you'll no doubt find yourself having to calculate upcoming dates given a less than straightforward brief, such as "the first and third Monday of each month". [meetingtime](https://github.com/theothertomelliott/meetingtime) makes this a bit easier, taking simple structs describing your schedule, and providing the date and time for upcoming or past meetings.

# Installation

To get the latest version of meetingtime:

    go get -u github.com/theothertomelliott/meetingtime

# Basic Usage

Start by defining a Schedule:

    // Create a Schedule for a meeting that occurs every other month on the 10th at 6pm
    schedule := meetingtime.NewMonthlySchedule(time.Date(2016, time.January, 10, 18, 0, 0, 0, time.UTC), 2)

Then query the Schedule to obtain the date of the next meeting as a `time.Time` value:

    // Get the next meeting after the current time
    nextMeeting, err := schedule.Next(time.Now())

# Schedule Types

`meetingtime` provides a variety of schedule types:

* Daily
* Weekly
* Monthly
* Monthly by Weekday
* Yearly

*Daily*, *Weekly*, *Monthly* and *Yearly* schedules accept a frequency value, to allow for schedules such as "every other Monday". The *Monthly by Weekday* type permits schedules like "the second Tuesday of each month", this type does not take a frequency, and any frequency value will be ignored.

# Complex schedules

More complicated schedules can be represented by combinations of Schedule values using the ScheduleSlice type.

    // Create a ScheduleSlice for a meeting on the 1st and 3rd Monday of each month at 7pm
    schedule := ScheduleSlice{
        NewMonthlyScheduleByWeekday(time.Date(2016, time.September, 5, 19, 0, 0, 0, time.UTC)),
        NewMonthlyScheduleByWeekday(time.Date(2016, time.September, 19, 19, 0, 0, 0, time.UTC)),
    }

    // Get the first meeting in October
    firstInOct, err := schedule.Next(time.Date(2016, time.October, 1, 0, 0, 0, 0, time.UTC))

# Describing a Schedule

The `describe` package provides a function (`describe`.`Schedule`) for creating English descriptions for `meetingtime`.`Schedule` values.

See the [describe godoc](https://godoc.org/github.com/theothertomelliott/meetingtime/describe) for more details.

`describe` does not currently have i18n support.

# Having Trouble?

If you're having trouble with `meetingtime`, please raise a [GitHub issue](https://github.com/theothertomelliott/meetingtime/issues) and we'll do what we can to help, or make fixes as needed.

# Contributing

Contributions are always more than welcome, feel free to pick up an issue and/or send a PR. Alternatively, just raise an issue with your idea for improvements.

# License

`meetingtime` is provided under the [MIT License](https://github.com/theothertomelliott/meetingtime/blob/master/LICENSE).

[[Full Source on GitHub]](https://github.com/theothertomelliott/meetingtime)
