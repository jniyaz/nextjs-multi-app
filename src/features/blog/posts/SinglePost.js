import Link from 'next/link';
import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";

import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

const SinglePost = ({ postId }) => {
  const post = useSelector((state) => selectPostById(state, Number(postId)));

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  return (
    <article className="py-2" key={post.id}>
      <div className="text-xs text-gray-600">
        <TimeAgo timestamp={post.date} />
      </div>
      <h3 className="font-semibold text-gray-800 mb-2 hover:underline text-lg">
        {post.title}
      </h3>
      <div className="text-gray-700">
        <p>{post.body.substring(0, 100)}</p>
      </div>
      <div className="text-gray-700">
        <PostAuthor userId={post.userId} />
      </div>
      <div>
        <ReactionButtons post={post} />
      </div>
      <div className='py-4'>
        <Link href={`/posts/edit/${post.id}`}>
          <span className="font-semibold text-gray-800 hover:underline text-sm">Edit</span>
        </Link>
        {/* <Link href={`/posts/edit/${post.id}`}>
          <span className="font-semibold text-gray-800 hover:underline text-sm ml-3">Delete</span>
        </Link> */}
      </div>
    </article>
  );
};

export default SinglePost;
