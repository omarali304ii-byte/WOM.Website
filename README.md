# Word of Mouth website

Production marketing website for Word of Mouth, an independent brand studio focused on strategy, identity, digital experiences, and motion.

## Stack

- TypeScript
- Next.js App Router-compatible Vinext runtime
- React
- Tailwind CSS
- Cloudflare Workers through Sites

## Local development

```bash
npm install
npm run dev
```

## Production verification

```bash
npm run typecheck
npm run lint
npm test
```

`npm test` creates the production Worker build, server-renders the public routes, checks the SEO surface, and confirms that the retired 3D parrot implementation is not shipped.

Set `NEXT_PUBLIC_SITE_URL` to the final public origin if it differs from `https://wordofmouth.studio` so `robots.txt` and `sitemap.xml` use the correct canonical domain.
