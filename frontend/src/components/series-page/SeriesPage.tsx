import { FC } from 'react';
import { Navigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useGetSeriesListQuery, useGetSeriesQuery } from '../../store/api/items.storeApi';
import Card from '../card/Card';
import Container from '../container/Container';
import Preloader from '../preloader/Preloader';
import './series-page.scss';

const SeriesPage: FC = () => {
  const { seriesId } = useParams();
  const { data: games, isLoading } = useGetSeriesQuery(seriesId!, {});
  const { data: seriesList } = useGetSeriesListQuery(null, {});
  const seriesTitle = seriesList?.find((item) => item.id === +seriesId!)?.name || '';
  return (
    <section className='series'>
      <Container newClass='series__container'>
        {!isLoading ? (
          games ? (
            <>
              <Link className='series__back' to='/items'>
                &lt; На главную
              </Link>
              <h1 className='series__header'>Игры серии {seriesTitle}</h1>
              <div className='series__cards'>
                {games.map((item) => (
                  <Card key={item._id} item={item} />
                ))}
              </div>
            </>
          ) : (
            <Navigate to='/items' />
          )
        ) : (
          <Preloader />
        )}
      </Container>
    </section>
  );
};

export default SeriesPage;
