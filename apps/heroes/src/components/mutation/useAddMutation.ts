import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleAddHero } from "../../service/heroApi";

export default function useAddMutation() {
  const queryClient = useQueryClient();
  const addMutation = useMutation({
    mutationFn: handleAddHero,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listHero"] });
    },
  });

  return addMutation;
}
