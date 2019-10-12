import React from "react";
import { Card, Tabs } from "antd";
import PeopleList from "./Elements/PeopleList";
import Container from "./Elements/Container";

const ManageConnections = () => {
  return (
    <Container>
      <Card>
        <Tabs>
          <Tabs.TabPane tab="Sent requests" key="sent">
            <PeopleList type="sent" />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Connections" key="connections">
            <PeopleList type="connections" />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Incoming requests" key="incoming">
            <PeopleList type="incoming" />
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </Container>
  );
};

export default ManageConnections;
