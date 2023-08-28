import { useState } from "react";
import { ReactComponent as IconPlus } from '../assets/plus.svg';
import { useSelector, useDispatch } from 'react-redux'
import { toggler } from './toggleSlice'

const Menu = () => {
  const dispatch = useDispatch();
  const toggle = useSelector(state => state.toggle.value);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const onClickHelperMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  function MenuHelper() {
    return (
      <>
        <label>
          <input
            type="checkbox"
            checked={!toggle}
            onChange={() => dispatch(toggler())}
            
            />
          Logarithmic
        </label>
      </>
    );
  }

  return (
    <div className="menu" >
      <div className={`${!isMenuOpen ? 'menu-button' : "menu-button-altered"}`} >
        <div onClick={onClickHelperMenu}><IconPlus className={`plus ${!isMenuOpen ? '' : "rotate"}`} />
        </div>
        {isMenuOpen ? <MenuHelper /> : null}
      </div>
    </div>
  )
}


export default Menu;