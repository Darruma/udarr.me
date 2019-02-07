
import React , { Component } from 'react'

class Article extends Component {
    render() {
        <div>
            {this.props.match.params.name}
            
        </div>

    }
}

export default Article