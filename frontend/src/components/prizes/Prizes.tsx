import { Dispatch, FC, SetStateAction, useState } from 'react';
import { PRIZE_SPIN_ANIMATION_DELAY } from '../../utils/constants';
import CloseBtn from '../close-btn/CloseBtn';
import './prizes.scss';

interface IPrizesProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const Prizes: FC<IPrizesProps> = ({ setIsOpen }) => {
  const [isSpin, setIsSpin] = useState(false);

  const handleBtn = () => {
    setIsSpin(true);
    setTimeout(() => setIsSpin(false), PRIZE_SPIN_ANIMATION_DELAY);
  };

  return (
    <article className='prizes'>
      <div className='prizes__container'>
        <CloseBtn
          setIsOpen={setIsOpen}
          newClass='prizes__close'
          newFunc={() => localStorage.setItem('PrizesClosed', 'true')}
        />
        <div
          className={`prizes__spinner${isSpin ? ' prizes__spinner_animation' : ''}`}
        ></div>
        <button className='prizes__btn' onClick={handleBtn}>
          Нажми, чтобы испытать удачу!
        </button>
      </div>
    </article>
  );
};

export default Prizes;
