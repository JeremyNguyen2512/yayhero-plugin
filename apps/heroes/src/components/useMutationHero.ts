import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  handleAddHero,
  handleDeleteHero,
  handleUpdateHero,
  handleUpdateLevelHero,
} from "../service/heroApi";
import { HeroModel, Hero } from "../libtypes/heros.type";

export default function useMutationHero() {
  const queryClient = useQueryClient();

  const updateMutation = useMutation<
    HeroModel,
    unknown,
    { heroId: string; hero_data: Hero }
  >({
    mutationFn: ({ heroId, hero_data }) =>
      handleUpdateHero(heroId as string, hero_data),
    onSuccess: (data) => {
      queryClient.setQueryData(["single-hero", data.id], data);
      queryClient.invalidateQueries({ queryKey: ["listHero"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: handleDeleteHero,
    onSuccess: () => {
      console.log("delete mutation");
      queryClient.invalidateQueries({ queryKey: ["listHero"] });
    },
  });

  const addMutation = useMutation({
    mutationFn: handleAddHero,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listHero"] });
    },
  });

  const updateLevelMutation = useMutation<
    HeroModel,
    unknown,
    { heroId: number; hero_level: { level: number } }
  >({
    mutationFn: ({ heroId, hero_level }) =>
      handleUpdateLevelHero(heroId, hero_level),
    onSuccess: (data) => {
      console.log("update level");
      queryClient.setQueryData(["single-hero", data.id], data);
      queryClient.invalidateQueries({ queryKey: ["listHero"] });
    },
  });

  return {
    deleteMutation,
    addMutation,
    updateMutation,
    updateLevelMutation,
  };
}
