import { useEffect } from 'react';
import { useLocation } from 'react-router';

export interface Props {
  children: React.ReactNode;
}

const ScrollToTop = (props: Props) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // eslint-disable-next-line react/destructuring-assignment, react/jsx-no-useless-fragment
  return <>{props.children}</>;
};

export default ScrollToTop;
