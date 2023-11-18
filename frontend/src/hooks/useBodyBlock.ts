import { MENU_ANIMATION_DELAY } from "../utils/constants";
import { useState, useEffect } from 'react';

const useBodyBlock = (closeCB: () => void) => {
  const [isOpened, setIsOpened] = useState(false);

  const handleClose = () => {
    setIsOpened(false);
    document.body.classList.remove('blocked');
    document.body.style.paddingRight = '';
    setTimeout(() => closeCB(), MENU_ANIMATION_DELAY);
  }

  function getScrollBarWidth() {
    var inner = document.createElement('p');
    inner.style.width = "100%";
    inner.style.height = "200px";
    var outer = document.createElement('div');
    outer.style.position = "absolute";
    outer.style.top = "0px";
    outer.style.left = "0px";
    outer.style.visibility = "hidden";
    outer.style.width = "200px";
    outer.style.height = "150px";
    outer.style.overflow = "hidden";
    outer.appendChild(inner);
    document.body.appendChild(outer);
    var w1 = inner.offsetWidth;
    outer.style.overflow = 'scroll';
    var w2 = inner.offsetWidth;
    if (w1 == w2) w2 = outer.clientWidth;
    document.body.removeChild(outer);
    return (w1 - w2);
  };

  useEffect(() => {
    setIsOpened(true);
    document.body.classList.add('blocked');
    document.body.style.paddingRight = getScrollBarWidth() + 'px';
  }, [])

  return {
    isOpened,
    handleClose,
  }
}

export default useBodyBlock;