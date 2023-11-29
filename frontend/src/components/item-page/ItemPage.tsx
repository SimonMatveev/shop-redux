import { FC, useEffect, useState, MouseEventHandler } from "react"
import { useGetItemQuery } from "../../store/api/items.storeApi"
import { useParams } from "react-router"
import Container from "../container/Container";
import Preloader from "../preloader/Preloader";
import { Link } from 'react-router-dom';
import './item-page.scss';
import { useGetCurrentUserQuery } from '../../store/api/users.storeApi';
import { ENUM_CATEGORY, ENUM_PLATFORMS, ICartItem } from '../../types/types';
import PromptForPlatforms from '../prompt-for-platforms/PromptForPlatforms';
import { getNameFromId } from '../../utils/functions';
import { CATEGORIES, PLATFORMS } from '../../utils/constants';
import AmountChanger from '../amount-changer/AmountChanger';


const ItemPage: FC = () => {
  const { itemId } = useParams();
  const { data: itemData, isLoading } = useGetItemQuery(itemId as string, {});
  const { data: currentUser } = useGetCurrentUserQuery(null, {});
  const [inCartItem, setInCartItem] = useState<ICartItem | null>(null);
  const [mainImgSrc, setMainImgSrc] = useState<string | null>(null);
  const [galleryConfig, setGalleryConfig] = useState({ index: 0, size: 5, });
  const [promptIsOpen, setPromptIsOpen] = useState(false);
  const item = itemData!;

  const handleImageClick: MouseEventHandler<HTMLImageElement> = (e) => {
    setMainImgSrc((e.target as HTMLImageElement).src)
  }

  const getCurrentImageIndex = () => item.images.findIndex(image => mainImgSrc === image)

  const handleArrowClickLeft = () => {
    const index = getCurrentImageIndex();
    const newImage = item.images[index - 1] || item.images[item.images.length - 1];
    setMainImgSrc(newImage)
  }

  const handleArrowClickRight = () => {
    const index = getCurrentImageIndex();
    const newImage = item.images[index + 1] || item.images[0]
    setMainImgSrc(newImage)
  }

  const handleSmallArrowClickLeft = () => setGalleryConfig(prev => {
    return {
      ...prev,
      index: prev.index - prev.size
    }
  })

  const handleSmallArrowClickRight = () => setGalleryConfig(prev => {
    return {
      ...prev,
      index: prev.index + prev.size
    }
  })

  useEffect(() => {
    if (itemData) {
      setMainImgSrc(itemData.images[0])
      setGalleryConfig({
        index: 0,
        size: itemData.images.length <= 5 ? 5 : 4,
      })
    }
  }, [itemData])

  useEffect(() => {
    if (!itemData) {
      setGalleryConfig({ index: 0, size: 5 })
    } else {
      let newSize: number;
      if (itemData.images.length <= 5) {
        newSize = 5;
      } else if (galleryConfig.index === 0 || galleryConfig.index + galleryConfig.size >= itemData.images.length) {
        newSize = 4;
      } else {
        newSize = 3;
      }
      setGalleryConfig(prev => {
        return {
          ...prev,
          size: newSize,
        }
      })
    }

  }, [galleryConfig.index])

  useEffect(() => {
    if (item) {
      const index = getCurrentImageIndex();
      if (item.images.slice(galleryConfig.index, galleryConfig.index + galleryConfig.size).every(image => image !== mainImgSrc) && index !== -1) {
        if (index >= galleryConfig.index + galleryConfig.size) {
          handleSmallArrowClickRight()
        } else {
          handleSmallArrowClickLeft()
        }
      }
    }
  }, [mainImgSrc])

  useEffect(() => {
    if (currentUser) {
      const inCartItem = currentUser.cart.items.find(item => item.itemInCart._id === itemId);
      setInCartItem(inCartItem || null)
    }
  }, [currentUser])

  useEffect(() => {
    console.log(galleryConfig)
  }, [galleryConfig])

  return (
    <section className='item-page'>
      <Container newClass={item ? 'item-page__container' : ''}>
        {!isLoading ?
          item ?
            <>
              <h1 className='item-page__title'>{item.name}</h1>
              <ul className='item-page__categories'>
                {item.category.map((category, index) => (
                  <li key={index} className='item-page__category'>
                    <Link to={`/items?category=${category}`} className='item-page__category-link'>{getNameFromId<ENUM_CATEGORY>(CATEGORIES, category)}</Link>
                  </li>))
                }
              </ul>
              <div className='item-page__gallery'>
                <div className='item-page__gallery-main-image-container'>
                  <img className='item-page__gallery-image item-page__gallery-image_t_main' src={mainImgSrc!} />
                  <button type='button' className='item-page__gallery-arrow item-page__gallery-arrow_left' onClick={handleArrowClickLeft} />
                  <button type='button' className='item-page__gallery-arrow item-page__gallery-arrow_right' onClick={handleArrowClickRight} />
                </div>
                <ul className='item-page__gallery-container'>
                  {(galleryConfig.index !== 0) &&
                    < button type='button'
                      className='item-page__gallery-arrow-small item-page__gallery-arrow-small_left'
                      onClick={handleSmallArrowClickLeft} />}
                  {item.images.slice(galleryConfig.index, galleryConfig.index + galleryConfig.size).map((image, index) =>
                  (<li className='item-page__gallery-item' key={index} >
                    <img
                      className={`item-page__gallery-image item-page__gallery-image_t_def${mainImgSrc === image ? ' item-page__gallery-image_active' : ''}`}
                      src={image} onClick={handleImageClick} />
                  </li>))
                  }
                  {(item.images.length > galleryConfig.index + galleryConfig.size) &&
                    < button type='button'
                      className='item-page__gallery-arrow-small item-page__gallery-arrow-small_right'
                      onClick={handleSmallArrowClickRight} />}
                </ul>
              </div>
              <div className='item-page__rating'>
                &#9734;&#9734;&#9734;&#9734;&#9734;
              </div>
              <div className='item-page__content'>
                <div className={`item-page__instock${item.inStockAmount > 0 ? ' item-page__instock_active' : ''}`}>{item.inStockAmount > 0 ? 'В наличии' : 'Товар закончился'}</div>
                <ul className='item-page__platforms'> {
                  item.platforms.map((platform, index) =>
                  (<li key={index} className='item-page__platform'>
                    <Link to={`/items?platforms=${platform}`} className='item-page__platform-link'>{getNameFromId<ENUM_PLATFORMS>(PLATFORMS, platform)}</Link>
                  </li>))
                }</ul>
                <div className='item-page__btns'>
                  {inCartItem &&
                    (<ul className='item-page__orders'>
                      {inCartItem.orders.map((order, index) => (
                        <li key={index} className='item-page__order'>
                          <p className='item-page__order-platform'>{getNameFromId(PLATFORMS, order.platform)}</p>
                          <AmountChanger item={item} platformToChange={order.platform} />
                        </li>
                      ))}
                    </ul>)
                  }
                  <div className='item-page__add-block'>
                    {((inCartItem && inCartItem.orders.length < item.platforms.length) || !inCartItem) &&
                      <button className='item-page__btn' onClick={() => setPromptIsOpen(true)}>
                        {inCartItem ? 'Приобрести для других платформ' : 'Добавить в корзину'}
                      </button>}
                    {promptIsOpen && <PromptForPlatforms newClass='item-page__prompt' item={item} setPromptIsOpen={setPromptIsOpen} />}
                  </div>
                </div>
                <p className='item-page__studio'>Студия: <span>{item.studio}</span></p>
                <p className='item-page__release'>Дата выхода: <span>{item.releaseDate}</span></p>

                <p className='item-page__description'>{item.description}</p>
                {item.series && <p className='item-page__series'>Эта игра входит в серию: <span>{item.series}</span></p>}
              </div>
            </> :
            <div className='item-page__error'>Упс! Ничего не найдено</div> :
          <Preloader />}
      </Container>
    </section >
  )
}

export default ItemPage
