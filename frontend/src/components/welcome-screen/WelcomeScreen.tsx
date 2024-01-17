import { FC, } from 'react'
import Container from '../container/Container'
import './welcome-screen.scss'
import { useGetDiscountedItemsQuery } from '../../store/api/items.storeApi'
import Preloader from '../preloader/Preloader'
import CardPromo from '../card-promo/CardPromo'
import { getRandomEntries } from '../../utils/functions'
import { Link } from 'react-router-dom'

const WelcomeScreen: FC = () => {
    const { data: items = [], isFetching, } = useGetDiscountedItemsQuery(null, {})
    let itemsToRender = getRandomEntries(items, 4)
    return (
        <section className='welcome'>
            <Container newClass='welcome__container'>
                <h1 className='welcome__title'>Добро пожаловать!</h1>
                <Link to='/items' className='welcome__to-items'>Перейти в каталог</Link>
                {!isFetching ?
                    itemsToRender.length > 0 &&
                    <div className='welcome__promo-container'>
                        <p className='welcome__text'>Скидки до 70% - не упустите выгоду!</p>
                        <ul className='welcome__cards'>
                            {itemsToRender.map(item => (
                                <CardPromo key={item._id} item={item} />
                            ))}
                        </ul>
                    </div> :
                    <Preloader />
                }
            </Container>
        </section>
    )
}

export default WelcomeScreen