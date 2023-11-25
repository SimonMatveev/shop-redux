import { FC, MouseEventHandler } from 'react'
import { ENUM_PLATFORMS, IItem } from '../../types/types'
import './card.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useGetCurrentUserQuery, useIncrementCartMutation } from '../../store/api/users.storeApi'
import AmountChanger from '../amount-changer/AmountChanger'

interface ICardProps {
  item: IItem
}

const Card: FC<ICardProps> = ({ item }) => {
  const { data } = useGetCurrentUserQuery(null, {});
  const [incrementCart, { isLoading: upIsLoading }] = useIncrementCartMutation();
  const navigate = useNavigate();

  const isInCart = data?.cart.items.some(cartItem => cartItem.itemInCart._id === item._id) || false;
  const isOnSale = item.price !== item.priceWithSale;

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (data) {
      incrementCart({ itemId: item._id, platform: ENUM_PLATFORMS.PC });
    } else {
      navigate('/signin');
    }
  }

  return (
    <article className='card' >
      <Link className='card__wrapper' to={`/items/${item._id}`}>
        <img className='card__img' src={item.images[0]} />
        <div className='card__text'>
          <h2 className='card__title'>{item.name}</h2>
          <div className='card__prices'>
            {!isOnSale ?
              <p className='card__price'>{item.price} руб.</p> :
              <>
                <p className='card__price card__price_saleon'>{item.price} руб.</p>
                <p className='card__price card__price_withsale'>{item.priceWithSale} руб.</p>
              </>
            }
          </div>
        </div>
        {isInCart ?
          <AmountChanger item={item} platformToChange={ENUM_PLATFORMS.PC} /> :
          < button type='button' className={`card__btn${upIsLoading ? ' card__btn_loading' : '  '}`} onClick={handleClick} disabled={upIsLoading}>{!upIsLoading ? 'В корзину' : 'Загрузка...'}</button>
        }
      </Link>
      <div className='card__choose-platform'>
        Выберите платформу
      </div>
    </article >
  )
}

export default Card
