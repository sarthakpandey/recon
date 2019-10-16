import React, { useEffect, useState } from "react";
import { Card, List } from "antd";
import { getAllPosts, getPostsFromConnections } from "../../actions";
import PostsListItem from "./PostsListItem";

const PostsList = ({ type }) => {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      let response = null;
      try {
        switch (type) {
          case "all":
            response = await getAllPosts();
            setList(response.data);
            break;
          case "conn":
            response = await getPostsFromConnections();
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
        {list.map(post => (
          <List.Item key={post._id}>
            <div style={{ width: "100%" }}>
              <PostsListItem post={post} />
            </div>
          </List.Item>
        ))}
      </List>
    </Card>
  );
};

export default PostsList;
