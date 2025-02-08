import { Suspense } from "react";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import PostPage from "@/components/post-page-clone";
import getQueryClient from "@/lib/get-query-client";

export default async function PostsPage() {
  const queryClient = getQueryClient();

  return (
    <main>
      <h1>HomePage</h1>
      <HydrationBoundary state={dehydrate(queryClient)}>
        {/* Streaming 컴포넌트트 */}
        <Suspense fallback={<h1>Loading...</h1>}>
          <PostPage />
        </Suspense>
      </HydrationBoundary>
    </main>
  );
}
