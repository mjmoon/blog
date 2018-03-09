---
layout: page
title: Contact
author: 'Michael J. Moon'
---
<div class="row">
    <div class="4u 12u$(small)">
        If you have any feedbacks, please feel free to contact me using the contact form. You can also find me on social networks.
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
    <div class="7u 12u$(medium)">
        {% include contact-form.html %}
    </div>
</div>
