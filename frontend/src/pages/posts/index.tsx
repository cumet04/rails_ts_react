import React from "react";
import { PostSummary } from "api/models";
import { PostsApi } from "api/apis";

export type Props = {
  posts: PostSummary[];
};

const _page: PageComponent<Props> = ({ props: { posts } }) => {
  const showDetail = (id: number) => async () => {
    const post = await new PostsApi().getPostsId({ id });
    alert(
      [
        `id: ${post.id}`,
        `title: ${post.title}`,
        `content: ${post.content}`,
      ].join("\n")
    );
  };
  return (
    <ul>
      {posts.map((p) => (
        <ul key={p.id} onClick={showDetail(p.id)}>
          <p>{p.title}</p>
        </ul>
      ))}
    </ul>
  );
};
export default _page;
