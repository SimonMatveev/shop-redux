import { FC, Dispatch, SetStateAction, useEffect, FormEvent, useState, MouseEventHandler, ChangeEventHandler } from 'react'
import { useGetItemsQuery } from '../../store/api/items.storeApi';
import { ENUM_CATEGORY, ENUM_PLATFORMS, IFilters, IItem } from '../../types/types';
import Container from '../container/Container';
import { CATEGORIES, PLATFORMS } from '../../utils/constants';
import './filters.scss'
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom';
import useFiltersState from '../../hooks/useFiltersState';
import useActions from '../../hooks/useActions';
import useFilter from '../../hooks/useFilter';

interface IfiltersProps {
  setItems: Dispatch<SetStateAction<IItem[] | undefined>>
  setIsLoading: Dispatch<SetStateAction<boolean>>
}

const Filters: FC<IfiltersProps> = ({ setIsLoading, setItems }) => {
  const filtersState = useFiltersState();
  const { data, isLoading } = useGetItemsQuery(filtersState, {});
  const { resetFilters, setSorting, setFromParams } = useActions();
  const [searchParams, setSearchParams] = useSearchParams();

  const { handleChange: handleCategoryChange, values: categoryValues, resetValues: resetCategoryValues, setFilter: setCategoryFilter } = useFilter(CATEGORIES, 'category');
  const { handleChange: handlePlatformChange, values: platformValues, resetValues: resetPlatformValues, setFilter: setPlatformFilter } = useFilter(PLATFORMS, 'platforms');

  const filterToggleSaved = localStorage.getItem('filterToggle');
  const [isActive, setIsActive] = useState<boolean>(filterToggleSaved ? JSON.parse(filterToggleSaved) : false);
  const [isFilterOpen, setIsFilterOpen] = useState<{ [key: string]: boolean }>({ category: false, platforms: false, })


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setCategoryFilter();
    setPlatformFilter();
    setIsFilterOpen({ category: false, platforms: false, });
  }

  const handleFiltersToggle = () => {
    localStorage.setItem('filterToggle', JSON.stringify(!isActive));
    setIsActive(prev => !prev);
  }

  const handleReset = () => {
    resetFilters();
    resetCategoryValues();
    resetPlatformValues();
    setIsFilterOpen({ category: false, platforms: false, });
  }

  const cbCreator = (selectId: string) => {
    return (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(`#${selectId}`)) {
        setIsFilterOpen(prev => { return { ...prev, [selectId]: false, } });
      }
    }
  }

  const handleSelectClick: MouseEventHandler<HTMLElement> = (e) => {
    const { id } = (e.target as HTMLElement);
    const cb = cbCreator(id);
    if (isFilterOpen[id]) {
      setIsFilterOpen(prev => { return { ...prev, [id]: false, } })
      window.removeEventListener('click', cb)
    } else {
      setIsFilterOpen(prev => { return { ...prev, [id]: true, } })
      window.addEventListener('click', cb)
    }
  }

  const handleSelect: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const { value } = e.target.selectedOptions[0];
    setSorting(value);
  }

  useEffect(() => {
    if (data) setItems(data.data);
    setIsLoading(isLoading);
  }, [data, isLoading])

  useEffect(() => {
    setFromParams(searchParams);
  }, [])

  useEffect(() => {
    setSearchParams(filtersState as URLSearchParamsInit);
  }, [filtersState])

  return (
    <div className='filters'>
      <Container newClass='filters__container'>
        <button type='button' className={`filters__button filters__button_t_toggle${isActive ? ' filters__button_active' : ''}`} onClick={handleFiltersToggle}>Фильтры</button>
        <form className={`filters__form${isActive ? ' filters__form_active' : ''}`}>
          <div className='filters__category' id='category'>
            <button type='button' id='category'
              className={`filters__select-title${isFilterOpen.category ? ' filters__select-title_open' : ''}`}
              onClick={handleSelectClick}>Выберите жанры{filtersState.category.length > 0 ? ': ' + filtersState.category.length : ''}</button>
            <div className={`filters__options${isFilterOpen.category ? ' filters__options_open' : ''}`}>
              {CATEGORIES.map((category) => (
                <div className='filters__item' key={category.id}>
                  <input className='filters__checkbox' type='checkbox' name={category.id} id={category.id} onChange={handleCategoryChange} checked={categoryValues[category.id]} />
                  <label htmlFor={category.id} className='filters__option'>{category.name}</label>
                </div>
              ))}
            </div>
          </div>
          <div className='filters__category' id='platforms'>
            <button type='button' id='platforms'
              className={`filters__select-title${isFilterOpen.platforms ? ' filters__select-title_open' : ''}`}
              onClick={handleSelectClick}>Выберите платформы{filtersState.platforms.length > 0 ? ': ' + filtersState.platforms.length : ''}</button>
            <div className={`filters__options${isFilterOpen.platforms ? ' filters__options_open' : ''}`} >
              {PLATFORMS.map((platform) => (
                <div className='filters__item' key={platform.id}>
                  <input className='filters__checkbox' type='checkbox' name={platform.id} id={platform.id} onChange={handlePlatformChange} checked={platformValues[platform.id]} />
                  <label key={platform.id} htmlFor={platform.id} className='filters__option'>{platform.name}</label>
                </div>
              ))}
            </div>
          </div>
          <div className='filters__controls'>
            <button type='submit' className='filters__button' onClick={handleSubmit}>Сохранить</button>
            <button type='button' className='filters__button filters__button_t_reset' onClick={handleReset}>Сбросить фильтры</button>
          </div>
        </form>
        <div className='sort'>
          Сортировать по:
          <select className='sort__select' onChange={handleSelect} defaultValue={`${filtersState.sortItem}-${filtersState.sortOrder}`}>
            <option className='sort__option' value='name-asc'>
              имени: А-Я
            </option>
            <option className='sort__option' value='name-desc'>
              имени: Я-А
            </option>
            <option className='sort__option' value='priceWithSale-asc'>
              цене: возрастание
            </option>
            <option className='sort__option' value='priceWithSale-desc'>
              цене: убывание
            </option>
          </select>
        </div>
      </Container>
    </div>
  )
}

export default Filters