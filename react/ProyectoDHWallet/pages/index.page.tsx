import type {GetStaticProps, NextPage} from 'next'
import Head from 'next/head'
import BodySingle from "integrador/components/layouts/body/single/body-single.component";
import Container from '@mui/material/Container';
import IndexLayout from 'integrador/components/layouts/layout-index.component';
import TextCard from 'integrador/components/text-card.component';
import { Box, Grid, Typography, useMediaQuery } from '@mui/material';
import { cards } from 'cardsInfo';
import { theme } from 'integrador/styles/material-theme';
import { Img } from 'types/image.types';
import { fetchImages } from 'integrador/services/images.service';

interface IndexProps {
    imgs: Img[],
}


export const getStaticProps: GetStaticProps = async () => {

    const data = await fetchImages();

    const imgs:Img[] = data.documents;

    return {
        props: {
        imgs: imgs,
        }
    }
}



export const Index: NextPage<IndexProps> = ({imgs}) => {

    //Evaluo si es mas chica que tablet, si es true significa que esta desde un movil
    const mobile = useMediaQuery(theme.breakpoints.down("tablet"));

    const desktop = useMediaQuery(theme.breakpoints.up("desktop"));

    //laptop and desktop
    const laptopOrDesktop = useMediaQuery(theme.breakpoints.up("laptop"));

    let laptop;

    if(laptopOrDesktop && !desktop)
        laptop = true;
    
    return (
        <>
            <Head>
                <title>Digital Money House</title>
                <meta name="description" content="Generated by create next app"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <BodySingle> 
                <Container sx={{
                                backgroundImage: mobile ? `url(${imgs[1].src})` : `url(${imgs[0].src})`,
                                backgroundRepeat: 'no-repeat;',
                                backgroundAttachment: 'fixed',
                                backgroundSize: 'cover',
                                backgroundPosition: mobile? '48%' : '32% 30px',
                                height: '100%',
                                display: 'flex', 
                                flexWrap: 'wrap', 
                                alignContent: 'space-between', 
                                padding: mobile ? '2.5rem 1rem 1rem' : laptop ? '3rem 2rem 1rem' :  desktop ? '5rem 3rem 2rem' : '5.5rem 3rem 3rem' 
                                }} maxWidth={false}>

                    <Box width={mobile ? '52%' : (desktop ? '30%' : laptopOrDesktop ? '26%': '55%')} justifyContent={'start'}>
                        <Typography variant='h1' color='text.secondary' mb='0.5rem' fontWeight={mobile ? '400' : 'normal'}>De ahora en adelante, hacés más con tu dinero</Typography>
                        {mobile && <hr style={{ backgroundColor: '#C1FD35', 
                                                height: '5px', 
                                                border: 'none', 
                                                width: '15%', 
                                                marginLeft: '0', 
                                            }}/>}
                        <Box display={mobile ? '' : 'flex'}>
                            <Typography variant='h3' color='secondary' pr='0.5rem' pb='0.4rem' fontWeight='normal'>Tu nueva</Typography>
                            <Typography variant='h3' color='secondary'>billetera virtual</Typography>
                        </Box>
                    </Box>

                    <Grid container spacing={{mobile: 2, tablet: 3.5, laptop: 2}} justifyContent='center' zIndex={5}>
                        <Grid item mobile={12} tablet={10.5} laptop={4.5}>
                            <TextCard title={cards[0].title} content={cards[0].content}/>
                        </Grid>

                        <Grid item mobile={12} tablet={10.5} laptop={4.5}>
                            <TextCard title={cards[1].title} content={cards[1].content}/>
                        </Grid>
                    </Grid>
                </Container>

                <Box
                    height={mobile ? '42.5%' : (laptopOrDesktop ? '25%' : '42%')}
                    width={'100%'} 
                    sx={{
                        backgroundColor: 'secondary.main', 
                        borderTopLeftRadius:'30px',
                        borderTopRightRadius: '30px', 
                        zIndex: 0,
                        position: 'absolute',
                        bottom: 0,
                    }}>
                </Box>
            </BodySingle>
        </>
    )
}

(Index as any).Layout = IndexLayout;

export default Index;
