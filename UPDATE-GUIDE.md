# Updating the live report

Site: https://dr-pia-gmb-post.vercel.app/

Repository: https://github.com/merlinomarketing23/dr-pia-gmb-post

Vercel project: https://vercel.com/team-5736s-projects/dr-pia-gmb-post

## Edit text in GitHub

1. Accept the repository invitation, then open [`content/posts.json`](content/posts.json).
2. Click the pencil icon. Find the service by its `title` or `number`.
3. Update its `copy`, title, source notes, or destination. Inside a JSON string, keep quotation marks escaped as `\"` and use `\n\n` between paragraphs.
4. Commit the change to `main`.
5. Open the Vercel project's Deployments page. Confirm that the deployment for that commit is **Ready**, then open the live site and verify the changed card.

The build updates both the visible card and the text copied by its Copy post button. It also recalculates the character count. Posts over 1,500 characters fail the build so that the previous working deployment stays live.

## Replace artwork

Open `public/assets/` in GitHub and upload a replacement PNG using the same filename. Preserve the Dr. Pia branding, and update `imageSource` in `content/posts.json` if the source changes. The original artwork dimensions are recorded in `imageWidth` and `imageHeight`.

| Service | Image filename in `public/assets/` |
| --- | --- |
| Smile makeover | `smile-makeover.png` |
| No-drill veneers | `no-drill-veneers-nyc.png` |
| Porcelain veneers | `porcelain-veneers.png` |
| Anti-aging dentistry | `anti-aging-dentistry-nyc.png` |
| Gum design | `gum-design-nyc.png` |
| Lip augmentation | `lip-augmentation-botox-fillers.png` |
| Laser teeth whitening | `laser-teeth-whitening.png` |
| Invisalign | `invisalign.png` |
| Dental crowns | `dental-crowns.png` |
| Inlays and onlays | `dental-inlays-onlays.png` |
| Dental implants | `dental-implants.png` |
| Dental cleaning | `dental-cleaning.png` |
| Night guards | `night-guards-nyc.png` |

## Deployment access

The existing Vercel project is connected to this repository's `main` branch. The shared Vercel login provides access to its dashboard; GitHub repository permission controls editing the source.

Vercel Hobby has an additional author check for private repositories: only commits authored by the Hobby account's connected GitHub owner can deploy. A collaborator's private-repository commit may be blocked even when the dashboard login is shared. Public repositories support free collaboration; private collaboration requires a suitable Vercel plan and contributor access. See [Vercel's collaboration documentation](https://vercel.com/docs/deployments/troubleshoot-project-collaboration).

If a build or permission check fails, the previous working site remains live. Check the failed deployment before treating a commit as published. Publishing this report does not schedule or publish the individual Google Business Profile drafts.
