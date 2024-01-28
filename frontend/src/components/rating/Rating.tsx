import { FC } from 'react';
import {
  useResetRatingMutation,
  useSetRatingMutation,
} from '../../store/api/ratings.storeApi';
import { useGetCurrentUserQuery } from '../../store/api/users.storeApi';
import { IItem } from '../../types/types';
import './rating.scss';

interface IRatingProps {
  newClass?: string;
  item: IItem;
}

interface IStarsRatingProps {
  rating: number;
}

interface IStarsRatingWithInputProps extends IStarsRatingProps {
  id: string;
}

const StarsRating: FC<IStarsRatingProps> = ({ rating }) => {
  return (
    <ul className='rating__stars'>
      <li
        className={`rating__star rating__star_t_${rating === 5 ? 'full' : rating >= 4.5 ? 'half' : 'empty'}`}
      />
      <li
        className={`rating__star rating__star_t_${rating >= 4 ? 'full' : rating >= 3.5 ? 'half' : 'empty'}`}
      />
      <li
        className={`rating__star rating__star_t_${rating >= 3 ? 'full' : rating >= 2.5 ? 'half' : 'empty'}`}
      />
      <li
        className={`rating__star rating__star_t_${rating >= 2 ? 'full' : rating >= 1.5 ? 'half' : 'empty'}`}
      />
      <li
        className={`rating__star rating__star_t_${rating >= 1 ? 'full' : rating >= 0.5 ? 'half' : 'empty'}`}
      />
    </ul>
  );
};

const StarsRatingWithInput: FC<IStarsRatingWithInputProps> = ({ rating, id }) => {
  const [setRating, { isLoading }] = useSetRatingMutation();
  return (
    <ul className='rating__stars'>
      <li className='rating__stars-item'>
        <button
          className={`rating__star rating__star_t_${rating === 5 ? 'full' : rating >= 4.5 ? 'half' : 'empty'}`}
          onClick={() => setRating({ id, value: 5 })}
          disabled={isLoading}
        />
      </li>
      <li className='rating__stars-item'>
        <button
          className={`rating__star rating__star_t_${rating >= 4 ? 'full' : rating >= 3.5 ? 'half' : 'empty'}`}
          onClick={() => setRating({ id, value: 4 })}
          disabled={isLoading}
        />
      </li>
      <li className='rating__stars-item'>
        <button
          className={`rating__star rating__star_t_${rating >= 3 ? 'full' : rating >= 2.5 ? 'half' : 'empty'}`}
          onClick={() => setRating({ id, value: 3 })}
          disabled={isLoading}
        />
      </li>
      <li className='rating__stars-item'>
        <button
          className={`rating__star rating__star_t_${rating >= 2 ? 'full' : rating >= 1.5 ? 'half' : 'empty'}`}
          onClick={() => setRating({ id, value: 2 })}
          disabled={isLoading}
        />
      </li>
      <li className='rating__stars-item'>
        <button
          className={`rating__star rating__star_t_${rating >= 1 ? 'full' : rating >= 0.5 ? 'half' : 'empty'}`}
          onClick={() => setRating({ id, value: 1 })}
          disabled={isLoading}
        />
      </li>
    </ul>
  );
};

const Rating: FC<IRatingProps> = ({ newClass, item }) => {
  const { data: currentUser } = useGetCurrentUserQuery(null, {});
  const [resetRating] = useResetRatingMutation();
  const userRating = currentUser?.ratings.find((rating) => rating.id === item._id);

  return (
    <div className={`rating${newClass ? ' ' + newClass : ''}`}>
      {item.rating !== -1 ? (
        <div className='rating__solid'>
          <span className='rating__number'>{item.rating.toFixed(2)}</span>
          <StarsRating rating={item.rating} />
          <p className='rating__text'>
            {`На основе ${item.ratingAmount} оцен${item.ratingAmount % 10 === 1 && item.ratingAmount !== 11 ? 'ки' : 'ок'}`}
          </p>
        </div>
      ) : (
        <div className='rating__no-rating'>Будьте первым, кто оценит игру!</div>
      )}
      {currentUser && (
        <div className='rating__user'>
          <span className='rating__number'>{userRating?.value || 'N/A'}</span>
          <StarsRatingWithInput rating={userRating?.value || 0} id={item._id} />
          {userRating ? (
            <button
              type='button'
              className='rating__reset'
              onClick={() => resetRating({ id: item._id })}
            >
              Сбросить оценку
            </button>
          ) : (
            <div className='rating__no-reset'>Выберите оценку</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Rating;
