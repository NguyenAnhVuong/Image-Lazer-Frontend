import { BsPinterest } from 'react-icons/bs';
import { BsSearch } from 'react-icons/bs';
import { BsBellFill } from 'react-icons/bs';
import { AiFillMessage } from 'react-icons/ai';
import { BiUserCircle } from 'react-icons/bi';
import { BsChevronDown } from 'react-icons/bs';

function Header() {
  return (
    <div>
      <div className="flex justify-center">
        <header className="bottom-3 w-1/2 rounded-[24px] min-w-[294px] py-0 pr-[10px] pl-0 bg-white shadow-2xl fixed sm:py-0 sm:px-5 sm:w-full sm:top-0">
            <div className="justify-around bg-white m-auto relative rounded-[40px] flex items-center content-center flex-row py-3 px-0 flex-auto sm:justify-between">
                <div className="flex">
                    <div className="my-0 mx-[10px] items-center content-center p-[5px]">
                        <a href="" className="no-underline hover:bg-[#00000033] rounded-[50%]">
                            <BsPinterest className="no-underline text-red-600 leading-normal font-bold text-[1.7rem] p-[5px] text-center justify-center" />
                        </a>
                    </div>
                </div>
                <div className="hidden sm:bg-gray-800 sm:p-2 sm:justify-center sm:mr-2 sm:flex sm:rounded-[24px] sm:min-w-[60px] sm:hover:bg-[#413b3bcc]">
                    <a href="#" className="no-underline text-white font-bold text-xl text-center justify-center leading-[0] py-[5px] px-[10px]">Trang chủ</a>
                </div>
                <div className="flex-none bg-white sm:bg-gray-200 justify-center p-[10px] rounded-[24px] sm:flex-auto hover:bg-[#d3d0d0]">
                    <BsSearch className="text-2xl text-gray-600"/>
                    <input className="hidden sm:bg-transparent sm:w-4/5 sm:h-full sm:py-[5px] sm:px-0 sm:border-none sm:focus:outline-none" type="text" placeholder="Search" />
                </div>
                <div className="flex">
                    <div className="hidden sm:m-0 sm:items-center sm:content-center sm:p-1 sm:hover:bg-[#00000033] sm:hover:rounded-[50%] sm:block">
                        <BsBellFill className="no-underline text-gray-600 font-bold text-3xl p-1 text-center justify-center leading-normal"/>    
                    </div>
                    <div className="my-0 mx-4 sm:m-0 items-center content-center p-1 hover:bg-[#00000033] hover:rounded-[50%]">
                        <AiFillMessage className="no-underline text-gray-600 font-bold text-3xl p-1 text-center justify-center leading-normal"/>
                    </div>
                    <div className="my-0 mx-4 sm:m-0 items-center content-center p-1 hover:bg-[#00000033] hover:rounded-[50%]">
                        <BiUserCircle className="no-underline text-gray-600 font-bold text-3xl p-1 text-center justify-center leading-normal"/>
                    </div>
                    <div className="hidden sm:m-0 sm:items-center sm:content-center sm:p-1 sm:hover:bg-[#00000033] sm:hover:rounded-[50%] sm:block">
                        <BsChevronDown className="no-underline text-gray-600 font-bold text-3xl p-1 text-center justify-center leading-normal"/>
                        
                    </div>
                </div>
            </div>
        </header>
    </div>
    </div>
  );
}

export default Header;
