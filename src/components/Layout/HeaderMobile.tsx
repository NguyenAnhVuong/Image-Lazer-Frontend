import { HiHome, HiUser } from 'react-icons/hi';
import { FaSearch } from 'react-icons/fa';
import { AiFillMessage } from 'react-icons/ai';
import { Link } from 'react-router-dom';

function HeaderMobile() {
  return (
    <div className="flex justify-center xl:hidden">
      <div className="flex items-center header-shadow w-[264px] rounded-[32px] h-[60px] fixed bottom-4">
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
          <Link to="/user" className="col-span-1 flex justify-center text-[#767676]">
            <HiUser className="p-2" size={40} />
          </Link>
        </div>
      </div>
    </div>

  );
}

export default HeaderMobile;
