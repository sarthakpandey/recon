import React, { useEffect } from "react";
import axios from 'axios';

const App = () => {
  axios.post("/api/auth/login", { email: "prateek@recon.com", password: "prateek" });

  useEffect(() => {});
  return <>here</>;
};

export default App;
