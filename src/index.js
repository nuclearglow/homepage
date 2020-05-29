import { h, render } from 'preact'
import { useState } from 'preact/hooks'
import './styles.scss'
import { banner, contacts } from './js/content'
import { Terminal } from './js/terminal'
import { TerminalList } from './js/list'

const App = () => {
    const [messageComplete, setMessageComplete] = useState(false)

    return (
        <div class="content">
            <Terminal condition={true} content={banner} completed={() => setMessageComplete(true)} />
            <TerminalList condition={messageComplete} content={contacts} />
            <span class="cursor" />
        </div>
    )
}

render(<App />, document.getElementsByClassName('terminal')[0])
