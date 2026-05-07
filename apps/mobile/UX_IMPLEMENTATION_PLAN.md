# Mobile UX Implementation Spec (Execution-Ready)

This document translates product requirements into implementable mobile workstreams with acceptance criteria.

## 1) Bottom Navigation IA

### Required tab order (left to right)
1. **Discover**
2. **Matches**
3. **Create**
4. **Events**
5. **Profile**

### Build requirements
- Keep `Create` centered and visually primary.
- Show icon + text label for all tabs.
- Persist tab state while switching tabs.

### Acceptance criteria
- Tab order exactly matches required IA on iOS + Android.
- Current tab is identifiable via selected state and accessibility label.
- Switching tabs preserves scroll position and in-progress forms where applicable.

---

## 2) Thumb-Zone + 2–3 Tap Rule

### Interaction constraints
- Place all critical actions in bottom 50% of viewport on standard phone breakpoints.
- Core journeys complete in **2–3 taps** from tab entry.

### Core journey targets
- **Discover -> Like profile** in <=2 interactions.
- **Matches -> Start chat** in <=3 interactions.
- **Create -> Publish** in <=3 interactions with smart defaults.
- **Events -> RSVP** in <=3 interactions.

### Implementation details
- Prefer sticky bottom CTA bars over top-right action buttons.
- Avoid placing primary actions inside overflow/ellipsis menus.
- Keep destructive actions secondary and isolated from primary CTA.

### Acceptance criteria
- UX audit confirms all core flows meet tap-budget.
- One-handed reach test passes for CTA locations on small/medium devices.

---

## 3) Perceived Performance + Resilience

### Skeleton loaders (required screens)
- Discover feed/cards
- Matches list
- Chat thread
- Events feed + event details

Rules:
- Skeleton dimensions match final layout to reduce CLS/layout jump.
- Use progressive hydration: text first, media second.

### Optimistic UI
Apply optimistic updates for:
- Like/swipe actions
- Match state updates
- Outbound chat send
- Event RSVP/join

Rules:
- Roll back on API failure.
- Show inline toast with retry action.
- Preserve local intent in queue while offline.

### Offline cache
- Read-through cache for Discover, Matches, Chats, Events.
- Write queue for outbound actions (likes/messages/RSVP).
- Visible status chips: `Queued`, `Sending`, `Sent`, `Failed`.

### Acceptance criteria
- Cold launch with no network shows cached content for previously visited tabs.
- Offline writes sync automatically on reconnect.
- Failed optimistic actions reconcile correctly without duplicate UI state.

---

## 4) Image/Video Pipeline

### Client-side preprocessing
- Images: resize long edge + quality compression before upload.
- Videos: transcode to mobile bitrate/resolution presets and extract poster frame.

### CDN variants
- Images: `thumb`, `card`, `full` variants.
- Video: poster + adaptive renditions.
- Prefer modern formats where supported (WebP/AVIF for images).

### Prefetch
- Prefetch next-N media items in Discover and Events.
- Prioritize in-viewport then near-viewport assets.
- Cancel stale requests on rapid scroll/tab switch.

### Acceptance criteria
- Reduced median media payload versus source upload.
- Feed scroll avoids visible blank media placeholders on stable networks.
- Prefetch cancellation prevents runaway concurrent requests.

---

## 5) UX Metrics (Product Analytics)

### Required KPIs
1. **time_to_first_match**
   - Start: first Discover impression in session
   - End: first successful match event

2. **chat_start_latency_ms**
   - Start: match thread open
   - End: first outbound message acknowledged

3. **funnel_dropoff_rate** by step
   - onboarding
   - discovery -> like -> match
   - match -> first message
   - event_view -> RSVP

### Event schema (minimum fields)
- `event_name`
- `user_id`
- `session_id`
- `journey_id`
- `flow_name`
- `step_name`
- `timestamp`
- `network_state`
- `platform`
- `app_version`
- `locale`
- `acquisition_channel`

### Example event names
- `discover_impression`
- `profile_liked`
- `match_created`
- `chat_opened`
- `message_sent`
- `event_viewed`
- `event_rsvp_submitted`

### Acceptance criteria
- KPI dashboards populate within 24h of release.
- Funnel can be segmented by platform, locale, and acquisition source.
- Journey correlation works across multi-step sessions via `journey_id`.

---

## Delivery Plan (Milestones)

### M1 — Navigation + tap-budget compliance
- Bottom-nav IA implementation.
- CTA repositioning for thumb zone.
- UX audit for <=3 tap core flows.

### M2 — Perceived performance
- Skeletons on 4 high-traffic surfaces.
- Optimistic likes + chat send.
- Rollback and retry UX.

### M3 — Offline-first reliability
- Read cache + write queue.
- Sync/retry orchestration and state chips.

### M4 — Media performance
- Upload compression/transcode.
- CDN variant wiring.
- Feed prefetch + cancellation.

### M5 — Observability
- KPI event instrumentation.
- Funnel + latency dashboards.
- Baseline targets and weekly review loop.
