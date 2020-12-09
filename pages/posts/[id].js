
import Layout from '../../components/layout'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

import dynamic from 'next/dynamic'

const DynamicMap = dynamic(
  () => import('../../components/map').then((mod) => mod.PostMap),
  { ssr: false }
)

function DayMap({ data, images }) {
  if (!data.day) {
    return null
  }
  return (
    <div>
      <div className={utilStyles.lightText} style={{textAlign: 'center'}}>
        <Link href={`./day-${data.day.past}`}>&laquo;</Link>
        &nbsp;
        <Date dateString={data.date} />
        &nbsp;
        <Link href={`./day-${data.day.next}`}>&raquo;</Link>
      </div>
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
      <article>
        <h1 className={utilStyles.headingXl}>
          {data.title}
        </h1>
        <DayMap data={data} images={images} />
        <div dangerouslySetInnerHTML={{ __html: text }} />
        <Carousel
          key={id}
          additionalTransfrom={0}
          autoPlaySpeed={3000}
          centerMode={false}
          className=""
          containerClass="container"
          dotListClass=""
          draggable
          focusOnSelect={false}
          infinite
          itemClass=""
          keyBoardControl
          minimumTouchDrag={80}
          renderButtonGroupOutside={false}
          renderDotsOutside={true}
          responsive={{
            desktop: {
              breakpoint: {
                max: 3000,
                min: 1024
              },
              items: 1
            },
            mobile: {
              breakpoint: {
                max: 464,
                min: 0
              },
              items: 1
            },
            tablet: {
              breakpoint: {
                max: 1024,
                min: 464
              },
              items: 1
            }
          }}
          showDots
          sliderClass=""
          slidesToSlide={1}
          swipeable
        >
        {images.map((image) => (
          <Image key={image.src} src={image.src} width={image.width} height={image.height} />
        ))}
        </Carousel>
      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  const fs = require('fs/promises')
  const paths = await getAllPostIds(fs)
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const fs = require('fs/promises')
  const data = await getPostData(fs, params.id)
  return {
    props: {
      ...data
    }
  }
}
