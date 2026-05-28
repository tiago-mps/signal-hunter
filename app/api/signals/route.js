export const runtime = 'edge'

export async function POST(req) {
  const { icp } = await req.json()

  const prompt = `You are a B2B signal strategist. Analyze this ICP and return a signal discovery map.

Company: ${icp.company}
Revenue: ${icp.revenue}
Headcount: ${icp.headcount || 'not specified'}
Buyer: ${icp.buyer || 'COO, VP Operations, or Founder'}
Pain: ${icp.pain}
Exclude: ${icp.exclude || 'none'}

Respond with ONLY a raw JSON object. No markdown. No backticks. Start with { and end with }.

{"icp_summary":"one clear sentence describing this ICP","tow_truck_insight":"2 sentences — who sees the pain before the prospect does, be creative and specific to this industry","signals":[{"name":"signal name","base_score":35,"why":"why this indicates buying intent for this specific ICP","sources":["source1","source2"]},{"name":"signal name","base_score":40,"why":"why this indicates buying intent","sources":["source1","source2"]},{"name":"signal name","base_score":30,"why":"why this indicates buying intent","sources":["source1","source2"]}]}`

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1200,
      messages: [{ role: 'user', content: prompt }],
    }),
  })

  const data = await res.json()
  const text = data?.content?.[0]?.text || ''
  return new Response(JSON.stringify({ raw: text }), {
    headers: { 'Content-Type': 'application/json' },
  })
}
