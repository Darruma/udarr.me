import React, { Component } from 'react'
import Blog from './blog';
import { Link } from 'react-router-dom'

class BlogTitle extends Component {
    render() {
        return (
            <div>
                <Link to={'/blog/' + this.props.id}>


                    <div className='blog-title'>
                        {this.props.title}
                    </div>
                </Link>
            </div>)
    }
}
export default BlogTitle