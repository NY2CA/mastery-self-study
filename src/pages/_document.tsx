import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Playfair+Display:wght@400;500;600&display=swap"
        />
        <meta name="theme-color" content="#0f1e3d" />
        {/* Calendly widget · loads the popup script + styles globally so the
            "Inquire about Mastery Live" CTAs across the landing page,
            dashboard, and UpgradeCard can fire window.Calendly.initPopupWidget
            on click. The URL itself is configurable via NEXT_PUBLIC_CALENDLY_URL. */}
        <link rel="stylesheet" href="https://assets.calendly.com/assets/external/widget.css" />
      </Head>
      <body>
        <Main />
        <NextScript />
        <script src="https://assets.calendly.com/assets/external/widget.js" async></script>
      </body>
    </Html>
  );
}
