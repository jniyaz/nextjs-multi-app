import React from "react";
import Link from "next/link";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";

const PostExcerpt = ({ postId }) => {
  const post = useSelector((state) => selectPostById(state, postId));

  return (
    <div className="w-full md:flex mb-4 bg-white border border-gray-200 sm:px-4 sm:py-4 md:px-4 sm:rounded-lg sm:shadow-sm">
      <div className="w-full px-4 py-4">
        <Link href={`/posts/${post.id}`}>
          <h3 className="font-semibold text-gray-800 mb-2 hover:underline text-lg">
            {post.title}
          </h3>
        </Link>

        <div className="mb-4 w-full text-gray-700 text-sm">
          <p>{post.body.substring(0, 120)}...</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-800 inline-flex items-center">
            <PostAuthor userId={post.userId} />
            <span className="mx-1">&bull;</span>
            <TimeAgo timestamp={post.date} />
          </div>

          {/* <div className="text-right">
            <div className="flex items-center">
              <Link href={`/posts/edit/${post.id}`}>
                <a
                  href="#"
                  className="bg-gray-200 hover:bg-gray-300 rounded-md px-2 py-1 text-blue-600 text-xs uppercase"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    ></path>
                  </svg>
                </a>
              </Link>
            </div>
          </div> */}
        </div>
        <div className="mt-3">
          <ReactionButtons post={post} />
        </div>
      </div>
    </div>
  );
};

// performance optimization
// const PostExcerpt = React.memo(PostsExcerpt)
export default PostExcerpt;
