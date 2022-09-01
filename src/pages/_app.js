import '../styles/globals.css'
import { Provider } from 'react-redux'
import { store } from '../app/store'

import { fetchUsers } from './../features/users/usersSlice';
store.dispatch(fetchUsers());

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp
