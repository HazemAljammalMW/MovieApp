import Search from './Search'
import "../App.css";
import { useGlobalState } from "../global/GlobalProvider";

export const Header = () => {
  const { globalSearchValue } = useGlobalState();

  return (
    <>
      <header>
        <img src="../../public/hero.png" alt="" />
        <h1>Find <span className='text-gradient'>Movies</span>You&apos;ll Enjoy Without the Hassle</h1>
        <Search />
        <h1>{globalSearchValue} 2</h1>
      </header>
    </>
  )
}

export default Header;