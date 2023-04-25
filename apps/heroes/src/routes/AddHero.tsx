import React, {useState} from 'react';
import {Link} from 'react-router-dom'
import { Button, Form, Input, Slider, Col, Row, Radio, InputNumber, Tag, Modal, Alert } from 'antd';
import { HERO_CLASS_LIST, HeroType, USER_PERMISSION} from '../libtypes/heros.type';
import axios from 'axios';
import { useHeroStore } from '../store/heroStore';

const AddHero = () => {

    const {listHero, setListHero} = useHeroStore()

    //show popup form after submit
    const [formPopup, setFormPopup] = useState(false)
    const handleOk = ()=>{
        setFormPopup(false)
    }

    //state of form when submit
    const [formDisable, setformDisable] = useState<boolean>(false);

    //state of loading button
    const [isLoading, setIsLoading] = useState<boolean>(false)

    //add hero with call api
    const api_url:string = `${window.appLocalize.api_url}yayhero/v1/heroes/add`
    const [form] = Form.useForm()
    const handlePostData = async (value: any)=>{
        setformDisable(true)
        setIsLoading(true)
        const dataHero:HeroType = {
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
            const checkNonce = {
                headers:{
                  'X-WP-Nonce': window.appLocalize.hero_nonce
                }
              }
            const dataRespon = await axios.post(api_url, dataHero, checkNonce)
            console.log(dataRespon.data)     

        }
        catch(error){
            console.log(error)
        }
        
        setFormPopup(true)
        setformDisable(false)
        setIsLoading(false)
        form.resetFields();
    }
    return (
        <div>
            <p style={{width: '100%', fontWeight: 'bold', marginBottom: 20}}>New Hero</p>
            <Button type="primary" ><Link to="/heroes">Back</Link></Button>
            <Form name="add_hero" disabled={formDisable} style={{marginTop: 30}} labelCol={{span:4, md: 6}} form={form}  wrapperCol={{span:18}} onFinish={handlePostData} >
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
                            {USER_PERMISSION === 'write'?(
                            <Button type="primary" htmlType="submit" loading={isLoading}>Create Hero</Button>
                            ):''}
                        </Form.Item>
                    </Col>
                </Row>
            </Form>

            <Modal onCancel={handleOk} title='Add Hero Success!' open={formPopup} footer={[

            <Button key="link" type='default'><Link to="/heroes">Go To List Heroes</Link></Button>,
            <Button key="add"  type="primary" onClick={handleOk}>Add New Hero</Button>
            ]}>

            </Modal>
        </div>
    );
};

export default AddHero;