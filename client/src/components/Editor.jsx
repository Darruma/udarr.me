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

                for (var j = 0; j < paragraph.length; j++) {
                    var currentIndex = j
                    console.log(paragraph[currentIndex])
                    if (paragraph[currentIndex] == '$') {
                        currentIndex = currentIndex + 1
                        var eq_text = ''
                        while (paragraph[currentIndex] != '$' && currentIndex < paragraph.length) {
                            
                            eq_text = eq_text + paragraph[currentIndex];
                            currentIndex += 1
                        }
                        if(eq_text)
                        {
                            j = currentIndex
                            equation_content.push(
                                {
                                    type:'inline_equation',
                                    value:<TeX>{eq_text}</TeX>
                                }
                            )
                        }
                    }
                    else {
                        var in_text = ''
                        
                        while (paragraph[currentIndex] != '$' &&  currentIndex < paragraph.length) {
                            in_text = in_text + paragraph[currentIndex];
                            currentIndex += 1
                        }
                        
                        if (in_text) {
                            j = currentIndex - 1
                            equation_content.push(
                                {
                                    type: 'inline_text',
                                    value: <p>{in_text}</p>
                                }
                            )
                        }
                    }
                }

            }
        }
        console.log(equation_content)
    }

}
export default Editor