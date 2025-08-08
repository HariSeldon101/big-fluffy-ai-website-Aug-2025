-- Update blog posts with real image paths (run this after adding actual images)
UPDATE blog_posts 
SET featured_image = '/images/blog/chatgpt-productivity.jpg'
WHERE slug = 'chatgpt-5-daily-productivity-tips';

UPDATE blog_posts 
SET featured_image = '/images/blog/open-source-ai.jpg'
WHERE slug = 'open-source-ai-models-private-companies';

UPDATE blog_posts 
SET featured_image = '/images/blog/llm-explanation.jpg'
WHERE slug = 'llm-primer-how-large-language-models-work';

UPDATE blog_posts 
SET featured_image = '/images/blog/ai-small-business.jpg'
WHERE slug = 'getting-started-ai-small-business';

UPDATE blog_posts 
SET featured_image = '/images/blog/chatgpt-privacy.jpg'
WHERE slug = 'chatgpt-privacy-search-results-concerns';