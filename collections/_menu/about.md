---
layout: resume
title: About
author: 'Michael J. Moon'
---
<div class="row">
    <div class="9u$ 12u$(small)">
        <span class="image left">
            <img src="{{ '/assets/img/ms-icon-310x310.png' | absolute_url }}" alt="micbon" />
        </span>
        <p>
            I am a PhD student in Statistical Sciences
            at the University of Toronto.
            You will find my curriculum vitae <a href="#skills">below</a>.
        </p>
        <p>
            <ul class="icons">
                {% for social in site.data.settings.social %}
                {% unless social.label == 'Feed' %}
                <li><a href="{{ social.link }}" target="_blank" class="icon fa-{{ social.icon }}"><span class="label">{{ social.label }}</span></a></li>
                {% endunless %}
                {% endfor %}
            </ul>
        </p>
    </div>
</div>
<div id="page-nav">
  <h5>Contents</h5>
  <ul>
    <li><a href="#skills">Skills</a></li>
    <li><a href="#education">Education</a></li>
    <li><a href="#publications">Publications</a></li>
    <li><a href="#presentations">Presentations</a></li>
    <li><a href="#teaching">Teaching</a></li>
    <li><a href="#awards">Awards</a></li>
    <li><a href="#projects">Projects</a></li>
    <li><a href="#employment">Employments</a></li>
  </ul>
</div>
