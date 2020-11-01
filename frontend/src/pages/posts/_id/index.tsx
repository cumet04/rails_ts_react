import React from "react";
import { Post } from "api/models";

export type Props = {
  post: Post;
};

const _page: PageComponent<Props> = ({ props: { post } }) => {
  return (
    <div>
      <p>{post.title}</p>
      <p>{post.content}</p>
    </div>
  );
};
export default _page;
