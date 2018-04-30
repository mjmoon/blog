---
layout: post
title: "A bokeh server app for up-to-date stock prices"
author: "Michael J. Moon"
categories: post
tags: [bokeh, bokeh-server, python, data-visualization, heroku, docker]
date: 2018-04-30 00:00:00 -0500
---

The python `bokeh` library lets you build data visualization applications on the web and run them on a server. Below is plot that uses [`bokeh.server`](https://bokeh.pydata.org/en/latest/docs/user_guide/server.html) along with other python libraries to display up-to-date (mostly U.S.) stock market closing prices.

{% include plots/2018-04-30-plot-01.html %}

<div class="row">
<div class="4u 12u$(small)">
<h4>Data sources</h4>
<p>I used <a href="https://pandas-datareader.readthedocs.io/en/latest/" target="_blank"><code class="highlighter-rouge">pandas-datareader</code></a> and <a href="https://github.com/RomelTorres/alpha_vantage" target="_blank"><code class="highlighter-rouge">alpha_vantage</code></a> python libraries to access free data providers. The former library lets you access stock market data from <i>Morningstar</i> among other providers. <i>Alpha Vantage</i> provides similar data with minimal time delay (1 minute).</p>
</div>
<div class="4u 12u$(small)">
<h4>Application</h4>
<p>Using <code class="highlighter-rouge">bokeh.server</code>, I was able to plot, add widgets - a button group for period selection and an auto-complete text input box for ticker selection.</p>
<p>You can find the source code for the plot here <a href="https://github.com/mjmoon/plot-stocks-bokeh" class="icon fa-github"></a>.</p>
</div>
<div class="4u 12u$(small)">
<h4>Deployment</h4>
<p>I used <a href="https://www.heroku.com" target="_blank"><code class="highlighter-rouge">heroku</code></a>'s free tier service to host the app online. It's easy to use if you are used to using `git`. The free-tier comes with usage limits, most of which are sufficient for my purpose. The only noticeable limit is the fact that the machine goes to sleep after 30 minutes of inactivity. Hence, you likely waited a while until the plot showed up.</p>
<p>I also used <a href="https://www.docker.com/" target="_blank"><code class="highlighter-rouge">docker</code></a> to make the app portable to other platforms if necessary (and to get myself familiarized with <code class="highlighter-rouge">docker</code>).</p>
</div>
</div>

---

#### Notes
+   **--allow-websocket-origin**

    > By default, cross site connections to the Bokeh server websocket are not allowed. You can enable websocket connections originating from additional hosts by specifying them with the --allow-websocket-origin option.  

    Not really understanding how servers work, I fumbled with this for quite a bit. I added `--allow-websocket-origin=blog.micbon.com` as well as `--allow-websocket-origin=mm-plot-stocks.herokuapp.com` to allow access from this page and the `heroku` page. I embedded the plots using both `<script>` and `<iframe>` tags to see the difference.

+   **not so responsive**

    I found it difficult to make the application responsive (resize along with the display size). It may be possible if I fumbled a little longer but since the plot itself wouldn't be able to show much when it's too small I decided to leave it at a fixed size.

+   **another plotting library**

    I also created the same plot using `plotly`'s `dash` module. You can see the app <a href="https://mm-plot-stock-dash.herokuapp.com/" target="_blank">here</a> and the source codes here <a href="https://github.com/mjmoon/plot-stocks" class="icon fa-github" target="_blank"></a>. It was actually easier to use in my opinion. The only trouble I have is making it work with `Docker`. I still have not figured out how... :(
