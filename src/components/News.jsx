import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";

export class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }
  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?category=business&apiKey=60066e94a1254e27889f95eaae4b6571 &page=${
      this.state.page + 1
    }`;
    this.setState({loading:true })
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles,
      loading:false
    });
  }
  handlePreClick = async () => {
    console.log("pre");
    let url = `https://newsapi.org/v2/top-headlines?category=business&apiKey=60066e94a1254e27889f95eaae4b6571&page=${
      this.state.page - 1
    }`;
    this.setState({loading:true })
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading:false
    });
  };
  handleNextClick = async () => {
    console.log("Next");
    let url = `https://newsapi.org/v2/top-headlines?category=business&apiKey=60066e94a1254e27889f95eaae4b6571&page=${
      this.state.page + 1
    }&pageSize=10`;
    this.setState({loading:true })
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles,
      loading:false
    });
  };
  render() {
    return (
      <div className="container my-3">
        <h1 style={{ textAlign: "center" }}>NewsMonkey- Top Headlines </h1>
        {this.state.loading && <Spinner/>}
        <div className="row">
          {this.state.articles.map((element) => (
            <div className="col-md-4" key={element.url}>
              <Newsitem
                title={element.title}
                description={element.description}
                imageurl={element.urlToImage}
                newsUrl={element.url}
              />
            </div>
          ))}
        </div>
        <div className="container">
          <button
            type="button"
            disabled={this.state.page <= 1}
            class="btn btn-success"
            onClick={this.handlePreClick}
          >
            {" "}
            &larr; Previous
          </button>
          <button
            type="button"
            class="btn btn-success "
            onClick={this.handleNextClick}
            style={{ float: "right" }}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
