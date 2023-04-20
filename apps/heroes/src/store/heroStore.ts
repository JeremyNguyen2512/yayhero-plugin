import { create } from "zustand";
import { HeroModel } from "../libtypes/heros.type";
import axios from "axios";


interface HeroStore{
  listHero: HeroModel[],
  setListHero: ()=> void,
}

const getListHero = async ():Promise<HeroModel[]> =>{
  const api_url:string = `${window.appLocalize.api_url}yayhero/v1/list_heroes`
  try{
    const heroData: {data:HeroModel[]} = await axios.get(api_url)
    return heroData.data
  }
  catch(error){
    console.log(error)
    return []
  }
}

export const useHeroStore = create<HeroStore>()((set)=> ({
  listHero: [],
  setListHero: async () => {
    const heroes = await getListHero()
    set({listHero: heroes})
  }
}))
