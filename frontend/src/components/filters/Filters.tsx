import { FC, Dispatch, SetStateAction, useEffect, FormEvent } from 'react'
import { useGetItemsQuery } from '../../store/api/items.storeApi';
import { IItem } from '../../types/types';
import Container from '../container/Container';
import { toCapitalCase } from '../../utils/functions';
import { CATEGORIES } from '../../utils/constants';
import { useForm } from '../../hooks/useForm';

interface IfiltersProps {
  setItems: Dispatch<SetStateAction<IItem[] | undefined>>
  setIsLoading: Dispatch<SetStateAction<boolean>>
}

const Filters: FC<IfiltersProps> = ({ setIsLoading, setItems }) => {
  const { data, isLoading } = useGetItemsQuery(null, {});
  const initialState: { [key: string]: any } = {};
  CATEGORIES.forEach(category => initialState[category.id] = true)
  const { values, handleChange } = useForm(initialState);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(values)
    setItems(data?.filter(item => values[item.category]))
  }

  useEffect(() => {
    setItems(data)
    setIsLoading(isLoading)
  }, [data, isLoading])

  return (
    <div className='filters'>
      <Container newClass='filters__container'>
        <button type='button' className='filters__toggle'>Фильтры</button>
        <form className='filters__form'>
          <div className='filters__options'>
            {CATEGORIES.map((category) => (
              <label key={category.id} className='filters__option'>
                <input type='checkbox' name={category.id} id={category.id} value={values[category.id]} onChange={handleChange} />
                {toCapitalCase(category.name)}
              </label>
            ))}
          </div>
          <button type='submit' className='filters__submit' onClick={handleSubmit}>Сохранить</button>
        </form>
      </Container>
    </div>
  )
}

export default Filters