import React , { Component } from 'react'
import '../css/editor.css'
import { Redirect } from 'react-router-dom'
class BlogEditor extends Component
{
    state ={
        blog:{
            title:'',
            content:[]
        },
        loggedIn:true
    }
    render()
    {
        if (!this.state.loggedIn)
        {
            return (<Redirect to='/'></Redirect>)
        }
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
    componentDidMount = () =>
    {
        fetch('/api/authenticate')
        .then(res => res.json())
        .then(res => this.setState({loggedIn:res.success}))
    }
}
export default BlogEditor