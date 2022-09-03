import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectPostIds, useGetPostsQuery } from "./postsSlice";
import PostExcerpt from "./PostExcerpt";
import Link from "next/link";

const PostsList = () => {
  const [isSSR, setIsSSR] = useState(true);
  const { isLoading, isSuccess, isError, error } = useGetPostsQuery();
  const orderedPostIds = useSelector(selectPostIds);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  let content;
  if (isLoading) {
    content = <p>{"Loading..."}</p>;
  } else if (isSuccess) {
    // const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));
    content = orderedPostIds.map((postId) => (
      <PostExcerpt key={postId} postId={postId} />
    ));
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return (
    <>
    <div className="flex flex-row justify-between">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
        Articles
      </h2>
      <Link href={'/posts/add/new'}>
        <button className="font-semibold text-gray-800 text-sm bg-slate-300 py-2 px-2 rounded-sm">
          Add New
        </button>
      </Link>
    </div>
      {!isSSR && content}
    </>
  );
};

export default PostsList;
