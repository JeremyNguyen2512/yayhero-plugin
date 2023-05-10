export type HeroClass = 'Warrior' | 'Mage' | 'Rogue' | 'Priest' | 'Paladin' | 'Shaman';

export const HERO_CLASS_LIST = [
  {
    name: 'Warrior',
    value: 'volcano',
  },
  {
    name: 'Mage',
    value: 'purple',
  },
  {
    name: 'Rogue',
    value: 'blue',
  },
  {
    name: 'Priest',
    value: 'gold',
  },
  {
    name: 'Paladin',
    value: 'lime',
  },
  {
    name: 'Shaman',
    value: 'magenta',
  },
];

export const USER_PERMISSION = window.appLocalize.user_permission;

export interface Hero {
  name: string;
  class: HeroClass;
  level: number;
  attributes: HeroAttributes;
}

export type HeroAttributes = {
  strength: number;
  dexterity: number;
  intelligence: number;
  vitality: number;
};

export type HeroModel = Hero & {
  key: number;
  id: number;
};

export type HeroClassColors = Record<
  HeroClass,
  {
    color: string;
    activeColor: string;
  }
>;

export type HeroDataModel = {
  hero_data: HeroModel[];
  total_data: number;
};

export const CHECK_NONCE = {
  headers: {
    'X-WP-Nonce': window.appLocalize.hero_nonce,
  },
};

declare global {
  interface Window {
    appLocalize: {
      api_url: string;
      hero_nonce: string;
      user_permission: string;
    };
  }
}
