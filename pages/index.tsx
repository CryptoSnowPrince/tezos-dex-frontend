import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Button from '../src/components/Button/Button';
import Tooltip from '../src/components/Tooltip/Tooltip';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title className="font-medium1">Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Button color="primary">CONNECT WALLET</Button>
      <main className={styles.main}>
        <Tooltip message="hi vgjhbkjnjkj">
          <h1 className={styles.title}>
            Welcome to <a href="https://nextjs.org">Next.js!</a>
          </h1>
        </Tooltip>
      </main>
    </div>
  );
};

export default Home;
