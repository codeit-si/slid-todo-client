import { Suspense } from "react";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import SentryCheck from "@/components/SentryCheck";

import PostPage from "../components/post-page";
import getQueryClient from "../lib/get-query-client";

import { postsOptions } from "./posts";
import sleep from "./sleep";

/**
 * Prefetching & Streaming을 모두 사용하는 방법
 * 하위 컴포넌트에서 사용할 모든 데이터를 최상위인 page 컴포넌트에서 미리 페칭한다.
 * Streaming을 사용할 적절한 부분에 Suspense 컴포넌트를 부착한다.
 */
export default async function Home() {
  const queryClient = getQueryClient();

  // 미리 페칭 코드 (Warning: 클라이언트와 달리 서버에서는 매번 데이터를 요첨함)
  queryClient.prefetchQuery(postsOptions);
  await sleep(2);

  return (
    <main>
      <h1>HomePage</h1>
      <HydrationBoundary state={dehydrate(queryClient)}>
        {/* Streaming 컴포넌트트 */}
        <Suspense fallback={<h1>Loading...</h1>}>
          <PostPage />
        </Suspense>
      </HydrationBoundary>
      <SentryCheck />
    </main>
  );
}
