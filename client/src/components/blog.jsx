import React, { Component } from 'react'
import '../App.css'
import BlogTitle from './BlogTitle'
class Blog extends Component {
    state = {
        blogData: [
            {
                title: 'tests',
                id: 'test'
            }
        ]
    }
    render() {
        return (<div className='App'>
        <div className='title'>Blog</div>
            <div className='centered-container'>
            {this.state.blogData.map(e =>
                {
                    return (<BlogTitle title={e.title} id={e.id}></BlogTitle>)
                })}
            </div>
        </div>)
    }

    componentWillMount = () => {
    }
}

export default Blog