import React, { Component } from 'react'
import '../css/editor.css'
class View extends Component
{
    render()
    {
        return(<div className='editor-box editor-view'>
        {
            this.props.data.map(element =>
                {
                    return element.value
                })
        }

        </div>)
    }
}
export default View