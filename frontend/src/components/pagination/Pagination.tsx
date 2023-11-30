import { FC, ChangeEventHandler } from 'react'
import useFiltersState from '../../hooks/useFiltersState'
import useActions from '../../hooks/useActions'
import './pagination.scss'
import useDataLength from '../../hooks/useDataLength'
import PagesButtons from '../pagesButtons/PagesButtons'

const Pagination: FC = () => {
  const filterState = useFiltersState();
  const dataLength = useDataLength();
  const { setLimit } = useActions();

  const handleLimitClick: ChangeEventHandler<HTMLInputElement> = (e) => setLimit(e.target.id);

  return (
    <div className='pagination'>
      {(dataLength > Number(filterState.limit)) && <PagesButtons />}
      <div className='pagination__limit'>Товаров на странице:
        <input type='radio' name='pages' id='8' className='pagination__checkbox' checked={+filterState.limit === 8} onChange={handleLimitClick} />
        <label htmlFor='8' className='pagination__label'>8</label>
        <input type='radio' name='pages' id='12' className='pagination__checkbox' checked={+filterState.limit === 12} onChange={handleLimitClick} />
        <label htmlFor='12' className='pagination__label'>12</label>
        <input type='radio' name='pages' id='20' className='pagination__checkbox' checked={+filterState.limit === 20} onChange={handleLimitClick} />
        <label htmlFor='20' className='pagination__label'>20</label>
      </div>
    </div>
  )
}

export default Pagination