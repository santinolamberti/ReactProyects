import type { AppProps } from 'next/app'
import {CssBaseline, ThemeProvider} from "@mui/material";
import LayoutGeneral from "dh-marvel/components/layouts/layout-general";
import {theme} from "dh-marvel/styles/material-theme";
import { OrdenProvider } from 'dh-marvel/components/OrderContext';
import { StepProvider } from 'dh-marvel/components/StepContext';

function MyApp({ Component, pageProps }: AppProps) {
  const LayoutComponent = (Component as any).Layout || LayoutGeneral;

  return <ThemeProvider theme={theme}>
    <OrdenProvider>
    <CssBaseline />
    <LayoutComponent>
      <Component {...pageProps} />
    </LayoutComponent>
    <style jsx global>{`
              /* Other global styles such as 'html, body' etc... */

              #__next {
                height: 100%;
              }
            `}</style>
    </OrdenProvider>
  </ThemeProvider>
}

export default MyApp
