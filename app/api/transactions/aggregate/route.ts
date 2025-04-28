import { connectDB } from '@/lib/mongodb'
import Transaction from '@/models/Transaction'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    await connectDB()
    
    // Aggregate by month
    const monthlyData = await Transaction.aggregate([
      { $match: { type: 'expense' } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$date" } },
          total: { $sum: "$amount" }
        }
      },
      { $sort: { _id: 1 } }
    ])

    // Aggregate by category
    const categoryData = await Transaction.aggregate([
      { $match: { type: 'expense' } },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" }
        }
      }
    ])

    return NextResponse.json({
      monthly: monthlyData,
      byCategory: categoryData
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to aggregate data' },
      { status: 500 }
    )
  }
}