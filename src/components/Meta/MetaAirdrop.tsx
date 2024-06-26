import Head from "next/head";
import { useRouter } from "next/router";
import * as React from "react";

export function MetaAirdrop() {
  const router = useRouter();
  return (
    <Head>
      <title>Plenty | Decentralized trading on Tezos</title>
      <meta
        content="The biggest airdrop on the Tezos blockchain is now live! Largest DeFi protocol of Tezos, Plenty Network is doing an airdrop on the occasion of it's highly anticipated platform relaunch. If you have ever used Quickswap, LooksRare, Pancakeswap, Velodrome and popular Tezos Dapps, then you might be eligible for the PLY airdrop. Claim your PLY today and start earning on the Plenty Network by locking and voting."
        name="description"
      />
      <meta content="Plenty | Decentralized trading on Tezos" property="og:title" key="og-title" />
      <meta
        content="The biggest airdrop on the Tezos blockchain is now live! Largest DeFi protocol of Tezos, Plenty Network is doing an airdrop on the occasion of it's highly anticipated platform relaunch. If you have ever used Quickswap, LooksRare, Pancakeswap, Velodrome and popular Tezos Dapps, then you might be eligible for the PLY airdrop. Claim your PLY today and start earning on the Plenty Network by locking and voting."
        property="og:description"
        key="og-desc"
      />
      <meta
        content="https://uploads-ssl.webflow.com/6307b856943c0f1358714dab/63c8e289fd47ec5d358a87b8_airdrop-OG.png"
        property="og:image"
        key="og-image"
      />
      <meta property="og:url" content={router.pathname} key="og-url" />
      <meta
        content="Plenty | Decentralized trading on Tezos"
        property="twitter:title"
        name="twitter:title"
        key="tw-title"
      />
      <meta
        content="The biggest airdrop on the Tezos blockchain is now live! Largest DeFi protocol of Tezos, Plenty Network is doing an airdrop on the occasion of it's highly anticipated platform relaunch. If you have ever used Quickswap, LooksRare, Pancakeswap, Velodrome and popular Tezos Dapps, then you might be eligible for the PLY airdrop. Claim your PLY today and start earning on the Plenty Network by locking and voting."
        property="twitter:description"
        name="twitter:description"
        key="tw-desc"
      />
      <meta
        content="https://uploads-ssl.webflow.com/6307b856943c0f1358714dab/63c8e289fd47ec5d358a87b8_airdrop-OG.png"
        property="twitter:image"
        name="twitter:image"
        key="tw-image"
      />
      <meta property="og:type" name="og:type" content="website" />
      <meta content="summary_large_image" name="twitter:card" key="tw-card" />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <link
        href="https://uploads-ssl.webflow.com/6307b856943c0f1358714dab/6324cdd14e4daa665e7eddfc_fav-icon_32%20(1).png"
        rel="shortcut icon"
        type="image/x-icon"
      />
      <link
        href="https://uploads-ssl.webflow.com/6307b856943c0f1358714dab/6324cdc06009f1225eaf74c3_fav-icon_256%20(1).png"
        rel="apple-touch-icon"
      />
      <link rel="shortcut icon" href="/favicon.ico" />
    </Head>
  );
}
