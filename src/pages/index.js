import Head from "next/head";
import { Inter } from "next/font/google";
import MainContent from "../../components/mainContent";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>SQL Query Builder</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainContent />
    </>
  );
}
