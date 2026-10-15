# Dr. Pia GMB post report

Live website: **https://dr-pia-gmb-post.vercel.app/**

This repository is public, and its `main` branch is connected to the existing Vercel project for automatic production deployments. Mike's GitHub account (`mmerlino23`) has been invited with write access. See the [step-by-step update guide](UPDATE-GUIDE.md) for editing text and replacing images in GitHub.

This repository contains the website source for the 13 service Google Business Profile drafts, their latest branded artwork, and the Dr. Pia logo. The report is a review collection; deploying this website does not publish the drafts to Google Business Profile.

## Update the report

1. Edit `content/posts.json`. Each entry has the service title, full post copy, destination URL, source notes, and image filename. Keep the `number` and `slug` unchanged when updating an existing service. In the `copy` field, `\n\n` separates paragraphs.
2. Replace the matching PNG in `public/assets/` to change a service image. Keep its filename. Set `imageWidth` and `imageHeight` if its dimensions change. Update `imageSource` to describe the new source accurately.
3. Edit `src/styles.css` for styling, `src/index.template.html` for the page header and footer, or `src/report.js` for browser controls. Preserve the `__CARDS__` and `__POST_DATA__` placeholders in the template.
4. Commit the source changes to `main`. The Vercel project uses the repository's `main` branch for production builds. Confirm that the deployment is **Ready**, then check the live URL. A GitHub commit alone is not proof that a change is live.

The generated `public/index.html` is included for easy preview. Edit the source files above; the build regenerates this page and the browser CSS/JavaScript files.

## Build and preview locally

Requires Node.js 20 or newer. No npm dependencies are needed.

```sh
npm run build
```

Open `public/index.html` in a browser, or serve `public/` with a local static server. The build validates all 13 unique posts, image paths, categories, service URLs, and the 1,500-character post limit.

## Vercel settings

- Project: `dr-pia-gmb-post`
- Team: `team-5736s-projects`
- Production branch: `main`
- Framework: Other
- Build command: `node scripts/build.mjs`
- Output directory: `public`
- Install command: empty; there are no dependencies

You can also use the shared Vercel account to open the project's Deployments page, check deployment errors, and redeploy the latest source. GitHub write access and Vercel account access are separate permissions; Vercel may check the Git commit author's access before allowing deployment.

## Source and credentials

The initial service copy and clinical scope were checked against the corresponding Cosmetic Dentistry NYC website pages on 15 October 2026. Preserve those limits and recheck claims against the service page when editing. The source notes identify website imagery and user-supplied artwork separately.

This repository contains no Vercel credentials, environment files, deployment hooks, or authentication tokens. Never commit `.env` files or the `.vercel/` directory.
