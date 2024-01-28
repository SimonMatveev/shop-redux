import { FC, useState } from 'react';
import useDataLength from '../../hooks/useDataLength';
import { IItem } from '../../types/types';
import Card from '../card/Card';
import Container from '../container/Container';
import Filters from '../filters/Filters';
import Pagination from '../pagination/Pagination';
import Preloader from '../preloader/Preloader';
import Prizes from '../prizes/Prizes';
import './main.scss';

const Main: FC = () => {
  const [items, setItems] = useState<IItem[] | undefined>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPrizesOpen, setIsPrizesOpen] = useState(
    localStorage.getItem('PrizesClosed') !== 'true'
  );
  const dataLength = useDataLength();

  return (
    <section className='main'>
      <Filters setItems={setItems} setIsLoading={setIsLoading} />
      <Container newClass='main__container'>
        {isLoading ? (
          <Preloader />
        ) : dataLength > 0 ? (
          <>
            <div className='main__cards'>
              {items && items.map((item) => <Card key={item._id} item={item} />)}
            </div>
            <Pagination />
          </>
        ) : (
          <div className='main__no-result'>Упс! Ничего не найдено!</div>
        )}
      </Container>
      {isPrizesOpen && <Prizes setIsOpen={setIsPrizesOpen} />}
    </section>
  );
};

export default Main;
