import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { useHeroStore } from '../store/heroStore';
import {Link} from 'react-router-dom'
import { Button, Form, Input, Slider, Col, Row, Radio, InputNumber, Tag, Modal } from 'antd';
import { HERO_CLASS_LIST, HeroModel, HeroType } from '../libtypes/heros.type';
import axios from 'axios';

const EditHero = () => {

    //show popup form after submit
    const [formPopup, setFormPopup] = useState(false)
    const handleOk = ()=>{
        setFormPopup(false)
    }

    //state of form when submit
    const [formDisable, setformDisable] = useState<boolean>(false);

    //state of loading button
    const [loading, setLoading] = useState<boolean>(false)

    //get list hero from store
    const listHero: HeroModel[] = useHeroStore((state)=>state.listHero);
    const {heroId} = useParams()

    let heroDataById:HeroModel | undefined = undefined;
    if(listHero.length > 0){
        heroDataById = listHero.find(hero=> hero.id === Number(heroId));
    }
    const [heroData, setHeroData] = useState<HeroModel | undefined>(heroDataById);

    //update hero with call api
    const api_url:string = `${window.appLocalize.api_url}yayhero/v1/heroes/update/${heroId}`
    const [form] = Form.useForm()
    const handleUpdateData = async(value:any) =>{
        setformDisable(true)
        setLoading(true)
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
            const dataRespon = await axios.put(api_url, dataHero)
            console.log(dataRespon.data)     
        }
        catch(error){
            console.log(error)
        }

        
        setFormPopup(true);
        setformDisable(false)
        setLoading(false)
    }

    return (
        <div>
            <p style={{width: '100%', fontWeight: 'bold', marginBottom: 20}}>New Hero</p>
            <Button type="primary" ><Link to="/heroes">Back</Link></Button>
            <Form name="add_hero"
                disabled={formDisable}
                style={{marginTop: 30}}
                labelCol={{span:4, md: 6}}
                wrapperCol={{span:18}}
                onFinish={handleUpdateData}
                initialValues={{
                    hero_name: heroData?.name,
                    hero_class: heroData?.class,
                    hero_level: heroData?.level,
                    strength: heroData?.attributes.strength,
                    dexterity: heroData?.attributes.dexterity,
                    intelligence: heroData?.attributes.intelligence,
                    vitality: heroData?.attributes.vitality,

                }}
                
                  >
                <Row>
                    <Col span={24} md={12}>
                        <Form.Item label="Name" name="hero_name" rules={[{required: true, message: "Please input Hero Name"}]} >
                            <Input defaultValue={heroData?.name} />
                        </Form.Item>

                        <Form.Item label="Class" name="hero_class"  rules={[{ required: true, message: 'Please pick an item!' }]} >
                        <Radio.Group defaultValue={heroData?.class}>
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
                                <InputNumber min={1} max={10} defaultValue={heroData?.level} placeholder='1' />
                            </Form.Item>
                    </Col>

                    <Col span={24} md={12}>
                        <Form.Item name="strength" label="Strength">
                            <Slider defaultValue={heroData?.attributes.strength} />
                        </Form.Item>
                        <Form.Item name="dexterity" label="Dexterity">
                            <Slider defaultValue={heroData?.attributes.dexterity} />
                        </Form.Item>
                        <Form.Item name="intelligence" label="Intelligence">
                            <Slider defaultValue={heroData?.attributes.intelligence} />
                        </Form.Item>
                        <Form.Item name="vitality" label="Vitality">
                            <Slider defaultValue={heroData?.attributes.vitality} />
                        </Form.Item>
                    </Col>

                    <Col span={24} style={{textAlign: 'center'}}>
                        <Form.Item wrapperCol={{span:24}}>
                            <Button type="primary" loading={loading} style={{background: '#ffc53d'}} htmlType="submit">Update</Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <Modal onCancel={handleOk} title='Update Hero Success!' open={formPopup} footer={[
            <Button key="link" type='default'><Link to="/heroes">Go To List Heroes</Link></Button>,
            <Button key="close"  type="primary" onClick={handleOk}>Close</Button>
            ]}>
              
            </Modal>
        </div>
    );
};

export default EditHero;