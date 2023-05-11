import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleUpdateLevelHero } from "../../service/heroApi";
import { HeroModel } from "../../libtypes/heros.type";

export default function useUpdateLevelMutation() {
  const queryClient = useQueryClient();
  const updateLevelMutation = useMutation<
    HeroModel,
    unknown,
    { heroId: number; hero_level: { level: number } }
  >({
    mutationFn: ({ heroId, hero_level }) =>
      handleUpdateLevelHero(heroId, hero_level),
    onSuccess: (data) => {
      queryClient.setQueryData(["single-hero", data.id], data);
      queryClient.invalidateQueries({ queryKey: ["listHero"] });
    },
  });

  return updateLevelMutation;
}
