import React from 'react'
import {BrowserRouter, Route, Link} from 'react-router-dom'

import AccountsList from './components/accounts/List'

// import AccountShow from './components/accounts/Show'

function App(props){
    return (
        <BrowserRouter>
        <div>
            <h2 style={{color:"purple"}}>Welcome</h2>
            <Link to="/"> Home</Link> ||
            <Link to ="/accounts"> View Account Statement</Link> 
            <Route path ="/accounts" component={AccountsList} exact={true}/>
            {/* <Route path="/accounts/:accountId" component={AccountShow}/> */}

        </div>
        </BrowserRouter>
    )
}
export default App