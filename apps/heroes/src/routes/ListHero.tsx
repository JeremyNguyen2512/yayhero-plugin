import React, {useState, useEffect} from 'react';
import { Table, Tag, Button, Space, Popconfirm } from 'antd';
import {Link} from 'react-router-dom';
import {  useHeroStore } from '../store/heroStore';
import axios from 'axios';

const ListHero: React.FC = () => {
   
  //set column of table column
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
       return <Link to={`/heroes/edit/${record.id}`}>{name}</Link>
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
        render: (record: {id: number})=>(
          <Popconfirm placement='left' title="Are you sure to delete this Hero?" okText="Yes" cancelText="No" onConfirm={()=>handleDelete(record.id)}> 
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
            
            )
    },
  ];

  //delete data from hero store
  const handleDelete = async (hero_id:number) =>{
    const api_url:string = `${window.appLocalize.api_url}yayhero/v1/heroes/delete/${hero_id}`
    try{
      const dataRespon = await axios.delete(api_url)
      console.log(dataRespon)
      if(dataRespon !== null){
        setListHero()
      }
    }
    catch(e){
      console.log(e)
      return 'error';
    }
  }


  // get data heroes from hero srote
 const { listHero, setListHero } = useHeroStore();
  useEffect( () => {
   setListHero();
  }, []);

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
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
        <Table rowSelection={rowSelection} columns={columns} dataSource={listHero} />

      </div>
    );
  };

export default ListHero;