import { Box, CircularProgress, Stack, Typography, useMediaQuery } from "@mui/material";
import PageHomeLayout from "integrador/components/layouts/layout-home.component";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GET_ACTIVITY } from "api/api";
import ActivitySummary, { Transaction } from "integrador/components/activitySummary/ActivitySummary";
import { theme } from "integrador/styles/material-theme";
import Head from "next/head";

export const ActivityPage = () => {
  const router = useRouter();
  const [transactions, setTransactions] = useState<Transaction[]>();
  const [loading, setLoading] = useState(true);

  const mobile = useMediaQuery(theme.breakpoints.down("tablet"));
  const laptopOrDesktop = useMediaQuery(theme.breakpoints.up("laptop"));
  const desktop = useMediaQuery(theme.breakpoints.up("desktop"));

  let laptop;
  if (laptopOrDesktop && !desktop)
      laptop = true;


  const getTransactions = async (token: string, accountId: string) => {
    setLoading(true);

    const request = await fetch(
      GET_ACTIVITY(accountId),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    ).then(async (res) => {
      const response = await res.json();
      setTransactions(response);
      setLoading(false)
    });
  };

   useEffect(() => {
    const token = localStorage.getItem("token");
    const account = localStorage.getItem("account_id");
    if(!token) {
      router.push('/');
    }
    getTransactions(token as string, account as string) ;
  }, [])

  if (loading) {
    return (
      <Box sx={{height: "100vh", textAlign: "center"}}>
        <CircularProgress color="success" sx={{marginTop:"200px"}} />
      </Box>
    )
  }
   
 
  else 
    return (

      <>
        <Head>
            <title>Actividad</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Stack sx={{ width: '100%', alignItems: 'center', justifyContent: 'start' }} 
            mt={laptopOrDesktop ? '1rem': mobile ? '0' :'3rem'} 
            spacing={laptop ? 1.3 : 2.5 }
            zIndex={3}
        >
          <ActivitySummary transactions={transactions}/>
        </Stack>
      </>
    )
};

(ActivityPage as any).Layout = PageHomeLayout;

export default ActivityPage;