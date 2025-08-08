'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Clock, User, Calendar } from 'lucide-react'
import { format } from 'date-fns'

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

interface BlogCardProps {
  post: BlogPost
}

export default function BlogCard({ post }: BlogCardProps) {
  const publishedDate = new Date(post.published_at)
  const [imageError, setImageError] = useState(false)

  return (
    <article className="group bg-card border border-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary-500/50">
      {/* Featured Image */}
      <div className="relative h-48 bg-gray-800 overflow-hidden">
        {post.featured_image && !imageError ? (
          <Image
            src={post.featured_image}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-500/20 to-primary-600/20 flex items-center justify-center">
            <div className="text-center">
              <div className="text-primary-400 text-4xl font-bold opacity-50 mb-2">
                AI
              </div>
              <div className="text-primary-400 text-xs opacity-30">
                Blog Image
              </div>
            </div>
          </div>
        )}
        
        {/* Tags Overlay */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-1">
          {post.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-black/70 text-white text-xs rounded-md backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Meta Info */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{format(publishedDate, 'MMM d, yyyy')}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{post.reading_time} min read</span>
          </div>
        </div>

        {/* Title */}
        <Link href={`/blog/${post.slug}`} className="group">
          <h2 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary-400 transition-colors line-clamp-2">
            {post.title}
          </h2>
        </Link>

        {/* Excerpt */}
        <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-700">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="h-4 w-4" />
            <span>{post.author}</span>
          </div>

          <Link
            href={`/blog/${post.slug}`}
            className="text-primary-400 hover:text-primary-300 text-sm font-medium transition-colors inline-flex items-center gap-1 group"
          >
            Read More
            <svg
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  )
}