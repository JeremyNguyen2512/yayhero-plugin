import { create } from "zustand";

interface HeroPageStore{
    page:number,
    pageSize: number,
    setPage:(newPage: number) => void,
    setPageSize: (newPageSize:number) => void
  }

  export const useHeroCurrentPageStore = create<HeroPageStore>()((set)=>({
    page: 1,
    pageSize: 5,
    setPage: (newPage: number) => {
      set({page: newPage})
    }, 
    setPageSize: (newPageSize: number)=> {
      set({pageSize: newPageSize})
    }
  }))