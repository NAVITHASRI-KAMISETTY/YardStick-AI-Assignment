'use client'
import { useState, useEffect } from 'react'
import TransactionForm from './TransactionForm'
import TransactionList from './TransactionList'
import ExpenseChart from './ExpenseChart'
import CategoryPieChart from './CategoryPieChart'

export default function Dashboard() {
  const [transactions, setTransactions] = useState([])

  const fetchTransactions = async () => {
    const res = await fetch('/api/transactions')
    const data = await res.json()
    setTransactions(data)
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1 space-y-6">
        <TransactionForm onSuccess={fetchTransactions} />
      </div>
      <div className="lg:col-span-2 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ExpenseChart transactions={transactions} />
          <CategoryPieChart transactions={transactions} />
        </div>
        <TransactionList 
          transactions={transactions} 
          onDelete={fetchTransactions} 
        />
      </div>
    </div>
  )
}