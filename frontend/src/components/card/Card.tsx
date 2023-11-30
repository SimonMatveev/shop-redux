import { FC, MouseEventHandler, useEffect, useState } from 'react'
import { ENUM_PLATFORMS, IItem } from '../../types/types'
import './card.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useGetCurrentUserQuery, useIncrementCartMutation } from '../../store/api/users.storeApi'
import AmountChanger from '../amount-changer/AmountChanger'
import { PLATFORMS } from '../../utils/constants'
import PromptForPlatforms from '../prompt-for-platforms/PromptForPlatforms'

interface ICardProps {
  item: IItem
}

const Card: FC<ICardProps> = ({ item }) => {
  const { data, isLoading } = useGetCurrentUserQuery(null, {});
  const [_, { isLoading: upIsLoading }] = useIncrementCartMutation();
  const navigate = useNavigate();

  const [inCartIndex, setInCartIndex] = useState(-1);
  const [platform, setPlatform] = useState<ENUM_PLATFORMS | null>(null);

  const [promptIsOpen, setPromptIsOpen] = useState(false);

  const isOnSale = item.price !== item.priceWithSale;

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

  useEffect(() => {
    if (data) setInCartIndex(data.cart.items.findIndex(cartItem => cartItem.itemInCart._id === item._id))
  }, [data])

  useEffect(() => {
    if (inCartIndex !== -1) setPlatform(data!.cart.items[inCartIndex]?.orders[0].platform || null);
  }, [inCartIndex, data])

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
      {promptIsOpen && <PromptForPlatforms item={item} setPromptIsOpen={setPromptIsOpen} />}
    </article >
  )
}

export default Card
