import { FC, useMemo, useState } from "react"
import { useGetItemQuery, useGetSeriesListQuery } from "../../store/api/items.storeApi"
import { Navigate, useParams } from "react-router"
import Container from "../container/Container";
import Preloader from "../preloader/Preloader";
import { Link } from 'react-router-dom';
import './item-page.scss';
import { useGetCurrentUserQuery } from '../../store/api/users.storeApi';
import { ENUM_CATEGORY, ENUM_PLATFORMS } from '../../types/types';
import PromptForPlatforms from '../prompt-for-platforms/PromptForPlatforms';
import { getNameFromId } from '../../utils/functions';
import { CATEGORIES, PLATFORMS } from '../../utils/constants';
import AmountChanger from '../amount-changer/AmountChanger';
import Gallery from '../gallery/Gallery';
import useActions from '../../hooks/useActions';
import Rating from '../rating/Rating';


const ItemPage: FC = () => {
  const { itemId } = useParams();
  const { data: itemData, isLoading } = useGetItemQuery(itemId as string, {});
  const { data: seriesList } = useGetSeriesListQuery(null, {});
  const { data: currentUser } = useGetCurrentUserQuery(null, {});
  const [promptIsOpen, setPromptIsOpen] = useState(false);
  const [upIsLoading, setUpIsLoading] = useState(false);
  const item = itemData!;
  const { resetFilters } = useActions();

  const getIdFromSeries = (series: string) => seriesList?.find(item => item.name === series)?.id || 0;
  let inCartItem = useMemo(() => currentUser ? currentUser.cart.items.find(item => item.itemInCart._id === itemId) || null : null, [currentUser]);

  return (
    <section className='item-page'>
      <Container newClass={item ? 'item-page__container' : ''}>
        {!isLoading ?
          item ?
            <>
              <Link className='item-page__back' to='/items' >&lt; На главную</Link>
              <h1 className='item-page__title'>{item.name}</h1>
              <ul className='item-page__categories'>
                {item.category.map((category, index) => (
                  <li key={index} className='item-page__category' onClick={() => resetFilters()}>
                    <Link to={`/items?category=${category}`} className='item-page__category-link'>{getNameFromId<ENUM_CATEGORY>(CATEGORIES, category)}</Link>
                  </li>))
                }
              </ul>
              {itemData && <Gallery item={item} />}
              <Rating newClass='item-page__rating' item={item} />
              <div className='item-page__content'>
                <div className={`item-page__instock${item.inStockAmount > 0 ? ' item-page__instock_active' : ''}`}>{item.inStockAmount > 0 ? 'В наличии' : 'Товар закончился'}</div>
                <ul className='item-page__platforms'> {
                  item.platforms.map((platform, index) =>
                  (<li key={index} className='item-page__platform' onClick={() => resetFilters()}>
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
                      <button className={`item-page__btn${upIsLoading ? ' item-page__btn_loading' : ''}`} onClick={() => setPromptIsOpen(true)} disabled={upIsLoading}>
                        {upIsLoading ? 'Загрузка...' : inCartItem ? 'Приобрести для других платформ' : 'Добавить в корзину'}
                      </button>}
                    {promptIsOpen && <PromptForPlatforms setUpIsLoading={setUpIsLoading} newClass='item-page__prompt' item={item} setPromptIsOpen={setPromptIsOpen} />}
                  </div>
                </div>
                <p className='item-page__studio'>Студия: <span>{item.studio}</span></p>
                <p className='item-page__release'>Дата выхода: <span>{item.releaseDate}</span></p>

                <p className='item-page__description'>{item.description}</p>
                {item.series && <p className='item-page__series'>Эта игра входит в серию: <Link className='item-page__series-link' to={`/items/series/${getIdFromSeries(item.series)}`}>{item.series}</Link></p>}
              </div>
            </> :
            <Navigate to='/items' /> :
          <Preloader />}
      </Container>
    </section >
  )
}

export default ItemPage
