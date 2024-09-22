import React, { Component } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import{
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";



export default class App extends Component {
  render() {
    return (
<div>
 
  <Router>
     <Navbar />
    <Routes>
      <Route path="/" element={<News setProgress={this.setProgress} key="general"  category="general" />} />
      <Route path="/business" element={<News setProgress={this.setProgress} key="business" category="business" />} />
      <Route path="/entertainment" element={<News setProgress={this.setProgress} key="entertainment" category="entertainment" />} />
      <Route path="/general" element={<News setProgress={this.setProgress} key="general" category="general" />} />
      <Route path="/health" element={<News setProgress={this.setProgress} key="health" category="health" />} />
      <Route path="/science" element={<News setProgress={this.setProgress} key="science" category="science" />} />
      <Route path="/sports" element={<News setProgress={this.setProgress} key="sports" category="sports" />} />
      <Route path="/technology" element={<News setProgress={this.setProgress} key="technology" category="technology" />} />
    </Routes>
  </Router>
</div>

    )
  }
}
