import React from "react";
import {
  Card,
  Row,
  Col,
  Icon,
  Typography,
  Button,
  Divider,
  message
} from "antd";
import { withRouter } from "react-router-dom";
import { likePost, unlikePost } from "../../actions";

const PostsListItem = ({ post, history, setRefresh }) => {
  const onItemClick = () => {
    return history.push(`/profile/${post.user}`);
  };

  const onLikeClick = async () => {
    try {
      await likePost(post._id);
      setRefresh(true);
    } catch (err) {
      message.error("Something went wrong");
    }
  };

  const onUnlikeClick = async () => {
    try {
      await unlikePost(post._id);
      setRefresh(true);
    } catch (err) {
      message.error("Something went wrong");
    }
  };

  return (
    <Card
      style={{ width: "100%" }}
      title={
        <Row>
          <Col span={12} onClick={onItemClick}>
            <span style={{ marginRight: 15 }}>
              <Icon type="user" style={{ fontSize: 14 }} />
            </span>
            {post.name}
          </Col>
        </Row>
      }
    >
      <div>
        <div style={{ fontSize: 24 }}>{post.text}</div>
        <Divider />
        <div style={{ fontSize: 16 }}>
          <span style={{ marginRight: 20 }}>
            <span style={{ marginRight: 5 }} onClick={onLikeClick}>
              <Icon type="like" />
            </span>
            <span>{post.likes.length} Likes</span>
          </span>
          <span>
            <span style={{ marginRight: 5 }}>
              <Icon type="pic-left" />
            </span>
            <span>0 comments</span>
          </span>
        </div>
      </div>
    </Card>
  );
};

export default withRouter(PostsListItem);
