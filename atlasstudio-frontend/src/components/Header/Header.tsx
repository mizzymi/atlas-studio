import { type FC } from 'react';

/**
 * **PROPERTIES OF APP COMPONENT:**
 * 
 * This interface currently have 0 properties but if you add any property 
 * you must document it and type it correctly for the usability of the component.
 * 
 */
interface HeaderProps {

}

/**
 * **DESCRIPTION:**
 * 
 * Write something here about the Header component.
 * 
 * **EXAMPLE OF USE:**
 * @example
 * return (
 *   <Header/>
 * )
 */
export const Header: FC<HeaderProps> = ({ }) => {

  return (
    <div data-testid='Header-Component'>
      Entry Point for Header component. Good Luck!
    </div>
  )
}
