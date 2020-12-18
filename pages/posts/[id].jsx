
import Layout from '../../components/layout'
import Head from 'next/head'
import Link from 'next/link'
import { postIds, postData } from '../../lib/posts'
import Date from '../../components/date'
import { DayImages } from '../../components/day'

import dynamic from 'next/dynamic'

const DynamicMap = dynamic(
  () => import('../../components/map').then((mod) => mod.PostMap),
  { ssr: false }
)

function DayLinks({ data }) {
  if (!data.day) {
    return null
  }
  return (
    <>
      <Link href={`/posts/day-${data.day.past}`}><a className="text-blue-500">&laquo;</a></Link>
      &nbsp;
      <Date dateString={data.date} />
      &nbsp;
      <Link href={`/posts/day-${data.day.next}`}><a className="text-blue-500">&raquo;</a></Link>
    </>
  )
}

function DayMap({ data, images }) {
  // return (<div className="text-4xl text-center">MAP STUBBED</div>)
  if (!data.day) {
    return null
  }
  return (
    <div className="shadow-xl border border-gray-500" >
      <DynamicMap images={images} />
    </div>
  )
}

export default function Post({ id, data, text, images }) {
  return (
    <Layout>
      <Head>
        <title>{data.title}</title>
      </Head>
      <article className="space-y-8 p-2">
        <div className="md:grid md:grid-cols-2 text-gray-400 font-black">
          <div className="md:text-xl text-center">
            {data.title}
          </div>
          <div className="md:space-x-4 md:text-lg text-center"><DayLinks data={data} /></div>
        </div>
        <DayMap data={data} images={images} />
        <div className="text-gray-600 space-y-4" dangerouslySetInnerHTML={{ __html: text }} />
        <div className="content-center">
          <DayImages id={id} images={images} className="border border-red-800" />
        </div>
      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  const posts = await postIds()
  return {
    fallback: false,
    paths: posts.map(fileName => {
      return {
        params: {
          id: fileName.replace(/\.md$/, '')
        }
      }
    }),
  }
}

export async function getStaticProps({ params }) {
  const data = await postData(params.id)
  return {
    props: {
      ...data
    }
  }
}
