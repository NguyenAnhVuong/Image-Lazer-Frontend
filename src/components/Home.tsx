import { useEffect } from 'react';
import { useAppDispatch } from '../app/hooks';
import { testActions } from '../features/test/testSlice';

function Home() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(testActions.test());
  }, [dispatch]);
  return (
    <div>
      home
    </div>
  );
}

export default Home;
