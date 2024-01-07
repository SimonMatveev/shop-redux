import { FC, useEffect, useState } from 'react'
import './main.scss'
import Container from '../container/Container'
import Preloader from '../preloader/Preloader'
import Card from '../card/Card'
import { IItem } from '../../types/types'
import Filters from '../filters/Filters'
import Pagination from '../pagination/Pagination'
import useDataLength from '../../hooks/useDataLength'
import Prizes from '../prizes/Prizes'

const Main: FC = () => {
  const [items, setItems] = useState<IItem[] | undefined>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPrizesOpen, setIsPrizesOpen] = useState(localStorage.getItem('PrizesClosed') !== 'true');
  const dataLength = useDataLength();

  return (
    <section className='main'>
      <Filters setItems={setItems} setIsLoading={setIsLoading} />
      <Container newClass='main__container'>
        {isLoading ?
          <Preloader /> :
          dataLength > 0 ?
            <>
              <div className='main__cards'>
                {items && items.map(item => (<Card key={item._id} item={item} />))}
              </div>
              <Pagination />
            </> :
            <div className='main__no-result'>Упс! Ничего не найдено!</div>
        }
      </Container>
      {isPrizesOpen && <Prizes setIsOpen={setIsPrizesOpen} />}
    </section>
  )
}

export default Main
