"use client";

import { useState, useEffect } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('income');

  useEffect(() => {
    fetchTransactions();
  }, []);

  async function fetchTransactions() {
    const res = await fetch('/api/transactions');
    const data = await res.json();
    setTransactions(data);
  }

  async function addTransaction() {
    await fetch('/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, amount: Number(amount), type }),
    });
    setTitle('');
    setAmount('');
    setType('income');
    fetchTransactions();
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Personal Finance Visualizer</h1>

      <div className="flex gap-4 mb-8">
        <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Input placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <Select value={type} onValueChange={setType}>
          <SelectTrigger>
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="income">Income</SelectItem>
            <SelectItem value="expense">Expense</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={addTransaction}>Add</Button>
      </div>

      <LineChart width={600} height={300} data={transactions}>
        <Line type="monotone" dataKey="amount" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="title" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </div>
  );
}
