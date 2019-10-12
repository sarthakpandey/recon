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
  const [bText, setButtonText] = useState({});
  const [list, setList] = useState([]);

  const onAcceptClick = id => {
    console.log(id);
  };

  const onIgnoreClick = id => {
    console.log(id);
  };

  const onUnsendClick = id => {
    console.log(id);
  };

  useEffect(() => {
    const fetchData = async () => {
      let response = null;
      try {
        switch (type) {
          case "sent":
            response = await getSentRequestsList();
            setList(response.data);
            setButtonText({
              first: "Unsend",
              firstOnClick: onUnsendClick
            });
            break;
          case "incoming":
            response = await getReceivedRequestsList();
            setList(response.data);
            setButtonText({
              first: "Accept",
              second: "Ignore",
              firstOnClick: onAcceptClick,
              secondOnClick: onIgnoreClick
            });
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
          <List.Item key={user._id}>
            <div style={{ width: "100%" }}>
              <PeopleListItem user={user} bText={bText} />
            </div>
          </List.Item>
        ))}
      </List>
    </Card>
  );
};

export default PeopleList;
