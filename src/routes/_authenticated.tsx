import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context }) => {
    // if (!context.auth.authData) {
    //   throw redirect({ to: "/login" });
    // }
  },
});
