import React, { useEffect, useState } from "react";
import {
  Table,
  Tag,
  Button,
  Space,
  Popconfirm,
  Pagination,
  Typography,
} from "antd";
import { Link } from "react-router-dom";
import {
  HERO_CLASS_LIST,
  HeroAttributes,
  HeroClass,
  HeroModel,
  USER_PERMISSION,
} from "../libtypes/heros.type";
import { ColumnsType } from "antd/es/table";
import useQueryHeroes from "../components/useQueryHeroes";
import useQueryHero from "../components/useQueryHero";
import { useHeroCurrentPageStore } from "../store/heroStore";
import useMutationHero from "../components/useMutationHero";
import { UpCircleOutlined } from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
interface DataType {
  id: number;
  name: string;
  class: HeroClass;
  level: number;
  attributes: HeroAttributes;
}

const { Title } = Typography;

//=======zustand logic
const ListHero: React.FC = () => {
  const { page, pageSize, setPage, setPageSize } = useHeroCurrentPageStore();
  const { heroesData, totalPage, isLoading, setListHero } = useQueryHeroes();
  const { deleteMutation, updateLevelMutation } = useMutationHero();

  const [updateLevelLoading, setUpdateLevelLoading] = useState<boolean>(false);
  const [updateLevelDisable, setUpdateLevelDisable] = useState<boolean>(false);

  useEffect(() => {
    if (heroesData?.length === 0 && page > 1) {
      setPage(page - 1);
    }
  }, [heroesData]);

  const handleOnChange = (page: number, pageSize: number) => {
    setPage(page);
    setPageSize(pageSize);
  };

  //code up level heroes new
  // const runDebounce = useCallback(debounce((nextVal)=>handleChange(nextVal), 700), [])
  // const handleUpLevel = (record: DataType) => {
  //   queryClient.setQueryData(["heroesData", page], (oldData) => {
  //     console.log({ oldData });
  //     const newData = oldData.hero_data?.map((item) => {
  //       if (item.id === record.id) {
  //         return { ...item, level: item.level + 1 };
  //       }
  //       return item;
  //     });
  //     console.log(newData);
  //     return {
  //       hero_data: newData,
  //       total_data: oldData.total_data,
  //     };
  //   });

  // };
  //end code up level heroes

  const handleUpLevel = async (record: DataType) => {
    setUpdateLevelLoading(true);
    setUpdateLevelDisable(true);
    const respon = await updateLevelMutation.mutateAsync({
      heroId: record.id,
      hero_level: {
        level: record.level + 1,
      },
    });
    setUpdateLevelLoading(false);
    setUpdateLevelDisable(false);
  };

  const { selectHero } = useQueryHero();

  //set column of table column
  const columns: ColumnsType<DataType> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a: { name: string }, b: { name: string }) =>
        a.name.localeCompare(b.name) * -1,
      render: (name: string, record: { id: number }) => {
        return (
          <Link
            to={USER_PERMISSION === "write" ? `/heroes/edit/${record.id}` : ""}
          >
            {name}
          </Link>
        );
      },
    },
    {
      title: "Class",
      dataIndex: "class",
      key: "class",
      filters: HERO_CLASS_LIST.map((item) => ({
        text: item.name,
        value: item.name,
      })),
      onFilter: (
        value: string | number | boolean,
        record: { class: string }
      ) => {
        return record.class.indexOf(value.toString()) === 0;
      },
    },
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
      render: (level: number, record: DataType) => {
        return (
          <div>
            <Title
              level={2}
              style={{ color: "#003a8c", margin: 0, display: "inline-block" }}
            >
              {level}
            </Title>
            {level === 10 ? (
              ""
            ) : (
              <Button
                style={{ border: "none", padding: 0, background: "unset" }}
                onClick={() => {
                  handleUpLevel(record);
                }}
                loading={updateLevelLoading}
                disabled={updateLevelDisable}
              >
                <UpCircleOutlined
                  style={{ fontSize: 18, marginLeft: 5, cursor: "pointer" }}
                />
              </Button>
            )}
          </div>
        );
      },
    },
    {
      title: "Attributes",
      dataIndex: "attributes",
      key: "attributes",
      render: (attributes: any[], record: { id: number }) => {
        const tags = [];
        for (const [key, attribute] of Object.entries(attributes)) {
          let color;
          if (key === "strength") {
            color = "gold";
          }
          if (key === "dexterity") {
            color = "red";
          }
          if (key === "intelligence") {
            color = "blue";
          }
          if (key === "vitality") {
            color = "cyan";
          }
          tags.push(
            <Tag color={color} key={record.id + key}>
              {`${key}: ${attribute}`}
            </Tag>
          );
        }
        return (
          <Space size={[0, 8]} align="start" direction="vertical" wrap>
            {tags}
          </Space>
        );
      },
    },

    {
      title: "Action",
      key: "action",
      render: (record: { id: number }) =>
        USER_PERMISSION === "write" ? (
          <Popconfirm
            placement="left"
            title="Are you sure to delete this Hero?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => {
              return deleteMutation.mutateAsync(record.id);
            }}
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        ) : (
          ""
        ),
    },
  ];

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
      <Space.Compact block style={{ marginBottom: 16, alignItems: "center" }}>
        <span style={{ width: "100%", fontWeight: "bold" }}>Heroes</span>
        {USER_PERMISSION === "write" ? (
          <Button type="primary" style={{ borderRadius: "6px" }}>
            <Link to="/heroes/add">Add Heroes</Link>
          </Button>
        ) : (
          ""
        )}
      </Space.Compact>
      <Table
        rowSelection={rowSelection}
        dataSource={heroesData}
        columns={columns}
        pagination={false}
        loading={isLoading}
        onRow={(record) => ({
          onClick: () => {
            selectHero(record as HeroModel);
          },
        })}
      />
      <Pagination
        showSizeChanger
        current={page}
        defaultPageSize={pageSize}
        total={totalPage}
        pageSizeOptions={[5, 10, 15, 20]}
        style={{ marginTop: 30 }}
        onChange={(page, pageSize) => {
          handleOnChange(page, pageSize);
        }}
      />
    </div>
  );
};

export default ListHero;
