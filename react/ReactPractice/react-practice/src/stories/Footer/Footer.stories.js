import React from "react";
import { Footer } from "./Footer";

export default {
  title: "Footer",
  component: Footer,
  argTypes: {
    headerStyle: {
      control: "select",
      options: ["headerStyle"]
    },
  },
};

const Template = (args) => <Footer {...args} />;

export const FooterPage = Template.bind({});
FooterPage.args = {
  headerStyle: "headerStyle"
};