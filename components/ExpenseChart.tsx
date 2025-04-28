'use client'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts'
import { useMemo } from 'react'

export default function ExpenseChart({ transactions }: { transactions: any[] }) {
  const data = useMemo(() => {
    const monthlyData: Record<string, number> = {}
    
    transactions
      .filter(t => t.type === 'expense')
      .forEach(t => {
        const month = new Date(t.date).toLocaleString('default', { month: 'short' })
        monthlyData[month] = (monthlyData[month] || 0) + t.amount
      })
      
    return Object.entries(monthlyData).map(([name, value]) => ({ name, value }))
  }, [transactions])

  return (
    <div className="p-4 border rounded-lg h-[300px]">
      <h3 className="font-semibold mb-4">Monthly Expenses</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}