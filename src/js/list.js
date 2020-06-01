import { h } from 'preact'
import { Terminal } from './terminal'
import { useState } from 'preact/hooks'

export const TerminalList = ({ content, condition, completed }) => {
    const [completedItem, setCompletedItem] = useState(0)

    if (completedItem === content.length) {
        completed()
    }

    if (condition) {
        return (
            <span class="list">
                {content.map((item, index) => (
                    <a tabindex="0" target="_blank" rel="noopener noreferrer" href={item.link}>
                        <Terminal
                            condition={completedItem === index}
                            content={item.text}
                            completed={() => setCompletedItem(index + 1)}
                        />
                    </a>
                ))}
            </span>
        )
    }
}
