import { useRouter } from "next/router";
import SinglePost from "../../features/blog/posts/SinglePost";

export default function post() {
  // retrive postid
  const router = useRouter();
  const { id } = router.query;

  return <SinglePost postId={id} />
}
