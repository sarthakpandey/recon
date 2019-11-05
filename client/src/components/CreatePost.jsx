import React, { useState } from "react";
import { Form, Input, Button, message, Spin, Card } from "antd";
import { createPost, refreshPosts } from "../actions";

const CreatePost = ({ form, onCloseModal, setRefresh }) => {
  const [loading, setLoading] = useState(false);
  const onSubmit = e => {
    e.preventDefault();
    form.validateFields(async (err, formProps) => {
      if (!err) {
        try {
          setLoading(true);
          await createPost(formProps);
          message.success("Post created successfully");
          setRefresh(true);
          setLoading(false);
          onCloseModal();
        } catch (err) {
          console.log(err);
          message.error("Something went wrong");
        }
      }
    });
  };

  const { getFieldDecorator } = form;
  return (
    <Card loading={loading}>
      <Form onSubmit={onSubmit}>
        <Form.Item>
          {getFieldDecorator("text")(
            <Input.TextArea
              size="large"
              placeholder="Create your post"
              rows={5}
            />
          )}
        </Form.Item>
        <Button htmlType="submit" type="primary" shape="round" size="large">
          Add
        </Button>
      </Form>
    </Card>
  );
};

export default Form.create()(CreatePost);
