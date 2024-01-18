import { FC } from 'react'
import { Link } from 'react-router-dom'
import { IItem } from '../../types/types'
import './card-promo.scss'

interface ICardPromoProps {
    item: IItem,
}

const CardPromo: FC<ICardPromoProps> = ({ item }) => {
    return (
        <li className='promo'>
            <Link className='promo__link' to={`/items/${item._id}`}>
                <img className='promo__img' src={item.images[0]} />
                <h3 className='promo__title'>{item.name}</h3>
                <div className='promo__prices'>
                    <p className='promo__price'>{item.price} руб.</p>
                    <p className='promo__price-withsale'>{item.priceWithSale} руб.</p>
                </div>
            </Link>
        </li>
    )
}

export default CardPromo