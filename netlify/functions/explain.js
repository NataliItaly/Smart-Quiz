export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' })
    }
  }

  try {
    const { question, answer } = JSON.parse(event.body || '{}')

    if (!question || !answer) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing question or answer' })
      }
    }

    const prompt = `
Question: ${question}
User answer: ${answer}

Explain in English:
- is the answer correct;
- briefly why;
- if incorrect — which is correct and why.
`

    const groqResponse = await fetch(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            {
              role: 'system',
              content:
                'You should become a great software engineer'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.3
        })
      }
    )

    if (!groqResponse.ok) {
      const text = await groqResponse.text()
      console.error('Groq error:', text)
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Groq API error' })
      }
    }

    const groqData = await groqResponse.json()
    const explanation =
      groqData.choices?.[0]?.message?.content?.trim() ||
      'Could not get an explanation.'

    return {
      statusCode: 200,
      body: JSON.stringify({
        receivedQuestion: question,
        receivedAnswer: answer,
        message: explanation
      })
    }
  } catch (error) {
    console.error('Explain function error:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' })
    }
  }
}
