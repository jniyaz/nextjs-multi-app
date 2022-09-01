import React from 'react';
import Link from 'next/link';
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { useSelector } from 'react-redux';
import { selectPostById } from './postsSlice';

const PostExcerpt = ({ postId }) => {
  const post = useSelector(state => selectPostById(state, postId));

  return (
    <article className="py-2" key={post.id}>
      <div className="text-xs text-gray-600">
        <TimeAgo timestamp={post.date} />
      </div>
      <Link href={`/posts/${post.id}`}>
        <h3 className="font-semibold text-gray-800 mb-2 hover:underline text-lg">
          {post.title}
        </h3>
      </Link>
      <div className="text-gray-700">
        <p>{post.body.substring(0, 75)}...</p>
      </div>
      <div className="text-gray-700">
        <PostAuthor userId={post.userId} />
      </div>
      <div>
        <ReactionButtons post={post} />
      </div>
    </article>
  );
};

// performance optimization
// const PostExcerpt = React.memo(PostsExcerpt)
export default PostExcerpt;
