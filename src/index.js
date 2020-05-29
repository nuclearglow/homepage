import { h, render } from 'preact'
import { useState } from 'preact/hooks'
import './styles.scss'
import { banner, contacts, footer } from './js/content'
import { Terminal } from './js/terminal'
import { TerminalList } from './js/list'

const App = () => {
    const [messageComplete, setMessageComplete] = useState(false)
    const [contactsComplete, setContactsComplete] = useState(false)

    return (
        <div class="content">
            <Terminal condition={true} content={banner} completed={() => setMessageComplete(true)} />
            <TerminalList condition={messageComplete} content={contacts} completed={() => setContactsComplete(true)} />
            <Terminal condition={contactsComplete} content={footer} completed={() => {}} />
            <span class="cursor" />
        </div>
    )
}

render(<App />, document.getElementsByClassName('terminal')[0])
