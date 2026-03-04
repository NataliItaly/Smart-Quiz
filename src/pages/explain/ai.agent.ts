// export async function callExplainAI(payload) {
//   const res = await fetch("/.netlify/functions/explain", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(payload)
//   })

//   const data = await res.json()
//   return data.explanation
// }

// export async function handler(event, context) {
//   const payload = JSON.parse(event.body)

//   const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
//     },
//     body: JSON.stringify({
//       model: "llama3-8b-8192",
//       messages: [
//         { role: "system", content: "Ти пояснюєш тестові питання просто і зрозуміло." },
//         { role: "user", content: JSON.stringify(payload) }
//       ]
//     })
//   })

//   const data = await response.json()

//   return {
//     statusCode: 200,
//     body: JSON.stringify({ explanation: data.choices[0].message.content })
//   }
// }

// export async function callExplainAI(payload) {
//   const res = await fetch("/.netlify/functions/explain", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(payload)
//   })

//   const data = await res.json()
//   return data.explanation
// }
// const explanation = await callExplainAI(payload)
// showExplain(explanation)