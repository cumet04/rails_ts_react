import React from "react";

export type Props = {
  post: App.Post;
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
