# GitHub Pages Deployment Guide

This project is configured to deploy to GitHub Pages with the custom domain **night-shiftlogistics.com**.

## Automatic Deployment

The site automatically deploys to GitHub Pages when you push to the `main` branch using GitHub Actions.

### First-Time Setup

1. **Enable GitHub Pages in your repository:**
   - Go to your repository on GitHub
   - Navigate to **Settings** > **Pages**
   - Under **Source**, select **GitHub Actions**

2. **Configure environment protection rules:**
   - Go to **Settings** > **Environments** > **github-pages**
   - Under **Deployment branches**, select **All branches** or add `main` to the allowed branches
   - Click **Save protection rules**

3. **Configure your custom domain:**
   - In the same Pages settings, under **Custom domain**, enter: `night-shiftlogistics.com`
   - Click **Save**
   - GitHub will automatically verify your domain

4. **Configure DNS settings at your domain registrar:**

   Add the following DNS records:

   **For apex domain (night-shiftlogistics.com):**
   ```
   Type: A
   Name: @
   Value: 185.199.108.153

   Type: A
   Name: @
   Value: 185.199.109.153

   Type: A
   Name: @
   Value: 185.199.110.153

   Type: A
   Name: @
   Value: 185.199.111.153
   ```

   **For www subdomain (optional):**
   ```
   Type: CNAME
   Name: www
   Value: tarekkanon.github.io
   ```

5. **Enable HTTPS:**
   - After DNS propagation (can take 24-48 hours), return to Pages settings
   - Check **Enforce HTTPS**

## Manual Deployment

If you need to deploy manually:

```bash
npm run deploy
```

This will build the project and deploy to the `gh-pages` branch.

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

- `public/CNAME` - Contains your custom domain configuration
- `public/sitemap.xml` - XML sitemap for search engines
- `public/robots.txt` - Search engine crawler instructions
- `public/404.html` - GitHub Pages SPA routing handler
- `.github/workflows/deploy.yml` - GitHub Actions workflow for automatic deployment
- `vite.config.js` - Vite configuration with base path set to `/` for custom domain
- `package.json` - Contains deployment scripts and homepage URL
- `src/components/SEO.tsx` - SEO component for meta tags and structured data
- `src/pages/` - Individual page components with routing
- `SEO-GUIDE.md` - Comprehensive SEO optimization guide

## Deployment Workflow

1. Push code to `main` branch
2. GitHub Actions automatically:
   - Checks out the code
   - Installs dependencies
   - Builds the project
   - Deploys to GitHub Pages
3. Your site is live at https://night-shiftlogistics.com

## Troubleshooting

### DNS not resolving
- Wait up to 48 hours for DNS propagation
- Verify DNS records with: `nslookup night-shiftlogistics.com`

### 404 errors
- Ensure the CNAME file exists in the `public` folder
- Verify base path in `vite.config.js` is set to `/`

### Build failures
- Check GitHub Actions logs in the **Actions** tab
- Ensure all dependencies are properly listed in `package.json`
- Run `npm run build` locally to test

### Custom domain not working
- Verify the domain is added in GitHub Pages settings
- Check that CNAME file contains only: `night-shiftlogistics.com`
- Ensure DNS records point to GitHub's servers

## SEO & Search Engine Visibility

This site is fully optimized for search engines with:

### Post-Deployment SEO Tasks

1. **Submit to Google Search Console:**
   - Add property: https://night-shiftlogistics.com
   - Submit sitemap: https://night-shiftlogistics.com/sitemap.xml
   - Request indexing for all pages

2. **Submit to Bing Webmaster Tools:**
   - Add site and verify
   - Submit sitemap

3. **Create Google Business Profile:**
   - Essential for local SEO in Dubai/UAE
   - Add business hours (24/7)
   - Add service areas (all 7 Emirates)

4. **Set Up Social Media Profiles:**
   - Update URLs in the code with actual social profiles
   - Facebook: https://www.facebook.com/nightshiftlogistics
   - Instagram: https://www.instagram.com/nightshiftlogistics
   - Twitter: https://twitter.com/nightshiftdubai

### SEO Features Implemented

✅ Comprehensive meta tags on all pages
✅ Schema.org structured data (JSON-LD)
✅ Open Graph tags for social sharing
✅ Twitter Card support
✅ XML sitemap for search engines
✅ Robots.txt for crawler instructions
✅ Mobile-optimized responsive design
✅ Fast loading times with Vite
✅ Clean, semantic URLs with React Router
✅ Geographic SEO for Dubai/UAE
✅ SPA routing compatible with GitHub Pages

**See [SEO-GUIDE.md](SEO-GUIDE.md) for detailed SEO documentation and optimization strategies.**

## Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Custom Domain Configuration](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [Vite Documentation](https://vitejs.dev/guide/)
- [Google Search Console](https://search.google.com/search-console)
- [Schema.org Documentation](https://schema.org/)
