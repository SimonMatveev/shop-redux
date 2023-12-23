import { FC, Dispatch, SetStateAction, MouseEventHandler, useEffect, useState } from 'react'
import { getNameFromId } from '../../utils/functions'
import { ENUM_PLATFORMS, ICartItem, IItem } from '../../types/types'
import { useGetCurrentUserQuery, useIncrementCartMutation } from '../../store/api/users.storeApi'
import './prompt-for-platforms.scss'
import { PLATFORMS } from '../../utils/constants'
import CloseBtn from '../close-btn/CloseBtn'

interface IPromptForPlatformsProps {
  item: IItem;
  setPromptIsOpen: Dispatch<SetStateAction<boolean>>;
  newClass?: string;
  setUpIsLoading: Dispatch<SetStateAction<boolean>>
}

const PromptForPlatforms: FC<IPromptForPlatformsProps> = ({ item, setPromptIsOpen, newClass, setUpIsLoading }) => {
  const [incrementCart] = useIncrementCartMutation();
  const { data: currentUser } = useGetCurrentUserQuery(null, {});
  const [inCartItem, setInCartItem] = useState<ICartItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleChoosePlatformClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    setUpIsLoading(true);
    const platformToSend = (e.target as HTMLButtonElement).id.split('--')[0];
    setPromptIsOpen(false);
    await incrementCart({ itemId: item._id, platform: platformToSend as ENUM_PLATFORMS });
    setUpIsLoading(false);
  }

  useEffect(() => {
    if (currentUser) {
      const inCartItem = currentUser.cart.items.find(i => i.itemInCart._id === item._id);
      setInCartItem(inCartItem || null)
    }
    setIsLoading(false);
  }, [currentUser])

  return (
    <div className={`choose${newClass ? ' ' + newClass : ''}`}>
      <CloseBtn setIsOpen={setPromptIsOpen} newClass='choose__close' />
      <p className='choose__header'>Выберите платформу</p>
      {!isLoading && <ul className='choose__platforms'>
        {item.platforms.filter(platform => {
          if (inCartItem) {
            return inCartItem.orders.every(order => order.platform !== platform);
          }
          return true;
        }).map((platform, index) => (
          <li className='choose__platform' key={index} >
            <button type='button' className='choose__btn' id={`${platform}--option`} onClick={handleChoosePlatformClick}>
              {getNameFromId<ENUM_PLATFORMS>(PLATFORMS, platform)}
            </button>
          </li>))
        }
      </ul>}
    </div>
  )
}

export default PromptForPlatforms