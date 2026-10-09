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
| elderly removals [town] | `/elderly-removals-[town]/` (10 towns + Northampton) |
| senior move manager UK | `/elderly-move-manager-uk/` |

## Tier 2: new pages to write (high UK intent, not yet covered by a dedicated page)
1. **House clearance for the elderly** (`/house-clearance-for-the-elderly/`): decluttering and clearing a home before a move.
2. **Probate house clearance and removals** (`/probate-house-clearance/`): links to the existing probate blog post.
3. **Removals to a care home** (`/care-home-removals/`): links to the care-home checklist post.
4. **Downsizing service** and **declutter service** pages written as services, not guides.
5. **Packing service for the elderly** (`/packing-service-for-the-elderly/`).
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
