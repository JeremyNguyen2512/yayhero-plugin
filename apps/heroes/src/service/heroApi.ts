import { HeroDataModel, HeroModel, Hero } from '../libtypes/heros.type';
import axios from 'axios';

const heroApi = axios.create({
  baseURL: `${window.appLocalize.api_url}yayhero/v1`,
  headers: { 'X-WP-Nonce': window.appLocalize.hero_nonce },
});

export async function handleGetHero(page?: number, pageSize?: number): Promise<HeroDataModel> {
  const api_url: string = `/heroes?paged=${page}&posts_per_page=${pageSize}`;
  const res = await heroApi.get(api_url);
  return res.data as HeroDataModel;
}

export async function handleDeleteHero(heroId: number) {
  const res = await heroApi.delete(`/heroes/${heroId}`);
  return res.data as number;
}

export async function handleAddHero(dataHero: Hero) {
  const res = await heroApi.post('/heroes', dataHero);
  return res.data as number;
}

export async function handleUpdateHero(heroId: string, dataHero: Hero) {
  const res = await heroApi.put(`/heroes/${heroId}`, dataHero);
  return res.data as HeroModel;
}

export async function handleUpdateLevelHero(heroId: number, hero_level: { level: number }) {
  const res = await heroApi.put(`/heroes/${heroId}/update-level`, hero_level);
  return res.data as HeroModel;
}

export async function handleGetSingleHero(heroId: string) {
  const res = await heroApi.get(`/heroes/${heroId}`);
  return res.data as HeroModel;
}