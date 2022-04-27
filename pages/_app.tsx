import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head';
import { createWrapper } from 'next-redux-wrapper';
import { initializeStore } from '../store';
import 'bootstrap/dist/css/bootstrap.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
      <link rel='stylesheet prefetch' href='https://fonts.googleapis.com/icon?family=Material+Icons'></link>
        <title>XYZ Cinema</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

const initStore = initializeStore();
export default createWrapper(() => initStore.store).withRedux(MyApp);
