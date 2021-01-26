import { FunctionalComponent, h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import TerminalList from '../../components/terminal-list/terminal-list'
import Terminal from '../../components/terminal/terminal'
import { banner, contacts, footer, prompt } from '../../content'

const Home: FunctionalComponent = () => {
    const [messageComplete, setMessageComplete] = useState(false)
    const [contactsComplete, setContactsComplete] = useState(false)
    const [footerComplete, setFooterComplete] = useState(false)
    const [promptComplete, setPromptComplete] = useState(false)
    const [buffer, setBuffer] = useState('')
    const MAX_BUFFER_LENGTH = 20

    const keyHandler = (listener: KeyboardEvent): void => {
        const key = listener.key

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
        return (): void => {
            window.removeEventListener('keyup', keyHandler)
        }
    })

    return (
        <div class="display">
            <div class="screen">
                <div class="wrapper">
                    <div class="interlace"></div>
                    <div class="envelope">
                        <main class="terminal">
                            <div class="content">
                                <Terminal
                                    condition={true}
                                    content={banner}
                                    completed={(): void => setMessageComplete(true)}
                                />
                                <TerminalList
                                    condition={messageComplete}
                                    content={contacts}
                                    completed={(): void => setContactsComplete(true)}
                                />
                                <Terminal
                                    condition={contactsComplete}
                                    content={footer}
                                    completed={(): void => setFooterComplete(true)}
                                />
                                <Terminal
                                    condition={footerComplete}
                                    content={`${prompt}`}
                                    completed={(): void => setPromptComplete(true)}
                                />
                                {promptComplete ? <pre>{buffer}</pre> : ''}
                                <span class="cursor" />
                            </div>
                        </main>
                    </div>
                    <div class="scanline"></div>
                </div>
            </div>
        </div>
    )
}

export default Home
