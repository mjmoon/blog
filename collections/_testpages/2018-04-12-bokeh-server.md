---
layout: post
title: "Plotting up-to-date stock data with a bokeh server app"
author: "Michael J. Moon"
categories: post
tags: [bokeh, python, data-visualization, heroku, docker]
date: 2018-04-12 00:00:00 -0500
---

<a href="https://github.com/mjmoon/plot-stocks-bokeh" class="icon fa-github"> Github repository.</a>

{% include plots/2018-04-12-plot-01.html %}

Using the `bokeh` library's ,

+   Data sources: [`datareader`](https://pypi.python.org/pypi/pandas-datareader) and [`alpha_vantage`](https://github.com/RomelTorres/alpha_vantage)
+   App: [`bokeh.server`](https://bokeh.pydata.org/en/latest/docs/user_guide/server.html)
+   Hosting: [`heroku`](https://www.heroku.com/)
+   Portability: [`docker`](https://www.docker.com/)
