import { FC, MouseEventHandler } from 'react'
import { IItem } from '../../types/types'
import './card.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useDecrementCartMutation, useGetCurrentUserQuery, useIncrementCartMutation } from '../../store/api/users.storeApi'

interface ICardProps {
  item: IItem
}

const Card: FC<ICardProps> = ({ item }) => {
  const { data } = useGetCurrentUserQuery(null, {});
  const [incrementCart, { isLoading: upIsLoading }] = useIncrementCartMutation();
  const [decrementCart, { isLoading: downIsLoading }] = useDecrementCartMutation();
  const navigate = useNavigate();

  const isInCart = data?.cart.items.some(cartItem => cartItem.itemInCart._id === item._id) || false;
  const thisItemInCart = data?.cart.items.find(cartItem => cartItem.itemInCart._id === item._id);

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (data) {
      incrementCart(item._id);
    } else {
      navigate('/signin');
    }
  }

  const handleIncrement: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    incrementCart(item._id);
  }

  const handleDecrement: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    decrementCart(item._id);
  }

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
        {isInCart ?
          <div className='card__btn-container'>
            < button type='button' className='card__btn card__btn_t_control' onClick={handleDecrement}>-</button>
            <span className='card__amount'>{thisItemInCart?.amount}</span>
            < button type='button' className='card__btn card__btn_t_control' onClick={handleIncrement}>+</button>
          </div> :
          < button type='button' className='card__btn' onClick={handleClick}>В корзину</button>
        }
      </Link>
    </article >
  )
}

export default Card
