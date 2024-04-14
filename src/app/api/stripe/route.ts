import prisma from "@/lib/db";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";

type Metadata = {
  userId: string;
};

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return Response.json(null, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (e) {
    return Response.json(null, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed":
      const completedEvent = event.data.object as Stripe.Checkout.Session & {
        metadata: Metadata;
      };
      await prisma.user.update({
        where: {
          id: completedEvent.metadata.userId,
        },
        data: {
          subscriptionPlan: true,
        },
      });
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  return Response.json(null, { status: 200 });
}
