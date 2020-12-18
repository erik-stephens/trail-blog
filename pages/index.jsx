
import Head from 'next/head'
import Link from 'next/link'
import Date from '../components/date'
import Layout, { siteTitle } from '../components/layout'
import DayMenu from '../components/day'
import { indexData } from '../lib/posts'
import dynamic from 'next/dynamic'

const DynamicMap = dynamic(
  () => import('../components/map').then((mod) => mod.IndexMap),
  { ssr: false }
)

export default function Home({ posts, images }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div className="space-y-4">
        <p className="text-lg text-gray-600">
          The map below charts my southbound (SOBO) progress thru-hiking the Arizona Trail (AZT).  I started August 24 and finished October 9 in 2020.  Clicking a marker will show the main image for that day and a link to a more detailed post for that day.  In addition to those daily logs, here are some posts about my trip in general:
        </p>
        <ul className="list-disc text-lg text-blue-500 font-bold ml-8">
          <li><Link href="/posts/thoughts">General Thoughts</Link></li>
          <li><Link href="/posts/gear">Gear</Link></li>
          <li><Link href="/posts/resupply">Food, Water, Resupply</Link></li>
        </ul>
        <div className="shadow-xl border border-gray-500" >
          <DynamicMap images={images} />
        </div>
        <div className="text-center">
          <DayMenu posts={posts}/>
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const { images, posts } = await indexData()
  return {
    props: { images, posts }
  }
}
