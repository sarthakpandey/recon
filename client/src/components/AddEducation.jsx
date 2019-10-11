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
import { DEGREES, FIELD_OF_STUDY } from "../utils";
import moment from "moment";
import { addEducation } from "../actions";

const AddEducation = ({ form }) => {
  const [isCurrent, setIsCurrent] = useState(false);
  const [showOther, setShowOther] = useState(false);

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
          await addEducation(data);
          message.success("Education updated successfully");
          form.resetFields();
        } catch (err) {
          return message.error("Internal Server Error");
        }
      }
    });
  };

  const onDegreeSelect = value => {
    if (value === "Other") {
      setShowOther(true);
    }
  };

  const { getFieldDecorator } = form;
  return (
    <Form onSubmit={onSubmit}>
      <Form.Item>
        {getFieldDecorator("school", { rules: [{ required: true }] })(
          <Input size="large" placeholder="Enter School Name" />
        )}
      </Form.Item>
      {showOther ? (
        <Form.Item>
          {getFieldDecorator("degree", { rules: [{ required: true }] })(
            <Input size="large" placeholder="Enter degree" />
          )}
        </Form.Item>
      ) : (
        <Form.Item>
          {getFieldDecorator("degree", { rules: [{ required: true }] })(
            <Select
              size="large"
              placeholder="Enter degree"
              onChange={onDegreeSelect}
            >
              {DEGREES.map(degree => (
                <Select.Option key={degree} value={degree}>
                  {degree}
                </Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>
      )}
      <Form.Item>
        {getFieldDecorator("fieldofstudy", { rules: [{ required: true }] })(
          <Select size="large" placeholder="Enter Field of study">
            {FIELD_OF_STUDY.map(field => (
              <Select.Option key={field} value={field}>
                {field}
              </Select.Option>
            ))}
          </Select>
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

export default Form.create()(AddEducation);
