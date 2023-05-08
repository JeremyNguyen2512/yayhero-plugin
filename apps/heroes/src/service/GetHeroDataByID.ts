import { useQuery } from "@tanstack/react-query";
import { handleGetSingleHero } from "../service/HeroApi.Service";
import { useHeroStore } from "../store/heroStore";

export default  function getHeroDatabyID (heroId: string| undefined) {

    // const { data } = useQuery({
    //     queryKey: ["single-hero", heroId],
    //     queryFn: async () => {
    //       return heroId ? await handleGetSingleHero(heroId) : null;
    //     },
    //   });
    
    const { singleRowHeroSelect, setSingleRowHeroSelect } = useHeroStore();

    if (singleRowHeroSelect?.id && Number(heroId) === singleRowHeroSelect.id) {
        return singleRowHeroSelect;
      }

    //   if (data && data.length > 0) {
    //     return data[0];
    //   }
    
      return undefined;
}