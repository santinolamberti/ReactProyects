import type { NextPage } from "next";
import Image from "next/image";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Link from "next/link";

export type IProps = {
  data: {
    offset: number;
    limit: number;
    total: number;
    count: number;
    results: IComic[];
  };
};

export type IComic = {
  id: string;
  title: string;
  description: string;
  format: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  characters: {
    items: any[];
  };
  price: number;
  oldPrice: number;
  stock: number;
};

const Index: NextPage<IProps> = ({ data }) => {
  const [offset, setOffset] = useState<number>(data?.offset);
  const [page, setPage] = useState<number>(1);
  const [comics, setComics] = useState<IComic[]>(data?.results);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setOffset(value * 12 - 12);
    callComics(value * 12 - 12);
  };

  const callComics = async (offset: number) => {
    const params = new URLSearchParams();
    params.set("offset", `${offset}`);
    params.set("limit", `${12}`);
    const response = await fetch("/api/comics?" + params.toString());
    const data = await response.json();
    setComics(data.response.results);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Stack spacing={2} sx={{ marginTop: 2 }}>
        <Pagination
          count={Math.ceil(data.total / 12)}
          page={page}
          onChange={handleChange}
        />
      </Stack>
      <Box sx={{ marginTop: 3, marginBottom: 3 }}>
        <Grid container rowSpacing={2} columnSpacing={15}>
          {comics?.map((comic) => {
            return (
              <>
                <Grid item xs={12} md={6} lg={4}>
                  <Card sx={{ width: 410, height: 400}} key={comic.id}>
                    <CardContent>
                      <Image
                        src={
                          comic.thumbnail.path + "." + comic.thumbnail.extension
                        }
                        height={70}
                        width={100}
                        layout="responsive"
                        objectFit="contain"
                      />
                      <Typography sx={{marginTop:1}} component="div">
                        {comic.title}
                      </Typography>
                    </CardContent>
                    <CardActions  sx={{ gap: 1}}>
                      <Button variant="contained" size="small">
                        COMPRAR EN 1 CLICK
                      </Button>
                      <Link href={"/comics/" + comic.id}>
                        <a>
                          <Button variant="contained" size="small">
                            VER DETALLE
                          </Button>
                        </a>
                      </Link>
                    </CardActions>
                  </Card>
                </Grid>
              </>
            );
          })}
        </Grid>
      </Box>
      <Stack spacing={2} sx={{ marginBottom: 2 }}>
        <Pagination
          count={Math.ceil(data.total / 12)}
          page={page}
          onChange={handleChange}
        />
      </Stack>
    </Box>
  );
};

export default Index;