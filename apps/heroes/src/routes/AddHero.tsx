import { Link } from "react-router-dom";
import {
  Button,
  Form,
  Input,
  Slider,
  Col,
  Row,
  InputNumber,
  notification,
} from "antd";
import { Hero, USER_PERMISSION } from "../libtypes/heros.type";
import { HeroClassInput } from "../components/form/HeroCustomFormGroup";
import useAddMutation from "../components/mutation/useAddMutation";

const AddHero = () => {
  const addMutation = useAddMutation();

  // notification after update
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (title: string) => {
    api.open({
      message: title,
      placement: "bottomRight",
    });
  };

  //add hero with call api
  const [form] = Form.useForm<Hero>();

  const addHero = async (value: Hero) => {
    await addMutation.mutateAsync(value);
    openNotification("Add Hero Success!");
    form.resetFields();
  };

  return (
    <div>
      <p style={{ width: "100%", fontWeight: "bold", marginBottom: 20 }}>
        New Hero
      </p>
      <Link to="/heroes">
        <Button type="primary">Back</Button>
      </Link>
      {USER_PERMISSION === "write" ? (
        <div>
          <Form
            name="add_hero"
            disabled={addMutation.isLoading}
            style={{ marginTop: 30 }}
            labelCol={{ span: 4, md: 6 }}
            form={form}
            wrapperCol={{ span: 18 }}
            onFinish={addHero}
            initialValues={{
              attributes: {
                strength: 10,
                dexterity: 10,
                intelligence: 10,
                vitality: 10,
              },
            }}
          >
            <Row>
              <Col span={24} md={12}>
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[
                    { required: true, message: "Please input Hero Name" },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Class"
                  name="class"
                  rules={[{ required: true, message: "Please pick an item!" }]}
                >
                  <HeroClassInput />
                </Form.Item>

                <Form.Item
                  name="level"
                  initialValue={1}
                  label="Level"
                  rules={[
                    { required: true, message: "Please choose Hero Level" },
                  ]}
                >
                  <InputNumber min={1} max={10} placeholder="1" />
                </Form.Item>
              </Col>

              <Col span={24} md={12}>
                <Form.Item name={["attributes", "strength"]} label="Strength">
                  <Slider></Slider>
                </Form.Item>
                <Form.Item name={["attributes", "dexterity"]} label="Dexterity">
                  <Slider></Slider>
                </Form.Item>
                <Form.Item
                  name={["attributes", "intelligence"]}
                  label="Intelligence"
                >
                  <Slider></Slider>
                </Form.Item>
                <Form.Item name={["attributes", "vitality"]} label="Vitality">
                  <Slider></Slider>
                </Form.Item>
              </Col>

              <Col span={24} style={{ textAlign: "center" }}>
                <Form.Item wrapperCol={{ span: 24 }}>
                  {USER_PERMISSION === "write" ? (
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={addMutation.isLoading}
                    >
                      Create Hero
                    </Button>
                  ) : (
                    ""
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
          {contextHolder}
        </div>
      ) : (
        <div>
          <h2>You don't have permission to accept this page!</h2>
        </div>
      )}
    </div>
  );
};

export default AddHero;
