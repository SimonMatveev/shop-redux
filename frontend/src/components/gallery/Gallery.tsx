import { FC, MouseEventHandler, useEffect, useState } from 'react';
import { IItem } from '../../types/types';
import './gallery.scss';

interface IGalleryProps {
  item: IItem
}

const Gallery: FC<IGalleryProps> = ({ item }) => {
  const [mainImgSrc, setMainImgSrc] = useState<string | null>(null);
  const [galleryConfig, setGalleryConfig] = useState({ index: 0, size: 5, });

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
    setMainImgSrc(item.images[0])
    setGalleryConfig({
      index: 0,
      size: item.images.length <= 5 ? 5 : 4,
    })
  }, [item])

  useEffect(() => {
    let newSize: number;
    if (item.images.length <= 5) {
      newSize = 5;
    } else if (galleryConfig.index === 0 || galleryConfig.index + galleryConfig.size >= item.images.length) {
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

  }, [galleryConfig.index])

  useEffect(() => {
    const index = getCurrentImageIndex();
    if (item.images.slice(galleryConfig.index, galleryConfig.index + galleryConfig.size).every(image => image !== mainImgSrc) && index !== -1) {
      if (index >= galleryConfig.index + galleryConfig.size) {
        handleSmallArrowClickRight()
      } else {
        handleSmallArrowClickLeft()
      }
    }
  }, [mainImgSrc])

  return (
    <div className='gallery'>
      <div className='gallery__main-image-container'>
        <img className='gallery__image gallery__image_t_main' src={mainImgSrc!} />
        <button type='button' className='gallery__arrow gallery__arrow_left' onClick={handleArrowClickLeft} />
        <button type='button' className='gallery__arrow gallery__arrow_right' onClick={handleArrowClickRight} />
      </div>
      <ul className='gallery__container'>
        {(galleryConfig.index !== 0) &&
          < button type='button'
            className='gallery__arrow-small gallery__arrow-small_left'
            onClick={handleSmallArrowClickLeft} />}
        {item.images.slice(galleryConfig.index, galleryConfig.index + galleryConfig.size).map((image, index) =>
        (<li className='gallery__item' key={index} >
          <img
            className={`gallery__image gallery__image_t_def${mainImgSrc === image ? ' gallery__image_active' : ''}`}
            src={image} onClick={handleImageClick} />
        </li>))
        }
        {(item.images.length > galleryConfig.index + galleryConfig.size) &&
          < button type='button'
            className='gallery__arrow-small gallery__arrow-small_right'
            onClick={handleSmallArrowClickRight} />}
      </ul>
    </div>
  )
}

export default Gallery