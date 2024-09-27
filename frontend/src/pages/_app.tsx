import Navbar from '@/components/Navbar';
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <Navbar />
    <div className="p-4">
      <Component {...pageProps} />
    </div>
  </>;
}
