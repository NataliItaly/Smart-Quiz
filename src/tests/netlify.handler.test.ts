import { describe, test, expect, vi, beforeEach } from 'vitest'
import { handler } from '../../netlify/functions/explain.js'
import type { NetlifyEvent } from '../../netlify/functions/explain'

describe('Netlify Function: explain handler', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  test('returns 405 for non-POST requests', async () => {
    const event: NetlifyEvent = { httpMethod: 'GET', body: null }

    const result = await handler(event)
    const parsed = JSON.parse(result.body) as { message: string }

    expect(result.statusCode).toBe(405)
    expect(parsed.message).toBe('Method Not Allowed')
  })

  test('returns 400 if question or answer missing', async () => {
    const event: NetlifyEvent = {
      httpMethod: 'POST',
      body: JSON.stringify({ question: '' })
    }

    const result = await handler(event)
    const parsed = JSON.parse(result.body) as { message: string }

    expect(result.statusCode).toBe(400)
    expect(parsed.message).toBe('Missing question or answer')
  })

  test('returns explanation when Groq API responds ok', async () => {
    const mockGroqResponse = {
      choices: [
        {
          message: {
            content: 'This is a mock explanation.'
          }
        }
      ]
    }

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockGroqResponse)
    })

    const event: NetlifyEvent = {
      httpMethod: 'POST',
      body: JSON.stringify({
        question: '2+2?',
        answer: '4'
      })
    }

    const result = await handler(event)

    const raw: unknown = JSON.parse(result.body)

    const parsed = raw as {
      receivedQuestion: string
      receivedAnswer: string
      message: string
    }

    expect(result.statusCode).toBe(200)
    expect(parsed.receivedQuestion).toBe('2+2?')
    expect(parsed.receivedAnswer).toBe('4')
    expect(parsed.message).toBe('This is a mock explanation.')
  })

  test('returns 500 when Groq API returns error', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      text: () => Promise.resolve('Groq error')
    })

    const event: NetlifyEvent = {
      httpMethod: 'POST',
      body: JSON.stringify({
        question: '2+2?',
        answer: '4'
      })
    }

    const result = await handler(event)
    const parsed = JSON.parse(result.body) as { message: string }

    expect(result.statusCode).toBe(500)
    expect(parsed.message).toBe('Groq API error')
  })

  test('returns 500 on unexpected exception', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Network fail'))

    const event: NetlifyEvent = {
      httpMethod: 'POST',
      body: JSON.stringify({
        question: '2+2?',
        answer: '4'
      })
    }

    const result = await handler(event)
    const parsed = JSON.parse(result.body) as { message: string }

    expect(result.statusCode).toBe(500)
    expect(parsed.message).toBe('Internal Server Error')
  })
})
