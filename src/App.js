import React from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'


const App = () => {
    return(
        <div>
            <Router>
                <Route path="/login" exact component={Login} />
                <Route path="/register" exact component={Register} />
            </Router>
        </div>
    )
}

export default App