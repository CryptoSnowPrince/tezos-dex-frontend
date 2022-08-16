import type { NextPage } from 'next';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { SideBarHOC } from '../src/components/Sidebar/SideBarHOC';
import { AppDispatch, useAppSelector } from '../src/redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchWallet, walletConnection } from '../src/redux/wallet/wallet';
import { getConfig } from '../src/redux/config/config';
import { getTokenPrice } from '../src/redux/tokenPrice/tokenPrice';
import { getTotalVotingPower } from '../src/redux/pools';

const Home: NextPage = () => {
  const token = useAppSelector((state) => state.config.tokens);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchWallet());
    dispatch(getConfig());
    dispatch(getTotalVotingPower());
  }, []);
  useEffect(() => {
    Object.keys(token).length !== 0 && dispatch(getTokenPrice());
  }, [token]);
  return (
    <>
      <Head>
        <title className="font-medium1">Plenty network</title>
        <meta name="description" content="plenty network" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SideBarHOC>{/* <ShortCard /> */}</SideBarHOC>
    </>
  );
};
Home.propTypes = {
  connectWallet: PropTypes.any,
  disconnectWallet: PropTypes.any,
  fetchWalletAddress: PropTypes.any,
  userAddress: PropTypes.any,
};

export default Home;
