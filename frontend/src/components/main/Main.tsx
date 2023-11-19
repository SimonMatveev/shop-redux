import { FC, useEffect, useState } from 'react'
import './main.scss'
import Container from '../container/Container'
import Preloader from '../preloader/Preloader'
import Card from '../card/Card'
import { IItem } from '../../types/types'
import Filters from '../filters/Filters'
import useUser from '../../hooks/useUser'
import useActions from '../../hooks/useActions'

const Main: FC = () => {
  const [items, setItems] = useState<IItem[] | undefined>([]);
  const [isLoading, setIsLoading] = useState(true);
  const user = useUser();
  const { getCurrentUser } = useActions();
  useEffect(() => {
    console.log(user);
  }, [user])
  return (
    <section className='main'>
      <button onClick={() => getCurrentUser()}>Test</button>
      <Filters setItems={setItems} setIsLoading={setIsLoading} />
      <Container>
        {isLoading ?
          <Preloader /> :
          <div className='main__cards'>
            {items && items.map(item => (<Card key={item._id} item={item} />))}
          </div>
        }
      </Container>
    </section>
  )
}

export default Main
