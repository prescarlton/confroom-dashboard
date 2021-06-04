import { MouseEventHandler } from "react";

type NavbarProps = {
    authed: Boolean,
    handleAuthClick: MouseEventHandler,
    handleSignOutClick: MouseEventHandler
}

const Navbar = ({ authed, handleAuthClick, handleSignOutClick } : NavbarProps) => {
    return (
        <div className='navbar'>
            {authed ? (
                <button className='navbar__authBtn' onClick={handleSignOutClick}>Sign Out</button>
            ) : (
                <button className='navbar__authBtn' onClick={handleAuthClick}>Sign In</button>
            )}
            </div>
    )
}

export default Navbar;