import React, {Component } from 'react'
import Blog from './blog';


class BlogTitle extends Component
{
    render()
    {
        return(<div>
            {this.props.title}
        </div>)
    }
}
export default BlogTitle