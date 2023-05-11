import { useQueryClient } from '@tanstack/react-query';
import { HeroModel } from '../libtypes/heros.type';
import { useHeroStore } from '../store/heroStore';

export default function useQueryHero() {
  const queryClient = useQueryClient();
  const { singleRowHeroSelect, setSingleRowHeroSelect } = useHeroStore();

  const selectHero = (data: HeroModel) => {
    queryClient.setQueryData(['single-hero', String(data.id)], data);
    setSingleRowHeroSelect(data);
  };

  return { selectHero };
}
