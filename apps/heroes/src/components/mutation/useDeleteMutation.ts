import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleDeleteHero } from "../../service/heroApi";

export default function useDeleteMutation() {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: handleDeleteHero,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listHero"] });
    },
  });

  return deleteMutation;
}
