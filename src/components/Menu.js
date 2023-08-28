import { useState } from "react";
import { ReactComponent as IconPlus } from '../assets/plus.svg';
import { useSelector, useDispatch } from "react-redux";

const Menu = () => {
  const dispatch = useDispatch();
  const toggle = true;
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
            checked={toggle}
            
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