# Sachok Job

A pixel-accurate Next.js recreation of the Sachok Job design screenshots — no PNGs used as page content, everything is real HTML/React/Tailwind.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Routes

| Route | Page |
|---|---|
| `/` | Home |
| `/social-media-candidates` | People from Social Media (list) |
| `/candidate/[id]` | Candidate Profile |
| `/login` | Login |
| `/register?type=jobseeker\|employer` | Register (switcher) |
| `/forgot-password` | Forgot Password |
| `/contact` | Contact Us |
| `/help-center` | Help Center |
| `/terms-privacy` | Terms & Privacy (Job Seeker / Employer tabs + Document Viewer modal) |

Search Suggestions, No Search Results, and the Location/ZIP/Industry Filter Modals are all interactive states inside the Home page's job search bar.
