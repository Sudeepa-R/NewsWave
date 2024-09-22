import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingBar from 'react-top-loading-bar'
export class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResult:0,
      progressValue:0,
    };
    document.title=`${this.capitalize(this.props.category)}- NewsWave`;
  }
   capitalize=(str)=> {
    if (!str) return str; 
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
  async componentDidMount() {
   
    this.state.progressValue=20;

    const a=import.meta.env.VITE_REACT_API_VALUE
    // console.log(a);
    let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&apiKey=${a}&page=${
      this.state.page
    }`;
    
    this.setState({loading:true })
    let data = await fetch(url);
    this.setState({progressValue:60});
    let parsedData = await data.json();
    this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles,
      loading:false,
      totalResult: parsedData.totalResults,
      progressValue:100
    });
   
   
  }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    const a=import.meta.env.VITE_REACT_API_VALUE
    const url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&apiKey=${a}&page=${this.state.page}`;
    this.setState({loading:true })
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading:false
    });
  };
  render() {
    return (
      <div className="container my-3">
        
         <LoadingBar
         height={3}
        color='#f11946'
        progress={this.state.progressValue}
        onLoaderFinished={() => setProgress(0)}
      />
        <h1 style={{ textAlign: "center" }}>NewsWave- Top {this.capitalize(this.props.category)} Headlines </h1>
        <InfiniteScroll
          style={{height: 'auto', overflow: 0}}
          dataLength={this.state.articles.length} 
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults} 
          loader={<Spinner />} 
        >
        <div className="row">
        
          {this.state.articles.map((element) => (
            
            <div className="col-md-4" key={element.url}>
              <Newsitem
                title={element.title}
                description={element.description}
                imageurl={!element.urlToImage?"https://cdn.pixabay.com/photo/2017/06/26/19/03/news-2444778_1280.jpg":element.urlToImage}
                newsUrl={element.url}
                author={!element.author?"Unknown":element.author}
                date={element.publishedAt}
                source={element.source.name }
              />
            </div>
          ))}
        
        </div>
        
        </InfiniteScroll>
      </div>
    );
  }
}

export default News;
