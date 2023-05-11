import { create } from "zustand";
import { HeroModel } from "../libtypes/heros.type";

interface HeroStore{
  singleRowHeroSelect?: HeroModel,
  setSingleRowHeroSelect: (singleHero: HeroModel) => void
}

export const useHeroStore = create<HeroStore>()((set)=> ({
  singleRowHeroSelect: undefined,
  setSingleRowHeroSelect(singleHero?: HeroModel) {
    set({singleRowHeroSelect: singleHero})
  },
}))


