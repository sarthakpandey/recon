import React, { useEffect, useState } from "react";
import { Card, List, message } from "antd";
import {
  getSentRequestsList,
  getReceivedRequestsList,
  getConnectedList,
  acceptRequest,
  ignoreRequest,
  cancelRequest
} from "../../actions";
import PeopleListItem from "./PeopleListItem";

const PeopleList = ({ type }) => {
  const [loading, setLoading] = useState(true);
  const [bText, setButtonText] = useState({});
  const [list, setList] = useState([]);
  const [refresh, setRefresh] = useState(true);

  const onAcceptClick = async id => {
    try {
      await acceptRequest(id);
      message.success("You both are now connected");
      setRefresh(true);
    } catch (err) {
      message.error("Something went wrong");
    }
  };

  const onIgnoreClick = async id => {
    try {
      await ignoreRequest(id);
      message.success("Request ignored");
      setRefresh(true);
    } catch (err) {
      message.error("Something went wrong");
    }
  };

  const onUnsendClick = async id => {
    try {
      await cancelRequest(id);
      message.success("Request unsent successfully");
      setRefresh(true);
    } catch (err) {
      message.error("Something went wrong");
    }
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
    if (refresh) {
      fetchData();
      setRefresh(false);
    }
  }, [type, refresh]);

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
