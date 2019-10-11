import React, { useState } from "react";
import {
  Form,
  Input,
  DatePicker,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  message
} from "antd";
import _ from "lodash";
import { LOCATIONS } from "../utils";
import moment from "moment";
import { addExperience } from "../actions";

const AddExperience = ({ form }) => {
  const [isCurrent, setIsCurrent] = useState(false);

  const onSubmit = e => {
    e.preventDefault();
    form.validateFields(async (err, formProps) => {
      if (!err) {
        let data = {
          ...formProps,
          current: isCurrent,
          from: moment(formProps.from).toDate(),
          to: isCurrent ? null : moment(formProps.to).toDate()
        };
        data = _.pickBy(data, _.identity);
        try {
          await addExperience(data);
          message.success("Work Experience updated successfully");
          form.resetFields();
        } catch (err) {
          return message.error("Internal Server Error");
        }
      }
    });
  };

  const { getFieldDecorator } = form;
  return (
    <Form onSubmit={onSubmit}>
      <Form.Item>
        {getFieldDecorator("title", { rules: [{ required: true }] })(
          <Input size="large" placeholder="Enter title" />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator("company", { rules: [{ required: true }] })(
          <Input size="large" placeholder="Enter Company" />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator("description")(
          <Input.TextArea
            size="large"
            placeholder="Enter Description"
            rows={5}
          />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator("location")(
          <Select size="large" placeholder="Select the location">
            {LOCATIONS.map(location => (
              <Select.Option key={location} value={location}>
                {location}
              </Select.Option>
            ))}
          </Select>
        )}
      </Form.Item>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item>
            {getFieldDecorator("from", { rules: [{ required: true }] })(
              <DatePicker size="large" placeholder="From" />
            )}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item style={{ marginBottom: 0 }}>
            {getFieldDecorator("to")(
              <DatePicker size="large" placeholder="To" disabled={isCurrent} />
            )}
          </Form.Item>
          <Form.Item>
            <Checkbox
              onChange={e => {
                setIsCurrent(e.target.checked);
              }}
            />{" "}
            Current
          </Form.Item>
        </Col>
      </Row>
      <Button htmlType="submit" type="primary" shape="round" size="large">
        Add
      </Button>
    </Form>
  );
};

export default Form.create()(AddExperience);
