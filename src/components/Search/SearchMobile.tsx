import { Input } from 'antd';
import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { AppState } from '../../app/store';
import { searchActions } from '../../features/search/searchSlice';

const SearchMobile = () => {
  const [search, setSearch] = useState('');
  const dispatch = useAppDispatch();
  const suggestions = useAppSelector((state: AppState) => state.search.suggestions);
  useEffect(() => {
    const handleSearch = () => {
      dispatch(searchActions.setSearchWithDebounce(search));
    };
    handleSearch();
  }, [dispatch, search]);
  return (
    <div className="p-2">
      <Input
        className="h-full rounded-3xl p-2"
        prefix={<FaSearch />}
        placeholder="Tìm kiếm"
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="mt-2">
        {
          suggestions.map((suggestion) => (
            suggestion.subTitle ? (
              <Link to={`/user/${suggestion.subTitle}`} className="flex items-center text-black my-2">
                <img className="w-12 h-12 rounded-xl object-cover" src={suggestion.avatarSrc} alt="" />
                <div className="flex flex-col items-start ml-2">
                  <span className="font-bold text-base">{suggestion.title}</span>
                  <span className="font-medium text-sm">{suggestion.subTitle}</span>
                </div>
              </Link>
            ) : (
              <button className="flex items-center w-full my-2" type="button">
                <img className="w-12 h-12 rounded-xl object-cover" src={suggestion.avatarSrc} alt="" />
                <span className="font-bold text-base ml-2">{suggestion.title}</span>
              </button>
            )
          ))
        }
      </div>
    </div>
  );
};

export default SearchMobile;
