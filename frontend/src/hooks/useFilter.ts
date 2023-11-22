import { useEffect } from 'react';
import { mapFilter } from "../utils/functions";
import useActions from "./useActions";
import useFiltersState from "./useFiltersState";
import { useForm } from "./useForm";

interface Iname {
  id: string;
  name: string;
};

function useFilter<T>(nameList: Iname[], alias: string,) {
  const filtersState = useFiltersState();
  const { values, handleChange, setValues, } = useForm(updateValues());
  const { setCategory } = useActions();

  function updateValues() {
    const initialState: { [key: string]: boolean } = {};
    nameList.forEach(i => initialState[i.id] = (filtersState[alias] as string[]).some(item => item === i.id));
    return initialState;
  }

  const resetValues = () => {
    const resetState: { [key: string]: boolean, } = {};
    nameList.forEach(item => resetState[item.id] = false);
    setValues(resetState);
  }

  const setFilter = () => {
    setCategory({
      values: mapFilter<T>(values),
      field: alias,
    })
  }

  useEffect(() => {
    setValues(updateValues())
  }, [filtersState])

  return {
    resetValues,
    handleChange,
    setFilter,
    values,
  }

}

export default useFilter;