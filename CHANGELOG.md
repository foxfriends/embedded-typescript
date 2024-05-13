# Changelog

## 0.3.0

Whitespace is no longer treated specially in any way by `embedded-template`. All whitespace control must be opted into using the "glue" operator `<>`, which deletes exactly 1 following new-line character.

This requires much more care when writing your templates, but makes it overall much more reasonable to predict exactly how the resulting strings will look.

## 0.1.0

This is a rewrite of `embedded-typescript` and a major breaking change.

`embedded-typescript` now generates a single function per `.ets` template. This significantly cuts down on the syntax noise and improves ergonomics for the common use case.

Previously:

// users.ets

```
interface User {
  name: string;
}

export function render(users: User[]): string {
  return <%>
    <% users.forEach(function(user) { %>
Name: <%= user.name %>
    <% }) %>
  <%>
}
```

Now:

// users.ets

```
---
interface Props {
  users: { name: string }[];
}
---
<% props.users.forEach(function(user) { %>
Name: <%= user.name %>
<% }) %>
```
