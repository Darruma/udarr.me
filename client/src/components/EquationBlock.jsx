import React , { Component } from 'react'
import Mathjax from 'react-mathjax2'

class EquationBlock extends Component
{
    render()
    {
        
        return (<Mathjax.Context input='ascii'>
                <div>
                    <Mathjax.Node>{this.props.text}</Mathjax.Node>
                </div>
            </Mathjax.Context>)
    }
}
export default EquationBlock