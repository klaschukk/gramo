import Anthropic from '@anthropic-ai/sdk'
import type { Exercise } from '../../shared/types'
import { getDb } from './database'

function getApiKey(): string | null {
  const db = getDb()
  const row = db.prepare('SELECT value FROM settings WHERE key = ?').get('claude_api_key') as
    | { value: string }
    | undefined
  return row?.value ?? null
}

function getClient(): Anthropic {
  const key = getApiKey()
  if (!key) throw new Error('Claude API key not set. Add it in Settings.')
  return new Anthropic({ apiKey: key })
}

export async function generateExplanation(chapterId: number, question: string): Promise<string> {
  const db = getDb()
  const chapter = db.prepare('SELECT title, raw_text FROM chapters WHERE id = ?').get(chapterId) as
    | { title: string; raw_text: string }
    | undefined

  if (!chapter) throw new Error('Chapter not found')

  const client = getClient()
  const context = chapter.raw_text.slice(0, 2000) // first 2k chars as context

  const message = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 512,
    messages: [
      {
        role: 'user',
        content: `You are an English grammar tutor. The student is studying "${chapter.title}".

Here is the relevant grammar text:
${context}

Student question: ${question}

Give a clear, concise explanation (3-5 sentences). Use simple examples. Do not repeat the full grammar text.`,
      },
    ],
  })

  const block = message.content[0]
  return block.type === 'text' ? block.text : ''
}

export async function generateExercises(
  chapterId: number,
  count: number
): Promise<Omit<Exercise, 'id' | 'createdAt'>[]> {
  const db = getDb()
  const chapter = db.prepare('SELECT title, raw_text FROM chapters WHERE id = ?').get(chapterId) as
    | { title: string; raw_text: string }
    | undefined

  if (!chapter) throw new Error('Chapter not found')

  const client = getClient()
  const context = chapter.raw_text.slice(0, 2000)

  const message = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: `You are an English grammar exercise generator. The topic is "${chapter.title}".

Grammar context:
${context}

Generate exactly ${count} multiple-choice exercises. Respond with ONLY valid JSON array, no markdown:
[
  {
    "question": "...",
    "options": ["A", "B", "C", "D"],
    "answer": "A",
    "explanation": "..."
  }
]`,
      },
    ],
  })

  const block = message.content[0]
  if (block.type !== 'text') return []

  const parsed = JSON.parse(block.text) as Array<{
    question: string
    options: string[]
    answer: string
    explanation: string
  }>

  return parsed.map((ex) => ({
    chapterId,
    type: 'multiple-choice' as const,
    question: ex.question,
    options: ex.options,
    answer: ex.answer,
    explanation: ex.explanation,
    source: 'ai' as const,
  }))
}
