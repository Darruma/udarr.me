import React, { Component } from 'react'
import EquationBlock from './EquationBlock'
import View from './View'
import 'katex/dist/katex.min.css';
import '../css/editor.css'
import TeX from '@matejmazur/react-katex';
class Editor extends Component {
    state = {
        title: [],
        content: [],
        rendered: []
    }
    render() {
        return (
            <div className='editor-container'>
                
                <textarea className='editor-box editor-input' onChange={this.onTextChange}>

                </textarea>
                <button onClick={this.parseTex}>a</button>
                <View data={this.state.rendered}></View>
            </div>)
    }

    onTextChange = (e) => {
        e.preventDefault();
        this.setState({ content: e.target.value.split("\n") });
    }
    parseTex = (e) => {
        console.log(this.state.content)
        e.preventDefault()
        var equation_content = []
        for (var i = 0; i < this.state.content.length; i++) {

            if(this.state.content[i] == "")
            {
                equation_content.push(
                    {
                        type:'break',
                        value:<br></br>
                    }
                )
            }
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
                                    value: <span>{in_text}</span>
                                }
                            )
                        }
                    }
                }

            }
        }
       this.setState({rendered:equation_content},()=> console.log(this.state.rendered))
    }

}
export default Editor