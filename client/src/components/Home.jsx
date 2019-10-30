import React, { useEffect } from "react";
import { Layout } from "antd";
import Navbar from "./Elements/Navbar";
import Banner from "./Elements/Banner";
import Container from "./Elements/Container";
import Axios from "axios";

const Home = () => {
  useEffect(() => {
    const test = async () => {
      const res = await Axios.get("/api/sentiment");
      console.log(res);
    };
    test();
  });

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
