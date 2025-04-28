import connectMongoDB from "@/lib/mongodb";
import Transaction from "@/models/Transaction";

export async function GET() {
  await connectMongoDB();
  const transactions = await Transaction.find();
  return Response.json(transactions);
}

export async function POST(request) {
  const { amount, description, date } = await request.json();
  await connectMongoDB();
  const transaction = await Transaction.create({ amount, description, date });
  return Response.json(transaction);
}
