import { KEYS_TO_BLOCK, MENU_ANIMATION_DELAY } from "../utils/constants";
import { useState, useEffect, RefObject } from 'react';

interface IuseBodyBlockArgs {
  closeCB: () => void;
  scrollableItemClass: string;
  scrollableItemParentRef: RefObject<HTMLDivElement>
}

const useBodyBlock = ({ closeCB, scrollableItemClass, scrollableItemParentRef }: IuseBodyBlockArgs) => {
  const [isOpened, setIsOpened] = useState(false);

  const handleClose = () => {
    setIsOpened(false);
    setTimeout(() => closeCB(), MENU_ANIMATION_DELAY);
  }

  const handleScroll = (e: WheelEvent | TouchEvent) => {
    if (!Boolean((e.target as HTMLDivElement).closest('.' + scrollableItemClass)) ||
      scrollableItemParentRef.current!.clientHeight === scrollableItemParentRef.current!.scrollHeight) {
      e.preventDefault();
    }

  }

  const handleScrollKey = (e: KeyboardEvent) => {
    if (KEYS_TO_BLOCK.includes(e.code)) {
      e.preventDefault()
    }
  }

  useEffect(() => {
    setIsOpened(true);
    window.addEventListener('wheel', handleScroll, { passive: false })
    window.addEventListener('touchmove', handleScroll, { passive: false })
    window.addEventListener('keydown', handleScrollKey, { passive: false })

    return () => {
      window.removeEventListener('wheel', handleScroll)
      window.removeEventListener('touchmove', handleScroll)
      window.removeEventListener('keydown', handleScrollKey)
    }
  }, [])

  return {
    isOpened,
    handleClose,
  }
}

export default useBodyBlock;