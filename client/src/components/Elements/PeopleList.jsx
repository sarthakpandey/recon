import React, { useEffect, useState } from "react";
import { Card, List } from "antd";
import {
  getSentRequestsList,
  getReceivedRequestsList,
  getConnectedList
} from "../../actions";
import PeopleListItem from "./PeopleListItem";

const PeopleList = ({ type }) => {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let response = null;
      try {
        switch (type) {
          case "sent":
            response = await getSentRequestsList();
            setList(response.data);
            break;
          case "incoming":
            response = await getReceivedRequestsList();
            setList(response.data);
            break;
          case "connections":
            response = await getConnectedList();
            setList(response.data);
            break;
          default:
            break;
        }
        setLoading(false);
      } catch (err) {
        console.log("Something went wrong");
      }
    };
    fetchData();
  }, [type]);

  return (
    <Card loading={loading}>
      <List>
        {list.map(user => (
          <List.Item>
            <div key={user._id} style={{ width: "100%" }}>
              <PeopleListItem user={user} />
            </div>
          </List.Item>
        ))}
      </List>
    </Card>
  );
};

export default PeopleList;
