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
        rendered: [],
        timeout: null
    }
    render() {
        return (
            <div className='container'>
                <header className='editor-header'></header>
                <div className='editor-container'>
                    <textarea className='editor-box editor-input' onChange={this.onTextChange}>
                    </textarea>
                    <View data={this.state.rendered}></View>
                </div>
            </div>)
    }

    onTextChange = (e) => {
        e.preventDefault();
        this.setState({ content: e.target.value.split("\n") });
        clearTimeout(this.state.timeout)
        this.setState({
            timeout: setTimeout(() => {
                this.parseTex();
            }, 750)
        })

    }
    componentDidMount()
    {
      var id = this.props.match.params.id;
      if(id)
      {
          // fetch editor data
          fetch('/api/editor/' + id)
          .then(res => res.json())
          .then(res =>
            {
                if (res.success)
                {
                    console.log(res.data)
                }
                else{
                    console.log(res.message)
                }
            })
      }
    }
    parseTex = (e) => {
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
                    if (paragraph[currentIndex] == '$') {
                        currentIndex = currentIndex + 1
                        var eq_text = ''
                        while (paragraph[currentIndex] != '$' && currentIndex < paragraph.length) {

                            eq_text = eq_text + paragraph[currentIndex];
                            currentIndex += 1
                        }
                        if (eq_text) {
                            j = currentIndex
                            equation_content.push(
                                {
                                    type: 'inline_equation',
                                    value: <TeX>{eq_text}</TeX>
                                }
                            )
                        }
                    }
                    else {
                        var in_text = ''

                        while (paragraph[currentIndex] != '$' && currentIndex < paragraph.length) {
                            in_text = in_text + paragraph[currentIndex];
                            currentIndex += 1
                        }

                        if (in_text) {
                            j = currentIndex - 1
                            var inline_classname = (this.state.content[i - 1] == "") ? 'inline-text' : ""
                            console.log(inline_classname)
                            equation_content.push(
                                {
                                    type: 'inline_text',
                                    value: <span className={inline_classname}>{in_text}</span>
                                }
                            )
                        }
                    }
                }

            }
        }
        this.setState({ rendered: equation_content })
    }

}
export default Editor