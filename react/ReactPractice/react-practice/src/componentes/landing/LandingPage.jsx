import { Box } from "@mui/material";
import Layout from "../layout/Layout";
import landingFondo from "../../assets/landingFondo.jpg";

export const stylesFondoLanding = {
  backgroundImage: `url(${landingFondo})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  height: "100%",
  width: "100%",
};

const LandingPage = () => {
  return (
    <>
      <Layout>
        <Box style={stylesFondoLanding} />
      </Layout>
    </>
  );
};

export default LandingPage;
