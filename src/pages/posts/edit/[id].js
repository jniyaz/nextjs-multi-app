import { useRouter } from "next/router";
import EditPost from "../../../features/blog/posts/EditPost";

export default function post() {
  // retrive postid
  const router = useRouter();
  const { id } = router.query;

  return <EditPost postId={id} />
}
