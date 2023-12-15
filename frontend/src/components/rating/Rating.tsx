import { FC } from 'react'
import { IItem } from '../../types/types';
import './rating.scss'
import { useSetRatingMutation } from '../../store/api/ratings.storeApi';

interface IRatingProps {
  newClass?: string;
  item: IItem;
}

interface IStarsRatingProps {
  rating: number;
  id: string;
}

const StarsRating: FC<IStarsRatingProps> = ({ id, rating }) => {
  const [setRating] = useSetRatingMutation();
  return (
    <ul className='rating__stars'>
      <li className={`rating__star rating__star_t_${rating === 5 ? 'full' : rating >= 4.5 ? 'half' : 'empty'}`} onClick={() => setRating({ id, value: 5 })} />
      <li className={`rating__star rating__star_t_${rating >= 4 ? 'full' : rating >= 3.5 ? 'half' : 'empty'}`} onClick={() => setRating({ id, value: 4 })} />
      <li className={`rating__star rating__star_t_${rating >= 3 ? 'full' : rating >= 2.5 ? 'half' : 'empty'}`} onClick={() => setRating({ id, value: 3 })} />
      <li className={`rating__star rating__star_t_${rating >= 2 ? 'full' : rating >= 1.5 ? 'half' : 'empty'}`} onClick={() => setRating({ id, value: 2 })} />
      <li className={`rating__star rating__star_t_full`} onClick={() => setRating({ id, value: 1 })} />
    </ul >
  )
}

const Rating: FC<IRatingProps> = ({ newClass, item }) => {
  return (
    <div className={`rating${newClass ? ' ' + newClass : ''}`}>
      <div className='rating__value'>
        <span className='rating__number'>{item.rating.toFixed(2)}</span>
        <StarsRating id={item._id} rating={item.rating} />
      </div>
      <p className='rating__text'>
        {item.ratingAmount > 0 ?
          `На основе ${item.ratingAmount} оцен${item.ratingAmount % 10 === 1 && item.ratingAmount !== 11 ? 'ки' : 'ок'}` :
          `Оцените игру первым!`
        }
      </p>
    </div >
  )
}

export default Rating