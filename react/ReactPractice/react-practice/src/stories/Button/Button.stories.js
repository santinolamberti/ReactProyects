import React from "react";

import { Button } from "./Button";

export default {
  title: "Button",
  component: Button,
  argTypes: {
    buttonType: {
      control: "select",
      options: ["account"]
    },
  },
};

const Template = (args) => <Button {...args} />;

export const CrearCuenta = Template.bind({});
CrearCuenta.args = {
  buttonType: "account",
  label: "Crear cuenta",
};