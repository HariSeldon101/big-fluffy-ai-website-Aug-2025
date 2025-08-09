'use client'

import { useState, useEffect, Suspense } from 'react'
import { createClient } from '@/lib/supabase'
import BlogList from '@/components/blog/BlogList'
import { Calendar, Filter, Search, ChevronDown, ChevronUp, CheckCircle, X } from 'lucide-react'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import { getOverridesMap } from '@/lib/blog/overrides'
import { useSearchParams } from 'next/navigation'

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

interface SortOption {
  label: string
  value: 'newest' | 'oldest' | 'popular'
}

function BlogContent() {
  const searchParams = useSearchParams()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState('')
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'popular'>('newest')
  const [allTags, setAllTags] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const sortOptions: SortOption[] = [
    { label: 'Newest First', value: 'newest' },
    { label: 'Oldest First', value: 'oldest' },
    { label: 'Most Popular', value: 'popular' }
  ]

  useEffect(() => {
    fetchPosts()
    
    // Check for success message from contact form
    const message = searchParams.get('message')
    if (message === 'contact-success') {
      setShowSuccessMessage(true)
      // Auto-hide after 10 seconds
      setTimeout(() => {
        setShowSuccessMessage(false)
      }, 10000)
    }
  }, [searchParams])

  useEffect(() => {
    filterAndSortPosts()
  }, [posts, searchTerm, selectedTag, sortBy])

  const fetchPosts = async () => {
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false })

      if (error) throw error

      const overrides = getOverridesMap()
      const overridden = (data || []).map((post) => {
        const o = overrides[post.slug]
        return o ? { ...post, ...o } : post
      })

      setPosts(overridden)
      
      // Extract unique tags
      const tags = new Set<string>()
      data?.forEach(post => {
        post.tags?.forEach((tag: string) => tags.add(tag))
      })
      setAllTags(Array.from(tags))
      
    } catch (error) {
      console.error('Error fetching blog posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterAndSortPosts = () => {
    let filtered = [...posts]

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Filter by tag
    if (selectedTag) {
      filtered = filtered.filter(post => 
        post.tags.includes(selectedTag)
      )
    }

    // Sort posts
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return new Date(a.published_at).getTime() - new Date(b.published_at).getTime()
        case 'popular':
          // For now, we'll sort by newest as we don't have view counts
          return new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
        case 'newest':
        default:
          return new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
      }
    })

    setFilteredPosts(filtered)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleTagFilter = (tag: string) => {
    setSelectedTag(selectedTag === tag ? '' : tag)
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as 'newest' | 'oldest' | 'popular')
  }

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedTag('')
    setSortBy('newest')
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Success Message */}
          {showSuccessMessage && (
            <div className="mb-8 p-4 bg-green-900/20 border border-green-500/30 rounded-lg flex items-center justify-between">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                <div>
                  <p className="text-green-400 font-medium">Message sent successfully!</p>
                  <p className="text-green-300 text-sm">Since you're here, why not check out our latest insights and articles?</p>
                </div>
              </div>
              <button
                onClick={() => setShowSuccessMessage(false)}
                className="text-green-400 hover:text-green-300 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          )}
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
              Big Fluffy AI <span className="text-primary-500">Blog</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Stay up to date with the latest in AI technology, productivity tips, and insights designed for the next generation of innovators.
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="mb-12 space-y-6">
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-3 bg-card border border-gray-700 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Filter Toggle Button */}
            <div className="text-center">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-gray-700 rounded-lg text-muted-foreground hover:text-foreground hover:border-primary-500/50 transition-colors"
              >
                <Filter className="h-4 w-4" />
                <span>Filters & Sort</span>
                {showFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                {(searchTerm || selectedTag || sortBy !== 'newest') && (
                  <span className="ml-1 px-2 py-1 bg-primary-500 text-white text-xs rounded-full">
                    Active
                  </span>
                )}
              </button>
            </div>

            {/* Collapsible Filters and Sort */}
            {showFilters && (
              <div className="transition-all duration-300 ease-out transform translate-y-0 opacity-100">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-gray-900/50 border border-gray-700/50 rounded-lg p-6">
                  {/* Tag Filters */}
                  <div className="flex flex-wrap gap-2 items-center">
                    <Filter className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground mr-2">Filter by:</span>
                    {allTags.map(tag => (
                      <button
                        key={tag}
                        onClick={() => handleTagFilter(tag)}
                        className={`px-3 py-1 rounded-full text-sm transition-colors ${
                          selectedTag === tag
                            ? 'bg-primary-500 text-white'
                            : 'bg-card text-muted-foreground hover:bg-primary-500/20 hover:text-primary-400 border border-gray-700'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>

                  {/* Sort and Clear */}
                  <div className="flex gap-3 items-center">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <select
                        value={sortBy}
                        onChange={handleSortChange}
                        className="bg-card border border-gray-700 rounded-lg px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        {sortOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    {(searchTerm || selectedTag || sortBy !== 'newest') && (
                      <button
                        onClick={clearFilters}
                        className="px-4 py-2 text-sm text-primary-400 hover:text-primary-300 transition-colors"
                      >
                        Clear Filters
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Results Count */}
          <div className="mb-8 text-center">
            <p className="text-muted-foreground">
              Showing {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'}
              {searchTerm && ` matching "${searchTerm}"`}
              {selectedTag && ` tagged with "${selectedTag}"`}
            </p>
          </div>

          {/* Blog Posts Grid */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground mb-4">
                {searchTerm || selectedTag ? 'No posts found matching your criteria.' : 'No posts available yet.'}
              </p>
              {(searchTerm || selectedTag) && (
                <button
                  onClick={clearFilters}
                  className="text-primary-400 hover:text-primary-300 transition-colors"
                >
                  Clear filters to see all posts
                </button>
              )}
            </div>
          ) : (
            <BlogList posts={filteredPosts} />
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default function BlogPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    }>
      <BlogContent />
    </Suspense>
  )
}
