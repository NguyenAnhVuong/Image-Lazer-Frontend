import { Input } from 'antd';
import { AiFillMessage } from 'react-icons/ai';
import { BsPinterest } from 'react-icons/bs';
import { FaBell, FaSearch } from 'react-icons/fa';
import { HiChevronDown } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const HeaderPC = () => (
  <div className="hidden xl:block">
    <div className="h-20 py-4">
      <div className="flex h-12 items-center px-4 header-pc">
        <div className="text-red-600 mx-3 hover:bg-[#efefef] rounded-full cursor-pointer">
          <BsPinterest className="p-3" size={48} />
        </div>
        <div className="bg-black px-4 h-full rounded-3xl flex items-center">
          <Link className="text-white text-lg font-bold w-max" to="/">
            Trang chủ
          </Link>
        </div>
        <div className="h-full px-2 w-full">
          <Input className="h-full rounded-3xl bg-[#efefef]" prefix={<FaSearch />} placeholder="Tìm kiếm" />
        </div>
        <div className="flex">
          <div className="hover:bg-[#efefef] rounded-full cursor-pointer">
            <FaBell className="p-3" size={48} />
          </div>
          <div className="hover:bg-[#efefef] rounded-full cursor-pointer">
            <AiFillMessage className="p-3" size={48} />
          </div>
          <div className="p-3 hover:bg-[#efefef] rounded-full cursor-pointer w-12">
            <img className="object-cover h-6 w-6" src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png" alt="" />
          </div>
          <div className="flex items-center ">
            <HiChevronDown className="hover:bg-[#efefef] rounded-full cursor-pointer" size={24} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default HeaderPC;
