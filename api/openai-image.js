// /api/openai-image.js — Vercel serverless proxy for OpenAI DALL-E 3
// Prevents CORS errors when calling OpenAI from browser

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt, size, quality } = req.body;
  const key = req.headers['x-openai-key'];

  if (!key) {
    return res.status(401).json({ error: 'Missing OpenAI API key' });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt,
        n: 1,
        size: size || '1792x1024',
        quality: quality || 'hd',
        response_format: 'url'
      })
    });

    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    // Download image and return as base64 to avoid CORS on image URL
    if (data?.data?.[0]?.url) {
      const imgRes = await fetch(data.data[0].url);
      const blob = await imgRes.blob();
      const arrayBuffer = await blob.arrayBuffer();
      const base64 = Buffer.from(arrayBuffer).toString('base64');
      return res.status(200).json({
        data: [{ b64_json: base64, revised_prompt: data.data[0].revised_prompt }]
      });
    }

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
