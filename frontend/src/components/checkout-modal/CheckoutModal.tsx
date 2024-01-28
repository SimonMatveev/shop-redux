import { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from 'react';
import { useClearCartMutation } from '../../store/api/users.storeApi';
import CloseBtn from '../close-btn/CloseBtn';
import './checkout-modal.scss';

interface ICheckoutModalProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const CheckoutModal: FC<ICheckoutModalProps> = ({ setIsOpen }) => {
  const [clearCart] = useClearCartMutation();
  const [text, setText] = useState('Имитируем осуществление оплаты');
  const [isDisabled, setIsDisabled] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setIsDisabled(true);
    setText('Оплачиваем...');
    setTimeout(() => setText('Оплачено успешно!'), 1000);
    setTimeout(() => clearCart(null), 1500);
  };

  const handleCloseClickCB = (e: MouseEvent) => {
    if (e.target === modalRef.current) setIsOpen(false);
  };

  const handleCloseKeyCB = (e: KeyboardEvent) => {
    if (e.key === 'Escape') setIsOpen(false);
  };

  useEffect(() => {
    window.addEventListener('click', handleCloseClickCB);
    window.addEventListener('keydown', handleCloseKeyCB);
    return () => {
      window.removeEventListener('click', handleCloseClickCB);
      window.removeEventListener('keydown', handleCloseKeyCB);
    };
  }, []);

  return (
    <div className='modal' ref={modalRef}>
      <div className='modal__container'>
        <CloseBtn newClass='modal__close' setIsOpen={setIsOpen} />
        <p className='modal__text'>{text}</p>
        <button
          type='button'
          className='modal__btn'
          onClick={handleClick}
          disabled={isDisabled}
        >
          Оплатить
        </button>
      </div>
    </div>
  );
};

export default CheckoutModal;
