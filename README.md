# Remix Got Quotes

First solo experimentation with Remix framework, consuming Game of Thrones Quotes API. [The deploy can be found here.](https://remix-got-quotes.vercel.app/)

It has pretty basic styling, with Tailwind and Lucide Icons.

Todo: add the error boundaries.

## Development

From your terminal:

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `remix build`

- `build/server`
- `build/client`
