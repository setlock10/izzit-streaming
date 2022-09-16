import { NavLink } from "react-router-dom"

function NavBar({onChangePage}){

    function handleLinkClick(e) {
        e.preventDefault()
        onChangePage(e.target.pathname)
    }

    return(
        <nav style={{'background-color': "white"}}>
            <NavLink exact to="/izzit-streaming">Search</NavLink>
            <NavLink to="/izzit-streaming/alerts">Alerts</NavLink>
            <NavLink to="/izzit-streaming/about">About</NavLink>
        </nav>
    )
}

export default NavBar;