// Example logic for your Stripe checkout
const vibeId = uuidv4(); // Generate a unique ID for the link
const session = await stripe.checkout.sessions.create({
  line_items: [{ price: 'price_HUG_99_CENTS', quantity: 1 }],
  mode: 'payment',
  success_url: `${process.env.NEXT_PUBLIC_URL}/receive/${vibeId}`, // Link sent to friend
  cancel_url: `${process.env.NEXT_PUBLIC_URL}/`,
});
