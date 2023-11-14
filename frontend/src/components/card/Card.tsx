import { FC } from 'react'
import { IItem } from '../../types/types'
import './card.scss'

interface ICardProps {
  item: IItem
}

const Card: FC<ICardProps> = ({ item }) => {
  return (
    <article className='card'>
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
    </article>
  )
}

export default Card