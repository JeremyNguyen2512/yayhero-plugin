import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Form,
  Input,
  Slider,
  Col,
  Row,
  Radio,
  InputNumber,
  Tag,
  Modal,
  FormItemProps,
} from 'antd';
import { HERO_CLASS_LIST, HeroType, USER_PERMISSION } from '../libtypes/heros.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { handleAddHero } from '../service/HeroApi.Service';
import useMutationHero from '../components/useMutationHero';
import {
  HeroClassInput,
  MyFormItem,
  MyFormItemGroup,
} from '../components/form/HeroCustomFormGroup';
interface MyFormItemGroupProps {
  prefix: string | number | (string | number)[];
  children: React.ReactNode;
}

const AddHero = () => {
  const queryClient = useQueryClient();

  const { addMutation } = useMutationHero();

  //show popup form after submit
  const [formPopup, setFormPopup] = useState(false);
  const handleOk = () => {
    setFormPopup(false);
  };

  //state of form when submit
  const [formDisable, setformDisable] = useState<boolean>(false);

  //state of loading button
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [slideDisable, setSlideDisable] = useState<boolean>(false);

  //add hero with call api
  const [form] = Form.useForm();

  const handlePostData = async (value: HeroType) => {
    setformDisable(true);
    setIsLoading(true);
    await addMutation.mutateAsync(value);

    setFormPopup(true);
    setformDisable(false);
    setIsLoading(false);
    form.resetFields();
  };

  const postDataMutate = useMutation({
    mutationFn: handlePostData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['list-hero'] });
    },
  });

  return (
    <div>
      <p style={{ width: '100%', fontWeight: 'bold', marginBottom: 20 }}>New Hero</p>
      <Button type="primary">
        <Link to="/heroes">Back</Link>
      </Button>
      {USER_PERMISSION === 'write' ? (
        <div>
          <Form
            name="add_hero"
            disabled={formDisable}
            style={{ marginTop: 30 }}
            labelCol={{ span: 4, md: 6 }}
            form={form}
            wrapperCol={{ span: 18 }}
            onFinish={postDataMutate.mutate}
          >
            <Row>
              <Col span={24} md={12}>
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[{ required: true, message: 'Please input Hero Name' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Class"
                  name="class"
                  rules={[{ required: true, message: 'Please pick an item!' }]}
                >
                  <HeroClassInput />
                </Form.Item>

                <Form.Item
                  name="level"
                  initialValue={1}
                  label="Level"
                  rules={[{ required: true, message: 'Please choose Hero Level' }]}
                >
                  <InputNumber min={1} max={10} placeholder="1" />
                </Form.Item>
              </Col>

              <Col span={24} md={12}>
                <MyFormItemGroup prefix={['attributes']}>
                  <MyFormItem
                    name="strength"
                    initialValue={10}
                    label="Strength"
                    rules={[{ required: true, message: 'Please choose value' }]}
                  >
                    <Slider disabled={slideDisable} />
                  </MyFormItem>
                  <MyFormItem
                    name="dexterity"
                    initialValue={10}
                    label="Dexterity"
                    rules={[{ required: true, message: 'Please choose value' }]}
                  >
                    <Slider disabled={slideDisable} />
                  </MyFormItem>
                  <MyFormItem
                    name="intelligence"
                    initialValue={10}
                    label="Intelligence"
                    rules={[{ required: true, message: 'Please choose value' }]}
                  >
                    <Slider disabled={slideDisable} />
                  </MyFormItem>
                  <MyFormItem
                    name="vitality"
                    initialValue={10}
                    label="Vitality"
                    rules={[{ required: true, message: 'Please choose value' }]}
                  >
                    <Slider disabled={slideDisable} />
                  </MyFormItem>
                </MyFormItemGroup>
              </Col>

              <Col span={24} style={{ textAlign: 'center' }}>
                <Form.Item wrapperCol={{ span: 24 }}>
                  {USER_PERMISSION === 'write' ? (
                    <Button type="primary" htmlType="submit" loading={isLoading}>
                      Create Hero
                    </Button>
                  ) : (
                    ''
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>

          <Modal
            onCancel={handleOk}
            title="Add Hero Success!"
            open={formPopup}
            footer={[
              <Button key="link" type="default">
                <Link to="/heroes">Go To List Heroes</Link>
              </Button>,
              <Button key="add" type="primary" onClick={handleOk}>
                Add New Hero
              </Button>,
            ]}
          ></Modal>
        </div>
      ) : (
        <div>
          <h2>You don't have permission to accept this page!</h2>
        </div>
      )}
    </div>
  );
};

export default AddHero;
