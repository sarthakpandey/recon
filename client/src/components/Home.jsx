import React from "react";
import { Layout } from "antd";
import Navbar from "./Elements/Navbar";
import Banner from "./Elements/Banner";
import Container from "./Elements/Container";

const Home = () => {
  return (
    <>
      <Layout style={{ background: "none" }}>
        <Navbar />
        <Banner />
      </Layout>
    </>
  );
};

export default Home;
