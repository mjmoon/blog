---
layout: resume
title: About
author: 'Michael J. Moon'
---
<div class="row">
    <div class="3u 12u$(small)">
        <ul class="icons square">
            {% for social in site.data.settings.social %}
            {% unless social.label == 'Feed' %}
            <li><a href="{{ social.link }}" target="_blank" class="icon fa-{{ social.icon }}"><span class="label">{{ social.label }}</span></a></li>
            {% endunless %}
            {% endfor %}
        </ul>
    </div>
    <div class="8u 12u$(small)">
      <p>
        <div class="row">
          <div class="8u 12u$(xsmall)">
            If you are here to see my educational and professional background, please find my curriculum vitae <a href="#skills">below</a>.
          </div>
          <div class="4u$ 12u$(xsmall)">
            <a href="#skills">
              <button class="icon special fa-chevron-down" title="Go to CV">CV</button>
            </a>
          </div>
        </div>
      </p>
      <p>
        I am a data enthusiasts and a web development hobbyist. I am now working with my friends to start a blog using data visualizations. I have become familiar and interested in web development using <code>jekyll</code>, and some <code>css</code> + <code>javascript</code> <sup>and <code>travis-ci</code></sup>while setting up this blog.
      </p>
      <p>
        I will be starting my pursuit of PhD in statistics at the University of Toronto this Fall. <sup>yay, me!</sup> In general, I like <del>breaking things</del> understanding how things work, making new things using those <del>broken pieces</del> understanding, and making things look beautiful<sup>subject to my own not-so-sophisticated taste</sup> - related to data.
      </p>
    </div>
</div>
<div class="floating-bar">
  <ul class="alt">
  </ul>
</div>
