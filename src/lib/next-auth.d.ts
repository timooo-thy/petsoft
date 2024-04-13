import { User } from "next-auth";

declare module "@auth/core/jwt" {
  interface JWT {
    userId: string;
    subscriptionPlan: boolean;
    email: string;
  }
}

declare module "next-auth" {
  interface User {
    subscriptionPlan: boolean;
    email: string;
  }
  interface Session {
    user: User & {
      id: string;
    };
  }
}
