# BHS · Kağıt, Baskı, Ambalaj

The BHS showroom website, built with Next.js. Turkish lives at the root, English under `/en`.

| Page | Turkish | English |
| --- | --- | --- |
| Home | `/` | `/en` |
| About Us | `/hakkimizda` | `/en/about` |
| Production | `/uretim` | `/en/production` |
| Products | `/urunler` | `/en/products` |
| References | `/referanslar` | `/en/references` |
| Contact | `/iletisim` | `/en/contact` |

## Run it on your computer

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install      # once
npm run dev      # then open http://localhost:3000
```

### Try it on your phone

Phones show things a desktop browser can't fake (the notch, tap feel, scrolling), so check there before launch.

```bash
npm run dev:phone
```

Find your computer's address on the Wi-Fi (macOS: System Settings → Wi-Fi → Details → IP address), then on a phone **on the same Wi-Fi** open `http://THAT-ADDRESS:3000`.

Next.js only lets other devices load its development scripts from allowed addresses. Home and office networks (`192.168.x.x`, `10.x.x.x`, `172.x.x.x`) are already allowed in `next.config.ts`. If your address looks different, add it when starting:

```bash
DEV_ORIGINS="100.64.*.*" npm run dev:phone
```

If the page loads on the phone but the intro logo doesn't dock and nothing animates, this is the reason: restart the dev server after changing it.

## Changing the words

All copy is in two files, one per language:

- `src/content/tr.ts`: Türkçe
- `src/content/en.ts`: English

Anything in `[square brackets]` is a placeholder (email, phone, address, figures, machines). Change the text in both files and the page updates.

Other things you'll want to edit:

- **Reference logos:** `REFERENCES` in `src/content/index.ts`, files in `public/refs/`. Each logo has its own size (`strip` for the homepage band, `tile` for the References page) so heavy and light logos look balanced.
- **Email, phone, Instagram and WhatsApp:** `CONTACT` and `WHATSAPP_URL` in `src/content/index.ts` (used by the footer, the Contact page and every WhatsApp button).
- **Hero film:** `public/media/hero-film.mp4` and its still frame `hero-poster.jpg`. Keep it dark, silent, 15–25 s, and a few MB.

## Contact form

`src/app/api/contact/route.ts` checks every message and the KVKK consent, then (for now) only logs it on the server. Once the company mailbox exists, connect an email service such as Resend or Postmark there.

## Put it online

The simplest option is [Vercel](https://vercel.com): import this GitHub repository, keep the defaults, and add your domain. Set `NEXT_PUBLIC_SITE_URL` to the live address (for example `https://bhs.com.tr`) so search engines get the right language links.

## How it's built

- **Motion** follows Emil Kowalski's design-engineering rules: only `transform` and `opacity` animate, nothing re-renders React on scroll or pointer move, hover effects only apply on devices that can hover, and everything respects *reduce motion*.
- **Paper texture** is one pre-rendered, seamless tile (`public/media/paper-tile.jpg`), not a live filter.
- **The BHS signature** is a vector traced from the original artwork (`public/bhs-logo.svg`, also inlined in `src/components/Logo.tsx`).
