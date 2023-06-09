import Image from "next/image";
import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="">
      <Head>
        <title>Instagram Clone</title>
        <link rel="icon" href="./favicon.ico" />
      </Head>
      <h1>This is Instagram 2.0 build</h1>
    </main>
  );
}
