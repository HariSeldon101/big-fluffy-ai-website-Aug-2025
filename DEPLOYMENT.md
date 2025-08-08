# Big Fluffy AI - Vercel Deployment Guide

## Prerequisites ✅
- [x] Supabase production database ready
- [x] Domain `bigfluffy.ai` registered
- [ ] GitHub repository created
- [ ] Vercel account created

## Step 1: Push to GitHub
```bash
# Initialize git repository (if not already done)
git init
git add .
git commit -m "Initial commit: Big Fluffy AI website with blog system"

# Add your GitHub repository
git remote add origin https://github.com/YOUR_USERNAME/big-fluffy-ai.git
git push -u origin main
```

## Step 2: Deploy to Vercel

### Via Vercel Dashboard:
1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js settings
5. Click "Deploy"

### Via Vercel CLI (Alternative):
```bash
npm i -g vercel
vercel login
vercel --prod
```

## Step 3: Configure Environment Variables

### Option A: Via Vercel Dashboard
In your Vercel dashboard:
1. Go to Project Settings → Environment Variables
2. Add these variables:

```
NEXT_PUBLIC_SUPABASE_URL = your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY = your_production_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY = your_production_supabase_service_role_key
NEXTAUTH_SECRET = generate_random_32_char_string
NEXTAUTH_URL = https://bigfluffy.ai
```

### Option B: Via CLI (Recommended)
After adding variables in dashboard, pull them locally:

```bash
# Install Vercel CLI if not installed
npm i -g vercel

# Link your project
vercel link

# Pull environment variables
vercel env pull
```

This creates a local `.env` file with your Vercel environment variables.

## Step 4: Configure Domain

### In Vercel Dashboard:
1. Go to Project Settings → Domains
2. Add `bigfluffy.ai`
3. Add `www.bigfluffy.ai` (optional)

### DNS Configuration:
Point your domain to Vercel by adding these DNS records:

**For bigfluffy.ai:**
- Type: A
- Name: @
- Value: 76.76.19.61

**For www.bigfluffy.ai:**
- Type: CNAME
- Name: www
- Value: cname.vercel-dns.com

## Step 5: Configure Supabase for Production

1. **Update CORS settings** in Supabase:
   - Go to Settings → API
   - Add `https://bigfluffy.ai` to allowed origins

2. **Run database migrations**:
   - Execute `blogs.sql` in Supabase SQL editor
   - Execute `update_blog_images.sql` in Supabase SQL editor

3. **Update RLS policies** if needed for production

## Step 6: Test Production Deployment

1. Visit `https://bigfluffy.ai`
2. Test all pages: Home, Services, Blog, Dashboard, Auth
3. Test blog functionality: sorting, filtering, individual posts
4. Test social sharing
5. Test authentication flow
6. Test mobile responsiveness

## Step 7: Set up Analytics (Optional)

Add Google Analytics:
1. Create GA4 property
2. Add tracking ID to environment variables
3. Redeploy

## Step 8: Calendly Setup

1. Configure environment variables in Vercel:
   - `NEXT_PUBLIC_CALENDLY_URL` → your public scheduling link, e.g. `https://calendly.com/YOUR_HANDLE/intro-15min`
   - `CALENDLY_SIGNING_KEY` → Calendly webhook signing key (optional but recommended)
   - `CALENDLY_EVENT_TYPE_URI` → Limit webhook processing to a specific event type (optional)

2. Create the lead storage table in Supabase (run once):
   - Open Supabase SQL Editor and run `supabase/calendly_leads.sql`

3. Add a Calendly webhook pointing to your API endpoint:
   - Webhook URL (prod): `https://bigfluffy.ai/api/calendly/webhook`
   - Webhook URL (preview/local): `https://<your-preview-domain>/api/calendly/webhook` or `http://localhost:3000/api/calendly/webhook`
   - Select events: at minimum, `invitee.created` and `invitee.canceled`
   - Signing key: set and store in `CALENDLY_SIGNING_KEY`

4. Validate the endpoint:
   - Health check: open `/api/calendly/webhook` in a browser → should return `{ ok: true }`
   - After booking/canceling, check the `calendly_leads` table for upserts

5. UTM tracking:
   - The site automatically merges common UTM parameters (`utm_*`, `ref`, `gclid`, `fbclid`) into the Calendly URL for both the popup and `/book` page.

## Troubleshooting

### Build Errors:
- Check build logs in Vercel dashboard
- Run `npm run build` locally to test
- Check environment variables

### Domain Issues:
- DNS propagation can take 24-48 hours
- Use DNS checker tools to verify
- Check Vercel domain configuration

### Database Connection:
- Verify Supabase URL and keys
- Check CORS settings
- Test API endpoints

## Go Live Checklist ✅

- [ ] GitHub repository created and pushed
- [ ] Vercel project deployed
- [ ] Environment variables configured
- [ ] Domain connected and DNS configured
- [ ] Supabase production configured
- [ ] Database migrations run
- [ ] All pages tested
- [ ] Mobile responsiveness verified
- [ ] Social sharing tested
- [ ] Analytics configured (optional)
- [ ] Calendly webhook configured
- [ ] `calendly_leads` table created in Supabase

## Post-Launch Tasks

1. Set up monitoring and error tracking
2. Configure automatic deployments
3. Set up backup strategies
4. Monitor performance and optimize
5. Set up SSL certificate (auto with Vercel)

---

🚀 **Your Big Fluffy AI website will be live at https://bigfluffy.ai**
