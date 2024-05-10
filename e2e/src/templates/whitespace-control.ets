---
---
This is some text.
<% if (true) { %>
This text will be on the next line.
<% } %>
This is on yet another next line.

This is some text.
<%- if (true) { %>
 This text will be on the same line as that.
<%- } %>
 This is still on the same line.

This is some text.

<%- if (true) { %>
This text will be on the next line.

<%- } %>
This is on yet another next line.

This is some text.

<%_ if (true) { %>
 This text will be on the same line as that.

<%_ } %>
 This is still on the same line.
