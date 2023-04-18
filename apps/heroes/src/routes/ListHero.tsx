import React from 'react';
import { Table, Tag, Button, Space } from 'antd';
import { HeroModel } from '../libtypes/heros.type';
import { useState } from 'react';
import {Link} from 'react-router-dom';

const HERO_LIST: HeroModel[] = [    
    {
        key: 12,
      id: 1,
      name: "Iron Man",
      class: "Warrior",
      level: 10,
      attributes: {
        strength: 10,
        dexterity: 10,
        intelligence: 10,
        vitality: 10,
      },
    },
    {
        key: 2,
      id: 2,
      name: "Thor",
      class: "Priest",
      level: 10,
      attributes: {
        strength: 10,
        dexterity: 10,
        intelligence: 10,
        vitality: 10,
      },
    },
    {
        key:3,
      id: 3,
      name: "Black Widow",
      class: "Rogue",
      level: 5,
      attributes: {
        strength: 10,
        dexterity: 10,
        intelligence: 10,
        vitality: 10,
      },
    },
    {
        key: 4,
      id: 4,
      name: "Scarlet Witch",
      class: "Mage",
      level: 15,
      attributes: {
        strength: 10,
        dexterity: 10,
        intelligence: 10,
        vitality: 10,
      },
    },
    {
        key: 5,
      id: 5,
      name: "Dr. Strange",
      class: "Mage",
      level: 10,
      attributes: {
        strength: 10,
        dexterity: 10,
        intelligence: 10,
        vitality: 10,
      },
    },
  ]
  
const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name:string, record: {id: number})=>{
       return <Link to={`heroes/edit/${record.id}`}>{name}</Link>
      }
    },
    {
        title: 'Class',
        dataIndex: 'class',
        key: 'class',
      },
    {
        title: 'Level',
        dataIndex: 'level',
        key: 'level',
    },
    {
        title: 'Attributes',
        dataIndex: 'attributes',
        key: 'attributes',
        render: (attributes: any[]) => {
            
          const tags = [];
          for (const [key, attribute] of Object.entries(attributes)) {
            let color;
            if (key === 'strength') {
              color = 'gold';
            }
            if (key === 'dexterity') {
              color = 'red';
            }
            if (key === 'intelligence') {
              color = 'blue';
            }
            if (key === 'vitality') {
              color = 'cyan';
            }
            tags.push(
              <Tag color={color} key={attribute}>
                {`${key}: ${attribute}`}
              </Tag>
            );
          }
          return <Space size={[0, 8]} align="start" direction='vertical' wrap>{tags}</Space>;
          
        },
      },
      
    {
        title: 'Action',
        key: 'action',
        render: ()=>(
            <span>
<Button type="primary" danger>
            Delete
            </Button>
            </span>
            
            )
    },
  ];

  const ListHero: React.FC = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
      console.log('selectedRowKeys changed: ', newSelectedRowKeys);
      setSelectedRowKeys(newSelectedRowKeys);
    };
  
    const rowSelection = {
      selectedRowKeys,
      onChange: onSelectChange,
    };
  
    return (
      <div>
        <Space.Compact block style={{marginBottom: 16, alignItems: 'center'}} >
            <span style={{width: '100%', fontWeight: 'bold'}}>Heroes</span>
            <Button type="primary" style={{borderRadius: '6px'}}><Link to="/heroes/add">Add Heroes</Link></Button>
            
        </Space.Compact>
        <Table rowSelection={rowSelection} columns={columns} dataSource={HERO_LIST} />
      </div>
    );
  };

export default ListHero;