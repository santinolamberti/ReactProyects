import React, { FC, ReactElement, ReactNode } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { OrdenProvider } from 'dh-marvel/components/OrderContext';

const Wrapper: FC<{ children: ReactNode }> = ({ children }) => {
  return <OrdenProvider>{children}</OrdenProvider>;
};

const renderMocks = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: Wrapper, ...options });

export * from "@testing-library/react";
export { renderMocks };