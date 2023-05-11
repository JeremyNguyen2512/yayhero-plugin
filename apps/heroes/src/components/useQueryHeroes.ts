import { useQuery } from "@tanstack/react-query";
import { useHeroCurrentPageStore } from "../store/heroCurrentPageStore";
import { handleGetHero } from "../service/heroApi";

export default function useQueryHeroes() {
  const { page, pageSize } = useHeroCurrentPageStore();

  const dataQueries = useQuery({
    queryKey: ["listHero", { page: page, pageSize: pageSize }],
    queryFn: async () => await handleGetHero(page, pageSize),
    keepPreviousData: true,
  });
  return dataQueries.data;
}
