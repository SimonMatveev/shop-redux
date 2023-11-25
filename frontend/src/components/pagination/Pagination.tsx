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
        <input type='radio' name='pages' id='4' className='pagination__checkbox' checked={+filterState.limit === 4} onChange={handleLimitClick} />
        <label htmlFor='4' className='pagination__label'>4</label>
        <input type='radio' name='pages' id='8' className='pagination__checkbox' checked={+filterState.limit === 8} onChange={handleLimitClick} />
        <label htmlFor='8' className='pagination__label'>8</label>
        <input type='radio' name='pages' id='10' className='pagination__checkbox' checked={+filterState.limit === 10} onChange={handleLimitClick} />
        <label htmlFor='10' className='pagination__label'>10</label>
      </div>
    </div>
  )
}

export default Pagination