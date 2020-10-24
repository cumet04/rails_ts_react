import React from "react";

type UserInfo = {
  name: string;
};

type Props = {
  user: UserInfo;
};

const _page: PageComponent<Props> = ({ props: { user } }) => {
  return <p>{user.name}</p>;
};
export default _page;
