import { useEffect, useState } from "react";
import "../styles/globals.css";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { fetchUsers } from "./../features/users/usersSlice";
import SiteLayout from "../layouts/SiteLayout";
import { extendedPostApi } from "../features/blog/posts/postsSlice";

store.dispatch(extendedPostApi.endpoints.getPosts.initiate());
store.dispatch(fetchUsers());

function MyApp({ Component, pageProps }) {
  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  if (typeof window === "undefined") {
    return <></>;
  } else {
    return (
      <Provider store={store}>
        <SiteLayout>
          <Component {...pageProps} />
        </SiteLayout>
      </Provider>
    );
  }
}

export default MyApp;
