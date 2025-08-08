-- Update blog post excerpts to match the new professional article content
-- Run this in Supabase SQL Editor

-- Post 1: ChatGPT 5 Productivity
UPDATE blog_posts 
SET excerpt = 'ChatGPT 5 represents the most significant upgrade to workplace productivity tools since email, offering unprecedented contextual understanding and iterative collaboration capabilities that seamlessly integrate into existing enterprise workflows.'
WHERE slug = 'chatgpt-5-daily-productivity-tips';

-- Post 2: Open Source AI Revolution
UPDATE blog_posts 
SET excerpt = 'The shift toward open source AI models addresses critical enterprise pain points around data sovereignty, cost predictability, and compliance—enabling organizations to deploy cutting-edge AI capabilities without compromising security or budget control.'
WHERE slug = 'open-source-ai-models-private-companies';

-- Post 3: Large Language Models Guide
UPDATE blog_posts 
SET excerpt = 'Understanding LLM architecture has become as essential as grasping cloud computing once was. These sophisticated pattern-matching systems are transforming from research curiosities into business-critical infrastructure that requires strategic comprehension.'
WHERE slug = 'llm-primer-how-large-language-models-work';

-- Post 4: SMB AI Implementation
UPDATE blog_posts 
SET excerpt = 'Main street businesses are discovering that successful AI implementation requires strategic thinking over technical sophistication. The key lies in starting with operational pain points rather than chasing technological possibilities.'
WHERE slug = 'getting-started-ai-small-business';

-- Post 5: Enterprise AI Privacy
UPDATE blog_posts 
SET excerpt = 'The emergence of AI conversations in search results has created new enterprise risk categories that extend beyond traditional data governance. Organizations need structured frameworks to navigate the nuanced boundaries between private consultation and public disclosure.'
WHERE slug = 'chatgpt-privacy-search-results-concerns';