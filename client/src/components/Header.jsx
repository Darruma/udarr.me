import React, { Component } from 'react';
import '../css/header.css'
import { Link } from "react-router-dom";
class Header extends Component {
    state = {}
    render() {
        return (<div className='sticky header'>
                   <Link to='/' className='inconsolata-title'> umair darr </Link>
            </div>);
    }
}

export default Header;