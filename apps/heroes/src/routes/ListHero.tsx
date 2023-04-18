import React from 'react';
import { Table, Tag } from 'antd';

const ListHero = () => {
    const dataSource = [
        {
          key: '1',
          id: '768',
          name: 'default',
          class: 'Paladin',
          level: 1,
          attributes: {
            'strength': 23,
            'dexterity': 14,
            'intelligence': 10,
            'vitality': 10
          },
          action: 'Delete'
        },
       
      ];
      
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
              return <span>{tags}</span>;
            },
          },
          
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
        },
      ];
    return (
        
            <Table dataSource={dataSource} columns={columns} />
        
    );
};

export default ListHero;