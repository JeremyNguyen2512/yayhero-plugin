import React from "react";
import { CHECK_NONCE, HeroDataModel, HeroModel, HeroType } from "../libtypes/heros.type";
import axios from "axios";



const api_prefix:string = window.appLocalize.api_url

export async function handleGetHero  (page?:number, pageSize?:number):Promise<HeroDataModel>{
    const api_url:string = `${api_prefix}yayhero/v1/heroes/list?paged=${page}&posts_per_page=${pageSize}`
    const heroData: {data:HeroDataModel} = await axios.get(api_url, CHECK_NONCE)
    return heroData.data
}

export async function handleDeleteHero  (hero_id:number, ){
    const api_url:string = `${api_prefix}yayhero/v1/heroes/delete/${hero_id}`
    const heroData: {data:HeroDataModel} = await axios.delete(api_url, CHECK_NONCE)
    return heroData
}

export async function handleAddHero(dataHero:HeroType){
    const api_url:string = `${api_prefix}yayhero/v1/heroes/add`
    const heroData: {data:HeroDataModel} = await axios.post(api_url, dataHero, CHECK_NONCE)
    return heroData
}

export async function handleUpdateHero(hero_id:string, data_hero:HeroType){
    const api_url:string = `${window.appLocalize.api_url}yayhero/v1/heroes/update/${hero_id}`
        const dataRespon: {data: HeroModel} = await axios.put(api_url, data_hero, CHECK_NONCE)
        return dataRespon.data;
}

export async function handleUpdateLevelHero(hero_id:number, hero_level: {level:number}){
    const api_url:string = `${window.appLocalize.api_url}yayhero/v1/heroes/update-level/${hero_id}`
        const dataRespon: {data: HeroModel} = await axios.put(api_url, hero_level, CHECK_NONCE)
        return dataRespon.data;
}

export async function handleGetSingleHero(heroId:string){
    const api_url:string = `${window.appLocalize.api_url}yayhero/v1/heroes/single/${heroId}`
    const dataRespon = await axios.get(api_url, CHECK_NONCE)
        return dataRespon.data 
}

