import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import Header from './Header'
import {connect} from 'react-redux'
import * as actions from '../actions'




const Dashboard = () => <h2>Dashboard</h2>
const Landing = () =>    <h2>Landing</h2>

 class App extends Component {

componentDidMount(){
  console.log(this.props.fetchUser())
this.props.fetchUser()
  }
  render() {
    return (
      <div className="container">
      <Header />
       <BrowserRouter>
       <div>

         <Route exact  path="/" component={Landing}/>
         <Route path="/surveys" component={Dashboard} />
         </div>
       </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App)
