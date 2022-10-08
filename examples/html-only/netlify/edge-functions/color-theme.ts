import type { Context } from 'https://edge.netlify.com/';
import {
  HTMLRewriter,
  Element,
} from 'https://ghuc.cc/worker-tools/html-rewriter/index.ts';

export default async (request: Request, context: Context) => {
  const res = await context.next();
  console.log(res.headers);
  if (res.headers.get('content-type') !== 'text/html') {
    return;
  }

  const url = new URL(request.url);

  console.log(url.search);
  if (url.searchParams.has('theme')) {
    const availableThemes = ['default', 'light', 'dark', 'pink'];
    const requestedTheme = url.searchParams.get('theme') ?? 'default';

    console.log({ requestedTheme });
    if (availableThemes.includes(requestedTheme)) {
      context.cookies.set({
        name: 'lwj-color-theme',
        value: requestedTheme,
        path: '/',
        secure: true,
        httpOnly: true,
        sameSite: 'Strict',
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      });
    }

    return new Response('Redirecting...', {
      status: 301,
      headers: {
        Location: url.pathname,
        'Cache-Control': 'no-cache',
      },
    });
  }

  let theme = context.cookies.get('lwj-color-theme') ?? 'default';
  console.log({ theme });

  return new HTMLRewriter()
    .on('html', {
      element(element: Element) {
        element.setAttribute('data-theme', theme);
      },
    })
    .on(`option[value='${theme}']`, {
      element(element: Element) {
        element.setAttribute('selected', 'selected');
      },
    })
    .transform(res);
};
