import {useQuery, useQueryClient } from "@tanstack/react-query"
import { useHeroCurrentPageStore, useHeroStore } from "../store/heroStore"
import { handleGetHero } from "../service/heroApi";
import { useState } from "react";

export default function useQueryHeroes(){
  const queryClient = useQueryClient()
  
    const {listHero, setListHero} = useHeroStore()
    
    const {page, pageSize, setPage} = useHeroCurrentPageStore()

    const [totalPage, setTotalPage] = useState<number>(0)


      const { data, isLoading } = useQuery({
        queryKey: ["listHero", page],
        queryFn: async () => await handleGetHero(page, pageSize),
        keepPreviousData: true,
        onSuccess: (data) => {
          queryClient.setQueryData(['listHero', page], data)
          setListHero(data.hero_data);
          setTotalPage(data.total_data)
        },
      });
      const heroesData = data?.hero_data

    return {heroesData, totalPage, isLoading, setListHero}

}