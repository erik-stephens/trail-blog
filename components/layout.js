
import Head from 'next/head'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import Image from 'next/image'

export const siteTitle = "Jabroney Log of Arizona Trail (AZT)"

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A==" crossOrigin="" />
        <meta name="description" content="{siteTitle}" />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
        <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js" integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA==" crossOrigin=""></script>
      </Head>
      <header className={styles.header}>
        <>
          <Link href="/">
            <a><Image src="/images/profile.png" width={100} height={100} /></a>
          </Link>
          <h2 className={utilStyles.headingLg}>{siteTitle}</h2>
        </>
      </header>
      <main>
        {children}
      </main>
    </div>
  )
}
