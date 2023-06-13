import Image from "next/image";
import { Inter } from "next/font/google";
import Head from "next/head";
import Header from "@/components/Header";
import Feed from "@/components/Feed";
import Modal from "@/components/Modal";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">
      <Head>
        <title>Instagram Clone</title>
        <link rel="icon" href="./favicon.ico" />
      </Head>
      {/* header */}
      <Header />

      {/* feed */}
      <Feed />

      {/* modal */}
      <Modal />
    </main>
  );
}
