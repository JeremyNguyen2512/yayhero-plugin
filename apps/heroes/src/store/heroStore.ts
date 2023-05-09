import { create } from 'zustand';
import { HeroModel } from '../libtypes/heros.type';
import axios from 'axios';

interface HeroStore {
  singleRowHeroSelect?: HeroModel;
  totalHero?: number;
  listHero?: HeroModel[];
  setListHero: (updateHero: HeroModel[]) => void;
  setSingleRowHeroSelect: (singleHero: HeroModel) => void;
}

interface HeroPageStore {
  page: number;
  pageSize: number;
  setPage: (newPage: number) => void;
  setPageSize: (newPageSize: number) => void;
}

export const useHeroStore = create<HeroStore>()((set) => ({
  singleRowHeroSelect: undefined,
  listHero: [],
  totalHero: 0,
  setListHero: (updateHero?: HeroModel[]) => {
    set({ listHero: updateHero });
  },
  setSingleRowHeroSelect(singleHero?: HeroModel) {
    set({ singleRowHeroSelect: singleHero });
  },
}));

export const useHeroCurrentPageStore = create<HeroPageStore>()((set) => ({
  page: 1,
  pageSize: 5,
  setPage: (newPage: number) => {
    set({ page: newPage });
  },
  setPageSize: (newPageSize: number) => {
    set({ pageSize: newPageSize });
  },
}));
