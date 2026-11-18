## Verdict

Brian Wagner's AI Marketing Skills is a free, MIT-licensed GitHub repo of 20 marketing frameworks packaged as Agent Skills for Claude Code, plus Cursor, Windsurf, GitHub Copilot, Codex and others. It covers positioning, LinkedIn, content ideas, brand voice, competitor teardowns, cold outreach, case studies, homepage audits and an "AI discoverability" audit. The skills that used to be sold separately became free in November 2026. It's a well-organised way to stop retyping the same marketing prompts. But skills are instructions, not data. None of them connect to your ad accounts, analytics or search console, so the output is only as good as what you paste in. It's maintained by one person, though it's active: v4.1 shipped on 14 November 2026.

**HYPD rating: 3.5 out of 5.** A good free starting kit for marketing prompts in Claude. Not a source of truth about your campaigns.

Skills tell Claude how to think about marketing. HYPD gives Claude your actual numbers from Google Ads, Meta, GA4 and Search Console, plus HYPD's own marketing skills.

[Try HYPD free](https://app.hypd.ai/start?utm_source=tools&utm_content=brian-wagner-ai-marketing-skills&utm_term=top)

## At a glance

| | AI Marketing Skills |
| --- | --- |
| What it is | A GitHub repo of marketing Agent Skills, now at BrianRWagner/ai-marketing-claude-code-skills. The older ai-marketing-skills address redirects there ([GitHub](https://github.com/BrianRWagner/ai-marketing-claude-code-skills)) |
| Skills | 20, all free: 16 marketing skills and 4 productivity skills (daily briefing, meeting prep, tweet review, Obsidian vault cleanup) |
| Works with | Claude Code (native), Cursor, Windsurf, GitHub Copilot, OpenAI Codex. Claude.ai, ChatGPT, Grok and Meta Muse by uploading or pasting the SKILL.md |
| Install | Clone the repo and run `scripts/install.sh` (it has a `--dry-run` flag), or copy folders into `~/.claude/skills` |
| Connects to your data | No |
| Ad platform skills | None. Nothing for Google Ads, Meta or TikTok campaigns |
| Price | Free (MIT). The five skills that used to cost $9 to $19 became free in v4.0, November 2026 |
| Author | Brian Wagner, who describes himself as an AI Marketing Architect with 15+ years in marketing systems |
| GitHub | 450-plus stars and 100-plus forks |
| Last release note | v4.1, 14 November 2026 |
| Reviews | No G2, Capterra or Trustpilot reviews. Install counts on skill directories only |
| Last verified | 17 November 2026 |

## What we found

There are no reviews on the usual software review sites, and we found no Reddit threads about it. What exists is usage data from skill directories and a few write-ups, so treat this section as signals rather than reviews.

| Signal | Source |
| --- | --- |
| 450-plus GitHub stars and 100-plus forks, which is solid for a single-author marketing repo | [GitHub](https://github.com/BrianRWagner/ai-marketing-claude-code-skills) |
| Thousands of installs logged across skill directories. The most installed include LinkedIn Profile Optimizer, Voice Extractor and Homepage Audit | [Skillselion](https://skillselion.com/skills/brianrwagner/ai-marketing-claude-code-skills) |
| Praised for packaging proven marketing frameworks so the agent follows them instead of giving generic answers | [Neura Market listing](https://www.neura.market/ai-tools-directory/all/brianrwagner-ai-marketing-skills) |

| Complaints and caveats | Source |
| --- | --- |
| Needs an AI agent to run. It isn't a standalone tool | Neura Market listing |
| Docs assume you're comfortable with Claude Code and a terminal | Neura Market listing |
| Limited to marketing frameworks | Neura Market listing |
| Star and install counts disagree from one directory to the next, and some directories still list skills the repo dropped in November 2026, so popularity is hard to judge | Skillselion vs GitHub vs [skills.sh](https://skills.sh/brianrwagner/ai-marketing-claude-code-skills) |

## Shortcomings and risks

| Risk | Evidence | How HYPD handles it |
| --- | --- | --- |
| **No access to your data.** A homepage audit or positioning exercise runs on whatever you paste in, so it can be confidently wrong | Skills are SKILL.md instruction files with no connectors | HYPD connects Claude to Google Ads, Meta, GA4, Search Console and more, so answers are based on your real numbers |
| **Nothing for paid media.** No skill runs or audits a campaign | Skill list on [GitHub](https://github.com/BrianRWagner/ai-marketing-claude-code-skills) | HYPD's MCP reads campaigns and drafts changes you approve, plus marketing methodology guides Claude can load for audits |
| **One maintainer, and the library changes shape between versions.** v4.0 removed several skills and added five formerly paid ones, so older guides and directory listings no longer match the repo | Brian Wagner is the only listed contributor. [CHANGELOG](https://github.com/BrianRWagner/ai-marketing-claude-code-skills/blob/main/CHANGELOG.md) | — |
| **You run someone else's install script and load their instructions into your agent.** Skills can tell the agent to do anything, and several ship Node.js scripts. Directories also carry copies under other owners, so install from the original repo | `bash scripts/install.sh`. A public skill scanner flagged one line in a since-removed skill and found no sign of malice ([issue #5](https://github.com/BrianRWagner/ai-marketing-claude-code-skills/issues/5)) | Read every SKILL.md before installing. HYPD changes go through drafts you approve, and every change is logged |
| **The "AI discoverability audit" is a manual checklist, not a measurement.** You run the queries in ChatGPT, Perplexity, Claude and Google yourself and score the answers | Skill instructions ([SKILL.md](https://github.com/BrianRWagner/ai-marketing-claude-code-skills/blob/main/ai-discoverability-audit/SKILL.md)) | For measured AI visibility, use a tracker. To read your ChatGPT Ads results in Claude, HYPD has a free [OpenAI Ads MCP](/tools/hypd-openai-ads-mcp) |

Where this repo is ahead, to be fair: it's free, MIT-licensed and covers organic work HYPD doesn't touch, like LinkedIn profiles, case studies, competitor teardowns and voice matching. If you use Claude Code and want better marketing writing prompts, it's worth installing a few after reading them.

## Pricing

Free under the MIT licence. All 20 skills are in the [GitHub repo](https://github.com/BrianRWagner/ai-marketing-claude-code-skills), with no paid tier. Until v4.0 (14 November 2026), Founder Intelligence, Competitor Intel Brief, Brand Voice Extractor, Brand Positioning Audit and the full AI Discoverability Audit were sold separately for $9 to $19. They're now part of the free library. Source: the README and [CHANGELOG](https://github.com/BrianRWagner/ai-marketing-claude-code-skills/blob/main/CHANGELOG.md), checked 17 November 2026. You also pay for the AI tool that runs them, such as a Claude plan.

## Alternatives

| # | Tool | Best for | The catch |
| --- | --- | --- | --- |
| 1 | **HYPD** (our tool) [Try free](https://app.hypd.ai/start?utm_source=tools&utm_content=brian-wagner-ai-marketing-skills&utm_term=table) | Marketing in Claude or ChatGPT with live data from Google Ads, Meta, GA4 and Search Console, plus built-in marketing guides | Paid-ads focus. It won't write your LinkedIn posts |
| 2 | AI Marketing Skills (Brian Wagner) | Free organic marketing frameworks for Claude Code | No data access, single maintainer |
| 3 | Anthropic's official skills | Document, spreadsheet and slide skills built by Anthropic | General-purpose, not marketing-specific |
| 4 | Other community skill repos on [skills.sh](https://skills.sh) and [Skillselion](https://skillselion.com) | Picking individual skills from many authors | Quality varies widely; read before you install |
| 5 | Writing your own skills | Encoding your team's own process | Takes time to build and maintain |

Skills and connectors solve different halves of the same problem. A skill tells Claude how a good marketer would approach a task. A connector tells Claude what is actually happening in your accounts. A campaign audit with only the first half is a well-structured guess. HYPD gives you both for paid media: Claude can load HYPD's audit and performance-review guides and run them on your real Google Ads, Meta and GA4 data.

## FAQ

**Is Brian Wagner's AI Marketing Skills free?** Yes. All 20 skills are free under the MIT license. The five that used to be paid became free in v4.0, in November 2026.

**Does it work outside Claude Code?** Yes, with Cursor, Windsurf, GitHub Copilot and OpenAI Codex. In Claude.ai, ChatGPT, Grok or Meta Muse you upload or paste the SKILL.md content by hand.

**How do I install it?** Clone the repo and run `bash scripts/install.sh`, or copy the skill folders into `~/.claude/skills`.

**Does it include Google Ads or Meta Ads skills?** No. It covers positioning, content, LinkedIn, outreach and audits, not paid campaigns.

**Are Claude skills safe to install?** A skill is a set of instructions your agent will follow. Read each SKILL.md before you install it, especially from a single-author repo.

**What's the difference between a skill and an MCP?** A skill is instructions. An MCP, like HYPD's, connects Claude to a live system such as your ad accounts.

## Good frameworks need real numbers

HYPD connects Claude and ChatGPT to your Google Ads, Meta, GA4 and Search Console, with marketing guides built in and every change drafted for your approval. Free to start, no card needed.

[Start free](https://app.hypd.ai/start?utm_source=tools&utm_content=brian-wagner-ai-marketing-skills&utm_term=bottom)

*Last verified 17 November 2026.*

**Sources** (opened 17 November 2026): [GitHub: BrianRWagner/ai-marketing-claude-code-skills](https://github.com/BrianRWagner/ai-marketing-claude-code-skills) · [CHANGELOG](https://github.com/BrianRWagner/ai-marketing-claude-code-skills/blob/main/CHANGELOG.md) · [brianrwagner.com/skills](https://www.brianrwagner.com/skills) · [Skillselion: install data](https://skillselion.com/skills/brianrwagner/ai-marketing-claude-code-skills) · [Neura Market listing](https://www.neura.market/ai-tools-directory/all/brianrwagner-ai-marketing-skills) · [skills.sh listing](https://skills.sh/brianrwagner/ai-marketing-claude-code-skills)
