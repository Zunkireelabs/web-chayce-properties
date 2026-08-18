# Chayce Properties — Package Routing Logic (source of truth)

Status: **draft, awaiting approval — no UI implemented against this yet.**

This document is the logic layer for customer routing. It must be approved before any HTML/CSS implementation happens. It does not change prices, services, or the existing package pages.

---

## 1. Verified current service scope (from live pages, unchanged)

Pulled directly from each package page's "What's Included" list — this is the actual current offering, not the shorthand brochure summary.

| Package | Price | What's Included (verbatim, current site) |
|---|---|---|
| Discovery Consultation | From £150 | 1-hour telephone or in-person consultation · Full assessment of your relocation needs · Personalised move plan document · Recommended timeline and budget breakdown · Priority access to our full-service packages |
| Bronze Essentials | From £995 | Professional packing of all rooms · Fully insured removal to your new home · Furniture reassembly at destination · Light cleaning of vacated property · Dedicated move coordinator |
| Silver Comfort | From £1,850 | Everything in Bronze Essentials · Home sorting and declutter assistance · Property staging for sale · Utility transfer management · Deep clean of vacated property · Post-move unpacking and setup |
| Gold Prestige | From £3,250 | Everything in Silver Comfort · Chauffeur-driven property viewings · Estate agent liaison · Solicitor coordination · Full home staging with photography · Storage solutions (up to 6 weeks) · White-glove unpacking & styling |
| Platinum Bespoke | From £6,500 | Everything in Gold Prestige · Fully bespoke & unlimited scope · Personal lifestyle concierge · New area orientation & introductions · Interior designer consultation · Ongoing post-move concierge support (3 months) · Dedicated senior coordinator throughout |

Packages are **strictly hierarchical/additive** — each tier is "everything in the tier below, plus...". This matters for the logic: it means scope, not situation, is the natural axis these packages were built on.

**⚠️ Ambiguity to flag, not resolve:** Bronze already includes "Dedicated move coordinator," while the brief's distinguishing feature for Silver is "a dedicated coordinator." As written, both pages claim a coordinator. I have not resolved this — it needs a business decision: is Bronze's coordinator the same role/level as Silver's, or should Bronze's bullet be reworded (e.g. "single point of contact") to keep the Bronze→Silver distinction clean? Flagging only; not changing copy in this phase.

Homepage packages-preview widget and the `packages/` comparison table both use the same short descriptions as the brief (`Expert guidance and a personalised move plan.` / `Packing, removals and light cleaning.` / `Full-service move with a dedicated coordinator.` / `Chauffeur viewings, staging, legal coordination & more.` / `Complete white-glove service for discerning clients.`) — these are consistent with the source brief and were not touched by the prior implementation. No contradiction there.

---

## 2. Final package positioning matrix (source of truth for implementation)

| Package | Primary problem solved | Situation dependency |
|---|---|---|
| **Discovery** (£150) | Customer is unsure what support they need, or wants an expert assessment before committing. | None — available regardless of stage. |
| **Bronze** (£995) | "I know where I'm going. I just need the physical move handled — packing, removal, a light clean." | Usually relevant to someone who's already secured their destination, but not exclusive to it — never hard-gated. |
| **Silver** (£1,850) | "I know where I'm going, but I want someone coordinating the whole move for me, not just doing the lifting." | Usually relevant to someone who's already secured their destination, but not exclusive to it. |
| **Gold** (£3,250) | "My relocation needs property-related work and/or higher-touch coordination" — chauffeur viewings, staging, legal/estate-agent liaison, storage. | Independent of search status. Applies to someone still viewing properties AND to someone already secured who still needs staging/legal coordination (e.g. selling their previous home) or broader white-glove handling. |
| **Platinum** (£6,500) | "I want the entire relocation experience handled at the highest level, fully bespoke." | Independent of search status — defined by breadth/level of service required, not by whether a home has been found. |

Price is not the primary axis of explanation for any package. Scope of problem solved is.

---

## 3. The two-dimension decision model

```
CUSTOMER
   │
   ▼
Dimension 1 — SITUATION (where are they?)
   │
   ├─ A. Already secured their home
   ├─ B. Still searching / securing their home
   └─ C. Not sure
   │
   ▼
Dimension 2 — SCOPE (what level of help do they actually need?)
   │
   ├─ Level 1: Straightforward physical move only            → Bronze
   ├─ Level 2: Managed/coordinated move, hands-off            → Silver
   ├─ Level 3: Broader/complex support (viewings, staging,
   │           legal coordination, or higher-touch handling)  → Gold
   └─ Level 4: Complete bespoke, white-glove, unlimited scope → Platinum
   │
   ▼
If scope is unclear at any point → Discovery
```

Situation is used to **frame which options are explained first**, not to select the package. Scope is what actually determines the package recommendation.

### Non-rigid routing rules (the only rules that should ever be encoded)

```
IF situation = already secured home:
    Explain move-focused options first (Bronze, Silver)
    AND still surface Gold/Platinum if their described requirements
    (e.g. staging their old property, legal coordination, high-touch handling)
    justify a higher tier.

IF situation = still searching:
    Explain broader relocation/search-related support (Gold) where the
    customer's needs match Gold's actual scope (viewings, staging, legal)
    AND surface Discovery if their needs are still unclear
    AND do not assume they need Gold merely because they haven't found a home
    (e.g. someone just wants Bronze/Silver held in reserve until they secure a place).

IF situation = unsure:
    Recommend Discovery.
```

What this explicitly forbids, and what the current site (post prior implementation) currently does, that must be corrected:

```
✗ IF found_home = yes  → recommend Bronze          (current hero button / table grouping does this)
✗ IF found_home = no   → recommend Gold             (current hero button / table grouping does this)
✗ "Already found your home and just need the move handled? See Bronze" on the Gold page
                                                      (implies Gold and "already found" are mutually exclusive)
✗ "Still searching...? See Gold Prestige" cross-links on Bronze & Silver pages
                                                      (implies searching automatically means Gold)
```

---

## 4. Discovery's role (explicit)

- Discovery is a **clarification/assessment entry point**, available to anyone at any stage, not a mandatory first step.
- It should never be framed as "buy this before you can buy anything else."
- It should be recommended specifically when: the customer doesn't know which package fits; their requirements are unclear; they want professional guidance before committing; or their situation is complex enough to need assessment (e.g. mixed needs — already found a home but also selling one, needing both a straightforward move and legal coordination).
- It is not gated by situation (works the same for "already secured," "still searching," or "unsure").

---

## 5. Cross-navigation principle

Every package page (and the comparison view) should let a customer see that a *different* tier — including a cheaper one — may be more appropriate, based on scope, not on reflexively pointing "already found home" customers at Bronze and "still searching" customers at Gold. Correct examples:

- Bronze page → "If your move also involves broader relocation support (viewings, staging, legal coordination), Gold may be more appropriate — regardless of whether you've already found your home."
- Gold page → "If you've secured your home and only need the move itself handled, Bronze or Silver may be sufficient."
- Any package page → a way to see/compare all five packages (already exists via the `packages/` comparison table).

The framing is always **scope-based** ("if you need X, consider Y"), never **situation-based** ("if you're at stage X, buy Y").

---

## 6. Contradictions found in the current live site (not fixed in this phase)

These were introduced by the prior implementation and directly conflict with the logic above. Listed for the next (UI) phase:

| Location | Current text/behavior | Why it's wrong |
|---|---|---|
| `template/index.html` hero buttons | "I'VE FOUND MY HOME" → `bronze-essentials/`, "STILL SEARCHING" → `gold-prestige/` | Hard-codes situation → package 1:1, exactly the forbidden model. |
| `template/packages/index.html` comparison table | Rows grouped under "Already Found Your Home" (Bronze, Silver) and "Still Searching / Need Broader Support" (Gold, Platinum) | Groups Gold/Platinum under "still searching," contradicting the rule that Gold/Platinum are scope-based, not situation-based. |
| `template/bronze-essentials/index.html` | "Ideal for... clients who've already found their home" + cross-link "Still searching...? See Gold Prestige" | Implies Bronze excludes anyone still searching, and that searching = Gold. |
| `template/silver-comfort/index.html` | Same pattern as Bronze. | Same issue. |
| `template/gold-prestige/index.html` | "Ideal for... clients still searching..." + cross-link "Already found your home...? See Bronze Essentials" | Implies Gold excludes people who've already secured a home, contradicting §2/§3 above (Gold applies regardless of search status). |
| `template/platinum-bespoke/index.html` | "...every detail of the **search**, move and settling-in..." | Mildly implies Platinum is tied to an active property search; should read as scope/breadth-based instead. |

None of these have been changed in this session — they remain exactly as previously implemented, pending your approval of this logic before the correction pass.

## 7. Open questions for you (not assumed)

1. Bronze's "Dedicated move coordinator" bullet vs. Silver's defining "dedicated coordinator" feature (§1 ambiguity) — should Bronze's wording change, or is the overlap intentional (e.g. different level of coordinator)?
2. Should the contact form's new "Have you already secured your home?" field remain purely informational (current behavior — captured but never auto-selects a package), or should it start influencing package pre-selection once this logic is implemented?
3. For "Level 3 justifies Gold even though home is secured" cases (e.g. staging/selling the old property, legal coordination) — is that scenario common enough in the actual business to be called out explicitly in copy, or kept general?
