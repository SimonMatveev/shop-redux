import { FC, Dispatch, SetStateAction } from 'react'
import './close-btn.scss'

interface ICloseBtnProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  newClass?: string;
}

const CloseBtn: FC<ICloseBtnProps> = ({ setIsOpen, newClass }) => {
  return (
    <button
      type='button'
      className={`close${newClass ? ' ' + newClass : ''}`}
      onClick={() => setIsOpen(false)}
      aria-label='Закрыть'
    />
  )
}

export default CloseBtn