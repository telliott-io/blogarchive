---
layout: post
title: "Three (ish) ways to implement timeouts in Go"
date: "2016-09-29 11:35:54 -0400"
image: /blogarchive/media/logos/gopher.png
---

Timeouts are a common concurrency pattern. You want to wait for a long-running task, but you don't want to wait forever. There are a few ways to implement a timeout in Go, some easier to manage than others. I'm going to outline three of them (although the first one I'd never suggest using, hence "ish"), and in case you want to skip ahead, the third method is the one I prefer.

## Method the first: Quick and Dirty

The first method is the one that I'd imagine most people would try first, because it uses concepts common to many languages, and because it is outlined in a [blog post](https://blog.golang.org/go-concurrency-patterns-timing-out-and) from 2010 that ranks high in Google searches for "golang timeout". Using `time.Sleep`:

{% highlight go %}
ch := make(chan bool, 1)
timeout := make(chan bool, 1)

// Send a message to our timeout channel after 1s
go func() {
  time.Sleep(1 * time.Second)
  timeout <- true
}()

// Wait for a message, or timeout
select {
case <-ch:
  fmt.Println("Read from ch")
case <-timeout:
  fmt.Println("Timed out")
}
{% endhighlight %}

[Go Playground](https://play.golang.org/p/_Q2LGnR24M)

This example will wait until it either receives something from ch or the timeout channel. Since we never send to ch, this will always time out after 1s. Nice and simple. However, it can be very difficult to clean up afterwards. If we don't timeout, and try to close our channels, our code will panic when the timeout is eventually triggered.

{% highlight go %}
ch := make(chan bool, 1)
timeout := make(chan bool, 1)
defer close(ch)
defer close(timeout)

go func() {
  time.Sleep(1 * time.Second)
  timeout <- true
}()

go func() {
  ch <- true
}()

select {
case <-ch:
  fmt.Println("Read from ch")
case <-timeout:
  fmt.Println("Timed out")
}

{% endhighlight %}

[Go Playground](https://play.golang.org/p/MD0idCIB87)

## Method B: One line, no waiting (well, some)

Helpfully, the time package comes to the rescue with [`After`](https://golang.org/pkg/time/#After), a function that creates our timeout channel for us:

{% highlight go %}
ch := make(chan bool, 1)
defer close(ch)

go func() {
  ch <- true
}()

select {
case <-ch:
  fmt.Println("Read from ch")
case <-time.After(1 * time.Second):
  fmt.Println("Timed out")
}

{% endhighlight %}

[Go Playground](https://play.golang.org/p/ux3T5S33YQ)

Since we don't hold on to the channel after our select statement, the garbage collector will clean everything up for us after the timeout elapses. For long-running apps that don't have to deal with timeouts often, this should be fine. But in a lot of cases, we want to make sure we clean everything up then and there.

## Third Method: Cleaning up after yourself with time.Timer

If you took a look at the godoc for `time.After`, you may have already been directed to this option. Under the hood, `time.After` uses the `Timer` struct, which you can explicitly stop as needed:

{% highlight go %}
ch := make(chan bool, 1)
defer close(ch)

go func() {
  ch <- true
}()

timer := time.NewTimer(1 * time.Second)
defer timer.Stop()

select {
case <-ch:
  fmt.Println("Read from ch")
case <-timer.C:
  fmt.Println("Timed out")
}
{% endhighlight %}

[Go Playground](https://play.golang.org/p/70hu-xaSZV)

This requires slightly more code than the previous example, but you can rest easy knowing that when your function returns, all of the channels it was using have been cleaned up.

This can also serve as a good guide for other concurrency patterns. I'm currently working on implementing some cancelable tasks for a project, and the Timer struct provides a nice illustration of how such a task might be used (and use cases make implementation so much easier).
