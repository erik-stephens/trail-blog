
import Image from 'next/image'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

export default function DayMenu({ posts }) {
  return (
    <select onChange={(i) => window.location = i.target.value}>
      <option>Jump to Day...</option>
      {posts.filter(({ id, data }) => data.title.match(/DAY/)).map(({ id, data }) => (
        <option key={id} value={`/posts/${id}`}>{data.title}</option>
      ))}
    </select>
  )
}

export function DayImages({ id, images }) {
  // return null
  return (
    <Carousel className="content-center"
              key={id}
              additionalTransfrom={0}
              autoPlaySpeed={3000}
              centerMode={false}
              containerClass="container"
              dotListClass=""
              draggable
              focusOnSelect={false}
              infinite
              itemClass=""
              keyBoardControl
              minimumTouchDrag={80}
              renderButtonGroupOutside={false}
              renderDotsOutside={false}
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
              showDots={true}
              sliderClass=""
              slidesToSlide={1}
              swipeable
    >
      {images.map((image) => (
        <Image key={image.src} src={image.src} width={image.width} height={image.height} className="" />
      ))}
    </Carousel>
  )
}
