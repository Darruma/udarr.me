import React ,  { Component } from "react";
import Article from "./Article";

class ArticleContainer extends Component {
    render()
    {
        return(
            <Article name={this.props.match.params.name}></Article>
        )
    }
}
export default ArticleContainer