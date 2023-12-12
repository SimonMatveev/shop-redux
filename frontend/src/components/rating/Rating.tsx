import { FC } from 'react'
import { IItem } from '../../types/types';
import './rating.scss'

interface IRatingProps {
  newClass?: string;
  item: IItem;
}

interface IStarsRatingProps {
  rating: number;
}

const StarsRating: FC<IStarsRatingProps> = ({ rating }) => {
  return (
    <ul className='rating__stars'>
      <li className={`rating__star rating__star_t_${rating === 5 ? 'full' : rating >= 4.5 ? 'half' : 'empty'}`} />
      <li className={`rating__star rating__star_t_${rating >= 4 ? 'full' : rating >= 3.5 ? 'half' : 'empty'}`} />
      <li className={`rating__star rating__star_t_${rating >= 3 ? 'full' : rating >= 2.5 ? 'half' : 'empty'}`} />
      <li className={`rating__star rating__star_t_${rating >= 2 ? 'full' : rating >= 1.5 ? 'half' : 'empty'}`} />
      <li className={`rating__star rating__star_t_${rating >= 1 ? 'full' : rating >= 0.5 ? 'half' : 'empty'}`} />
    </ul >
  )
}

const Rating: FC<IRatingProps> = ({ newClass, item }) => {
  return (
    <div className={`rating${newClass ? ' ' + newClass : ''}`}>
      <div className='rating__value'>
        <span className='rating__number'>{item.rating}</span>
        <StarsRating rating={item.rating} />
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