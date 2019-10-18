import React from "react";
import {
  List,
  Comment,
  Avatar,
  Divider,
  Row,
  Button,
  Icon,
  Col,
  message
} from "antd";
import { removeComment } from "../../actions";

const CommentsList = ({ post, setRefresh }) => {
  const renderComment = comment => {
    const onDeleteClick = async () => {
      try {
        await removeComment(post._id, comment._id);
        setRefresh(true);
      } catch (err) {
        message.error("Something went wrong");
      }
    };

    return (
      <Comment
        avatar={<Avatar icon="user" />}
        author={comment.name}
        content={
          <Row>
            <Col span={23}>
              <p>{comment.text}</p>
            </Col>
            <Col span={1}>
              <Icon
                type="delete"
                theme="twoTone"
                twoToneColor="#ff0000"
                style={{ cursor: "pointer" }}
                onClick={onDeleteClick}
              />
            </Col>
            <Divider style={{ margin: 0 }} />
          </Row>
        }
      />
    );
  };

  return <List dataSource={post.comments} renderItem={renderComment} />;
};

export default CommentsList;
