import React from 'react';
import {Link} from 'react-router-dom'
import { Button, Form, Input, Slider, Col, Row, Radio, InputNumber } from 'antd';
import { HERO_CLASS_LIST } from '../libtypes/heros.type';

const AddHero = () => {
    return (
        <div>
            <p style={{width: '100%', fontWeight: 'bold', marginBottom: 20}}>New Hero</p>
            <Button type="primary" ><Link to="/heroes">Back</Link></Button>
            <Form name="add_hero" style={{marginTop: 30}} labelCol={{span:6}} wrapperCol={{span:18}} >
                <Row>
                    <Col span={12}>
                        <Form.Item label="Name" name="hero_name" rules={[{required: true, message: "Please input Hero Name"}]} >
                            <Input/>
                        </Form.Item>

                        <Form.Item label="Class" name="hero_class"  rules={[{ required: true, message: 'Please pick an item!' }]} >
                        <Radio.Group>
                            <Radio.Button value="a">item 1</Radio.Button>
                            <Radio.Button value="b">item 2</Radio.Button>
                            <Radio.Button value="c">item 3</Radio.Button>
                        </Radio.Group>
                        </Form.Item>

                            <Form.Item name="hero_level" label="Level" rules={[{required: true, message: "Please choose Hero Level"}]} >
                                <InputNumber min={1} max={10} placeholder='1' defaultValue={1} />
                            </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item name="strength" label="Strength">
                            <Slider defaultValue={10} />
                        </Form.Item>
                        <Form.Item name="dexterity" label="Dexterity">
                            <Slider defaultValue={10} />
                        </Form.Item>
                        <Form.Item name="intelligence" label="Intelligence">
                            <Slider defaultValue={10} />
                        </Form.Item>
                        <Form.Item name="vitality" label="Vitality">
                            <Slider defaultValue={10} />
                        </Form.Item>
                    </Col>

                    <Col span={24} style={{textAlign: 'center'}}>
                        <Form.Item wrapperCol={{span:24}}>
                            <Button type="primary" htmlType="submit">Create Hero</Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default AddHero;