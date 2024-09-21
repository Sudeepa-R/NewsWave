import React, { Component } from 'react'
import Newsitem from './Newsitem'

export class News extends Component {
  
  constructor(props){
    super(props);
    this.state={
        
        articles:[],
        loading:false
    }
  }
  async componentDidMount(){
    let url='https://newsapi.org/v2/top-headlines?category=business&apiKey=60066e94a1254e27889f95eaae4b6571'
    let data=await fetch(url);
    let parsedData=await data.json()
    this.setState({articles:parsedData.articles})

  }

  render() {
    return (
      
      <div className='container my-3'>
        <h1>NewsMonkey- Top Headlines </h1>
       
        <div className="row">
        {this.state.articles.map((element)=>(
          
             <div className="col-md-4" key={element.url}>
             <Newsitem   title={element.title} description={element.description} imageurl={element.urlToImage} newsUrl={element.url}/>
             </div>

        ))}
         
          
        </div>
        
      </div>
    )
  }
}

export default News
