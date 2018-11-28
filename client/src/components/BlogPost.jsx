import React, { Component } from 'react'
import EquationBlock from './EquationBlock'
import '../App.css'
import InlineText from './InlineText';
class BlogPost extends Component {

    state = {
        blog:
        {
            title: 'Test post please ignore',
            content: []
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
                if (element.type == 'article_text') {
                    return <div className='article-text'>
                        <InlineText value={element.value}></InlineText>
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