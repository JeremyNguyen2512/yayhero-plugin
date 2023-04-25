export type HeroClass = "Warrior" | "Mage" | "Rogue" | "Priest"

export const HERO_CLASS_LIST: HeroClass[] = ["Warrior" , "Mage" , "Rogue" , "Priest"]

interface Hero {
  name: string;
  class: HeroClass;
  level: number;
  attributes: {
    strength: number;
    dexterity: number;
    intelligence: number;
    vitality: number;
  }
}

export type HeroAttributes = {
  strength: number;
    dexterity: number;
    intelligence: number;
    vitality: number;
}

export type HeroModel = Hero & {
  key: number;
  id: number;
}

export type HeroClassColors = Record<HeroClass, {
  color: string;
  activeColor: string;
}>

export type HeroType = Hero


declare global {
  interface Window{
    appLocalize :{
      api_url: string,
      hero_nonce:string
    }
  }
}

