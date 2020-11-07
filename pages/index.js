
import Head from 'next/head'
import Link from 'next/link'
import Date from '../components/date'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`} style={{float: 'right'}}>
      <h2 className={utilStyles.headingLg}>Blog</h2>
      <ul className={utilStyles.list}>
      {allPostsData.map(({ id, data }) => (
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
      </section>
      <section className={utilStyles.headingMd}>
        <p>...</p>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}
