import React from "react";
import { Layout } from "antd";
import Navbar from "./Elements/Navbar";
import Banner from "./Elements/Banner";

const Home = () => {
  return (
    <>
      <Layout>
        <Navbar />
        <Banner />
      </Layout>
    </>
  );
};

export default Home;
