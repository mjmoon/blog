---
layout: resume
title: About
author: 'Michael J. Moon'
---
<div class="row">
    <div class="4u 12u$(small)">
        
    </div>
    <div class="6u$ 12u$(small)">
        <ul class="icons square">
            {% for social in site.data.settings.social %}
            {% unless social.label == 'Feed' %}
            <li><a href="{{ social.link }}" target="_blank" class="icon fa-{{ social.icon }}"><span class="label">{{ social.label }}</span></a></li>
            {% endunless %}
            {% endfor %}
        </ul>
    </div>
</div>
