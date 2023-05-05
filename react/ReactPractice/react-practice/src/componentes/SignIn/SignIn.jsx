import { Box, Grid, Stack, TextField, Typography } from "@mui/material";
import Layout from "../layout/Layout";
import { stylesFondoLanding } from "../landing/LandingPage";
import { Button } from "../../stories/Button/Button";
import { stylesInputs } from "../LogIn/LogInVariables";
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <>
      <Layout>
        <Box
          style={stylesFondoLanding}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Stack
            component="form"
            autoComplete="off"
            sx={{
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <Box
              sx={{
                width: "30%",
                height: "50%",
                backgroundColor: "#393646",
                borderRadius: "15px",
                display: "flex",
              }}
            >
              <Stack
                justifyContent="space-evenly"
                alignItems="center"
                spacing={2}
                sx={{ padding: "2rem", width: "100%" }}
              >
                <Box
                  sx={{
                    height: "45%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <TextField
                    required
                    id="mail"
                    placeholder="Mail"
                    variant="outlined"
                    color="primary"
                    fullWidth
                    style={stylesInputs}
                  />
                  <TextField
                    required
                    id="contraseña"
                    placeholder="Contraseña"
                    variant="outlined"
                    color="primary"
                    fullWidth
                    style={stylesInputs}
                  />
                </Box>
                <Button label="Iniciar sesión" buttonType="registro" />
                <p style={{ color: "white" }}>
                  Si no tienes una cuenta, cree una{" "}
                  <Link to="/LogIn">
                    {" "}
                    <Typography
                      variant="link"
                      color="yellow"
                      sx={{ cursor: "pointer" }}
                    >
                      aquí
                    </Typography>
                  </Link>
                  .
                </p>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Layout>
    </>
  );
};

export default SignIn;
