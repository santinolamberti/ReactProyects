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

export const Registrarse = Template.bind({});
Registrarse.args = {
  buttonType: "account",
  label: "Registrarse",
};