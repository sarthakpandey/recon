import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Card,
  Row,
  Col,
  Icon,
  Button,
  Divider,
  message,
  Input,
  Comment,
  Avatar,
  Form
} from "antd";
import { withRouter } from "react-router-dom";
import { likePost, unlikePost, addComment } from "../../actions";
import CommentsList from "./CommentsList";

const PostsListItem = ({ post, history, setRefresh, form }) => {
  const [showComments, setShowComments] = useState(false);
  const user = useSelector(state => state.auth.user);

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
      message.error("Something went terribly wrong");
    }
  };

  const onCommentsClick = () => {
    setShowComments(true);
  };

  const onSubmit = e => {
    e.preventDefault();
    form.validateFields(async (err, formValues) => {
      if (!err) {
        try {
          const { text } = formValues;
          await addComment(post._id, text);
          setRefresh(true);
        } catch (err) {
          message.error("Something went wrong");
        }
      }
    });
  };

  const sentiment = post.sentiment.slice(2, -3)

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
            <span
              style={{ marginRight: 5, cursor: "pointer" }}
              onClick={post.currentLiked ? onUnlikeClick : onLikeClick}
            >
              <Icon
                theme={post.currentLiked ? "filled" : "outlined"}
                style={{ color: "#1890FF" }}
                type="like"
              />
            </span>
            <span>{post.likes.length} Likes</span>
          </span>
          <span onClick={onCommentsClick} style={{ cursor: "pointer" }}>
            <span style={{ marginRight: 5 }}>
              <Icon type="pic-left" />
            </span>
            <span>{post.comments.length} comments</span>
          </span>
          <span style={{ marginLeft: 24, fontWeight: "bold", backgroundColor: sentiment === 'POSITIVE' ? 'green' : 'red', color: 'white' }}>
            {sentiment}
          </span>
        </div>
      </div>
      {showComments ? (
        <div>
          <CommentsList post={post} setRefresh={setRefresh} />
          <Comment
            avatar={<Avatar icon="user" />}
            author={user.name}
            content={
              <Form onSubmit={onSubmit}>
                <Form.Item>
                  {form.getFieldDecorator("text", {
                    rules: [{ required: true }]
                  })(<Input.TextArea placeholder="Add comment..." />)}
                </Form.Item>
                <Button htmlType="submit" type="primary">
                  Add Comment
                </Button>
              </Form>
            }
          />
        </div>
      ) : null}
    </Card>
  );
};

export default withRouter(Form.create()(PostsListItem));
