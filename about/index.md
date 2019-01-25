---
layout: page
title: About
tags: [about]
date: 2019-01-26
comments: false
slides: true
---

<div class="row">
    I am a PhD student in Statistical Sciences <br />
    at the University of Toronto. <br />
</div>

<div class="resume dl-menuwrapper" role="navigation">
  <ul class>
    <li><a href="#research">Research</a></li>
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


<!-- research -->
{% include resume/research.html %}

---

<!-- skills -->
{% if site.skills.size > 0  %}
{% include resume/skills.html %}
{% endif %}

---

<!-- education -->
{% if site.educations.size > 0  %}
{% include resume/education.html %}
{% endif %}

---

<!-- publications -->
{% if site.publications.size > 0 %}
{% include resume/publications.html %}
{% endif %}

---

<!-- presentations -->
{% if site.presentations.size > 0 %}
{% include resume/presentations.html %}
{% endif %}

---

<!-- teaching experience -->
{% if site.teachings.size > 0  %}
{% include resume/teachings.html %}
{% endif %}

---

<!-- awards and honours-->
{% if site.awards.size > 0  %}
{% include resume/awards.html %}
{% endif %}

---

<!-- projects -->
{% if site.projects.size > 0 %}
{% include resume/projects.html %}
{% endif %}

---

<!-- working experience -->
{% if site.employments.size > 0  %}
{% include resume/employments.html %}
{% endif %}
