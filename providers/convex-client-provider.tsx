"use client";

import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";

interface ConvexClientProviderProp {
  children: React.ReactNode;
}

const convesUrl = process.env.NEXT_PUBLIC_CONVEX_URL!;

const convex = new ConvexReactClient(convesUrl);

export const ConvexClientProvider = ({
  children
}: ConvexClientProviderProp) => {
  return (

   <ClerkProvider publishableKey="pk_test_bmF0aW9uYWwtb3gtNTAuY2xlcmsuYWNjb3VudHMuZGV2JA">
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        {/* <Authenticated>{children}</Authenticated>
        <AuthLoading>
          <Loading />
        </AuthLoading> */}
        {children}
      </ConvexProviderWithClerk>
      </ClerkProvider>
  );
};
