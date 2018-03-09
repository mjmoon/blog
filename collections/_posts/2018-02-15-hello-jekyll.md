---
layout: post
title: "Hello Jekyll!"
author: "Michael J. Moon"
categories: post
tags: [blogging, jekyll, github, wordpress]
date: 2018-02-15 00:00:00 -0500
---

I had previously my blog hosted using **Wordpress** on a shared hosting server. The hosted Wordpress worked out nicely for me especially with its [multisite](http://www.wpbeginner.com/glossary/multisite/) feature. I was able to host multiple sites including a single page responsive site for my wedding. There is a plenty of free themes and plugins available to configure and customize a Wordpress site with ease. However, I switched the hosting mechanism to **Jekyll** on **GitHub Pages** after finding about it recently. Below are 4 reasons why I switched to Jekyll.

---

1. Price
--------

While I did not pay for Wordpress or any of the plugins/themes I used, I had to pay for my domain and hosting services. I used the lower-tier plan from [SiteGround](https://www.siteground.com/) and paid approximately USD 160 per year. The plan included a free domain which I used for all my sites using subdomains.

**GitHub Pages** lets you to host static sites for free on **GitHub** and **Jekyll** is a free open source software that turns static files to a website. If you are comfortable using GitHub Pages's default domain `<username>.github.io/` or `<username>.github.io/<projectname>`, you can host a site with zero cost.

{:start="2"}
2. Git and markdown
-------------------

As mentioned, GitHub Pages sites are hosted on GitHub. This means you can track any changes made to the site using **git**. You can track new and modified pages as well as site configuration and aesthetic changes. The integration also means that I can write and push new articles directly from a text editor such as **Atom**.

Also, Jekyll will automatically create `.html` files from markdown(`.md`) files. Writing and editing in markdown is much easier with its simple syntax. I had been already using git and markdown and this was a definite selling point for me.

##### HTML vs. markdown
```html
<!-- HTML -->
<h2>Why I switched to Jekyll</h2>
<h3>1. Markdown</h3>
<p>
  Writing in <i>HTML</i> is very <b>cumbersome</b>.
</p>
```
```markdown
<!-- markdown -->
## Why I switched to Jekyll
### 1. Markdown
Writing in _markdown_ is very **simple**.
```

{:start="3"}
3. Liquid template language
---------------------------

Jekyll uses [Liquid](https://shopify.github.io/liquid/basics/introduction/) template language to process templates. The template language has a simple syntax and I found it to be easier to use than editing `php` files for Wordpress themes and parts.

As an example, in Wordpress, I wrote the About page in raw `html` of ~300 lines and editing the page every now and then was always tedious. I could have probably streamlined the work by creating a customer page template in Wordpress; however, the need just never seemed to justify the effort.

 On the other hand, Liquid made templating much simpler and I was able to create the template for the [About]({{ site.baseurl }}/menu/about) page from scratch within a few hours of reading and typing. The template made it simple to add and edit items using `yaml front matter`.

##### HTML vs. Liquid
```html
<!-- HTML -->
<div class="cv-container sub-container">
  <h2 class="entry-header cv-entry-header">University of Toronto, Toronto, Ontario, Canada</h2>
  <div class="entry-content">
    <h4>MSc in Biostatistics</h4>
    <p><small>November 2016</small></p>
    <h5>Major Courses</h5>
    <ul>
      <li>Statistical analysis of health economic data</li>
      <li>Time series analysis</li>
      <li>Modern statistics and data mining</li>
      <li>Survival analysis</li>
      <li>Mathematical statistics</li>
      <li>Categorical data analysis</li>
    </ul>
  </div>
</div>
```
```html
# Liquid template
{% raw %}
{% for education in site.educations reversed %}
<div class="row">
  <div class="col-sm-5">
    <h3 class="grey">{{ education.school }}</h3>
    <h6 class="grey">{{ education.location }}</h6>
  </div>
  <div class="col mb-3">
    <h5>{{ education.degree }}</h5>
    <h6>
      {{ education.conferreddate | date: "%B %Y"}} {% if education.misc %} | {{ education.misc }} {% endif %}
    </h6>
    <h6>
      <div class="grey">Major Courses</div>
      <ul>
        {% for course in education.courses %}
        <li>{{ course.name }}</li>
        {% endfor %}
      </ul>
    </h6>
  </div>
</div>
{% endfor %}
{% endraw %}
```
```markdown
# yaml front matter for Liquid
---
school:   'University of Toronto'
location: 'Toronto, Ontario, Canada'
degree:   'MSc in Biostatistics'
conferreddate: 'November 2016'
courses:
  - name: 'Statistical analysis of health economic data'
  - name: 'Time series analysis'
  - name: 'Modern statistics and data mining'
  - name: 'Survival analysis'
  - name: 'Mathematical statistics'
  - name: 'Categorical data analysis'
---
```

{:start="4"}
4. Interactive plots
------

The final and tipping point for the switch was the ability to render interactive plots. Lately, I started learning about interactive data visualizations using Python's `bokeh` library. I am planning to write blog posts with the visualizations.

However, embedding theses javascript-based plots on Wordpress turned out to be much more of a hassle than expected. Wordpress has filters that which capture specific parts of post/page contents and create the final output in html from the online editor. This prevented from embedding bokeh plots directly using html in the editor.

I ended up using a plugin that enabled embedding raw html snippets; however, the online workflow was less than ideal and when the raw html was finally embedded, the rendered plot was not contained in the post container `div`.

This is when I started looking into alternatives and found about Jekyll on GitHub Pages. [This post by Brian Caffey](https://briancaffey.github.io/2017/01/23/bokeh-plots-on-jekyll.html) showed that it was possible to embed bokeh plots using `{% raw %}{%include ...%}{% endraw %}` tag. Having realized other pros of using Jekyll listed above, I tested by setting up this blog and manually migrating posts with bokeh plots. The whole process was took more less time and pain. It took me about two half days of effort including some reading and and the outcome was much more satisfying.

Is Jekyll better than Wordpress?
---

Googling "Jekyll vs Wordpress" gives a plenty of hits on posts on why someone chose Jekyll over Wordpress.

![Jekyll vs Wordpress]({{ '/images/2018-02-15-screenshot.png' | absolute_url }}){:width='400px'}

This makes it seem like Jekyll is a clear winner. However, _wedontlikespaces_'s answer on this [Reddit page](https://www.reddit.com/r/web_design/comments/646ii4/jekyll_or_wordpress/) was the most satisfying answer I read.

> [Jekyll] is great at what it does, but it's no replacement for WordPress. They solve different problems...But for personal projects or projects where your happy to manage everything yourself then you're fine.

Jekyll seems to be a great tool for a personal [static] blog. Also, its flexibility gives me a plenty of opportunity to learn new things without being overwhelming.

### __I think my tiny personal blog will stick to Jekyll for now.__
