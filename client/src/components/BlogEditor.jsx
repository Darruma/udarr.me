import React , { Component } from 'react'
import '../css/editor.css'
class BlogEditor extends Component
{
    state ={
        blog:{
            title:'',
            content:[]
        }
    }
    render()
    {
        <div className='editor-container'>
        <input onChange={this.handleTitleChange}></input>
            <div className='editor-typing'>

            </div>
        <div className='editor-view'>
            <BlogPost blog={this.state.blog}>
            </BlogPost>
        </div>
        </div>
    }
    handleTitleChange = (e) =>
    {
        e.preventDefault();
        var blog_changed = this.state.blog;
        blog_changed.title = e.target.value
        this.setState({blog:blog_changed})
    }
}
export default BlogEditor