export type HeroClass = "Warrior" | "Mage" | "Rogue" | "Priest"

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

export type HeroModel = Hero & {
  key: number;
  id: number;
}

export type HeroClassColors = Record<HeroClass, {
  color: string;
  activeColor: string;
}>