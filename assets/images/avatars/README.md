# Character avatars

Place character portraits in this directory, then add an `avatar` field to the
matching character in `assets/js/data.js`.

Example:

```js
{
  id: "mikado",
  name: "龙之峰帝人",
  avatar: "./assets/images/avatars/mikado.webp",
  // ...
}
```

Recommended source size: square, at least 256 x 256 pixels. The graph crops the
image into a rounded-square DOLLARS-style frame; the profile panel displays it
in a portrait frame.
