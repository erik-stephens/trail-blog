
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'

const POSTS_DIR = path.join(process.cwd(), 'posts')
const IMAGE_DIR = path.join(process.cwd(), 'public/images')

export async function indexData() {
  const fs = require('fs').promises
  const exif = require('jpeg-exif')
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

export async function postIds() {
  // const fs = require('fs').promises
  // return (await fs.readdir(POSTS_DIR)).map(fileName => {
  const paths = ['day-01.md','day-02.md','day-03.md','day-04.md','day-05.md','day-08.md','day-09.md','day-10.md','day-12.md','day-13.md','day-14.md','day-15.md','day-16.md','day-17.md','day-18.md','day-19.md','day-21.md','day-22.md','day-23.md','day-24.md','day-25.md','day-26.md','day-27.md','day-29.md','day-30.md','day-31.md','day-32.md','day-33.md','day-34.md','day-35.md','day-36.md','day-38.md','day-39.md','day-40.md','day-41.md','day-42.md','day-43.md','day-44.md','day-45.md','day-46.md','day-47.md','gear.md','resupply.md','thoughts.md']
  return paths
  return paths.map(fileName => {
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

export async function postData(id) {
  const fs = require('fs').promises
  const exif = require('jpeg-exif')
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
    data.day.past = (data.past || (data.day.num - 1)).toString().padStart(2, '0')
    data.day.next = (data.next || (data.day.num + 1)).toString().padStart(2, '0')
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
