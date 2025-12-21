import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import stripe from '../../lib/stripe'; // Ensure you have stripe initialized here
import { sql } from '@vercel/postgres'; // Example for Vercel Postgres

export async function POST(req: Request) {
    try {
        const { message, tiles, sceneId } = await req.json();
        const vibeId = uuidv4();

        // 1. SAVE TO DATABASE: Store the vibe before the friend ever sees it
        // This ensures when they click the link, the data is actually there.
        await sql`
            INSERT INTO vibes (id, message, tiles, scene_id, paid)
            VALUES (${vibeId}, ${message}, ${tiles}, ${sceneId}, false);
        `;

        // 2. CREATE STRIPE SESSION
        const session = await stripe.checkout.sessions.create({
            line_items: [{ 
                price: 'price_HUG_99_CENTS', // MUST match your Live Stripe API ID
                quantity: 1 
            }],
            mode: 'payment',
            // success_url sends them to the unique link for their friend
            success_url: `${process.env.NEXT_PUBLIC_URL}/receive/${vibeId}?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_URL}/`,
            metadata: { vibeId } // We store the ID here to confirm payment later
        });

        return NextResponse.json({ id: session.id });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Failed to create session' }, { status: 500 });
    }
}
