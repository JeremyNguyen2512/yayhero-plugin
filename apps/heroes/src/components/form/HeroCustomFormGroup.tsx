import React, { useEffect, useState } from 'react';
import { Form, FormInstance, FormItemProps, Radio, Slider, Tag } from 'antd';
import { HERO_CLASS_LIST, HeroModel } from '../../libtypes/heros.type';

interface HeroClassInputProps {
  value?: string;
  onChange?: (data: string) => void;
}

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
            className={item.name === heroClass ? 'active' : ''}
            style={{
              padding: '5px 10px',
              border: '1px solid #d5d5d5',
              marginBottom: 10,
              cursor: 'pointer',
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
