import React from "react";
import { User } from "api/models";

export type Props = {
  user: User;
};

const _page: PageComponent<Props> = ({ props: { user } }) => {
  return <p>{user.name}</p>;
};
export default _page;
