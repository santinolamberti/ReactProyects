import ConfirmacionCompra from "dh-marvel/components/confirmacionCompra/ConfirmacionCompra";
import LayoutCheckout from "dh-marvel/components/layouts/layout-checkout";
import { NextPage } from "next";
import Head from "next/head"


const ConfirmacionCompraPage:NextPage = () => {

return <>
<Head>
  <title>Compra realizada</title>
  <meta name="description" content="compra realizada" />
  <link rel="icon" href="/favicon.ico" />
</Head>
<ConfirmacionCompra />
</>}

(ConfirmacionCompraPage as any).Layout = LayoutCheckout;
export default ConfirmacionCompraPage