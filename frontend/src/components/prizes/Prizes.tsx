import { FC, useState } from 'react'
import './prizes.scss'
import CloseBtn from '../close-btn/CloseBtn';

const Prizes: FC = () => {
    const [isSpin, setIsSpin] = useState(false);
    const [isOpen, setIsOpen] = useState(true);

    const handleBtn = () => {
        setIsSpin(true)
        setTimeout(() => setIsSpin(false), 2000);
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