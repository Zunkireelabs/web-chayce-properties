# UK keyword plan (SEO, GEO, AEO)

Goal: be found by UK searchers. "Movers" and "senior" are American habits; UK searchers say **removals**, **elderly / older people / later life**, **downsizing**, **care home**, **retirement flat/bungalow**, **house clearance**, **probate**.

Search volumes are not verified here. Check each term in Google Search Console (Performance, Country = United Kingdom) and Google Keyword Planner (UK) before writing new pages, and treat the tiers below as a starting hypothesis.

## Wording rules for all copy
- Use: removals, removals company, elderly removals, older people, later-life move, downsizing, estate agent, solicitor, conveyancing, flat, bungalow, retirement living, care home, house clearance, probate, storage.
- Avoid: movers, moving company, senior movers, apartment (except "retirement apartment"), realtor, neighborhood, organize/organization (use "organise").
- Always write UK spelling and £; mention "UK" and the place name in titles of local pages.

## Tier 1: money terms (already targeted)
| Search term | Page |
|---|---|
| elderly removals / removals for the elderly | `/`, `/services/`, local pages |
| downsizing help for the elderly | `/downsizing-help-for-elderly/` |
| moving an elderly parent | `/moving-elderly-parent/` |
| retirement village / retirement flat removals | `/retirement-village-removals/` |
| elderly removals [town] | `/elderly-removals-[town]/` (16 towns + Northampton) |
| senior move manager UK | `/elderly-move-manager-uk/` |

## Tier 2: new pages to write (high UK intent, not yet covered by a dedicated page)
Built 2026-10-12: items 1 to 3, the packing service (`/packing-service-uk/`) and six new towns (Leicester, Oxford, Cambridge, Peterborough, Coventry, Banbury). Items 1 to 3 are (`/house-clearance-for-the-elderly/`, `/probate-house-clearance/`, `/care-home-removals/`). Chayce is not a house-clearance firm or probate service, so these pages target the searches but say plainly that we sort, pack and move and do not empty a property or give legal advice. Keep that wording if they are edited.

1. **House clearance for the elderly** (`/house-clearance-for-the-elderly/`): decluttering and clearing a home before a move.
2. **Probate house clearance and removals** (`/probate-house-clearance/`): links to the existing probate blog post.
3. **Removals to a care home** (`/care-home-removals/`): links to the care-home checklist post.
4. **Downsizing service** and **declutter service** pages written as services, not guides.
5. **Packing service for the elderly** (`/packing-service-uk/`).
6. **Short-notice and hospital-discharge moves** if Chayce actually offers them (confirm first).
7. More towns: Brackley, Leicester, Oxford, Cambridge, Peterborough, Northampton villages, Coventry, Banbury. Only add towns Chayce genuinely serves and use real local facts.

## Tier 3: question content for AEO (answer boxes and AI answers)
Add short, direct question-and-answer blocks (40 to 60 words each) to existing pages and FAQ schema:
- How much do elderly removals cost in the UK?
- How do I move an elderly parent into a care home?
- Who helps an elderly person downsize?
- What is the difference between a removals company and a senior move manager?
- Do I pay stamp duty when I downsize?
- How long does a later-life move take?
Keep prices and claims identical to `src/_data/site.json`. Never invent figures.

## GEO (AI search) work
- Keep `llms.txt`, `llms-full.txt` and `chayce-facts.json` in sync (they build from the same data, so new towns and renamed URLs appear automatically).
- Use consistent facts everywhere: name, address, phone, hours, packages, Companies House number.
- Build third-party mentions: Google Business Profile, Yell, Trustpilot, care and retirement directories, local press. AI answers cite these more than the site itself.
- Add real review text and `aggregateRating` schema only after real reviews exist.

## Off-site (manual, needed to rank)
Already live (see `local-citations-checklist.md`): Google Business Profile, Yell, Brownbook, Hotfrog.
Still open, in priority order: Bing Places, Apple Business Connect, Facebook, LinkedIn, housingcare.org, Autumna, Trustpilot (invite real clients only), then the general UK directories.
- Google reviews from real clients are the biggest gap.
- Add each new live profile URL to `sameAs` in `src/_data/site.json`.

## Search Console (UK focus)
- Performance filter: Country = United Kingdom.
- Request indexing for renamed URLs; confirm 301s from old URLs.
- Resubmit `sitemap.xml`.

## Status, 13 Oct 2026 (local, not yet deployed)
- Built: `/guides/` topic hub (all 41 guides), 16 towns plus Northampton with "Other areas we cover" cross-links, Tier 2 pages (care home, house clearance, probate, packing), comparison table, 24 blog posts reassigned unique photos.
- New general-audience posts (not older-people only): Stamp Duty for first-time buyers (worked examples), moving with pets and children (GOV.UK microchip rules), how to compare removals quotes, and what a moving consultation covers.
- Figures come from GOV.UK (checked 13 Oct 2026) or `src/_data/site.json`. Recheck Stamp Duty rates after any Budget.
- nginx: bare-number query strings and `/contents/` now return 410, on top of the existing spam clean-up. Do not block these paths in `robots.txt`.
- Still needs Chayce data: regional price differences and typical move durations, so no cost-by-region or timeline pages yet.
- Search Console baseline before deploy (3 months): 6 clicks, 196 impressions, average position 11.4; about 1.57M URLs not indexed (inherited spam), 7.76k indexed. Re-check 2 to 4 weeks after deploy.

## Status, 4 Nov 2026 (branch `fix/blogs`, local, not yet deployed)
- UK wording: "movers", "moving company" and "senior" (as a label for older people) removed from titles, headings, body copy, FAQ, alt text and schema `serviceType`. Kept on purpose: "senior move manager" (a search term, in `/elderly-move-manager-uk/`), "senior coordinator" (seniority), "retirement apartment".
- Three blog URLs renamed with 301s in `nginx/templates/default.conf.template`: `dbs-checked-removals-uk-what-to-ask`, `removals-company-for-older-people-near-me-what-to-look-for`, `later-life-relocation-uk-practical-guide`. Request indexing for the new URLs after deploy.
- Town pages now read "Elderly & House Removals in [town]" (matching the `/elderly-removals-[town]/` URL), and their schema links each town to its Wikipedia page via `sameAs` (`wikipedia` field in `src/_data/localAreas.json`).
- Every blog post now has the same building blocks: `**Short answer:**` lead, at least 1 `about` entity, at least 3 `sources` (shown on the page as "Sources and further reading" and in `citation` schema), at least 3 FAQ items, `dateModified` and `featuredImageAlt`. The blog layout also prints a byline and adds `speakable` and `isPartOf` to the Article schema.
- Source URLs were checked for HTTP 200 on 4 Nov 2026. MoneyHelper, Royal Mail and the Law Society block automated checks, so they were not added as new sources.
- `npm run build && npm run check:content` enforces the blog standard and the wording rules above. Run it before every PR.
- Companies House record added to `sameAs`.

## Open items for the owner
- Resolved 4 Nov 2026: the owner confirmed Chayce was founded in 2021 (Companies House: Chayce Properties Ltd, 13523724, incorporated 21 July 2021). The site, llms files, `chayce-facts.json` and schema `foundingDate` now say 2021. Still open: Companies House lists the registered office as 9 Jersey Court, Northampton NN3 9TB, while the site trades from Unit F2B Barratt House, NN2 6EZ. Make sure the citations and listings use the trading address consistently, and keep the registered office on Companies House only.
- Still manual: Bing Places, Apple Business Connect, Facebook, LinkedIn, housingcare.org, Autumna, and real Google and Trustpilot reviews.
