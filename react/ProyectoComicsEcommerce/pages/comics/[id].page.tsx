import type { GetServerSideProps, NextPage } from "next";
import { getComic } from "dh-marvel/services/marvel/marvel.service";
import { Box } from "@mui/material";
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";
import Image from "next/image";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IComic } from "../../components/index/Index";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import Head from "next/head"
import useOrder from "dh-marvel/components/useOrder";
import { IComicOrden } from "dh-marvel/components/confirmacionCompra/ConfirmacionCompra";

type IProps = {
  data: IComic;
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const DetalleComic: NextPage<IProps> = ({ data }) => {
  const { state, dispatch } = useOrder();
  const comicData: IComicOrden = {
    nombre: data.title,
    precio: data.price,
    imagen: data.thumbnail.path + "." + data.thumbnail.extension
  };

  const handleComic = () => {
  dispatch({
    type: "SET_ORDER",
    payload: comicData,
  })
}

  return (<>
    <Head>
  <title>{data.title}s</title>
  <meta name="description" content="comic" />
  <link rel="icon" href="/favicon.ico" />
</Head>
    <Box sx={{width: "50%"}}>
      <BodySingle title={data.title} />
      <Box sx={{display: "flex", justifyContent: "space-evenly", marginBottom: "20px", marginTop: "123px"}}>
      <Box sx={{width: "40%", height: "200px", display: "flex", flexDirection: "column", justifyContent: "flex-end"}}>
      <Image
        src={data.thumbnail.path + "." + data.thumbnail.extension}
        height={100}
        width={100}
        layout="responsive"
        objectFit="contain"
      />
      </Box>
      <Card sx={{ width: "40%", marginTop: "10px", height: "30%" }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {data.format}
          </Typography>
          <Typography variant="h5" component="div">
            {data.title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Antes {data.oldPrice}
          </Typography>
          <Typography variant="body2">${data.price}</Typography>
        </CardContent>
        <CardActions>
          {data?.stock > 0 ? (
            <Link href={"/checkout"}>
              <a>
                <Button variant="contained" size="small" onClick={handleComic}>
                  COMPRAR
                </Button>
              </a>
            </Link>
          ) : (
            <Button variant="contained" disabled size="small">
              SIN SOCK DISPONIBLE
            </Button>
          )}
        </CardActions>
      </Card>
      </Box>
      <Accordion sx={{marginBottom: "10px"}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Description</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Typography>
            {data?.description?.length > 0
              ? data.description
              : "Sin descripción disponible"}
          </Typography>
        </AccordionDetails>
      </Accordion>
      {data?.characters?.items?.length > 0 && (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Characters</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ width: "100%" }}>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 3, sm: 2, md: 3 }}
              >
                {data.characters.items.map((character) => {
                  return (
                    <Grid item xs={6} key={character.name}>
                      <Link
                        href={"/personajes/" + character.resourceURI.slice(47)}
                      >
                        <a>
                          <Item>
                            <Typography>{character.name}</Typography>
                          </Item>
                        </a>
                      </Link>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          </AccordionDetails>
        </Accordion>
      )}
    </Box>
    </>);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.id;
  const data = await getComic(Number(id));
  return {
    props: { data },
  };
};

export default DetalleComic;
