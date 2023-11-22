import { FC, ChangeEventHandler } from 'react'
import { IItem } from '../../types/types'
import useFiltersState from '../../hooks/useFiltersState'
import useActions from '../../hooks/useActions'
import './pagination.scss'

interface IPaginationProps {
  items: IItem[] | undefined
}

const Pagination: FC<IPaginationProps> = ({ items }) => {
  const filterState = useFiltersState();
  const { setLimit } = useActions();

  const handleClick: ChangeEventHandler<HTMLInputElement> = (e) => setLimit(e.target.id);

  return (
    <div className='pagination'>
      {
        true &&
        <div className='pagination__pages'>Страницы</div>
      }
      <div className='pagination__limit'>Товаров на странице:
        <input type='radio' name='pages' id='10' className='pagination__checkbox' checked={+filterState.limit === 10} onChange={handleClick} />
        <label htmlFor='10' className='pagination__label'>10</label>
        <input type='radio' name='pages' id='20' className='pagination__checkbox' checked={+filterState.limit === 20} onChange={handleClick} />
        <label htmlFor='20' className='pagination__label'>20</label>
        <input type='radio' name='pages' id='30' className='pagination__checkbox' checked={+filterState.limit === 30} onChange={handleClick} />
        <label htmlFor='30' className='pagination__label'>30</label>
      </div>
    </div>
  )
}

export default Pagination