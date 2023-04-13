import {
  getCharacter,
  getCharacters,
} from "dh-marvel/services/marvel/marvel.service";
import type { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Head from "next/head"

type IProps = {
  data: ICharacter;
};

type ICharacter = {
  id: number;
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
};

const DetalleCharacter: NextPage<IProps> = ({ data }) => {
  const router = useRouter();
  if (router.isFallback) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  return (<>
  <Head>
  <title>{data.name}</title>
  <meta name="description" content="personaje" />
  <link rel="icon" href="/favicon.ico" />
</Head>
    <Card
      sx={{
        maxWidth: 345,
        maxHeight: 550,
        marginTop: 13,
        height: !data.description ? 300 : 550,
      }}
    >
      <Image
        src={data.thumbnail.path + "." + data.thumbnail.extension}
        height={100}
        width={100}
        layout="responsive"
        objectFit="contain"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {data.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {data.description}
        </Typography>
      </CardContent>
    </Card>
    </>);
};

export const getStaticPaths = async () => {
  const data = await getCharacters();
  const paths = data.map((character: ICharacter) => {
    return {
      params: { id: character.id.toString() },
    };
  });
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id;
  const data = await getCharacter(Number(id));
  return {
    props: { data },
  };
};

export default DetalleCharacter;
