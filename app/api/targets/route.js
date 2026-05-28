export const runtime = 'edge'

export async function POST(req) {
  const { icp, signals } = await req.json()
  const sigNames = (signals || []).map(s => s.name).join(', ')

  const prompt = `You are a B2B prospecting strategist.

ICP: ${icp.company}, ${icp.revenue}, ${icp.headcount || '50-500 employees'}
Buyer: ${icp.buyer || 'COO, VP Operations, Founder'}
Pain: ${icp.pain}
Signals: ${sigNames}

Respond with ONLY a raw JSON array. No markdown. No backticks. Start with [ and end with ].

Generate exactly 10 realistic outreach targets for this ICP. Each target must have a concrete signal_detail (something you would actually find in a database), a short outreach_hook under 20 words that references the specific signal, and a score between 55 and 95.

[{"company":"Company Name","signal_type":"Signal name","signal_detail":"Specific thing observed","outreach_hook":"Short hook under 20 words","score":78}]`

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1400,
      messages: [{ role: 'user', content: prompt }],
    }),
  })

  const data = await res.json()
  const text = data?.content?.[0]?.text || ''
  return new Response(JSON.stringify({ raw: text }), {
    headers: { 'Content-Type': 'application/json' },
  })
}
