import { Box, Grid, Stack, TextField, Typography } from "@mui/material";
import Layout from "../layout/Layout";
import { stylesFondoLanding } from "../landing/LandingPage";
import { Button } from "../../stories/Button/Button";
import { inputsForm, stylesInputs } from "./LogInVariables";
import { Link } from "react-router-dom";

const LogIn = () => {
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
                width: "40%",
                height: "65%",
                backgroundColor: "#393646",
                borderRadius: "15px",
                display: "flex",
              }}
            >
              <Stack
                justifyContent="center"
                alignItems="center"
                spacing={2}
                sx={{ padding: "2rem" }}
              >
                <Grid container spacing={2}>
                  {inputsForm.map((campo) => {
                    return (
                      <Grid
                        key={campo.placeholder}
                        item
                        xs={6}
                        sx={{ padding: "40px" }}
                      >
                        <TextField
                          key={campo.id}
                          required
                          id={campo.id}
                          placeholder={campo.placeholder}
                          variant={campo.variant}
                          fullWidth
                          style={stylesInputs}
                        />
                      </Grid>
                    );
                  })}
                </Grid>
                <Button label="Registrarse" buttonType="registro" />
                <p style={{ color: "white" }}>
                  Si ya tienes una cuentes, ingrese{" "}
                  <Link to="/SignIn">
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

export default LogIn;

{
  /* <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField required id="nombre" placeholder="Nombre" variant="outlined" color="primary" fullWidth style={stylesInputs} />
              {inputsForm.map((campo) => {
                return(
                  <Grid item xs={6}>
                <TextField required id={campo.id} placeholder={campo.placeholder} variant={campo.variant} fullWidth style={stylesInputs} />
                </Grid>
                )})}
            </Grid>
            <Grid item xs={6}>
              <TextField required id="apellido" placeholder="Apellido" variant="outlined" color="primary" fullWidth style={stylesInputs} />
            </Grid>
            <Grid item xs={6}>
              <TextField required id="mail" placeholder="Mail" variant="outlined" color="primary" fullWidth style={stylesInputs} />
            </Grid>
            <Grid item xs={6}>
              <TextField required id="dni" placeholder="DNI" variant="outlined" color="primary" fullWidth style={stylesInputs} />
            </Grid>
            <Grid item xs={12}>
              <TextField required id="telefono" placeholder="Número de teléfono" variant="outlined" color="primary" fullWidth style={stylesInputs} />
            </Grid>
          </Grid> */
}
