import React, { useEffect, useState } from "react";
import { Form, FormInstance, FormItemProps, Radio, Slider, Tag } from "antd";
import { HERO_CLASS_LIST, HeroModel } from "../../libtypes/heros.type";

interface MyFormItemGroupProps {
  prefix: string | number | (string | number)[];
  children: React.ReactNode;
}

interface HeroClassInputProps {
  value?: string;
  onChange?: (data: string) => void;
}

function toArr(
  str: string | number | (string | number)[]
): (string | number)[] {
  return Array.isArray(str) ? str : [str];
}

const MyFormItemContext = React.createContext<(string | number)[]>([]);

export const MyFormItemGroup = ({ prefix, children }: MyFormItemGroupProps) => {
  const prefixPath = React.useContext(MyFormItemContext);

  const concatPath = React.useMemo(
    () => [...prefixPath, ...toArr(prefix)],
    [prefixPath, prefix]
  );

  return (
    <MyFormItemContext.Provider value={concatPath}>
      {children}
    </MyFormItemContext.Provider>
  );
};

export const MyFormItem = ({ name, ...props }: FormItemProps) => {
  const prefixPath = React.useContext(MyFormItemContext);

  const concatName =
    name !== undefined ? [...prefixPath, ...toArr(name)] : undefined;

  return <Form.Item name={concatName} {...props} />;
};

export const HeroClassInput: React.FC<HeroClassInputProps> = ({
  value,
  onChange,
}: HeroClassInputProps) => {
  const [heroClass, setHeroClass] = useState(value);
  useEffect(() => {
    setHeroClass(value);
  }, [value]);
  const handleChangeClass = (heroClass: string) => {
    setHeroClass(heroClass);
    onChange?.(heroClass);
  };

  return (
    <span>
      {HERO_CLASS_LIST.map((item) => {
        return (
          <Tag
            className={item.name === heroClass ? "active" : ""}
            style={{
              padding: "5px 10px",
              border: "1px solid #d5d5d5",
              marginBottom: 10,
              cursor: "pointer",
            }}
            key={item.name}
            color={item.value}
            onClick={() => {
              handleChangeClass(item.name);
            }}
          >
            {item.name}
          </Tag>
        );
      })}
    </span>
  );
};
