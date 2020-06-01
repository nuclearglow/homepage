import { h, render } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import './styles.scss'
import { banner, contacts, footer, prompt } from './js/content'
import { Terminal } from './js/terminal'
import { TerminalList } from './js/list'

const App = () => {
    const [messageComplete, setMessageComplete] = useState(false)
    const [contactsComplete, setContactsComplete] = useState(false)
    const [footerComplete, setFooterComplete] = useState(false)
    const [promptComplete, setPromptComplete] = useState(false)
    const [buffer, setBuffer] = useState('')
    const MAX_BUFFER_LENGTH = 20

    const keyHandler = ({ key }) => {
        setBuffer((prevState) => {
            if (key === 'Backspace' && prevState.length > 0) {
                return prevState.substr(0, buffer.length - 1)
            } else if (key.length > 1 || prevState.length >= MAX_BUFFER_LENGTH) {
                return ''
            }
            return prevState.concat(key)
        })
    }

    useEffect(() => {
        window.addEventListener('keyup', keyHandler)
        return () => {
            window.removeEventListener('keyup', keyHandler)
        }
    }, [])

    return (
        <div class="content">
            <Terminal condition={true} content={banner} completed={() => setMessageComplete(true)} />
            <TerminalList condition={messageComplete} content={contacts} completed={() => setContactsComplete(true)} />
            <Terminal condition={contactsComplete} content={footer} completed={() => setFooterComplete(true)} />
            <Terminal condition={footerComplete} content={`${prompt}`} completed={() => setPromptComplete(true)} />
            {promptComplete ? <pre>{buffer}</pre> : ''}
            <span class="cursor" />
        </div>
    )
}

render(<App />, document.getElementsByClassName('terminal')[0])
