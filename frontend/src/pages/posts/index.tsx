import React from "react";

type Props = {
  posts: App.Post[];
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
