import { Box } from "@mui/material"
import Layout from "../layout/Layout"

const styles = {
    backgroundImage: `url(${require("../../assets/landingFondo.jpg")})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    width: "100vw"
  };

const LandingPage = () => {
    return(
        <>
        <Layout>
           <Box style={styles}/>
        </Layout>
        </>
        )
}

export default LandingPage