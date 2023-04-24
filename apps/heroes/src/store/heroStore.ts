import { create } from "zustand";
import { HeroModel } from "../libtypes/heros.type";
import axios from "axios";


interface HeroStore{
  totalHero: number,
  listHero: HeroModel[],
  setListHero: (page?:number, pageSize?:number)=> void,
}

interface HeroDataModel{
  hero_data: HeroModel[],
  total_data: number
}

const getListHero = async (page?:number, pageSize?:number):Promise<HeroDataModel> =>{
  const api_url:string = `${window.appLocalize.api_url}yayhero/v1/heroes/list?paged=${page}&posts_per_page=${pageSize}`
  try{
    const heroData: {data:HeroDataModel} = await axios.get(api_url)
    return heroData.data
  }
  catch(error){
    console.log(error)
    return { hero_data: [], total_data: 0 };
  }
}

export const useHeroStore = create<HeroStore>()((set)=> ({
  listHero: [],
  totalHero: 0,
  setListHero: async (page?:number, pageSize?:number) => {
    const {hero_data, total_data} = await getListHero(page, pageSize)
    set({listHero: hero_data, totalHero: total_data})
  },
}))
