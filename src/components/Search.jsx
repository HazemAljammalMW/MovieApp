import { useGlobalState } from "../global/GlobalProvider";

const Search = () => {
  const { globalSearchValue, setGlobalSearchValue } = useGlobalState();

  return (
    <div className='search'>
      <div>
        <img src="../../public/search.svg" alt="" />
        <input
          type="text"
          value={globalSearchValue}
          onChange={(e) => setGlobalSearchValue(e.target.value)}
        />
      </div>
    </div>
  )
}

export default Search;