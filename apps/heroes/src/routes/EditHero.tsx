import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useHeroStore } from '../store/heroStore';
import { Link } from 'react-router-dom';
import { Button, Form, Input, Slider, Col, Row, InputNumber, Tag, Modal } from 'antd';
import { Hero, USER_PERMISSION } from '../libtypes/heros.type';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { handleGetSingleHero } from '../service/HeroApi.Service';
import useMutationHero from '../components/useMutationHero';
import {
  HeroClassInput,
  MyFormItem,
  MyFormItemGroup,
} from '../components/form/HeroCustomFormGroup';
import getHeroDatabyID from '../service/GetHeroDataByID';

const EditHero = () => {
  const { updateMutation } = useMutationHero();

  //show popup form after submit
  const [formPopup, setFormPopup] = useState(false);
  const handleOk = () => {
    setFormPopup(false);
  };

  //state of form when submit
  const [formDisable, setformDisable] = useState<boolean>(false);

  //state of loading button
  const [loading, setLoading] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);

  // state of title modal
  const [titleModal, setTitleModal] = useState<string>();

  // Get Single Hero From Store

  //get Single Hero by react hook
  const { singleRowHeroSelect, setSingleRowHeroSelect } = useHeroStore();
  const { heroId } = useParams();
  const [form] = Form.useForm();

  useEffect(() => {
    if (singleRowHeroSelect?.id && Number(heroId) === singleRowHeroSelect.id) {
      form.setFieldsValue({
        name: singleRowHeroSelect?.name,
        class: singleRowHeroSelect?.class,
        level: singleRowHeroSelect?.level,
        attributes: {
          strength: singleRowHeroSelect?.attributes.strength,
          dexterity: singleRowHeroSelect?.attributes.dexterity,
          intelligence: singleRowHeroSelect?.attributes.intelligence,
          vitality: singleRowHeroSelect?.attributes.vitality,
        },
      });
    }
  }, [heroId]);

  useQuery({
    queryKey: ['single-hero', heroId],
    queryFn: () => {
      return heroId ? handleGetSingleHero(heroId) : null;
    },
    onSuccess: (data) => {
      if (data.length > 0) {
        form.setFieldsValue({
          name: data[0]?.name,
          class: data[0]?.class,
          level: data[0]?.level,
          attributes: {
            strength: Number(data[0]?.attributes.strength),
            dexterity: Number(data[0]?.attributes.dexterity),
            intelligence: Number(data[0]?.attributes.intelligence),
            vitality: Number(data[0]?.attributes.vitality),
          },
        });
        setformDisable(false);
      } else {
        setTitleModal('Hero Not Found!');
        setFormPopup(true);
        setformDisable(true);
        setDisabled(true);
      }
    },
  });

  //update hero with call api
  const updateData = async (value: Hero) => {
    setformDisable(true);
    setLoading(true);
    if (heroId) {
      await updateMutation.mutateAsync({ heroId: heroId, hero_data: value });
    }

    setTitleModal('Update Hero Success!');
    setFormPopup(true);
    setformDisable(false);
    setLoading(false);
  };
  return (
    <div>
      <p style={{ width: '100%', fontWeight: 'bold', marginBottom: 20 }}>Edit Hero</p>
      <Button type="primary">
        <Link to="/heroes">Back</Link>
      </Button>
      {USER_PERMISSION === 'write' ? (
        <div>
          <Form
            name="add_hero"
            form={form}
            disabled={formDisable}
            style={{ marginTop: 30 }}
            labelCol={{ span: 4, md: 6 }}
            wrapperCol={{ span: 18 }}
            onFinish={updateData}
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
                <MyFormItemGroup prefix={['attributes']}>
                  <MyFormItem name="strength" label="Strength">
                    <Slider disabled={disabled} />
                  </MyFormItem>
                  <MyFormItem name="dexterity" label="Dexterity">
                    <Slider disabled={disabled} />
                  </MyFormItem>
                  <MyFormItem name="intelligence" label="Intelligence">
                    <Slider disabled={disabled} />
                  </MyFormItem>
                  <MyFormItem name="vitality" label="Vitality">
                    <Slider disabled={disabled} />
                  </MyFormItem>
                </MyFormItemGroup>
              </Col>

              <Col span={24} style={{ textAlign: 'center' }}>
                <Form.Item wrapperCol={{ span: 24 }}>
                  {USER_PERMISSION === 'write' ? (
                    <Button
                      type="primary"
                      loading={loading}
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
          <Modal
            onCancel={handleOk}
            title={titleModal}
            open={formPopup}
            footer={[
              <Button key="link" type="default">
                <Link to="/heroes">Go To List Heroes</Link>
              </Button>,
              <Button key="close" type="primary" onClick={handleOk}>
                Close
              </Button>,
            ]}
          ></Modal>
        </div>
      ) : (
        <h2>You don't have permission to accept this page</h2>
      )}
    </div>
  );
};

export default EditHero;
