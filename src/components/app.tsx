import { FunctionalComponent, h } from 'preact'
import { Route, Router, RouterOnChangeArgs } from 'preact-router'
import Home from '../routes/home/home'
import NotFoundPage from '../routes/notfound'
import Profile from '../routes/profile'

const App: FunctionalComponent = () => {
    let currentUrl = ''

    const handleRoute = (e: RouterOnChangeArgs): void => {
        currentUrl = e.url
    }

    return (
        <div id="app">
            <Router onChange={handleRoute}>
                <Route path="/" component={Home} />
                <Route path="/profile/" component={Profile} user="me" />
                <NotFoundPage default />
            </Router>
        </div>
    )
}

export default App
