import React, { Component } from 'react'
import EquationBlock from './EquationBlock'
import '../App.css'
class BlogPost extends Component {
    state = {
        blog: {
            title: 'test',
            content: []
        }
    }
    render() {
        return (<div className='centered-container'>
            <div className='btitle'>
                {
                    this.state.blog.title
                }
            </div>
            {this.state.blog.content.map(element => {
                if (element.type == 'text')
                {
                    return <div className='article-text'>
                    {element.value}
                    </div>
                }
                else if (element.type == 'equation-block')
                {
                    return <EquationBlock text={element.value}></EquationBlock>
                }
            })}
        </div>)
    }
    componentDidMount = () => {
        // fetch('api/blog' + this.props.match.params.id)
        // .then(res => res.json()).then(res =>
        //     {
        //         console.log(res)
        //     })
    }
}
export default BlogPost