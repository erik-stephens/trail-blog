
import Head from 'next/head'
import Link from 'next/link'
import Date from '../components/date'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
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
      <p>
      The map below charts my southbound (SOBO) progress thru-hiking the Arizona Trail (AZT).  I started August 24 and finished October 9 in 2020.  Clicking a marker will show the main image for that day and a link to a more detailed post for that day.  In addition to those daily logs, here are some posts about my trip in general:
      </p>
      <ul>
        <li><Link href="/posts/thoughts">General Thoughts</Link></li>
        <li><Link href="/posts/gear">Gear</Link></li>
        <li><Link href="/posts/resupply">Food, Water, Resupply</Link></li>
      </ul>
      {/* <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`} style={{float: 'right'}}>
      <h2 className={utilStyles.headingLg}>Blog</h2>
      <ul className={utilStyles.list}>
      {posts.map(({ id, data }) => (
        <li className={utilStyles.listItem} key={id}>
          <Link href={`/posts/${id}`}>
            <a>{data.title}</a>
          </Link>
          <br />
          <small className={utilStyles.lightText}>
            <Date dateString={data.date} />
          </small>
        </li>
      ))}
      </ul>
      </section> */}
      <section className={utilStyles.headingMd}>
        <DynamicMap images={images} />
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const fs = require('fs/promises')
  const allPostsData = await getSortedPostsData(fs)
  return {
    props: {
      ...allPostsData
    }
  }
}
