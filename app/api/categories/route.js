import { NextResponse } from 'next/server'

const categories = [
  'Food', 'Transport', 'Housing', 
  'Entertainment', 'Utilities', 'Other'
]

export async function GET() {
  return NextResponse.json(categories)
}