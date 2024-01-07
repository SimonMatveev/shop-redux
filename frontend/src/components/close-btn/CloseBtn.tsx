import { FC, Dispatch, SetStateAction } from 'react'
import './close-btn.scss'

interface ICloseBtnProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  newClass?: string;
  newFunc?: () => void;
}

const CloseBtn: FC<ICloseBtnProps> = ({ setIsOpen, newClass, newFunc }) => {
  const clickHandler = () => {
    setIsOpen(false);
    newFunc && newFunc();
  }

  return (
    <button
      type='button'
      className={`close${newClass ? ' ' + newClass : ''}`}
      onClick={clickHandler}
      aria-label='Закрыть'
    />
  )
}

export default CloseBtn