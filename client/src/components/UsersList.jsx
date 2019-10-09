import React, { useEffect, useState } from "react";
import Container from "./Elements/Container";
import { Card, List } from "antd";
import { getAllProfiles } from "../actions";
import User from "./Elements/User";

const UsersList = () => {
  const [profileList, setProfileList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllProfiles();
      setProfileList(response.data);
    };
    fetchData();
  }, []);

  return (
    <Container>
      <Card title="Users">
        <List>
          {profileList.map(profile => (
            <List.Item>
              <User profile={profile} />
            </List.Item>
          ))}
        </List>
      </Card>
    </Container>
  );
};

export default UsersList;
