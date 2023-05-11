import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleUpdateHero } from "../../service/heroApi";
import { HeroModel, Hero } from "../../libtypes/heros.type";

export default function useUpdateMutation() {
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

  return updateMutation;
}
