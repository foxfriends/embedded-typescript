---
const HTML_STRING = "<div>Hello World</div>";
---
<div>
  This is the HTML source:
  <pre><%= HTML_STRING %></pre>
</div>

<div>
  This is the rendered HTML:
  <%~ HTML_STRING %>
</div>
