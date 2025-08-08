-- Update blog posts to use placeholder images temporarily
UPDATE blog_posts SET featured_image = '/images/blog/placeholder.svg' WHERE featured_image IS NOT NULL;

-- Or set them to null to show the fallback gradient
-- UPDATE blog_posts SET featured_image = NULL WHERE featured_image IS NOT NULL;