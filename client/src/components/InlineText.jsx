import React , { Component } from 'react'
import Mathjax from 'react-mathjax2'
class InlineText extends Component
{
    render()
    {
        return(<Mathjax.Context input='tex'>
        <div>
            {this.props.value}
             <Mathjax.Node inline>{'a \\in b'}</Mathjax.Node>
        </div>
    </Mathjax.Context>)
    }
}
export default InlineText