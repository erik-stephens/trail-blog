
import Layout from '../../components/layout'
import Head from 'next/head'
import Image from 'next/image'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

export default function Post({ id, data, text, images }) {
  return (
    <Layout>
      <Head>
        <title>{data.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{data.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={data.date} />
        </div>
        <Carousel
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
        {images.map((src) => (
          <Image src={src} unsized={true} />
        ))}
        </Carousel>
        <div dangerouslySetInnerHTML={{ __html: text }} />
      </article>
    </Layout>
  )
}
  // <Image src="/images/day-01/105509c71e0ffd82d4392e4494485c81.jpg" unsized="true" />
  // <Image src="/images/day-01/150edc18200283d9dc47d9b99b4d1328.jpg" unsized="true" />
  // <Image src="/images/day-01/87eee6d650575b7e66c9b379281cab9f.jpg" unsized="true" />
  // <Image src="/images/day-01/92d52f642d53a567bdc379f184707a85.jpg" unsized="true" />

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const data = await getPostData(params.id)
  return {
    props: {
      ...data
    }
  }
}
