import { FC, useState } from 'react'
import './main.scss'
import Container from '../container/Container'
import Preloader from '../preloader/Preloader'
import Card from '../card/Card'
import { IItem } from '../../types/types'
import Filters from '../filters/Filters'
import Pagination from '../pagination/Pagination'

const Main: FC = () => {
  const [items, setItems] = useState<IItem[] | undefined>([]);
  const [isLoading, setIsLoading] = useState(true);
  return (
    <section className='main'>
      <Filters setItems={setItems} setIsLoading={setIsLoading} />
      <Container>
        {isLoading ?
          <Preloader /> :
          <>
            <div className='main__cards'>
              {items && items.map(item => (<Card key={item._id} item={item} />))}
            </div>
            <Pagination items={items}/>
          </>
        }
      </Container>
    </section>
  )
}

export default Main
