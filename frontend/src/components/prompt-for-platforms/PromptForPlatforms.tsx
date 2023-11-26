import { FC, Dispatch, SetStateAction, MouseEventHandler } from 'react'
import { getNameFromId } from '../../utils/functions'
import { ENUM_PLATFORMS, IItem } from '../../types/types'
import { useIncrementCartMutation } from '../../store/api/users.storeApi'
import './prompt-for-platforms.scss'
import { PLATFORMS } from '../../utils/constants'

interface IPromptForPlatformsProps {
  item: IItem;
  setPromptIsOpen: Dispatch<SetStateAction<boolean>>;
  newClass?: string;
}

const PromptForPlatforms: FC<IPromptForPlatformsProps> = ({ item, setPromptIsOpen, newClass }) => {
  const [incrementCart] = useIncrementCartMutation();

  const handleChoosePlatformClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    const platformToSend = (e.target as HTMLButtonElement).id.split('--')[0]
    incrementCart({ itemId: item._id, platform: platformToSend as ENUM_PLATFORMS });
    setPromptIsOpen(false);
  }

  return (
    <div className={`choose${newClass ? ' ' + newClass : ''}`}>
      <button type='button' className='choose__close' onClick={() => setPromptIsOpen(false)} />
      <p className='choose__header'>Выберите платформу</p>
      <ul className='choose__platforms'>
        {item.platforms.map((platform, index) => (
          <li className='choose__platform' key={index} >
            <button type='button' className='choose__btn' id={`${platform}--option`} onClick={handleChoosePlatformClick}>
              {getNameFromId<ENUM_PLATFORMS>(PLATFORMS, platform)}
            </button>
          </li>))
        }
      </ul>
    </div>
  )
}

export default PromptForPlatforms