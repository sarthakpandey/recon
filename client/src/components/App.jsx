import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Routing from "./HOC/Routing";
import { getUser, setUser } from "../actions";

const App = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUser();
      if (data.user) {
        await dispatch(setUser(data.user));
        setLoading(false);
      } else {
        setLoading(false);
      }
    };
    fetchUser();
  }, [dispatch]);

  return loading ? null : <Routing />;
};

export default App;
