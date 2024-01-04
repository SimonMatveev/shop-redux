import { FC, useState } from 'react'
import './prizes.scss'
import CloseBtn from '../close-btn/CloseBtn';
import { PRIZE_SPIN_ANIMATION_DELAY } from '../../utils/constants';

const Prizes: FC = () => {
    const [isSpin, setIsSpin] = useState(false);
    const [isOpen, setIsOpen] = useState(true);

    const handleBtn = () => {
        setIsSpin(true)
        setTimeout(() => setIsSpin(false), PRIZE_SPIN_ANIMATION_DELAY);
    }

    return (
        <article className={`prizes${isOpen ? ' prizes_open' : ''}`}>
            <div className='prizes__container'>
                <CloseBtn setIsOpen={setIsOpen} newClass='prizes__close'/>
                <div className={`prizes__spinner${isSpin ? ' prizes__spinner_animation' : ''}`}></div>
                <button className='prizes__btn' onClick={handleBtn}>Нажми, чтобы испытать удачу!</button>
            </div>
        </article>
    )
}

export default Prizes