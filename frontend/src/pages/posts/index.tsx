import React from "react";
import { Post } from "api/models";

export type Props = {
  posts: Post[];
};

const _page: PageComponent<Props> = ({ props: { posts } }) => {
  return (
    <ul>
      {posts.map((p) => (
        <ul key={p.id}>
          <p>{p.title}</p>
          <p>{p.content}</p>
        </ul>
      ))}
    </ul>
  );
};
export default _page;
