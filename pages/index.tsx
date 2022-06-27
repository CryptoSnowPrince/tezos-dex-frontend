import type { NextPage } from 'next';
import Head from 'next/head';
import Button from '../src/components/Button/Button';
import Card from '../src/components/Card/Card';
import { SideBarHOC } from '../src/components/Sidebar/SideBarHOC';
import Tooltip from '../src/components/Tooltip/Tooltip';
import styles from '../styles/Home.module.css';
import Swap from './Swap';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title className="font-medium1">Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SideBarHOC>
        <div>
          <Button color="primary">CONNECT WALLET</Button>
          <main className={styles.main}>
            <Swap />
          </main>
        </div>
      </SideBarHOC>
    </div>
  );
};

export default Home;
