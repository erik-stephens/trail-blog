
import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'
import exif from 'jpeg-exif'

const POSTS_DIR = path.join(process.cwd(), 'posts')
const IMAGE_DIR = path.join(process.cwd(), 'public/images')

export async function getSortedPostsData() {
  const files = (await fs.readdir(POSTS_DIR)).filter(i => i.match(/\.md$/))
  const images = []
  const allPostsData = await Promise.all(files.map(async (basename) => {
    const id = basename.replace(/\.md$/, '')
    const file = await fs.readFile(path.join(POSTS_DIR, basename), 'utf8')
    const data = Object.assign({}, matter(file).data)
    data.date = data.date.toISOString().slice(0, 10)

    const imgPath = (await fs.readdir(path.join(IMAGE_DIR, id))).filter(i => i.match(/jpg$/))[0]
    const i = exif.parseSync(path.join(IMAGE_DIR, id, imgPath))
    if (!i.GPSInfo) {
      console.warn('NO GEO!', imgPath)
    }
    images.push({
      id,
      src: `/images/${id}/${imgPath}`,
      width: i.SubExif.PixelXDimension,
      height: i.SubExif.PixelYDimension,
      gps: i.GPSInfo ? [degreesToReal(i.GPSInfo.GPSLatitude), -degreesToReal(i.GPSInfo.GPSLongitude)] : [0,0],
    })

    return {
      id,
      data,
    }
  }))

  return {
    images,
    posts: allPostsData.sort((a, b) => a.date < b.date ? -1 : 1),
  }
}

export async function getAllPostIds() {
  return (await fs.readdir(POSTS_DIR)).map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

function degreesToReal(degrees) {
  if (degrees.length === undefined) {
    return degrees
  }
  return degrees[0] + degrees[1] / 60.0 + degrees[2] / 3600.0
}

export async function getPostData(id) {
  const file = await fs.readFile(path.join(POSTS_DIR, `${id}.md`), 'utf8')
  const frontmatter = matter(file)
  const text = (await remark().use(html).process(frontmatter.content)).toString()
  const data = Object.assign({}, frontmatter.data)
  data.date = data.date.toISOString().slice(0, 10)
  let images = []
  const m = id.match(/day-(\d+)/)
  if (m) {
    const day = m[1]
    data.day = {
      num: parseInt(day),
    }
    // TODO: handle first & last day
    // TODO: handle zero days
    data.day.past = (data.day.num - 1).toString().padStart(2, '0')
    data.day.next = (data.day.num + 1).toString().padStart(2, '0')
  }
  const paths = (await fs.readdir(path.join(IMAGE_DIR, id))).filter(i => i.match(/jpg$/))
  images = await Promise.all(paths.map(async (imgPath) => {
    const i = exif.parseSync(path.join(IMAGE_DIR, id, imgPath))
    if (!i.GPSInfo) {
      console.warn('NO GEO!', imgPath)
      // console.warn('WTF?!?', i.SubExif)
    }
    return {
      src: `/images/${id}/${imgPath}`,
      width: i.SubExif.PixelXDimension,
      height: i.SubExif.PixelYDimension,
      gps: i.GPSInfo ? [degreesToReal(i.GPSInfo.GPSLatitude), -degreesToReal(i.GPSInfo.GPSLongitude)] : [0,0],
    }
  }))

  return {
    id,
    text,
    data,
    images,
  }
}
