import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useHeroStore } from '../store/heroStore';
import { Link } from 'react-router-dom';
import { Button, Form, Input, Slider, Col, Row, InputNumber, notification } from 'antd';
import { Hero, HeroModel, USER_PERMISSION } from '../libtypes/heros.type';
import { isError, useQuery } from '@tanstack/react-query';
import { handleGetSingleHero } from '../service/heroApi';
import { HeroClassInput } from '../components/form/HeroCustomFormGroup';
import useUpdateMutation from '../components/mutation/useUpdateMutation';
import { CheckOutlined } from '@ant-design/icons';

const EditHero = () => {
  const updateMutation = useUpdateMutation();

  //get Single Hero by react hook
  const { singleRowHeroSelect, setSingleRowHeroSelect } = useHeroStore();
  const { heroId } = useParams();
  const [form] = Form.useForm<HeroModel>();

  const { data: heroData, isLoading } = useQuery({
    queryKey: ['single-hero', heroId],
    queryFn: () => {
      if (!heroId) {
        return undefined;
      }
      if (singleRowHeroSelect?.id === parseInt(heroId)) {
        return singleRowHeroSelect;
      }
      return handleGetSingleHero(heroId);
    },
    onSuccess: (hero) => {
      if (hero) {
        setSingleRowHeroSelect(hero);
      }
    },
    onError: (error) => {
      openNotification('Hero Not Found!');
    },
  });
  if (heroData) {
    form.setFieldsValue(heroData);
  }

  // notification after update
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (title: string) => {
    api.open({
      message: title,
      placement: 'bottomRight',
    });
  };

  //update hero with call api
  const updateHero = async (value: Hero) => {
    if (heroId) {
      await updateMutation.mutateAsync({ heroId: heroId, hero_data: value });
      openNotification('Update Hero Success!');
    }
  };
  return (
    <div>
      <p style={{ width: '100%', fontWeight: 'bold', marginBottom: 20 }}>Edit Hero</p>
      <Link to="/heroes">
        <Button type="primary">Back</Button>
      </Link>
      {USER_PERMISSION === 'write' ? (
        <div>
          <Form
            name="add_hero"
            form={form}
            disabled={updateMutation.isLoading}
            style={{ marginTop: 30 }}
            labelCol={{ span: 4, md: 6 }}
            wrapperCol={{ span: 18 }}
            onFinish={updateHero}
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
                  label="Level"
                  rules={[{ required: true, message: 'Please choose Hero Level' }]}
                >
                  <InputNumber min={1} max={10} placeholder="1" />
                </Form.Item>
              </Col>

              <Col span={24} md={12}>
                <Form.Item name={['attributes', 'strength']} label="Strength">
                  <Slider></Slider>
                </Form.Item>
                <Form.Item name={['attributes', 'dexterity']} label="Dexterity">
                  <Slider></Slider>
                </Form.Item>
                <Form.Item name={['attributes', 'intelligence']} label="Intelligence">
                  <Slider></Slider>
                </Form.Item>
                <Form.Item name={['attributes', 'vitality']} label="Vitality">
                  <Slider></Slider>
                </Form.Item>
              </Col>

              <Col span={24} style={{ textAlign: 'center' }}>
                <Form.Item wrapperCol={{ span: 24 }}>
                  {USER_PERMISSION === 'write' ? (
                    <Button
                      type="primary"
                      loading={updateMutation.isLoading}
                      style={{ background: '#ffc53d' }}
                      htmlType="submit"
                    >
                      Update
                    </Button>
                  ) : (
                    ''
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
          {contextHolder}
        </div>
      ) : (
        <h2>You don't have permission to accept this page</h2>
      )}
    </div>
  );
};

export default EditHero;
