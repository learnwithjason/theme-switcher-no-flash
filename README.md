# CSS color theme switcher with no flash of the wrong theme

Building a CSS-powered theme switcher that allows the user to choose their own theme _and_ doesn’t have a flash when the user chooses a non-default theme has previously required either server rendering or some kind of delayed display with client-side JavaScript.

The approach here doesn’t require any client-side JavaScript or any server-side rendering. Instead, it used [Netlify Edge Functions](https://docs.netlify.com/edge-functions/overview/) to transform the HTML on the fly, delivering the right theme immediately.

## TODO

This is a work in progress. Future goals:

- [ ] Build examples with popular frameworks
- [ ] Write a quick tutorial explaining the code
