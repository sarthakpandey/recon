import React from "react";
import { Form, Input, Button, message } from "antd";
import { createPost } from "../actions";

const CreatePost = ({ form, onCloseModal }) => {
  const onSubmit = e => {
    e.preventDefault();
    form.validateFields(async (err, formProps) => {
      if (!err) {
        try {
          await createPost(formProps);
          message.success("Post created successfully");
          onCloseModal();
        } catch (err) {
          message.error("Something went wrong");
        }
      }
    });
  };

  const { getFieldDecorator } = form;
  return (
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
  );
};

export default Form.create()(CreatePost);
