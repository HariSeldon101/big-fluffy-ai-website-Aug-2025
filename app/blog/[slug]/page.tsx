'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { format } from 'date-fns'
import { Clock, User, Calendar, ArrowLeft, Tag } from 'lucide-react'
import { motion } from 'framer-motion'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import SocialShare from '@/components/blog/SocialShare'
import BlogPost from '@/components/blog/BlogPost'
import { getOverrideForSlug } from '@/lib/blog/overrides'

interface BlogPostData {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  featured_image: string | null
  author: string
  published_at: string
  tags: string[]
  reading_time: number
  meta_title: string | null
  meta_description: string | null
}

export default function BlogPostPage() {
  const params = useParams()
  const slug = params.slug as string
  
  const [post, setPost] = useState<BlogPostData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (slug) {
      fetchPost()
    }
  }, [slug])

  const fetchPost = async () => {
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .single()

      if (error) {
        if (error.code === 'PGRST116') {
          setError('Post not found')
        } else {
          throw error
        }
        return
      }

      // Apply overrides if they exist for this slug
      const override = getOverrideForSlug(slug)
      const finalPost = override ? { ...data, ...override } : data
      setPost(finalPost)
    } catch (error) {
      console.error('Error fetching blog post:', error)
      setError('Error loading post')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              {error === 'Post not found' ? 'Post Not Found' : 'Error Loading Post'}
            </h1>
            <p className="text-muted-foreground mb-8">
              {error === 'Post not found' 
                ? 'The blog post you\'re looking for doesn\'t exist or has been removed.'
                : 'We encountered an error while loading this blog post. Please try again later.'
              }
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const publishedDate = new Date(post.published_at)
  const currentUrl = typeof window !== 'undefined' ? window.location.href : ''

  return (
    <>
      {/* Meta Tags */}
      <head>
        <title>{post.meta_title || post.title} | Big Fluffy AI Blog</title>
        <meta name="description" content={post.meta_description || post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.featured_image || '/images/blog/default-og.jpg'} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={post.featured_image || '/images/blog/default-og.jpg'} />
      </head>

      <div className="min-h-screen bg-background">
        <Navigation />
        
        <main className="pt-24 pb-16">
          <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back to Blog Link */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors group"
              >
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Back to Blog
              </Link>
            </motion.div>

            {/* Article Header */}
            <motion.header
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-primary-500/20 text-primary-400 text-sm rounded-full border border-primary-500/30"
                  >
                    <Tag className="h-3 w-3" />
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-5xl font-bold gradient-text leading-tight mb-6">
                {post.title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-col md:flex-row md:items-center gap-4 text-muted-foreground mb-8">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{format(publishedDate, 'MMMM d, yyyy')}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{post.reading_time} min read</span>
                  </div>
                </div>
              </div>

              {/* Featured Image */}
              {post.featured_image && (
                <div className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-8">
                  <Image
                    src={post.featured_image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                  />
                </div>
              )}

              {/* Social Share */}
              <div className="border-y border-gray-700 py-4">
                <SocialShare
                  url={currentUrl}
                  title={post.title}
                  description={post.excerpt}
                />
              </div>
            </motion.header>

            {/* Article Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <BlogPost content={post.content} />
            </motion.div>

            {/* Article Footer */}
            <motion.footer
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-16 pt-8 border-t border-gray-700"
            >
              {/* Share Again */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-foreground mb-4">Share this post:</h3>
                <SocialShare
                  url={currentUrl}
                  title={post.title}
                  description={post.excerpt}
                />
              </div>

              {/* Back to Blog CTA */}
              <div className="text-center">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-500 transition-colors font-medium"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Read More Posts
                </Link>
              </div>
            </motion.footer>
          </article>
        </main>

        <Footer />
      </div>
    </>
  )
}