import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Vested App</title>
        <meta
          content="Generated by @rainbow-me/create-rainbowkit"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className={styles.main}>
        <ConnectButton />

        <h1 className={styles.title}>
          Welcome to <a href="">Vested</a> <a href="">Token</a>{" "}
          <a href="">App!</a>
        </h1>

        <p className={styles.description}>
          Get started by deploying a dashboard{" "}for your organization...
        </p>

        <div className={styles.grid}>          
          <Link className={styles.card} href="/createform">
            <h2>Deploy your dashboard &rarr;</h2>
            <p>Instantly deploy a vested token dashboard of your own</p>
          </Link>

          <a
            className={styles.card}
            href="/userreg"
          >
            <h2>Go to your dashboard &rarr;</h2>
            <p>Initialize stakeholders and register users</p>
          </a>

          <a
            className={styles.card}
            href="/userreg"
          >
            <h2>Withdraw Vested Token &rarr;</h2>
            <p>Withdraw vested tokens and earn your reward</p>
          </a>

          <a className={styles.card} href="https://github.com/dunnie99/Metacrafters/tree/main/deFi-Dapp">
            <h2>Vested App Documentation &rarr;</h2>
            <p>Learn how to deploy your own DApp.</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a href="https://linktr.ee/dun95" rel="noopener noreferrer" target="_blank">
          Made with ❤️ by Dunnie for MetaCrafters{" "}
        </a>
      </footer>
    </div>
  );
};

export default Home;