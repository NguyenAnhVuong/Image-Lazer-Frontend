import { HiHome, HiUser } from 'react-icons/hi';
import { FaSearch } from 'react-icons/fa';
import { AiFillMessage } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { AppState } from '../../app/store';

function HeaderMobile() {
  const userName = useAppSelector((state: AppState) => state.auth.userName);
  const prevScrollY = useRef(0);

  const [goingUp, setGoingUp] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (prevScrollY.current < currentScrollY && goingUp) {
        setGoingUp(false);
      }
      if (prevScrollY.current > currentScrollY && !goingUp) {
        setGoingUp(true);
      }

      prevScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [goingUp]);
  return (
    <div className="flex justify-center xl:hidden">
      <div className={`flex items-center header-shadow w-[264px] 
      rounded-[32px] h-[60px] fixed transition-all duration-300 bg-white z-10 ${goingUp ? 'bottom-4' : 'bottom-[-60px] opacity-0'}`}
      >
        <div className="grid grid-cols-4 w-full px-2">
          <Link to="/" className="col-span-1 flex justify-center text-[#767676]">
            <HiHome className="p-2" size={40} />
          </Link>
          <Link to="/search" className="col-span-1 flex justify-center text-[#767676]">
            <FaSearch className="p-2" size={40} />
          </Link>
          <Link to="/notifications" className="col-span-1 flex justify-center text-[#767676]">
            <AiFillMessage className="p-2" size={40} />
          </Link>
          <Link to={`/user/${userName}`} className="col-span-1 flex justify-center text-[#767676]">
            <HiUser className="p-2" size={40} />
          </Link>
        </div>
      </div>
    </div>

  );
}

export default HeaderMobile;
