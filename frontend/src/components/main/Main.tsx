import { FC } from 'react'
import './main.scss'
import Container from '../container/Container'
import { useGetItemsQuery } from '../../store/api/items.storeApi'
import Preloader from '../preloader/Preloader'
import Card from '../card/Card'

const Main: FC = () => {
  const { data, isLoading } = useGetItemsQuery(null, {});
  return (
    <section className='main'>
      <Container>
        {isLoading ?
          <Preloader /> :
          <div className='main__cards'>
            {data && data.map(item => (<Card key={item._id} item={item} />))}
          </div>
        }
      </Container>
    </section>
  )
}

export default Main