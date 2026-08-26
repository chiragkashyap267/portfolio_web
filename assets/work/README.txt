WORK SAMPLE SCREENSHOTS
=======================

Default filenames expected by js/data.js:

  wp-1.jpg  wp-2.jpg  wp-3.jpg        (WordPress)
  shopify-1.jpg  shopify-2.jpg        (Shopify)
  next-1.jpg  next-2.jpg              (Next.js)
  react-1.jpg  react-2.jpg            (React)

Rename them to whatever you like — just keep js/data.js pointing at
the same path.

Format: 16:10 landscape, ~1600 x 1000px, JPG/WebP under ~300KB.
Tip: a clean full-page screenshot of the homepage works best. Crop out
browser chrome. Compress at squoosh.app.

If a file is missing, the card shows a soft blue placeholder with the
category name, so the gallery never looks broken.

TO ADD / REMOVE / RENAME A SAMPLE
---------------------------------
Edit js/data.js only. Each entry:

  {
    title: 'Client Name — Storefront',
    category: 'shopify',          // wordpress | shopify | nextjs | react
    desc: 'One line about what you built.',
    tags: ['Liquid', 'Razorpay'],
    img: 'assets/work/shopify-1.jpg',
    url: 'https://example.com'    // leave '' to hide the Visit button
  }

The filter chips and their counts rebuild themselves automatically.
