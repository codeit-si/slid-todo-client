"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import Link from "next/link";

import { postsOptions } from "@/app/posts";

const PostPage = () => {
  const { data } = useSuspenseQuery(postsOptions);

  // eslint-disable-next-line no-console
  console.log(data);

  return (
    <div>
      {data}
      <div className="flex flex-col gap-4">
        <Link href="/">Go to Home</Link>
        <Link href="/posts">Go to Posts</Link>
      </div>
    </div>
  );
};

export default PostPage;
