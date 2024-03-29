import {
  ChangeEventHandler,
  Dispatch,
  FC,
  FormEvent,
  MouseEventHandler,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom';
import useActions from '../../hooks/useActions';
import useFilter from '../../hooks/useFilter';
import useFiltersState from '../../hooks/useFiltersState';
import { useGetItemsQuery } from '../../store/api/items.storeApi';
import { ENUM_FILTER_NAMES, ENUM_LOCAL_STORAGE, IItem } from '../../types/types';
import { CATEGORIES, PLATFORMS } from '../../utils/constants';
import Container from '../container/Container';
import './filters.scss';

interface IfiltersProps {
  setItems: Dispatch<SetStateAction<IItem[] | undefined>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const Filters: FC<IfiltersProps> = ({ setIsLoading, setItems }) => {
  const filtersState = useFiltersState();

  const { data, isLoading } = useGetItemsQuery(filtersState, {});
  const { resetFilters, setSorting, setFromParams, setDataLength } = useActions();
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    handleChange: handleCategoryChange,
    values: categoryValues,
    resetValues: resetCategoryValues,
    setFilter: setCategoryFilter,
  } = useFilter(CATEGORIES, ENUM_FILTER_NAMES.CATEGORY);
  const {
    handleChange: handlePlatformChange,
    values: platformValues,
    resetValues: resetPlatformValues,
    setFilter: setPlatformFilter,
  } = useFilter(PLATFORMS, ENUM_FILTER_NAMES.PLATFORMS);

  const filterToggleSaved = localStorage.getItem(ENUM_LOCAL_STORAGE.TOGGLE);
  const [isActive, setIsActive] = useState<boolean>(
    filterToggleSaved ? JSON.parse(filterToggleSaved) : false
  );
  const [isFilterOpen, setIsFilterOpen] = useState<{ [key: string]: boolean }>({
    [ENUM_FILTER_NAMES.CATEGORY]: false,
    [ENUM_FILTER_NAMES.PLATFORMS]: false,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setCategoryFilter();
    setPlatformFilter();
    setIsFilterOpen({
      [ENUM_FILTER_NAMES.CATEGORY]: false,
      [ENUM_FILTER_NAMES.PLATFORMS]: false,
    });
  };

  const handleFiltersToggle = () => {
    localStorage.setItem(ENUM_LOCAL_STORAGE.TOGGLE, JSON.stringify(!isActive));
    setIsActive((prev) => !prev);
  };

  const handleReset = () => {
    resetFilters();
    resetCategoryValues();
    resetPlatformValues();
    setIsFilterOpen({
      [ENUM_FILTER_NAMES.CATEGORY]: false,
      [ENUM_FILTER_NAMES.PLATFORMS]: false,
    });
  };

  const cbCreator = (selectId: string) => {
    return (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(`#${selectId}-wrapper`)) {
        setIsFilterOpen((prev) => {
          return { ...prev, [selectId]: false };
        });
      }
    };
  };

  const handleSelectClick: MouseEventHandler<HTMLElement> = (e) => {
    const { id } = e.target as HTMLElement;
    const cb = cbCreator(id);
    if (isFilterOpen[id]) {
      setIsFilterOpen((prev) => {
        return { ...prev, [id]: false };
      });
      window.removeEventListener('click', cb);
    } else {
      setIsFilterOpen((prev) => {
        return { ...prev, [id]: true };
      });
      window.addEventListener('click', cb);
    }
  };

  const handleSelect: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const { value } = e.target.selectedOptions[0];
    setSorting(value);
  };

  useEffect(() => {
    if (data) {
      setItems(data.data);
      setDataLength(data.dbLength);
    }
    setIsLoading(isLoading);
  }, [data, isLoading]);

  useEffect(() => {
    setFromParams(searchParams);
  }, []);

  useEffect(() => {
    const { resetable, ...URLfiltersState } = filtersState;
    setSearchParams(URLfiltersState as URLSearchParamsInit);
  }, [filtersState]);

  return (
    <div className='filters'>
      <Container newClass='filters__container'>
        <button
          type='button'
          className={`filters__button filters__button_t_toggle${
            isActive ? ' filters__button_active' : ''
          }`}
          onClick={handleFiltersToggle}
        >
          Фильтры
        </button>
        <form className={`filters__form${isActive ? ' filters__form_active' : ''}`}>
          <div className='filters__category' id={`${ENUM_FILTER_NAMES.CATEGORY}-wrapper`}>
            <button
              type='button'
              id={ENUM_FILTER_NAMES.CATEGORY}
              className={`filters__select-title${
                isFilterOpen[ENUM_FILTER_NAMES.CATEGORY]
                  ? ' filters__select-title_open'
                  : ''
              }`}
              onClick={handleSelectClick}
            >
              Выберите жанры
              {filtersState[ENUM_FILTER_NAMES.CATEGORY].length > 0
                ? ': ' + filtersState[ENUM_FILTER_NAMES.CATEGORY].length
                : ''}
            </button>
            <div
              className={`filters__options${
                isFilterOpen[ENUM_FILTER_NAMES.CATEGORY] ? ' filters__options_open' : ''
              }`}
            >
              {CATEGORIES.map((category) => (
                <div className='filters__item' key={category.id}>
                  <input
                    className='filters__checkbox'
                    type='checkbox'
                    name={category.id}
                    id={category.id}
                    onChange={handleCategoryChange}
                    checked={categoryValues[category.id]}
                  />
                  <label htmlFor={category.id} className='filters__option'>
                    {category.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div
            className='filters__category'
            id={`${ENUM_FILTER_NAMES.PLATFORMS}-wrapper`}
          >
            <button
              type='button'
              id={ENUM_FILTER_NAMES.PLATFORMS}
              className={`filters__select-title${
                isFilterOpen[ENUM_FILTER_NAMES.PLATFORMS]
                  ? ' filters__select-title_open'
                  : ''
              }`}
              onClick={handleSelectClick}
            >
              Выберите платформы
              {filtersState[ENUM_FILTER_NAMES.PLATFORMS].length > 0
                ? ': ' + filtersState[ENUM_FILTER_NAMES.PLATFORMS].length
                : ''}
            </button>
            <div
              className={`filters__options${
                isFilterOpen[ENUM_FILTER_NAMES.PLATFORMS] ? ' filters__options_open' : ''
              }`}
            >
              {PLATFORMS.map((platform) => (
                <div className='filters__item' key={platform.id}>
                  <input
                    className='filters__checkbox'
                    type='checkbox'
                    name={platform.id}
                    id={platform.id}
                    onChange={handlePlatformChange}
                    checked={platformValues[platform.id]}
                  />
                  <label
                    key={platform.id}
                    htmlFor={platform.id}
                    className='filters__option'
                  >
                    {platform.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className='filters__controls'>
            <button type='submit' className='filters__button' onClick={handleSubmit}>
              Сохранить
            </button>
            <button
              type='button'
              className='filters__button filters__button_t_reset'
              onClick={handleReset}
            >
              Сбросить фильтры
            </button>
          </div>
        </form>
        <div className='sort'>
          Сортировать по:
          <select
            className='sort__select'
            onChange={handleSelect}
            defaultValue={`${filtersState.sortItem}-${filtersState.sortOrder}`}
          >
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
            <option className='sort__option' value='rating-asc'>
              рейтингу: возрастание
            </option>
            <option className='sort__option' value='rating-desc'>
              рейтингу: убывание
            </option>
          </select>
        </div>
      </Container>
    </div>
  );
};

export default Filters;
