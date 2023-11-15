import { FC } from 'react'
import { IItem } from '../../types/types'
import './card.scss'
import { Link } from 'react-router-dom'

interface ICardProps {
  item: IItem
}

const Card: FC<ICardProps> = ({ item }) => {
  return (
    <article className='card' >
      <Link className='card__wrapper' to={`/items/${item._id}`}>
        <img className='card__img' src={item.images[0]} />
        <div className='card__text'>
          <h2 className='card__title'>{item.name}</h2>
          <div className='card__prices'>
            {!item.priceWithSale ?
              <p className='card__price'>{item.price} руб.</p> :
              <>
                <p className='card__price card__price_saleon'>{item.price} руб.</p>
                <p className='card__price card__price_withsale'>{item.priceWithSale} руб.</p>
              </>
            }
          </div>
        </div>
        <button type='button' className='card__btn card__btn_t_buy'>В корзину</button>
      </Link>
    </article>
  )
}

export default Card
