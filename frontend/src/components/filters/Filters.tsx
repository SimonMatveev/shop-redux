import { FC, Dispatch, SetStateAction, useEffect, FormEvent, useState, MouseEventHandler } from 'react'
import { useGetItemsQuery } from '../../store/api/items.storeApi';
import { ENUM_CATEGORY, ENUM_PLATFORMS, IFilters, IItem } from '../../types/types';
import Container from '../container/Container';
import { CATEGORIES, PLATFORMS } from '../../utils/constants';
import { useForm } from '../../hooks/useForm';
import { mapFilter } from '../../utils/functions';
import './filters.scss'

interface IfiltersProps {
  setItems: Dispatch<SetStateAction<IItem[] | undefined>>
  setIsLoading: Dispatch<SetStateAction<boolean>>
}

const Filters: FC<IfiltersProps> = ({ setIsLoading, setItems }) => {
  const initialStateSaved = localStorage.getItem('filterState');
  const initialStateDefault = { category: [], platforms: [], };
  const [filters, setFilters] = useState<IFilters>(initialStateSaved ? JSON.parse(initialStateSaved) : initialStateDefault);
  const { data, isLoading } = useGetItemsQuery(filters, {});
  const initialStateCategory: { [key: string]: boolean, } = {};
  const initialStatePlatform: { [key: string]: boolean, } = {};
  CATEGORIES.forEach(category => initialStateCategory[category.id] = filters.category.some(item => item === category.id));
  PLATFORMS.forEach(platform => initialStatePlatform[platform.id] = filters.platforms.some(item => item === platform.id));

  const filterToggleSaved = localStorage.getItem('filterToggle');
  const [isActive, setIsActive] = useState<boolean>(filterToggleSaved ? JSON.parse(filterToggleSaved) : false);
  const [isFilterOpen, setIsFilterOpen] = useState<{ [key: string]: boolean }>({ category: false, platforms: false, })

  const { values: categoryValues, handleChange: handleCategoryChange, setValues: setCategoryValues, } = useForm(initialStateCategory);
  const { values: platformValues, handleChange: handlePlatformChange, setValues: setPlatformValues, } = useForm(initialStatePlatform);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFilters({
      category: mapFilter<ENUM_CATEGORY>(categoryValues),
      platforms: mapFilter<ENUM_PLATFORMS>(platformValues),
    });
    setIsFilterOpen({ category: false, platforms: false, });
  }

  const handleFiltersToggle = () => {
    localStorage.setItem('filterToggle', JSON.stringify(!isActive));
    setIsActive(prev => !prev);
  }

  const handleReset = () => {
    setFilters(initialStateDefault);
    const resetCategory: { [key: string]: boolean, } = {};
    const resetPlatform: { [key: string]: boolean, } = {};
    CATEGORIES.forEach(category => resetCategory[category.id] = false);
    PLATFORMS.forEach(platform => resetPlatform[platform.id] = false);
    setCategoryValues(resetCategory);
    setPlatformValues(resetPlatform);
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
      window.addEventListener('click', cb)
      setIsFilterOpen(prev => { return { ...prev, [id]: true, } })
    }
  }

  useEffect(() => {
    localStorage.setItem('filterState', JSON.stringify(filters));
  }, [filters])

  useEffect(() => {
    setItems(data);
    setIsLoading(isLoading);
  }, [data, isLoading])

  return (
    <div className='filters'>
      <Container newClass='filters__container'>
        <button type='button' className={`filters__button filters__button_t_toggle${isActive ? ' filters__button_active' : ''}`} onClick={handleFiltersToggle}>Фильтры</button>
        <form className={`filters__form${isActive ? ' filters__form_active' : ''}`}>
          <div className='filters__category' id='category'>
            <button type='button' id='category'
              className={`filters__select-title${isFilterOpen.category ? ' filters__select-title_open' : ''}`}
              onClick={handleSelectClick}>Выберите жанры</button>
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
              onClick={handleSelectClick}>Выберите платформы</button>
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
      </Container>
    </div>
  )
}

export default Filters