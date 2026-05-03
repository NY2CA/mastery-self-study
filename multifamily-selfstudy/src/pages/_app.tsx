import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { AuthProvider } from '@/hooks/useAuth';
import Navigation from '@/components/Navigation';
import '@/styles/globals.css';
import '@/styles/landing.css';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  // The landing page ("/") ships its own marketing navigation (logo, curriculum,
  // results, mentor, FAQ, Book Strategy Call). The member Navigation is meant
  // for authenticated / app routes, so we suppress it on the marketing home.
  const isLanding = router.pathname === '/';

  return (
    <AuthProvider>
      <Head>
        <title>Mastery Self-Study · Rescia Properties</title>
        <meta
          name="description"
          content="The operator's execution toolkit. 8 modules covering submarket through property management. $1,997 for one year of access. The self-paced track — for buyers who want the curriculum without the coaching."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {!isLanding && <Navigation />}
      <Component {...pageProps} />
    </AuthProvider>
  );
}
