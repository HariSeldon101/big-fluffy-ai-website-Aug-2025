'use client'

import { useEffect, useState } from 'react'

interface BlogPostProps {
  content: string
}

export default function BlogPost({ content }: BlogPostProps) {
  const [processedContent, setProcessedContent] = useState('')

  useEffect(() => {
    // Simple markdown-to-HTML conversion for basic formatting
    const processMarkdown = (text: string) => {
      return text
        // Headers
        .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-foreground mb-6 mt-8 first:mt-0">$1</h1>')
        .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-foreground mb-4 mt-8">$1</h2>')
        .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold text-foreground mb-3 mt-6">$1</h3>')
        
        // Bold and Italic
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-primary-400">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
        
        // Lists
        .replace(/^- (.*$)/gim, '<li class="mb-2 text-muted-foreground">$1</li>')
        .replace(/(<li[\s\S]*<\/li>)/g, '<ul class="list-disc list-inside mb-6 space-y-1 ml-4">$1</ul>')
        
        // Code blocks (simple)
        .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-900 border border-gray-700 rounded-lg p-4 mb-6 overflow-x-auto"><code class="text-green-400 text-sm">$1</code></pre>')
        
        // Inline code
        .replace(/`(.*?)`/g, '<code class="bg-gray-800 text-primary-300 px-2 py-1 rounded text-sm">$1</code>')
        
        // Line breaks and paragraphs
        .replace(/\n\n/g, '</p><p class="text-muted-foreground leading-relaxed mb-6">')
        .replace(/\n/g, '<br />')
    }

    const htmlContent = processMarkdown(content)
    // Wrap in paragraph tags if not already wrapped
    const wrappedContent = htmlContent.startsWith('<h1') || htmlContent.startsWith('<h2') || htmlContent.startsWith('<h3')
      ? htmlContent
      : `<p class="text-muted-foreground leading-relaxed mb-6">${htmlContent}</p>`
    
    setProcessedContent(wrappedContent)
  }, [content])

  return (
    <div 
      className="prose prose-lg max-w-none 
        prose-headings:text-foreground 
        prose-p:text-muted-foreground 
        prose-p:leading-relaxed 
        prose-strong:text-primary-400
        prose-em:text-muted-foreground
        prose-li:text-muted-foreground
        prose-code:text-primary-300
        prose-code:bg-gray-800
        prose-pre:bg-gray-900
        prose-pre:border
        prose-pre:border-gray-700
        blog-content"
      dangerouslySetInnerHTML={{ __html: processedContent }}
    />
  )
}