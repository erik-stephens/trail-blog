
import Head from 'next/head'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import Image from 'next/image'

export const siteTitle = "Jabroney's Trail (AZT) Log"

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="{siteTitle}" />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        <>
          <Link href="/">
            <a>
              <Image
                src="/images/profile.png"
                className={`${styles.headerImage} ${utilStyles.borderCircle}`}
                unsized={true}
                alt="jabroney"
              />
            </a>
          </Link>
          <h2 className={utilStyles.headingLg}>
            <Link href="/">
              <a className={utilStyles.colorInherit}>{siteTitle}</a>
            </Link>
          </h2>
        </>
      </header>
      <main>
        {children}
      </main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  )
}
