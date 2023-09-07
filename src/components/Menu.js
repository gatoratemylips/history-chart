import { useState } from "react";
import { ReactComponent as IconPlus } from '../assets/plus.svg';
import { useSelector, useDispatch } from 'react-redux'
import { toggler } from './toggleSlice'
import { colorPick } from './colorSlice'


const Menu = () => {
  const dispatch = useDispatch();

  const color = useSelector(state => state.change.value)
  const toggle = useSelector(state => state.toggle.value);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const onClickHelperMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  function MenuHelper() {
    return (
      <>



<div class="checkbox-wrapper-26"> <div className="logarius">Logarithmic</div>
          <input t type="checkbox"
            checked={!toggle}
            onChange={() => dispatch(toggler())} id="_checkbox-26"/>
            <label for="_checkbox-26">
              <div class="tick_mark">  </div>
            </label>
        </div>
        <label htmlFor="colorpicker">Color Picker:
          <input
            type="color"
            id="colorpicker"
            value={color}
            onChange={(e) => {
              dispatch(colorPick(e.target.value));
            }}
          />
          <input type="color" id="pickcolor" value={color} />
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