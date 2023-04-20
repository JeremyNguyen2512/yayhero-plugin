import React, {useState} from 'react';
import {Link} from 'react-router-dom'
import { Button, Form, Input, Slider, Col, Row, Radio, InputNumber, Tag, Modal } from 'antd';
import { HERO_CLASS_LIST, HeroType } from '../libtypes/heros.type';
import axios from 'axios';

const AddHero = () => {

    //show popup form after submit
    const [formPopup, setFormPopup] = useState(false)
    const handleOk = ()=>{
        setFormPopup(false)
    }

    //add hero with call api
    const api_url:string = `${window.appLocalize.api_url}yayhero/v1/add_hero`
    const [form] = Form.useForm()
    const handle_post_data = async (value: any)=>{
        const dataPost:HeroType = {
            name: value.hero_name,
            class: value.hero_class,
            level: value.hero_level,
            attributes: {
                strength: value.strength,
                dexterity: value.dexterity,
                intelligence: value.intelligence,
                vitality: value.vitality,
            },
        }
        try{
            const dataRespon = await axios.post(api_url, dataPost) 
            console.log(dataRespon.data)       
        }
        catch(error){
            console.log(error)
        }

        
        setFormPopup(true);
        form.resetFields();
    }
    return (
        <div>
            <p style={{width: '100%', fontWeight: 'bold', marginBottom: 20}}>New Hero</p>
            <Button type="primary" ><Link to="/heroes">Back</Link></Button>
            <Form name="add_hero" style={{marginTop: 30}} labelCol={{span:4, md: 6}} form={form}  wrapperCol={{span:18}} onFinish={handle_post_data} >
                <Row>
                    <Col span={24} md={12}>
                        <Form.Item label="Name" name="hero_name" rules={[{required: true, message: "Please input Hero Name"}]} >
                            <Input/>
                        </Form.Item>

                        <Form.Item label="Class" name="hero_class"  rules={[{ required: true, message: 'Please pick an item!' }]} >
                        <Radio.Group>
                            { 
                                HERO_CLASS_LIST.map(item=>{
                                    let color:string = '';
                                    if(item === 'Warrior'){
                                        color = "volcano"
                                    }
                                    if(item === 'Mage'){
                                        color = "purple"
                                    }
                                    if(item === 'Rogue'){
                                        color = "blue"
                                    }
                                    if(item === 'Priest'){
                                        color = "gold"
                                    }
                                     return <Tag style={{padding: 0, border: 'none'}}  key={item} color={color}><Radio.Button style={{color:'unset', background:'unset'}} value={item}>{item}</Radio.Button></Tag>
                                }) 
                            
                            }
                            
                           
                        </Radio.Group>
                        </Form.Item>

                            <Form.Item name="hero_level" label="Level" rules={[{required: true, message: "Please choose Hero Level"}]} >
                                <InputNumber min={1} max={10} placeholder='1' defaultValue={1} />
                            </Form.Item>
                    </Col>

                    <Col span={24} md={12}>
                        <Form.Item name="strength" label="Strength" rules={[{required: true, message: "Please choose value"}]}>
                            <Slider defaultValue={10} />
                        </Form.Item>
                        <Form.Item name="dexterity" label="Dexterity" rules={[{required: true, message: "Please choose value"}]}>
                            <Slider defaultValue={10} />
                        </Form.Item>
                        <Form.Item name="intelligence" label="Intelligence" rules={[{required: true, message: "Please choose value"}]}>
                            <Slider defaultValue={10} />
                        </Form.Item>
                        <Form.Item name="vitality" label="Vitality" rules={[{required: true, message: "Please choose value"}]}>
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

            <Modal title="Add Hero Success!" onCancel={handleOk} open={formPopup} footer={[
            <Button key="link" type='default'><Link to="/heroes">Go To List Heroes</Link></Button>,
            <Button key="add" type="primary" onClick={handleOk}>Add New Hero</Button>
            ]}>
                
            </Modal>
        </div>
    );
};

export default AddHero;