import React from "react";
import { Header } from "./Header";

export default {
  title: "Header",
  component: Header,
  argTypes: {
    headerStyle: {
      control: "select",
      options: ["headerStyle"]
    },
  },
};

const Template = (args) => <Header {...args} />;

export const HeaderLogOut = Template.bind({});
HeaderLogOut.args = {
  headerStyle: "headerStyle"
};