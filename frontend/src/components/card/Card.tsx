import { FC, MouseEventHandler, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useGetCurrentUserQuery } from '../../store/api/users.storeApi'
import { IItem } from '../../types/types'
import { PLATFORMS } from '../../utils/constants'
import { getRating } from '../../utils/functions'
import AmountChanger from '../amount-changer/AmountChanger'
import PromptForPlatforms from '../prompt-for-platforms/PromptForPlatforms'
import './card.scss'

interface ICardProps {
  item: IItem
}

const Card: FC<ICardProps> = ({ item }) => {
  const { data, isLoading } = useGetCurrentUserQuery(null, {});
  const [upIsLoading, setUpIsLoading] = useState(false);
  const navigate = useNavigate();
  const [promptIsOpen, setPromptIsOpen] = useState(false);

  const isOnSale = item.price !== item.priceWithSale;
  const ratingColor = getRating(item.rating);

  let inCartIndex = useMemo(() => {
    return data ? data.cart.items.findIndex(cartItem => cartItem.itemInCart._id === item._id) : -1
  }, [data]);

  let platform = useMemo(() => {
    return inCartIndex !== -1 ? data!.cart.items[inCartIndex]?.orders[0].platform : null
  }, [inCartIndex]);

  const handleAddToCartClick: MouseEventHandler = (e) => {
    e.preventDefault()
    if (data) {
      setPromptIsOpen(true);
    } else {
      navigate('/signin');
    }
  }

  const getPlatformNameFromData = () =>
    PLATFORMS.find(platform => platform.id === data!.cart.items[inCartIndex]?.orders[0].platform)?.name || '';

  return (
    <article className='card' >
      <Link className='card__wrapper' to={`/items/${item._id}`}>
        <img className='card__img' src={item.images[0]} />
        {item.rating !== -1 &&
          <div className={`card__rating card__rating_color_${ratingColor}`}>&#9733; {item.rating.toFixed(2)}</div>
        }
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
        {!isLoading && inCartIndex !== -1 ?
          <>
            <AmountChanger item={item} platformToChange={platform} />
            <span className='card__platform-first'>
              {getPlatformNameFromData()}
            </span>
          </> :
          < button
            type='button'
            className={`card__btn${upIsLoading ? ' card__btn_loading' : '  '}`}
            onClick={handleAddToCartClick}
            disabled={upIsLoading}>
            {!upIsLoading ? 'В корзину' : 'Загрузка...'}
          </button>
        }
      </Link>
      {promptIsOpen && <PromptForPlatforms item={item} setPromptIsOpen={setPromptIsOpen} setUpIsLoading={setUpIsLoading} />}
    </article >
  )
}

export default Card
