
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'

const POSTS_DIR = path.join(process.cwd(), 'posts')
const IMAGE_DIR = path.join(process.cwd(), 'public/images')

export function getSortedPostsData() {
  const files = fs.readdirSync(POSTS_DIR).filter(i => i.match(/\.md$/))
  const allPostsData = files.map(basename => {
    const id = basename.replace(/\.md$/, '')
    const file = fs.readFileSync(path.join(POSTS_DIR, basename), 'utf8')
    const data = Object.assign({}, matter(file).data)
    data.date = data.date.toISOString().slice(0, 10)

    return {
      id,
      data,
    }
  })

  return allPostsData.sort((a, b) => a.date < b.date ? -1 : 1)
}

export function getAllPostIds() {
  return fs.readdirSync(POSTS_DIR).map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export async function getPostData(id) {
  const file = fs.readFileSync(path.join(POSTS_DIR, `${id}.md`), 'utf8')
  const frontmatter = matter(file)
  const text = (await remark().use(html).process(frontmatter.content)).toString()
  const data = Object.assign({}, frontmatter.data)
  data.date = data.date.toISOString().slice(0, 10)
  const m = id.match(/day-(\d+)/)
  const day = m[1]
  const images = fs.readdirSync(path.join(IMAGE_DIR, `day-${day}`)).map(file => `/images/day-${day}/${file}`)

  return {
    id,
    text,
    data,
    images,
  }
}
