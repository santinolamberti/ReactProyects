import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { NextPage } from "next";
import Box from '@mui/material/Box';
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";
import { faqsData } from "../components/faqs/faqsData";
import Paper from '@mui/material/Paper';
import Head from "next/head"

const Faqs: NextPage = () => {

  return (<>
  <Head>
  <title>FAQS</title>
  <meta name="description" content="frequently asked questions" />
  <link rel="icon" href="/favicon.ico" />
</Head>
    <Box>
      <BodySingle title={"Preguntas Frecuentes"} />
      {faqsData?.map((faq) => {
        return (
          <Box key={faq.id}>
            <Accordion>
            <Paper elevation={2}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography >{faq.question}</Typography>
              </AccordionSummary>
              </Paper>
              <AccordionDetails>
                <Typography key={faq.id}>{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          </Box>
        );
      })}
    </Box>
    </>
  );
};

export default Faqs;
