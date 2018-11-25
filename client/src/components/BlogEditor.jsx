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
        <div className='editor-typing'>

        </div>
        <div className='editor-view'>

        </div>
        </div>
    }
}
export default BlogEditor