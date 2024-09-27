import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Appbar from '@/components/Navbar';

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <div>
      <Appbar />
      <div>
        <Component {...pageProps} />
      </div>
      <ToastContainer autoClose={1000} />
    </div>
  </>;
}
