import React, { Component } from 'react'
import EquationBlock from './EquationBlock'
import 'katex/dist/katex.min.css';
import TeX from '@matejmazur/react-katex';
class Editor extends Component {
    state = {
        title: [],
        content: [],
        rendered: []
    }
    render() {
        return (
            <div>
                <textarea onChange={this.onTextChange}>

                </textarea>
                <button onClick={(e) => this.parseTex()}>Click</button>

            </div>)
    }

    onTextChange = (e) => {
        e.preventDefault();
        this.setState({ content: e.target.value.split("\n").filter(e => e !== "") });
    }
    parseTex = () => {
        console.log(this.state.content)
        var equation_content = []
        for (var i = 0; i < this.state.content.length; i++) {
            if (this.state.content[i] == "\\block") {
                var blockEquationComponent = <EquationBlock value={this.state.content[i + 1]}></EquationBlock>
                equation_content.push(
                    {
                        type: 'block',
                        value: blockEquationComponent
                    })
                i = i + 2
            }
            else {
                // Parse inline text here
                var paragraph = this.state.content[i];
                console.log(paragraph)
                var t = 0
               
                for(var j =0; j < paragraph.length;j++)
                {
                    var currentIndex = j
                    if(paragraph[currentIndex] == '$')
                    {
                        var eq_text = ''
                        while(paragraph[currentIndex] != '$')
                        {
                            eq_text = paragraph[currentIndex];
                            currentIndex += 1
                        }
                        j = currentIndex + 2
                    }
                    else
                    {
                        var in_text = ''
                        while( paragraph[currentIndex] != '$')
                        {
                            in_text = paragraph[currentIndex];
                            currentIndex += 1
                        }
                        equation_content.push(
                            {
                                type:'inline_text',
                                value:<p>{in_text}</p>
                            }
                        )
                    }
                }
             
            }
        }
        console.log(equation_content)
    }

}
export default Editor