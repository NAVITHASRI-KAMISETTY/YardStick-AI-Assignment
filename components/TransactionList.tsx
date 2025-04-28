'use client'
import { Button } from './ui/button'
import { formatCurrency } from '@/lib/utils'
import { Trash2 } from 'lucide-react'

export default function TransactionList({ 
  transactions,
  onDelete 
}: {
  transactions: any[]
  onDelete: (id: string) => void
}) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Recent Transactions</h3>
      <div className="space-y-2">
        {transactions.slice(0, 5).map((t) => (
          <div key={t._id} className="flex justify-between items-center p-3 border rounded">
            <div>
              <p className="font-medium">{t.description}</p>
              <div className="flex gap-2 text-sm text-muted-foreground">
                <span>{new Date(t.date).toLocaleDateString()}</span>
                <span>•</span>
                <span>{t.category}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <p className={`font-medium ${
                t.type === 'income' ? 'text-green-500' : 'text-red-500'
              }`}>
                {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
              </p>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(t._id)}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}