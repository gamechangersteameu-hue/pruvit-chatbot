require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Anthropic = require('@anthropic-ai/sdk');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const GMR_KNOWLEDGE_BASE = `
# PRÜVIT GROWTH MARKET ROYALTIES (GMR) v6.3 — COMPLETE COMPENSATION PLAN

## PRÜV-OLOGY: GRUNDBEGRIFFE / KEY DEFINITIONS

### Mitglieder / Members
- **Customers**: Anyone who purchases a product. Can join VIP Club. Limit: 1 account per household.
- **SmartShip Customers**: Customers with a recurring order. Get additional VIP Club benefits.
- **Partners**: Pay annual membership fee of $49 USD. Get access to Partner Backoffice, track GMR progress.

### Qualification to Earn (Partners)
- Minimum **50 PQV** per qualifying cycle (month)
- **Engaged**: Partner HAS qualified for minimum PQV in current qualifying month
- **NOT Engaged**: Partner has NOT qualified in the previous 31-day qualification cycles
- Max 40% of PQV requirement can come from Partner's own orders

### Pay Periods
- **Weekly**: Begins Monday 12:00am, ends Sunday 11:59pm (RTZ). Paid following Friday.
- **Monthly**: Based on calendar month. Paid on 15th of following month.
- **Elite Bonus Period**: 6-week period beginning Monday 12am.

### Volume Types
- **BV (Bonus Value)**: Points assigned to commissionable products — used to calculate commissions
- **QV (Qualification Value)**: Points assigned to commissionable products — used to determine rank and Dual Team qualifications
- **DV (Dollar Value)**: Actual price paid in customer's currency converted to USD — used for 3FF points
- **PQV (Personal Qualifying Volume)**: Total QV from Partner's own purchases + sales to their Customers (31-day lookback, 1-day grace period)
- **PTV (Personal Team Volume)**: Total QV in first level of Sponsorship Tree. Includes personally enrolled Customers and Partners. Does NOT include QV from customers of enrolled Partners. Does NOT include Partner's own purchases.
- **NPQV (New Personal Qualifying Volume)**: QV from one-time orders in first 30 days of new enrollees AND/OR first SmartShip processed.
- **GV (Group Volume)**: Total QV in Placement Tree for a calendar month (including personal orders). Resets monthly, never carries over.
- **GBV (Group Bonus Volume)**: Total BV in Placement Tree (including personal orders).
- **TV (Team Volume)**: Total QV in first THREE levels of Sponsorship Tree + personally enrolled Customers. Includes Customers of Partners on first 3 levels. Does NOT include Partner's own purchases.

### Trees / Strukturen
- **Sponsorship Tree**: Downline hierarchy with personally enrolled Partners on first level only
- **Placement Tree**: Entire downline hierarchy based on how Partners are positioned (including placed Partners)
- **Dual Team / Binary Tree**: Left and Right Teams

### Rank Types
- **Achieved Rank**: Highest rank ever achieved — permanently assigned while engaged
- **Paid Rank**: Rank qualified for in that week/month — what you're paid at
- **Current Rank**: Rank during pay period (can change before period ends)
- **Pending Period**: Monthly Paid Rank confirmed on 15th of following month

---

## RANKS AND QUALIFICATIONS

| Rank | PQV | EP (Engaged Partners) | TV | GV |
|------|-----|----------------------|-----|-----|
| R1 - Prüver | 50 | 0 | 200 | 250 |
| 1 Star - R1 | | | 250 | 350 |
| 2 Star - R1 | | | 300 | 500 |
| 3 Star - R1 | | | 350 | 1,000 |
| R2 - Prüver | 100 | 2 | 500 | 1,500 |
| 1 Star - R2 | | | 1,000 | 2,500 |
| 2 Star - R2 | | | 1,500 | 3,500 |
| 3 Star - R2 | | | 2,000 | 4,500 |
| R3 - Prüver | 150 | 2 | 2,500 | 5,000 |
| 1 Star - R3 | | | 3,000 | 6,000 |
| 2 Star - R3 | | | 3,500 | 7,000 |
| 3 Star - R3 | | | 4,000 | 8,000 |
| R4 - Prüver | 150 | 2 | 5,000 | 10,000 |
| 1 Star - R4 | | | 5,500 | 12,500 |
| 2 Star - R4 | | | 6,000 | 15,000 |
| 3 Star - R4 | | | 6,500 | 17,500 |
| R5 - Prüver | 150 | 2 | 7,500 | 20,000 |
| 1 Star - R5 | | | 9,000 | 22,500 |
| 2 Star - R5 | | | 11,000 | 25,000 |
| 3 Star - R5 | | | 13,000 | 27,500 |
| **CIRCLE OF CHAMPIONS** | | | | |
| R6 - Champion | 200 | 5 | 15,000 | 30,000 |
| 1 Star - R6 | | | 17,500 | 45,000 |
| 2 Star - R6 | | | 20,000 | 60,000 |
| 3 Star - R6 | | | 25,000 | 75,000 |
| R7 - 100k Champion | 200 | 5 | 30,000 | 100,000 |
| 1 Star - R7 | | | 35,000 | 125,000 |
| 2 Star - R7 | | | 40,000 | 150,000 |
| 3 Star - R7 | | | 45,000 | 200,000 |
| R8 - 250k Champion | 250 | 10 | 50,000 | 250,000 |
| 1 Star - R8 | | | 60,000 | 350,000 |
| 2 Star - R8 | | | 70,000 | 450,000 |
| 3 Star - R8 | | | 85,000 | 600,000 |
| R9 - 750K Champion | 250 | 10 | 100,000 | 750,000 |
| 1 Star - R9 | | | 125,000 | 800,000 |
| 2 Star - R9 | | | 150,000 | 850,000 |
| 3 Star - R9 | | | 175,000 | 925,000 |
| R10 - 1m Champion | 250 | 10 | 250,000 | 1,000,000 |
| Legend | 250 | 10 | 300,000 | 2,000,000 + develop 1 current R10 in first 3 levels of Sponsor Tree |

**70% RULE**: No more than 70% of GV can come from one team. A team = any personally enrolled Partner's entire Community volume.

**Rank Qualification Rules:**
- PQV from Partner's own purchases + Customer sales
- Engaged Partners (EP) must: be personally enrolled AND have 50 PQV
- TV is compressed based on Partner engaged status; TV does NOT include personal orders
- GV is based on Placement Tree, resets monthly, never carries over
- No GV is ever carried over

---

## WAYS TO GET PAID — ALLE BONUSPROGRAMME

### 1. VIP BONUS (VIP)
**Purpose**: Earn bonus cash for building a foundation of personal VIP Customers.
**Eligibility**: Qualified and Engaged Partners
**Qualifying cycle**: Monthly
**Pay period**: Monthly

**VIP Customers = Personal Customers with Active SmartShip + order processes in qualifying cycle (min 80 QV each). Need 5+ to qualify.**

| VIP Customers | First Time Bonus | Ongoing Bonus |
|---------------|-----------------|---------------|
| 5 | $100 | — |
| 10 | $250 | $100 |
| 25 | $500 | $200 |
| 50 | $1,000 | $500 |

**Important Notes:**
- Customers must maintain Active SmartShip during Pending Period for bonus to be paid
- Ongoing bonus (maintenance payout) begins at 10 customer level
- 1st time bonus only paid ONCE per level — if you skip a level and fall back, no 1st time bonus for skipped level

---

### 2. 3 FOR FREE PROGRAM (3FF)
**Purpose**: Get your product FREE every month by referring 3 SmartShip Customers.
**Eligibility**: ALL Customers AND Partners (both can participate!)
**Qualifying cycle**: Monthly
**Pay period**: 1st day of Month
**What you receive**: 3FF Points = average of your three highest qualifying Customer orders

**Eligibility Requirements:**
- 3 personally enrolled Customer orders (New Volume and SmartShip Orders, different customers, 1 order per customer)
- Personal order placed during qualification cycle (no minimum)
- Personal active SmartShip order (no minimum)

**How 3FF Points Work:**
- Points are 1:1 ratio, paid in USD
- Can be used on approved products for SmartShip orders
- Partial 3FF points can be applied to subtotal (excluding tax and shipping)
- SmartShip automatically uses 3FF points up to maximum $350 USD
- Unused 3FF Points expire after 90 days
- 3FF Points are NOT transferable and NOT redeemable for cash
- If more than 3 qualifying customer orders: uses 3 LARGEST orders of the month
- Only 1 order per customer applied; if multiple orders, highest value used
- Orders using 3FF Points for complete value (0 DV) still count as qualifying customer but lower the average

---

### 3. RETAILER BONUS (RB)
**Purpose**: Pays a percentage of all BV produced by personally enrolled Customers and Partners based on combined monthly volume.
**Eligibility**: Qualified and Engaged Partner
**Qualifying cycle**: Monthly
**Pay period**: Monthly

| Monthly Customer Volume (QV) | Pays (% of BV) |
|------------------------------|----------------|
| 0–249 | 10% |
| 250–999 | 15% |
| 1,000–1,999 | 20% |
| 2,000–2,999 | 25% |
| 3,000+ | 30% |

**BV Import for Upline (RRB & Champion Bonus affected):**
- 10% RB level → BV imported at 90% for upline
- 15% RB level → BV imported at 80% for upline
- 20% RB level → BV imported at 70% for upline
- 25% RB level → BV imported at 60% for upline
- 30% RB level → BV imported at 50% for upline

**Notes:**
- Levels based only on PTV orders for the calendar month (personally enrolled customers and partners)
- NEW Partner's orders within their first 30 days NOT included in QV to determine level or BV payout

---

### 4. CHAMPION CAR BONUS (CCB)
**Purpose**: Prüvit pays up to $800 per month towards luxury car lease/purchase.
**Eligibility**: Qualified and Engaged Partners
**Qualifying cycle**: 2 consecutive calendar months at Rank 6+
**Pay period**: Monthly

**Requirements:**
- Achieve AND maintain Rank 6 (200 PQV / 5 eligible Partners / 15,000 TV / 30,000 GV) or higher
- After 2 consecutive months at Rank 6+, receive first CCB
- Continue to maintain Rank 6+ to keep receiving CCB

**Car Requirements:**
- Car must be less than 3 years old at time of purchase/lease
- Must be Pruvit branded (submit design to support@pruvithq.com)
- Submit CCB form available in the Cloud PRIOR to signing papers
- Must post at least 3 times/month on public Social Media, tag @JustPruvit
- Car must be new purchase/lease made no earlier than 90 days prior to earning Car Lease Token (CLT)

**Car Lease Tokens (CLT):**
- 1 CLT earned each month you qualify
- Redeemable up to 30 days after paid out via Monthly Rewards (15th of every month)
- CLT earned more than 30 days ago cannot be redeemed
- No cash option available

**If rank drops:**
- Falls to Rank 5: 50% payment covered for maximum 2 additional months
  - If not back to Rank 6 after 2 months: CCB payments cease
  - If falls to Rank 4 at ANY time: all 50% CCB payments cease PERMANENTLY
- Example: Car Qualified R6 earns full CCB in January, drops to R5 February, R4 March, R5 April → earns 50% CCB in February ONLY. No further CCB even getting back to R5.
- If Partner loses CCB: can requalify for full CCB by again achieving Rank 6
- Alternating R6/R5 every other month: possible to receive alternating 100%/50% CCB perpetually

**Annual Requirements:**
- Annual Proof of Purchase documents by anniversary date
- If no CCB payment for 12 consecutive months: removed from CCB Program (can rejoin by requalifying)

---

### 5. DUAL TEAM SYSTEM + STEP BONUS (DTSB)
**Purpose**: Fast team building by growing TWO legs (Left and Right).
**Eligibility**: Qualified and Engaged Partners
**Qualifying cycle**: Ongoing (no time limit)
**Pay period**: Weekly
**Maximum**: Up to $2,000 per node per week

**How it Works:**
- Purchase a pack to receive Nodes (1, 2, or 3 nodes)
- Each week: Left Team needs 1,000 QV AND Right Team needs 1,000 QV = 1 Step completed
- 5 Steps per week = maximum (Cycled / Maxed out)
- Each week begins again at Step 1

**Step Payout Ladder:**
| Step | Payout |
|------|--------|
| Step 1 | $200 |
| Step 2 | $300 |
| Step 3 | $400 |
| Step 4 | $500 |
| Step 5 | $600 |
**Maximum per Node per Week: $2,000**

**Eligibility Requirements:**
- 50+ PQV / Engaged Status
- Personally Enrolled Partners: Qty 2 (one on Left, one on Right)
- Maintain Personally Enrolled Engaged Promoters: Qty 2 (one on Left, one on Right) with 50 PQV
- *Personal Partner Packs count: Accelerator Pack = 2 PE Promoters; Dual Partner Pack = 1 PE Partner*

**Rules:**
- Volume added to Dual Team Tree within new Partner's first 30 days only
- Volume carries forward until both teams reach 1,000 QV (then Step bonus paid)
- Once bonus paid, volume used for that step removed from both Left and Right teams
- Partner can earn in MULTIPLE nodes per week if eligible

---

### 5x5 ELITE EXPANSION BONUS
**Trigger**: Qualify all 5 Steps for 5 CONSECUTIVE weeks (5x5)
**What you receive:**
1. **Expansion Node** (additional node for your business — earned first time only, max 1 additional node)
2. **Share in Elite Expansion Bonus Pool** (paid every 6 weeks)
   - Each time you earn 5 steps for 5 consecutive weeks = 1 share in pool
   - Pool shares earned on weekly basis, accumulated, then paid on Friday after Elite Bonus period ends
- Once qualified for pool, shares earned when each of your Nodes cycles

---

### 6. RESIDUAL ROYALTY BONUS (RRB)
**Purpose**: Monthly commission based on % of BV up to first ELEVEN levels of Placement Tree.
**Eligibility**: Qualified and Engaged Partners
**Qualifying cycle**: Monthly
**Pay period**: Monthly

**Compression**: System compresses UP from as many levels down as needed to achieve 8 final levels of Engaged Partners (or max Engaged Partners in that leg). Non-engaged Partners are compressed out.

**Partner orders in first 30 days NOT included in RRB.**
**Customer BV adjusted based on Retailer Bonus payout level.**

**RRB Commission Table (% of BV by Rank):**

| Level | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 | R10 |
|-------|----|----|----|----|----|----|----|----|----|----|
| Level 1 | 5% | 5% | 5% | 5% | 5% | 5% | 5% | 5% | 5% | 5% |
| Level 2 | — | 7% | 7% | 7% | 7% | 7% | 7% | 7% | 7% | 7% |
| Level 3 | — | — | 7% | 7% | 7% | 7% | 7% | 7% | 7% | 7% |
| Level 4 | — | — | — | 5% | 5% | 5% | 5% | 5% | 7% | 7% |
| Level 5 | — | — | — | — | 5% | 5% | 5% | 5% | 5% | 7% |
| Level 6 | — | — | — | — | — | 5% | 5% | 5% | 5% | 5% |
| Level 7 | — | — | — | — | — | — | 5% | 5% | 5% | 5% |
| Level 8 | — | — | — | — | — | — | — | 5% | 5% | 5% |
| Level 9 | — | — | — | — | — | — | — | 1% | 1% | 1% |
| Level 10 | — | — | — | — | — | — | — | 1% | 1% | 1% |
| Level 11 | — | — | — | — | — | — | — | 1% | 1% | 1% |

**Power-up RRB** (additional eligibility for R8+):
- Recognition Rank: R8 or higher
- Personal Team Volume (PTV): 1,500 PTV in qualifying period
- Total Unique personally enrolled VIP: 10+ (min 80 QV) in qualifying period
- Active personally enrolled Rank 2+ legs: Qty 3

**VIP Rules for Power-up:**
- Can be Customers or Partners (new or existing)
- At least 5 of the 10 must be actual Customer type (not Partner)
- If customer upgrades to Partner: no longer counts as one of the 5 "Customer" type
- VIPs must have SmartShip set up to be considered a "VIP"

---

### 7. CHAMPION BONUS (RCB)
**Purpose**: In addition to RRB, earn % of BV from UNLIMITED levels following Sponsorship Tree through 5 Generations.
**Eligibility**: Qualified Rank 6 or above, Engaged Partners
**Qualifying cycle**: Monthly
**Pay period**: Monthly

**How it works**: Follows Sponsorship Tree linearly DOWN through unlimited levels of Rank 1–5 Partners, stopping at (but including) the 5th Generation Rank 6+ Partner.

**Champion Bonus Table (% of BV by Rank and Generation):**

| Generation | R6 | R7 | R8 | R9 | R10 |
|------------|----|----|----|----|-----|
| Generation 1 | 3% | 3% | 3% | 3% | 3% |
| Generation 2 | 2% | 3% | 4% | 4% | 4% |
| Generation 3 | 1% | 1% | 2% | 3% | 5% |
| Generation 4 | — | 1% | 1% | 2% | 4% |
| Generation 5 | — | — | 1% | 1% | 2% |

**Notes:**
- Partner orders in first 30 days NOT included
- Customer BV adjusted based on Retailer Bonus payout level

---

### 8. LEADERSHIP MATCHING BONUS (LMB)
**Purpose**: Earn a % of the Residual Royalty Bonus earned by Engaged Partners in your first 3 levels (Sponsorship Tree).
**Eligibility**: Qualified and Engaged Partners
**Qualifying cycle**: Monthly
**Pay period**: Monthly
**What you receive**: 20% of total paid RRB on up to 3 Levels of Sponsorship Tree

**LMB Percentage (ALL Ranks 6–10: 20% on all 3 levels):**
- Level 1: 20%
- Level 2: 20%
- Level 3: 20%
*(Compressed to include only Engaged Partners)*

**Eligibility Requirements:**
- Rank Requirement: Achieve Rank 6 or above
- Personal Team Volume (PTV): 1,500 QV
- Total Unique personally enrolled VIP who place commissionable order: Qty 10 (80 QV min) within Calendar month
- Active personally enrolled Rank 2+ legs: Qty 3
- Dual Team / Binary Fast Team-Building Bonus: Step 2 payout level, at least ONCE in current OR previous month

**LMB Rules:**
- RM (Royalty Match) paid from RC of ALL Partners within three levels regardless of rank
- Your own rank is the only factor in determining the RM percentage
- If a Partner is NOT commission qualified: upline Partners will NOT receive RM on that Partner's unpaid RC
- Compression rules apply: first 3 levels should only include Engaged (but not necessarily Commission Qualified) Partners

---

## PLACEMENT LOUNGE

**What it is**: Strategic team building tool. When you personally enroll Partners, they automatically go into your Placement Lounge for up to 6 months.

**How it Works:**
- New Partners automatically placed in Placement Lounge (also on your 1st level of RRB)
- During 6 months: you (sponsor) can optionally MOVE the new Partner into an open position in existing leg of Placement Tree
- Any BV/QV moves with the Partner when placed
- BV/QV moves ONLY within Placement Tree — NOT Sponsorship Tree or Dual Teams/Binary Tree

**CRITICAL RULES:**
- Once placed, Partners CANNOT be moved again — NO EXCEPTIONS
- If you don't move anyone within 6 months: they permanently stay on your 1st level
- All moves are FINAL

---

## ADDITIONAL FOOTNOTES AND DISCLOSURES

### Unique Personally Enrolled Customers
1. If Customer enrolls, places order, then resigns same month → still counts toward enroller's total for that month
2. Only ONE personally enrolled Customer per household counts toward total. But multiple Partners can count Customers from same household if each has unique enroller.
3. Unique households based on address profile
4. Customer places order then enrolls as Partner 2+ hours later in same month → still counts as Customer for original enroller. If less than 2 hours: order converted to Partner order, does NOT count toward Customer count.
5. Engaged Partner (50+ PQV) converted to Customer during month → counts toward enroller's Customer total

### NPQV (New Personal Qualifying Volume)
1. Used as qualifier for certain bonuses/promos only
2. QV from one-time orders in first 30 days of newly enrolled customer/partner
3. QV from very first SmartShip processed on account
4. Customer upgrading to Partner triggers new 30-day NPQV period
5. Cold accounts: Customer inactive 12+ months → counts for NPQV again when order placed. Partner downgraded to Customer for 12+ months → counts for NPQV again when order placed.

### Income Claims
Results are based on many factors. No guarantee of income. Past results not indicative of future success. All income examples are just examples.

### Personal Purchases
No purchase requirement exists to become a Partner or advance in ranks. The program is built on retail sales to Customers. Excessive self-purchasing primarily to qualify for advancement is prohibited.
`;

// Keep last N messages to save tokens
const MAX_HISTORY = 6;

app.post('/api/chat', async (req, res) => {
  const { message, history = [] } = req.body;

  if (!message || !message.trim()) {
    return res.status(400).json({ error: 'Message is required' });
  }

  // Trim history to last MAX_HISTORY messages
  const trimmedHistory = history.slice(-MAX_HISTORY);

  // Build messages array
  const messages = [
    ...trimmedHistory,
    { role: 'user', content: message }
  ];

  try {
    const response = await client.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 1024,
      system: [
        {
          type: 'text',
          text: `You are a knowledgeable assistant for the Prüvit Growth Market Royalties (GMR) compensation plan. You have complete expertise in all aspects of the GMR program.

IMPORTANT RULES:
- Answer ONLY based on the knowledge base provided below
- Be clear, precise, and concise
- Use bullet points and tables when helpful
- Respond in the SAME LANGUAGE the user writes in (German or English)
- If a question is not covered in the knowledge base, say so clearly
- Do NOT invent or assume information not in the knowledge base
- When giving numbers, be exact

KNOWLEDGE BASE:
${GMR_KNOWLEDGE_BASE}`,
          cache_control: { type: 'ephemeral' }
        }
      ],
      messages
    });

    const assistantMessage = response.content[0].text;

    res.json({
      reply: assistantMessage,
      usage: {
        input: response.usage.input_tokens,
        output: response.usage.output_tokens,
        cache_read: response.usage.cache_read_input_tokens || 0,
        cache_write: response.usage.cache_creation_input_tokens || 0
      }
    });
  } catch (error) {
    console.error('Claude API error:', error.message);
    res.status(500).json({ error: 'Failed to get response from AI' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Pruvit GMR Chatbot running on http://localhost:${PORT}`);
});
