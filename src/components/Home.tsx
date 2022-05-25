// import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { AppState } from '../app/store';
// import { authActions } from '../features/auth/authSlice';
import { testActions } from '../features/test/testSlice';

function Home() {
  const dispatch = useAppDispatch();
  // const success = useAppSelector((state: AppState) => state.auth.success);
  const test = useAppSelector((state: AppState) => state.test.test);
  // useEffect(() => {
  //   dispatch(testActions.test());
  // }, [dispatch]);
  const testFunction = () => {
    // dispatch(authActions.loginSuccess(!success));
    console.log('test: ', test);
    dispatch(testActions.test(!test));
  };

  console.log('render');

  return (
    <div>
      <button type="button" onClick={testFunction}>test</button>
    </div>
  );
}

export default Home;
