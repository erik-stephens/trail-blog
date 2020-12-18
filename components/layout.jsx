
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

export const siteTitle = "Jabroney Log of Arizona Trail (AZT)"

export default function Layout({ children, home }) {
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A==" crossOrigin="" />
        <meta name="description" content="{siteTitle}" />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
        <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js" integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA==" crossOrigin=""></script>
      </Head>
      <header className="bg-sunset bg-cover bg-no-repeat space-y-8 p-8">
        <div className="flex place-content-center space-x-16">
          <a href="/"><img src="/images/profile.png" width="150" height="150" className="mx-auto" /></a>
          <div className="md:text-4xl font-serif tracking-widest text-blue-200 text-center place-self-center">
            Jabroney Log <br /> of the <br /> Arizona Trail <br /> (AZT)
          </div>
        </div>
      </header>
      <main className="max-w-screen-xl m-8">
        {children}
      </main>
    </div>
  )
}
