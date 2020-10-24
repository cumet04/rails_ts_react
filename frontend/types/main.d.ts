declare namespace App {
  type Post = {
    id: number;
    title: string;
    content: string;
  };
}

declare type PageComponent<P> = React.FunctionComponent<{
  props: P;
}>;
