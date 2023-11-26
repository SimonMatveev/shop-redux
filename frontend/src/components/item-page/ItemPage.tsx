import { FC, useEffect, useState } from "react"
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


const ItemPage: FC = () => {
  const { itemId } = useParams();
  const { data: itemData, isLoading } = useGetItemQuery(itemId as string, {});
  const { data: currentUser } = useGetCurrentUserQuery(null, {});
  const [mainImgSrc, setMainImgSrc] = useState<string | null>(null)
  const [inCartItem, setInCartItem] = useState<ICartItem | null>(null)
  const [promptIsOpen, setPromptIsOpen] = useState(false);
  const item = itemData!;

  useEffect(() => {
    if (itemData) {
      setMainImgSrc(itemData.images[0])
    }
  }, [itemData])

  useEffect(() => {
    if (currentUser) {
      const inCartItem = currentUser.cart.items.find(item => item.itemInCart._id === itemId);
      setInCartItem(inCartItem || null)
    }
  }, [currentUser])

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
                <img className='item-page__gallery-image item-page__gallery-image_t_main' src={mainImgSrc!} />
                <ul className='item-page__gallery-container'>{
                  item.images.slice(0, 5).map((image, index) =>
                  (<li className='item-page__gallery-item' key={index}>
                    <img className='item-page__gallery-image item-page__gallery-image_t_def' src={image} />
                  </li>))
                }</ul>
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
                <div className='item-page__btns'>{
                  !inCartItem ?
                    <>
                      <button className='item-page__btn' onClick={() => setPromptIsOpen(true)}>Добавить в корзину</button>
                      {promptIsOpen && <PromptForPlatforms newClass='item-page__prompt' item={item} setPromptIsOpen={setPromptIsOpen} />}
                    </> :
                    <>
                      <button className='item-page__btn item-page__btn_t_extra'>Купить для друой платформы</button>
                    </>
                }</div>
                <p className='item-page__studio'>Студия: <span>{item.studio}</span></p>
                <p className='item-page__release'>Дата выхода: <span>{item.releaseDate}</span></p>

                <p className='item-page__description'>{item.description}</p>
                {item.series && <p className='item-page__series'>Эта игра входит в серию: <span>{item.series}</span></p>}
              </div>
            </> :
            <div className='item-page__error'>Упс! Ничего не найдено</div> :
          <Preloader />}
      </Container>
    </section>
  )
}

export default ItemPage
