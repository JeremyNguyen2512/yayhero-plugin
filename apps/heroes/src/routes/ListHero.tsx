import React, {useState, useEffect} from 'react';
import { Table, Tag, Button, Space, Popconfirm, Pagination } from 'antd';
import {Link} from 'react-router-dom';
import {  useHeroStore } from '../store/heroStore';
import axios from 'axios';
import { HERO_CLASS_LIST, HeroAttributes, HeroClass } from '../libtypes/heros.type';
import { ColumnsType } from 'antd/es/table';

interface DataType{
  id: number,
  name: string,
  class: HeroClass,
  level: number,
  attributes: HeroAttributes,
}

const ListHero: React.FC = () => {

  //set column of table column
  const columns:ColumnsType<DataType> = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: {name:string}, b: {name:string}) => a.name.localeCompare(b.name) * -1,
      render: (name:string, record: {id: number})=>{
        return <Link to={`/heroes/edit/${record.id}`}>{name}</Link>
      },
    },
    {
      title: 'Class',
      dataIndex: 'class',
      key: 'class',
      filters: HERO_CLASS_LIST.map(item =>({text: item, value: item})),
      onFilter: (value: string | number | boolean, record:{class:string})=> { return record.class.indexOf(value.toString()) === 0},
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
          <Popconfirm placement='left'
            title="Are you sure to delete this Hero?"
            okText="Yes"
            cancelText="No"
            onConfirm={()=>handleDelete(record.id)}> 
              <Button type="primary" danger>
                Delete
              </Button>
          </Popconfirm>
            )
    },
  ];

  const [loading, setLoading] = useState<boolean>(false);
  const[page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(5)
  //delete data from hero store
  const handleDelete = async (hero_id:number) =>{
    const api_url:string = `${window.appLocalize.api_url}yayhero/v1/heroes/delete/${hero_id}`
    try{
      const checkNonce = {
        headers:{
          'X-WP-Nonce': window.appLocalize.hero_nonce
        }
      }
       await axios.delete(api_url, checkNonce)
      setListHero(page, pageSize)
    }
    catch(e){
      console.log(e)
      return 'error';
    }
  }

  const handleOnChange = async(page:number, pageSize:number)=>{
    setLoading(true)
    setPage(page)
    setPageSize(pageSize)
    await setListHero(page, pageSize)
    setLoading(false)
  }

  // get data from hero srote
 const { listHero,totalHero, setListHero } = useHeroStore();
    useEffect(() => {
     setListHero(page, pageSize);
     
  }, []);


  //select row
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
      <Table 
      rowSelection={rowSelection}
      columns={columns} 
      dataSource={listHero}
      pagination={false}
      loading={loading}
      />
      <Pagination
        showSizeChanger
        defaultCurrent={1}
        defaultPageSize={5}
        pageSizeOptions={[5,10, 15, 20]}
        total={totalHero}
        style={{marginTop: 30}}
        onChange={(page, pageSize)=>{
          handleOnChange(page, pageSize)
        }}
      />

    </div>
  );
};

export default ListHero;