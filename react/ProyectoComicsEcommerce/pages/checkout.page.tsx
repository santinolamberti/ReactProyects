import Checkout from "dh-marvel/components/checkout/Checkout";
import LayoutCheckout from "dh-marvel/components/layouts/layout-checkout";
import { StepProvider } from "dh-marvel/components/StepContext";
import { NextPage } from "next";
import Head from "next/head"


const CheckOutPage:NextPage = () => {

return <>
<Head>
  <title>checkout comic</title>
  <meta name="description" content="checkout de comic" />
  <link rel="icon" href="/favicon.ico" />
</Head>
<StepProvider>
<Checkout />
</StepProvider>
</>
}

(CheckOutPage as any).Layout = LayoutCheckout;
export default CheckOutPage