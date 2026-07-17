// Vercel Serverless Function — Proxy to Genfity AI Gateway (bypasses CORS)
export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { model, messages, temperature, apiKey } = req.body;

  if (!apiKey) {
    return res.status(400).json({ error: 'Missing apiKey in request body' });
  }

  if (!model || !messages) {
    return res.status(400).json({ error: 'Missing model or messages in request body' });
  }

  try {
    const response = await fetch('https://ai.genfity.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: temperature || 0.7
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Proxy request failed: ' + (error.message || 'Unknown error') });
  }
}
