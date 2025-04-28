import { connectDB } from '@/lib/mongodb'
import Budget from '@/models/Budget'
import { NextResponse } from 'next/server'

export async function POST(req) {
  try {
    await connectDB()
    const { category, amount, month } = await req.json()
    
    const budget = await Budget.findOneAndUpdate(
      { category, month },
      { amount },
      { upsert: true, new: true }
    )

    return NextResponse.json(budget)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update budget' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    await connectDB()
    const budgets = await Budget.find()
    return NextResponse.json(budgets)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch budgets' },
      { status: 500 }
    )
  }
}