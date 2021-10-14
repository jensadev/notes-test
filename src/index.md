---
layout: base.njk
templateEngineOverride: njk, md
---

# This is static from 11ty data on build

Test [this page for loading in it in the browser](/browser), client side.

{% for note in notes %}
    {% include "components/note.njk" %}
{% endfor %}
