import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    user: string;
    token: string;
  }

  interface Session {
    user: string;
    token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user?: string;
    token?: string;
  }
}
