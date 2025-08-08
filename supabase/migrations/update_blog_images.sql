-- Update blog posts with custom SVG images
UPDATE blog_posts 
SET featured_image = '/images/blog/chatgpt-productivity.svg'
WHERE slug = 'chatgpt-5-daily-productivity-tips';

UPDATE blog_posts 
SET featured_image = '/images/blog/open-source-ai.svg'
WHERE slug = 'open-source-ai-models-private-companies';

UPDATE blog_posts 
SET featured_image = '/images/blog/llm-explanation.svg'
WHERE slug = 'llm-primer-how-large-language-models-work';

UPDATE blog_posts 
SET featured_image = '/images/blog/ai-small-business.svg'
WHERE slug = 'getting-started-ai-small-business';

UPDATE blog_posts 
SET featured_image = '/images/blog/chatgpt-privacy.svg'
WHERE slug = 'chatgpt-privacy-search-results-concerns';