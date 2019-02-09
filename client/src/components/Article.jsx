import React from 'react';
import '../css/article.css'
class Article extends Component {
    render() { 
        return (<div>
            <div className='article-title'> {this.props.title}</div>

        </div>  );
    }
}
 
export default Article;