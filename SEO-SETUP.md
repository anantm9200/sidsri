# SEO, social sharing and AI-discovery setup

Canonical site: https://www.siddharthsrinivasan.com/

## Implemented
- Website description, title and canonical URL matching Siddharth's cinematography work.
- Open Graph and Twitter/X previews using the **first homepage portfolio image**, not stock photography.
- Person, WebPage and WebSite Schema.org JSON-LD with only linked profiles actually shown on the site.
- Sitemap, robots.txt, and experimental llms.txt.
- Text alternative for browsers with JavaScript disabled.
- Semantic single H1; gallery pagination/arrows removed, automatic slideshow retained.

## After deployment
1. Confirm the canonical domain is `https://www.siddharthsrinivasan.com`. If the live production domain differs, update URLs in `index.html`, `public/sitemap.xml`, `public/robots.txt`, and `public/llms.txt`.
2. Confirm `/sitemap.xml`, `/robots.txt`, `/llms.txt`, and `/favicon.svg` return 200.
3. Check `og:image` serves a public JPEG to WhatsApp/Meta crawlers. Social preview caches may need re-scraping using the Meta Sharing Debugger; WhatsApp thumbnails can take time to update.
4. Verify the site with Google Search Console and Bing Webmaster Tools; submit `/sitemap.xml`. These files do not guarantee indexing or AI citations.
5. When Siddharth supplies revised 'About Me' copy, replace the text in `src/App.jsx` and keep the metadata and llms.txt in sync.

## Known limitation
This is a Vite/React single-page app. The narratives and commercials are client-side views rather than independent, crawlable URLs. Rich search results and AI discovery for each project require additional static pages or prerendering in a future iteration. No new URLs are included in the sitemap until they exist.
