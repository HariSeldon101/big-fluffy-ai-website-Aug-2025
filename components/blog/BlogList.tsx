'use client'

import { motion } from 'framer-motion'
import BlogCard from './BlogCard'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  featured_image: string | null
  author: string
  published_at: string
  tags: string[]
  reading_time: number
}

interface BlogListProps {
  posts: BlogPost[]
}

export default function BlogList({ posts }: BlogListProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.1, duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {posts.map((post) => (
        <motion.div
          key={post.id}
          variants={itemVariants}
          transition={{ duration: 0.5 }}
          whileHover={{
            y: -5,
            transition: { duration: 0.2 }
          }}
        >
          <BlogCard post={post} />
        </motion.div>
      ))}
    </motion.div>
  )
}