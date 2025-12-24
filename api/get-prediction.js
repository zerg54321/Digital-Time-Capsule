export default async function handler(req, res) {
    const { content } = JSON.parse(req.body);
    const apiKey = process.env.GEMINI_API_KEY; // Vercel 会自动从保险箱读取这个

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: `你是一个温暖的预言家，根据这段话给出一句简短预言：'${content}'` }] }]
            })
        });
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}