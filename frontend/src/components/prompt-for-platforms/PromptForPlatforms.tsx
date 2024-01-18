import { Dispatch, FC, MouseEventHandler, SetStateAction, useMemo } from 'react'
import { useGetCurrentUserQuery, useIncrementCartMutation } from '../../store/api/users.storeApi'
import { ENUM_PLATFORMS, IItem } from '../../types/types'
import { PLATFORMS } from '../../utils/constants'
import { getNameFromId } from '../../utils/functions'
import CloseBtn from '../close-btn/CloseBtn'
import './prompt-for-platforms.scss'

interface IPromptForPlatformsProps {
  item: IItem;
  setPromptIsOpen: Dispatch<SetStateAction<boolean>>;
  newClass?: string;
  setUpIsLoading: Dispatch<SetStateAction<boolean>>
}

const PromptForPlatforms: FC<IPromptForPlatformsProps> = ({ item, setPromptIsOpen, newClass, setUpIsLoading }) => {
  const [incrementCart] = useIncrementCartMutation();
  const { data: currentUser, isLoading } = useGetCurrentUserQuery(null, {});

  let inCartItem = useMemo(() => currentUser ? currentUser.cart.items.find(i => i.itemInCart._id === item._id) || null : null, [currentUser])

  const handleChoosePlatformClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    setUpIsLoading(true);
    const platformToSend = (e.target as HTMLButtonElement).id.split('--')[0];
    setPromptIsOpen(false);
    await incrementCart({ itemId: item._id, platform: platformToSend as ENUM_PLATFORMS });
    setUpIsLoading(false);
  }

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