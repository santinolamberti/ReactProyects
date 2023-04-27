import { Box, Stack } from "@mui/material";
import { Footer } from "../../stories/Footer/Footer";
import { Header } from "../../stories/Header/Header";

const Layout = ({children}) => {
    return(
        <>
        <Box sx={{height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
        <Header />
        {children}
        <Footer />
        </Box>
        </>
        )
}

export default Layout