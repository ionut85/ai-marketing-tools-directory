## Verdict

HYPD's OpenAI Ads MCP is a free, MIT-licensed server that lets Claude, Cursor or VS Code read your OpenAI (ChatGPT) Ads account: campaigns, ad groups, ads and performance reports, through 11 read-only tools. If you're running ChatGPT ads and want to ask an AI how they're doing, it's the quickest free way in, and it can't spend a cent of your budget. It is an early release, though. It only reads, it runs locally through Node.js rather than as a hosted connector, each API key covers a single ad account, and OpenAI ad accounts are US-only for now. It also isn't part of HYPD's hosted connector yet, so you can't see ChatGPT Ads next to Google and Meta in one place.

**HYPD rating: 4 out of 5 as a free reporting server.** We built it, so check the gaps below for yourself.

Get it on [GitHub](https://github.com/HYPD-AI/openai-ads-mcp), or run `npx -y @hypd-ai/openai-ads-mcp`. Running Google and Meta ads too? The hosted HYPD connector covers those.

[Try the HYPD connector free](https://app.hypd.ai/start?utm_source=tools&utm_content=hypd-openai-ads-mcp&utm_term=top)

## At a glance

| | OpenAI Ads MCP by HYPD |
| --- | --- |
| What it is | An open-source MCP server for the OpenAI Ads (Advertiser) API ([GitHub](https://github.com/HYPD-AI/openai-ads-mcp)) |
| Tools | 11, all read-only: ad account, campaigns, ad groups, ads, and insights at account, campaign, ad group and ad level |
| Write access | None yet. Create, update and pause are on the roadmap, behind a separate opt-in |
| AI clients | Claude Desktop, Cursor, VS Code and other MCP clients that run local servers over stdio. Not ChatGPT |
| Setup | Node.js 20+, then `npx -y @hypd-ai/openai-ads-mcp` with your OpenAI Ads API key |
| Auth | An OpenAI Ads API key from ads.openai.com, one key per ad account ([OpenAI docs](https://developers.openai.com/ads/api-reference/authentication)) |
| Hosting | Runs on your own machine. No hosted version yet |
| Price | Free, MIT licence. Ad spend is billed by OpenAI |
| Official? | No. A community project, not affiliated with or endorsed by OpenAI |
| Code | TypeScript, published on npm as [@hypd-ai/openai-ads-mcp](https://www.npmjs.com/package/@hypd-ai/openai-ads-mcp) |
| Last verified | 17 November 2026 |

## What users say

It's too new for public reviews. There's nothing on G2, Reddit or Product Hunt yet, and nobody has filed an issue on the GitHub repo. We'll add feedback here as it comes in, good or bad. If you've used it, [open an issue on GitHub](https://github.com/HYPD-AI/openai-ads-mcp/issues).

## Shortcomings and risks

The same strict treatment we give every other tool here.

| Shortcoming | Evidence | Workaround |
| --- | --- | --- |
| Read-only. It can't create, edit or pause anything, so you still make changes in OpenAI's Ads Manager | README: "This first release only reads data" ([GitHub](https://github.com/HYPD-AI/openai-ads-mcp)) | Use it to find what to change, then change it in Ads Manager |
| Local only. You need Node.js 20+ and a config file, which is fiddly for non-technical marketers. It doesn't work as a hosted connector in claude.ai or ChatGPT | Remote/HTTP transport is a roadmap item ([GitHub](https://github.com/HYPD-AI/openai-ads-mcp)) | Claude Desktop or Cursor on your own machine |
| It doesn't run inside ChatGPT. ChatGPT connects to remote MCP servers, and this one runs locally | [hypd.ai/openai-ads-mcp](https://www.hypd.ai/openai-ads-mcp) | — |
| One ad account per API key. Agencies with several ChatGPT Ads accounts need one server entry per account | [GitHub README](https://github.com/HYPD-AI/openai-ads-mcp), [OpenAI docs](https://developers.openai.com/ads/api-reference/authentication) | — |
| Not inside the HYPD connector yet. You can't compare ChatGPT Ads with Google and Meta in one conversation | [hypd.ai/openai-ads-mcp](https://www.hypd.ai/openai-ads-mcp) | Run it alongside the HYPD connector in the same Claude Desktop |
| Missing features: creative uploads, country targeting and Conversions API support | Roadmap in the [README](https://github.com/HYPD-AI/openai-ads-mcp) | — |
| Early API. OpenAI ad accounts are US-only, and HYPD's own page calls the API "young", with rough edges still turning up | [GitHub](https://github.com/HYPD-AI/openai-ads-mcp), [hypd.ai](https://www.hypd.ai/openai-ads-mcp) | — |
| Little community testing so far | A handful of GitHub stars and no issues filed yet | — |

What it gets right: it can't spend money by mistake, it's free and open source so you can read exactly what it does, and your API key stays in your local config and is sent only to OpenAI's API.

## Pricing

Free under the MIT licence. You pay OpenAI for ad spend as usual. The hosted HYPD connector for Google Ads, Meta, GA4 and six more platforms has a free plan, then starts at $19.99 a month ([hypd.ai/pricing](https://www.hypd.ai/pricing)).

## Ways to manage ChatGPT Ads with AI

| # | Option | Read or write | Platforms | From | The catch |
| --- | --- | --- | --- | --- | --- |
| **1** | **OpenAI Ads MCP by HYPD** | Read-only, can't spend money | OpenAI Ads | Free, open source | Local setup, no writes yet, one account per key |
| 2 | OpenAI Ads Manager (web) | Read and write | OpenAI Ads | Free | No AI assistant analysis across your data |
| 3 | [Maxma](/tools/maxma) | Read and write, with approval | ChatGPT Ads plus 9 other ad platforms | $99/mo | Credit-based AI usage, data hosted in the US |
| 4 | [Supermetrics](/tools/supermetrics) | Read (analysis) | ChatGPT Ads (early access) plus 150+ sources | $59/mo | One destination per plan, add-on costs, 1.5 on Trustpilot |

For free, risk-free reporting on ChatGPT Ads in Claude, this is the simplest option. If you need to change campaigns from an AI chat today, a paid platform like Maxma can write, or you can make changes yourself in OpenAI's Ads Manager. If most of your budget is still on Google and Meta, start with the HYPD connector and add this server next to it.

Get the server on [GitHub](https://github.com/HYPD-AI/openai-ads-mcp).

[Try the HYPD connector free](https://app.hypd.ai/start?utm_source=tools&utm_content=hypd-openai-ads-mcp&utm_term=table)

## FAQ

**Is there an official OpenAI Ads MCP server?** HYPD found no MCP server published by OpenAI. OpenAI's own Ads Manager is the official way to manage ChatGPT ads. HYPD's server is a community project.

**Can this MCP create or pause ChatGPT ads?** Not yet. It's read-only. Write actions are planned and will need an explicit opt-in.

**Is it free?** Yes, under the MIT licence. You only pay OpenAI for your ad spend.

**Which AI tools does it work with?** Claude Desktop, Cursor, VS Code and other MCP clients that run local servers over stdio. It doesn't run inside ChatGPT today, because ChatGPT connects to remote MCP servers and this one runs on your machine.

**Do I need an OpenAI Ads API key?** Yes. Create one under Settings at ads.openai.com. Each key covers one ad account.

**Is the OpenAI Ads MCP part of the HYPD connector?** Not yet. The hosted HYPD connector covers Google Ads, Meta, GA4, Merchant Center, Search Console, Tag Manager, LinkedIn, Microsoft and TikTok. The OpenAI Ads server runs separately.

## Read your ChatGPT ads in Claude today, for free

Install the OpenAI Ads MCP from [GitHub](https://github.com/HYPD-AI/openai-ads-mcp) or [npm](https://www.npmjs.com/package/@hypd-ai/openai-ads-mcp). For Google Ads, Meta, GA4 and six more platforms, with changes you approve before they go live, use the hosted HYPD connector. More than 30,000 people have signed up.

[Try HYPD free](https://app.hypd.ai/start?utm_source=tools&utm_content=hypd-openai-ads-mcp&utm_term=bottom)

*Last verified 17 November 2026.*

**Sources** (opened 17 November 2026): [GitHub repo](https://github.com/HYPD-AI/openai-ads-mcp) · [npm package](https://www.npmjs.com/package/@hypd-ai/openai-ads-mcp) · [hypd.ai/openai-ads-mcp](https://www.hypd.ai/openai-ads-mcp) · [OpenAI Ads API authentication](https://developers.openai.com/ads/api-reference/authentication) · [HYPD pricing](https://www.hypd.ai/pricing) · [Maxma](https://maxma.ai/) · [Maxma pricing](https://maxma.ai/pricing) · [Supermetrics pricing](https://supermetrics.com/pricing) · [Supermetrics on Trustpilot](https://www.trustpilot.com/review/supermetrics.com)
