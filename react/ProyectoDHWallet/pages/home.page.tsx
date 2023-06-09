import * as React from 'react';
import type { NextPage } from 'next'
import Head from 'next/head'
import PageHomeLayout from 'integrador/components/layouts/layout-home.component';
import HomeBox from 'integrador/components/HomeBox.component';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { CircularProgress } from '@mui/material';

export const Home: NextPage = () => {
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState("");
    const [accountId, setAccountId] = useState("");
    const router = useRouter();

  
    useEffect(()=>{
      const tokenId = localStorage.getItem("token");
      const account = localStorage.getItem("account_id");
      if (!tokenId || !account) {
        router.push("/login");
      } else{ 
        setLoading(false)
        setToken(tokenId)
        setAccountId(account)
      }
    }, [])
  
    if (loading) {
      return <CircularProgress color="success" />;
    }

    return (
        <>
            <Head>
                <title>Inicio</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {token && accountId && <HomeBox token={token} accountId={accountId}/>}
        </>
    )
}

(Home as any).Layout = PageHomeLayout;

export default Home;
 