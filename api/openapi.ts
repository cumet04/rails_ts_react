import {
  api,
  endpoint,
  request,
  response,
  body,
  pathParams,
  Integer,
} from "@airtasker/spot";

@api({
  name: "RailsTsReact",
})
class Api {}

@endpoint({ method: "GET", path: "/posts", tags: ["posts"] })
class getPosts {
  @response({ status: 200 })
  response(@body body: PostSummary[]) {}
}

@endpoint({ method: "GET", path: "/posts/:id", tags: ["posts"] })
class getPost {
  @request
  request(
    @pathParams
    pathParams: {
      id: Integer;
    }
  ) {}

  @response({ status: 200 })
  response(@body body: Post) {}
}

@endpoint({ method: "GET", path: "/users/current", tags: ["users"] })
class getUsersCurrent {
  @response({ status: 200 })
  response(@body body: User) {}
}

interface PostSummary {
  id: Integer;
  title: string;
}

interface Post {
  id: Integer;
  title: string;
  content: string;
}

interface User {
  id: Integer;
  name: string;
}
