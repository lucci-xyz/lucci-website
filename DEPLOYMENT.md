# Deployment Guide

## Pre-Deployment Checklist

### ✅ Completed
- [x] All pages built and tested
- [x] Build passes without errors
- [x] Tests passing (8/8)
- [x] ESLint clean
- [x] TypeScript strict mode
- [x] Responsive design
- [x] Dark/light mode working
- [x] SEO metadata configured
- [x] OpenGraph images generating
- [x] 404 page implemented

### 📝 Before Going Live
- [ ] Update metadata URLs in `app/layout.tsx` with production domain
- [ ] Update social links in footer with actual accounts
- [ ] Add real email in contact page
- [ ] Replace placeholder contact form with real endpoint
- [ ] Add Google Analytics / Vercel Analytics (optional)
- [ ] Set up GitHub token for API rate limits (optional)
- [ ] Add more real projects to `data/projects.json`
- [ ] Add more research posts to `content/research/`
- [ ] Update favicon if needed

## Deploy to Vercel (Recommended)

### Quick Deploy

1. **Push to GitHub:**
```bash
git init
git add .
git commit -m "Initial commit: Lucci Labs website"
git branch -M main
git remote add origin https://github.com/YOUR_ORG/lucci-website.git
git push -u origin main
```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel auto-detects Next.js
   - Click "Deploy"

3. **Configure Domain (Optional):**
   - Go to project settings → Domains
   - Add your custom domain
   - Update DNS records as instructed

### Environment Variables (Optional)

If you want higher GitHub API rate limits:

```env
GITHUB_TOKEN=your_github_personal_access_token
```

Add this in Vercel → Settings → Environment Variables

## Deploy to Other Platforms

### Netlify
```bash
npm run build
# Deploy the .next folder
```

### Self-Hosted
```bash
npm run build
npm start
# Runs on port 3000 by default
```

## Post-Deployment

### 1. Test Production Site
- [ ] Check all pages load
- [ ] Test navigation
- [ ] Verify dark/light mode
- [ ] Test on mobile
- [ ] Check research posts render
- [ ] Verify GitHub stars load

### 2. Performance Audit
Run Lighthouse:
- Performance: Target ≥95
- Accessibility: Target 100
- Best Practices: Target ≥95
- SEO: Target 100

### 3. SEO Setup
- [ ] Submit sitemap to Google Search Console
- [ ] Verify OpenGraph images render on Twitter/LinkedIn
- [ ] Check meta descriptions
- [ ] Verify canonical URLs

### 4. Analytics (Optional)
Add Vercel Analytics in `app/layout.tsx`:
```tsx
import { Analytics } from '@vercel/analytics/react';

// Add in body:
<Analytics />
```

## Monitoring

### Things to Monitor
- Build times
- Page load speeds
- API rate limits (GitHub)
- Error logs
- 404 errors

### Tools
- Vercel Analytics (built-in)
- Google Search Console
- Sentry (for error tracking)

## Continuous Deployment

Vercel automatically deploys:
- **Production:** Pushes to `main` branch
- **Preview:** Pull requests

## Troubleshooting

### Build Fails
```bash
# Test locally first
npm run build

# Check logs
npm run lint
```

### 404 on Research Posts
- Ensure `.mdx` files are in `content/research/`
- Verify frontmatter format
- Check slug matches filename

### GitHub Stars Not Loading
- Check browser console for errors
- Verify API route is accessible
- Consider adding GITHUB_TOKEN

## Rollback

If something breaks:
1. Go to Vercel → Deployments
2. Find last working deployment
3. Click "..." → Promote to Production

## Performance Optimization

### Image Optimization
- Use Next.js `<Image>` component
- Add `next/image` for any new images

### Bundle Size
```bash
# Analyze bundle
npm install -D @next/bundle-analyzer

# Add to next.config.ts:
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

# Run analysis
ANALYZE=true npm run build
```

## Security

### Before Production
- [ ] No secrets in code
- [ ] Environment variables properly set
- [ ] CORS configured if needed
- [ ] Rate limiting on API routes (if public)

## Support

For issues:
1. Check build logs in Vercel
2. Review error messages
3. Test locally: `npm run build && npm start`
4. Open issue on GitHub

---

**Ready to deploy?** Follow the steps above and you're good to go! 🚀

