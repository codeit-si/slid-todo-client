import { queryOptions } from "@tanstack/react-query";
import axios from "axios";

export const postsOptions = queryOptions({
  queryKey: ["posts"],
  queryFn: async () => {
    // eslint-disable-next-line no-console
    console.log("fetching posts");
    const { data } = await axios.get("http://localhost:3000/api/posts");
    return data;
  },
});
