import React, { Component } from 'react'
import EquationBlock from './EquationBlock'
import '../App.css'
class BlogPost extends Component {

    state = {
        blog:
        {
            title:'Test post please ignore',
            content:[]
        }
    }
    render() {
        return (<div className='centered-container'>
            <div className='btitle'>
                {
                    this.props.blog.title
                }
            </div>
            {this.props.blog.content.map(element => {
                if (element.type == 'text') {
                    return <div className='article-text'>
                    
                        {element.value}
                    </div>
                }
                else if (element.type == 'equation-block') {
                    return <EquationBlock text={element.value}></EquationBlock>
                }
            })}
        </div>)
    }
    
}
export default BlogPost