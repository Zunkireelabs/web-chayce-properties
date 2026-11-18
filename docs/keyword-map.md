# Keyword map: one main keyword per page (UK, Northampton first)

Status: draft, 17 Nov 2026. **Search volumes not yet checked** (needs Google Keyword Planner on Chayce's Google Ads account, UK and Northamptonshire). Until then, priority is set from real Search Console searches and the UK keyword plan. Tag: `needs-verification` for volumes.

## Rules
- **One main keyword per URL.** No two pages target the same main keyword. A blog post never takes a service page's main keyword; it targets the "how to" or question version.
- **UK wording only:** removals, elderly, older people, later life, downsizing, care home, retirement village, probate, house clearance. Never "movers", "moving company" or "seniors". `npm run check:content` enforces this.
- **Where each keyword goes:** H1 (plain words), page title (≤60 characters), meta description (70–160 characters, with price and phone where it fits), the short answer (40–60 words, answers the searcher's question), at least one FAQ, and the internal links pointing at the page.
- **Northampton first:** Northampton in the title of the core pages. "UK" stays secondary.
- **Facts only from `src/_data/site.json`** or a cited source. Prices unchanged.

## Evidence we have (Search Console, 7 Oct to 3 Nov 2026, UK, web)
| Search | Impressions | Avg position | Page it belongs to |
|---|---|---|---|
| residential removals kettering | 12 | 78.5 | /elderly-removals-kettering/ |
| after death house removals | 11 | 78.9 | /probate-house-clearance/ |
| senior relocation | 6 | 85 | /elderly-move-manager-uk/ (as "later-life relocation") |
| probate clearances gerrards cross | 5 | 19.6 | /probate-house-clearance/ (outside our area; do not chase the town) |
| senior moving companies | 4 | 62.8 | /elderly-move-manager-uk/ (UK wording: "removals company for older people") |
| care home removals | 3 | 33 | /care-home-removals/ |
| downsizing companies | 3 | 73.3 | /downsizing-help-for-elderly/ |

## Google UK search suggestions (free check, 17 Nov 2026)
These come from Google's own autocomplete (UK, en-GB). It shows phrases people really type, but **not how many**. Volumes still need Keyword Planner.

| We tested | Google suggests (UK) | What it means |
|---|---|---|
| care home removals | care home removals · care move removals reviews | The phrase is real. Keep it as the main keyword. |
| downsizing companies | downsizing companies near me · downsizing companies for seniors | Real and common; use it as the main keyword for downsizing. "Seniors" is US wording and our rule bans it in copy, so we use "older people". |
| downsizing help for elderly | downsizing help for seniors · … near me | Same; we keep "elderly" and "older people". |
| moving an elderly parent | … into assisted living · into a nursing home · in with you · with dementia | Real. Add FAQs on moving in with family and on dementia. |
| probate house clearance | … cost · … companies · … near me · … uk | Strong. Main keyword with cost and companies as supporting keywords. We must say plainly we sort and move, not clear. |
| after death house | after death house clearance · after death house cleaning | Use "after death house clearance" on the probate page. |
| declutter service | … near me · … cost | Use on the house clearance help page. |
| house clearance for elderly | house clearance for elderly | Real, low variety. |
| senior move manager uk | senior move managers uk | Real; "senior move manager" is allowed as a search term (see uk-keyword-plan.md). |
| removals northampton | removals northamptonshire · removals northampton prices · northampton removals companies · house removals northampton | Strong. This is the Northampton page's main keyword; show prices. |
| removals kettering / wellingborough / corby / daventry / towcester | removals [town] · house removals [town] · removal companies [town] | Town pages should lead with "house removals [town]". |
| elderly removals / elderly removals northampton / elderly removals kettering | **no suggestions** | Too rare to lead with. Keep "elderly" as a supporting word, not the main keyword. |
| retirement village removals · packing service for elderly · storage when moving house northampton · removals company for older | **no suggestions** | Low demand. Keep these pages but do not expect much search traffic; they serve visitors and AI answers. |
| dbs checked removals | (only general DBS check searches) | Low; keep on the trust page only. |

## Tier 1: service pages (one main keyword each)
| Page | Main keyword | Supporting keywords (2–4) | The searcher's question (short answer) | Blog posts that support it (not compete) |
|---|---|---|---|---|
| /care-home-removals/ | care home removals | care home removals Northampton · moving an elderly person into a care home · care home move help | What are care home removals and who can help? | care-home checklist · Northampton care home guide · who pays for a care home |
| /downsizing-help-for-elderly/ | downsizing companies | downsizing help for the elderly · downsizing companies near me · help downsizing a parent's home | Who helps an older person downsize? | downsizing checklist · how to downsize a family home · downsizing companies how to choose · downsizing in Northampton |
| /moving-elderly-parent/ | moving an elderly parent | help moving elderly parent · moving a parent closer to family · arranging a parent's move | How do I move an elderly parent? | parent far away · talk to elderly parents · LPA and moving a parent |
| /retirement-village-removals/ | retirement village removals | moving into a retirement village · retirement flat removals · retirement home moving service | Who helps with a move into a retirement village? | moving into a retirement village guide · retirement home moving service |
| /packing-service-uk/ | packing services | packing service cost · packing only services near me · packing help for older people | What does a packing service include? | packing for elderly · room-by-room packing guide |
| /house-clearance-for-the-elderly/ | house clearance for elderly | declutter service · declutter service near me · declutter service cost | What help is there to clear and sort an older person's home? (We sort and move; we are not a clearance firm.) | declutter a parent's house · sentimental belongings |
| /probate-house-clearance/ | probate house clearance | after death house clearance · probate house clearance cost · probate house clearance companies | What happens to a loved one's home after a death? (We sort and move; no legal advice.) | moving after probate · probate in Northampton |
| /elderly-move-manager-uk/ | senior move manager UK | elderly move manager · senior move managers UK · removals company for older people | What does an elderly move manager do? | who can help an older person move · full-service removals |
| /storage-during-your-move/ | storage when moving house Northampton | moving house storage · storage between house moves · short-term storage elderly move | How does storage between moves work? | storage when moving house |

## Tier 1: new service pages (added 18 Nov 2026, Part C of the growth sprint, 6 pages)
Both fill a gap with a different main keyword from every page above. Volumes still `needs-verification`.

| Page | Main keyword | Supporting keywords | Searcher's question | Why it is not a duplicate |
|---|---|---|---|---|
| /moving-after-bereavement/ | moving house after a bereavement | moving after the death of a husband or wife · help moving after losing a parent · moving home after a death | Can someone help me move after a bereavement? | /probate-house-clearance/ owns "probate house clearance" (the estate and clearing); this is the surviving partner's own move and the person, not the estate. ChatGPT was asked both questions. |
| /home-staging-before-you-sell/ | home staging before selling | property staging services UK · prepare house for sale · declutter before selling house | Who can help me stage and sort my home before I sell it to move? | "declutter service" stays on /house-clearance-for-the-elderly/; Silver and Gold own the package keywords. Staging is a stated part of Silver and Gold but had no page. |
| /moving-parent-with-dementia/ | moving an elderly parent with dementia | moving a parent with dementia · moving house with dementia · help moving a parent with dementia | Can someone help me move a parent with dementia? | The blog post stays the how-to (routine, familiar things); this page is the service. /moving-elderly-parent/ owns the general parent move. |
| /unpacking-and-settling-in-service/ | unpacking service | settling-in service · unpacking and settling in after a move · help unpacking after a move | Who unpacks and sets up my new home? | Two blog posts stay the how-to for settling in; this page states what Silver, Gold and Platinum include. |
| /long-distance-removals-for-older-people/ | long-distance removals for older people | long distance removals UK · moving an older person across the UK · long-distance move for an elderly parent | How is a long-distance move for an older person managed? | The 4 region pages and 16 town pages own places; this page owns the approach and links to them. |
| /moving-into-sheltered-housing/ | moving into sheltered housing | sheltered housing removals · retirement housing move · moving into assisted living | Who helps with a move into sheltered or retirement housing? | /retirement-village-removals/ owns "retirement village removals"; this page uses sheltered housing (sourced to Age UK). |

Considered and skipped: "fully managed moving service" (Silver Comfort owns "full service removals"), "house removals UK" (/areas-we-cover/ and the 16 town pages cover it). The first two pages went in on 18 Nov; the four after them were added the same day once the overlaps were checked.

## Part D additions (18 Nov 2026)
| URL | Main keyword | Source of the idea | Note |
|---|---|---|---|
| /compare/ | compare later-life moving options UK | Part D plan | Links only, no comparison content on the page (comparisons live in blog posts). |
| /blog/care-home-assisted-living-sheltered-housing-or-staying-put-uk/ | care home vs assisted living vs sheltered housing | ChatGPT prompts "senior vs assisted living comparison", "options for senior living" | Facts from Age UK and CQC pages read on 18 Nov 2026. |
| /blog/moving-an-elderly-parent-into-your-home-uk/ | moving an elderly parent into your home UK | Google UK suggestions: "elderly parent moving in with you uk (tax)" | Facts from Age UK "Moving in with family" and GOV.UK. |
| /blog/what-to-do-with-furniture-when-downsizing-uk/ | what to do with furniture when downsizing | Google UK suggestions: "how to get rid of furniture when downsizing" | Facts from GOV.UK "Dispose of household waste". |

## Stage 2 blog posts (18 Nov 2026)
| URL | Main keyword | Evidence | Sources read |
|---|---|---|---|
| /blog/moving-day-checklist-uk/ | moving day checklist uk | Google UK suggestions: moving day checklist (uk, printable, pdf, template) | GOV.UK conveyancing (leave property in agreed state) |
| /blog/moving-checklist-for-older-people-uk/ | moving checklist for older people | Suggestions: moving checklist for seniors; moving help for elderly | NHS GP registration, GOV.UK power of attorney, Age UK |
| /blog/moving-house-process-uk-step-by-step/ | moving house process | GSC queries on the checklist page: moving house process, steps to moving house uk | GOV.UK buying and selling a home, conveyancing |
| /blog/moving-into-a-care-home-from-hospital-uk/ | moving into a care home from hospital | Suggestion: moving to a care home from hospital | Age UK leaving hospital, moving into a care home |
| /blog/retirement-housing-in-northampton-uk-guide/ | retirement housing Northampton | Client target: Northampton first | WNC adult social care, Age UK Northamptonshire, housingcare.org, Age UK housing pages |
| /blog/moving-in-northamptonshire-councils-council-tax/ | moving house Northamptonshire council tax | Client target: Northampton first | WNC and NNC council pages, NHS, GOV.UK; council areas confirmed from Wikipedia |

Council areas (Wikipedia, read 18 Nov 2026): West Northamptonshire = Northampton, Daventry, Brackley, Towcester, Brixworth, Long Buckby; North Northamptonshire = Corby, Kettering, Wellingborough, Rushden, Raunds, Desborough, Rothwell, Irthlingborough, Thrapston, Oundle. Olney is in Buckinghamshire.

Considered and skipped: "luxury retirement communities" (the trade-body source could not be reached and the retirement housing guide already covers fees, care and rules), "what to do with parents belongings after death" (same keyword family as the probate post), "elderly parent refuses to move" (talk-to-parents post).

## Tier 1: Northampton and hub pages
| Page | Main keyword | Supporting keywords | Searcher's question |
|---|---|---|---|
| /elderly-removals-northampton/ | removals Northampton | house removals Northampton · removals Northampton prices · Northampton removals companies · elderly removals Northampton | Who does elderly removals in Northampton? |
| /services/ | removals and downsizing services Northampton | full-service removals · later-life moving services · packing and removals Northampton | What does a full later-life moving service include? |
| /how-it-works/ | how a managed house move works | later-life move process · elderly removals step by step · what happens on moving day | How does a managed move work, from first call to settled in? |

## Tier 1: Packages and package pages (added 17 Nov 2026)
Google UK suggestions checked the same day: "removals prices", "removals prices uk", "removals northampton prices", "how much do removals cost uk", "packing and removals (service)", "full service removals", "relocation service uk", "relocation company uk", "removals with storage", "bespoke relocation services", "relocation concierge services", "moving consultation". No suggestions for "downsizing consultation" or "removal packages" (the latter returns software results).

| Page | Main keyword | Supporting keywords | Searcher's question |
|---|---|---|---|
| /packages/ | removals prices | removals prices UK · removals Northampton prices · how much do removals cost UK | How much do removals cost, and what do I get for it? |
| /discovery/ | moving consultation | downsizing consultation · moving house advice · plan a later-life move | What happens in a moving consultation? |
| /bronze-essentials/ | packing and removals service | packing and removals · packing and removal companies · house packing and removals | What does a packing and removals service include? |
| /silver-comfort/ | full service removals | full service removal company · managed move · removals with unpacking | What is a full service removal? |
| /gold-prestige/ | relocation service UK | relocation company UK · removals with storage · house removals with storage | What does a relocation service do beyond removals? |
| /platinum-bespoke/ | bespoke relocation services | relocation concierge services · bespoke relocation · concierge move | What is a bespoke relocation or relocation concierge? |

Overlap check: /packages/ owns "removals prices"; the Northampton page keeps "removals Northampton" (prices are a supporting word there). /packing-service-uk/ owns "packing services"; Bronze owns "packing and removals service" (the combined package). /services/ keeps "removals and downsizing services".

## Tier 2: town pages (one template, 16 towns)
Pattern for each town page `/elderly-removals-[town]/`:
- **Main keyword:** `house removals [town]` (Google suggests "removals [town]" and "house removals [town]" for Kettering, Wellingborough, Corby and Daventry; "elderly removals [town]" gets no suggestion, so it is too rare to lead with)
- **Supporting:** `removals [town]` · `elderly removals [town]` · `removal companies [town]` · `residential removals [town]`
- **Searcher's question:** "Who does elderly removals in [town]?"
- **Unique content per town** (from `localAreas.json`): council, hospital, transport, local help, local FAQs and a real move where we have one.

**Priority:**
1. Kettering (real search: "residential removals kettering"), Wellingborough, Corby, Daventry, Towcester. These are close, North and West Northants, and have the most local data.
2. Rushden, Market Harborough, Rugby, Milton Keynes, Bedford.
3. Leicester, Coventry, Oxford, Cambridge, Peterborough, Banbury. These are longer moves; keep the pages light and do not over-invest.

## Tier 2: region pages (one template, 4 regions)
| Page | Main keyword |
|---|---|
| /elderly-removals-london-south-east/ | elderly removals London and the South East |
| /elderly-removals-home-counties/ | elderly removals Home Counties |
| /elderly-removals-south-west-coast/ | elderly removals South West |
| /elderly-removals-cotswolds-midlands/ | elderly removals Cotswolds and Midlands |

Supporting keyword for each: "long-distance move for an older person [region]". Searcher's question: "Can a Northampton firm handle my parent's move in [region]?"

## Tier 3: info pages
| Page | Main keyword | Supporting keywords | Searcher's question |
|---|---|---|---|
| /areas-we-cover/ | elderly removals across the UK | where Chayce works · Northamptonshire removals coverage | Do you cover my area? |
| /case-studies/ | elderly removals reviews and case studies | real later-life moves · downsizing client stories | What is it like to move with Chayce? |
| /elderly-removals-faq/ | elderly removals FAQ | downsizing questions · house removals questions | What do people ask before an elderly move? |
| /trust-and-safeguarding/ | DBS-checked removals | safe removals for vulnerable adults · insured removals older people | Is the team checked and insured? |
| /for-professionals/ | refer a client for a later-life move | care home move referral · moving service for social workers · solicitor referral removals | How do I refer an older client for a move? |

## Overlap check (done 17 Nov 2026)
- Every URL above has a different main keyword.
- **Downsizing:** "downsizing companies" (GSC) sits as a *supporting* keyword on `/downsizing-help-for-elderly/`. The blog post `downsizing-companies-uk-how-to-choose` keeps the question version ("how to choose a downsizing company") and links to the hub.
- **Care homes:** `/care-home-removals/` owns "care home removals". The care-home blog posts target checklist and question searches and link to the hub.
- **Northampton:** `/elderly-removals-northampton/` owns the town keyword. `/services/` uses "services Northampton", not "removals Northampton".

## Still to do
- [ ] Keyword Planner volumes for every main and supporting keyword (UK and Northamptonshire). Re-rank the priorities if volumes say otherwise. Needs Google Ads access.
- [ ] Re-export Search Console in early December and add any new searches to this map.
- [ ] When each page moves to the new design, set its title, H1, description, short answer and FAQs from its row here, and tick it off below.

| Page | On new design | Title / H1 / description set | Short answer + FAQs set |
|---|---|---|---|
| 9 service pages (care home, downsizing, parent, retirement, packing, house clearance, probate, storage, move manager) | yes (17 Nov, local) | yes | yes |
| /services/, /how-it-works/ | yes | yes | yes |
| /elderly-removals-northampton/ | yes | yes ("Removals Northampton") | yes |
| 16 town pages (one template) | yes | yes ("House Removals [town]") | yes (local FAQs kept) |
| 4 region pages (one template) | yes | unchanged keyword | yes |
| /areas-we-cover/, /case-studies/, /elderly-removals-faq/, /trust-and-safeguarding/, /for-professionals/ | yes | yes | yes |
| /packages/ (top kept as before) + 5 package pages | yes | yes (17 Nov) | yes |
