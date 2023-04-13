import type { GetServerSideProps, NextPage } from "next";
import { getComics } from "dh-marvel/services/marvel/marvel.service";
import Head from "next/head"
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";
import Index, { IProps } from "dh-marvel/components/index/Index";

const IndexPage: NextPage<IProps> = ({data}) => {
  return<>
   <Head>
  <title>Marvel Comics</title>
  <meta name="description" content="Generated by create next app" />
  <link rel="icon" href="/favicon.ico" />
</Head>
<BodySingle title={"Comics"}>
  <Index data={data} />
</BodySingle>
</>
};

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await getComics(0, 12);
  return {
    props: { ...data },
  };
};


export default IndexPage;
