import { BrowserRouter as Router, Link } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/vue">vue</Link>
              </li>
              <li>
                <Link to="/vue2">vue2</Link>
              </li>
              <li>
                <Link to="/vue3">vue3</Link>
              </li>
            </ul>
          </nav>
        </div>
      </Router>
      <div id="micro-container" />
    </div>
  )
}

export default App
