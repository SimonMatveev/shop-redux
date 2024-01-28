import { FC, PropsWithChildren } from 'react';
import './container.scss';

interface IContainerProps {
  newClass?: string;
}
const Container: FC<PropsWithChildren<IContainerProps>> = ({ children, newClass }) => {
  return <div className={`container${newClass ? ' ' + newClass : ''}`}>{children}</div>;
};

export default Container;
