import React, { Component } from 'react'
import '../css/editor.css'
import { Redirect } from 'react-router-dom'
import BlogPost from './BlogPost'
class BlogEditor extends Component {
    state = {
        blog: {
            title: '',
            content: []
        },
        loggedIn: true
    }
    render() {
        if (!this.state.loggedIn) {
            return (<Redirect to='/'></Redirect>)
        }
        return (<div className='editor-container'>
            <div className='editor-typing'>
            <input className='editor-title-input' onChange={this.handleTitleChange}></input>
                <textarea className='editor-text-input' onChange={this.handleContentChange}></textarea>
            </div>
            <div className='editor-view'>
                <BlogPost blog={this.state.blog}>
                </BlogPost>
            </div>
        </div>)
    }
    handleTitleChange = (e) => {
        e.preventDefault();
        var blog_changed = this.state.blog;
        blog_changed.title = e.target.value
        this.setState({ blog: blog_changed })
    }
    handleContentChange = (e) =>
    {
        e.preventDefault()
        var blog_content = e.target.value.split("\n").filter(e => e != "");
        var blog_changed = this.state.blog;
        blog_changed.content = blog_content.map(e => {
            return{
            type:'text',value:e
            }
        })
        this.setState({blog:blog_changed})
    }
    componentDidMount = () => {
        // fetch('/api/authenticate')
        // .then(res => res.json())
        // .then(res => this.setState({loggedIn:res.success}))
    }
}
export default BlogEditor