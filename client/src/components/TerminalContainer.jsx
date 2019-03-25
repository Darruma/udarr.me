import React, { Component } from 'react';
import Terminal from './Terminal';
class TerminalContainer extends Component {
    state = {  }
    render() { 
        return (<div>
           <Terminal terminal_data={'root@darruma > '}></Terminal>
        </div>  );
    }
}
 
export default TerminalContainer;