import { FC, MouseEventHandler } from 'react';
import useActions from '../../hooks/useActions';
import useDataLength from '../../hooks/useDataLength';
import useFiltersState from '../../hooks/useFiltersState';
import './page-buttons.scss';

const PagesButtons: FC = () => {
  const { setPage } = useActions();
  const filterState = useFiltersState();
  const currentPage = +filterState.page;
  const dataLength = useDataLength();
  const buttonsNumber = Math.ceil(dataLength / Number(filterState.limit));

  const handlePageClick: MouseEventHandler<HTMLLIElement> = (e) => setPage((e.target as HTMLLIElement).textContent!);

  const handleLastPageClick = () => setPage(buttonsNumber.toString());

  const handleFirstPageClick = () => setPage('1');

  return (
    <ul className='page-btns'>
      {(currentPage - 3 > 0) && <li className='page-btns__item' onClick={handleFirstPageClick}>&#8810;</li>}
      {(currentPage - 2 > 0) && <li className='page-btns__item' onClick={handlePageClick}>{currentPage - 2}</li>}
      {(currentPage - 1 > 0) && <li className='page-btns__item' onClick={handlePageClick}>{currentPage - 1}</li>}
      <li className='page-btns page-btns__item_active'>{currentPage}</li>
      {(currentPage + 1 <= buttonsNumber) && <li className='page-btns__item' onClick={handlePageClick}>{currentPage + 1}</li>}
      {(currentPage + 2 <= buttonsNumber) && <li className='page-btns__item' onClick={handlePageClick}>{currentPage + 2}</li>}
      {(currentPage + 3 <= buttonsNumber) && <li className='page-btns__item' onClick={handleLastPageClick}>&#8811;</li>}
    </ul>
  )
}

export default PagesButtons