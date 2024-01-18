import { FC } from 'react'
import { Link } from 'react-router-dom'
import Container from '../container/Container'
import './not-found.scss'

const NotFound: FC = () => {
  return (
    <section className='not-found'>
      <Container newClass='not-found__container'>
        <p className='not-found__text'>Страница не найдена!</p>
        <Link to='/items' className='not-found__link'>На главную</Link>
      </Container>
    </section>
  )
}

export default NotFound