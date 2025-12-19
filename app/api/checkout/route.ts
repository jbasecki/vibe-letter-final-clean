import { NextResponse } from 'next/server';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function POST(req: Request) {
  try {
    const { message, tiles } = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { 
            name: 'Digital Vibe Hug',
            description: 'A secret message wrapped in custom alphabet art'
          },
          unit_amount: 99, // 0.99 cents
        },
        quantity: 1,
      }],
      mode: 'payment',
      // After payment, Stripe sends them to your success page with the data
      success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/success?msg=${encodeURIComponent(message)}&tiles=${encodeURIComponent(tiles)}`,
      cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/`,
    });

    return NextResponse.json({ id: session.id });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
