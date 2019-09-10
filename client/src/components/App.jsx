import React, { useEffect } from "react";
import api from "../apis/api";

const App = () => {
  api.post("/auth/login", { email: "prateek@recon.com", password: "prateek" });

  useEffect(() => {});
  return <>here</>;
};

export default App;
