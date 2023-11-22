import { IFilters } from "../types/types";
import { useTypedSelector } from "./useTypedSelector";

const useFiltersState = () => {
  const filters = useTypedSelector<IFilters>(state => state.filters);
  return filters;
}

export default useFiltersState