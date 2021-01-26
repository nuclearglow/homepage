import { FunctionalComponent, h } from 'preact'
import { useState } from 'preact/hooks'
import { Contacts } from '../../content'
import Terminal from '../terminal/terminal'

interface Props {
    content: Contacts[]
    condition: boolean
    completed: Function
}

const TerminalList: FunctionalComponent<Props> = (props: Props) => {
    const { content, condition, completed } = props
    const [completedItem, setCompletedItem] = useState(0)

    if (completedItem === content.length) {
        completed()
    }

    if (condition) {
        return (
            <span class="list">
                {content.map((item, index) => (
                    <a key={item.text} tabIndex={index} target="_blank" rel="noopener noreferrer" href={item.link}>
                        <Terminal
                            condition={completedItem === index}
                            content={item.text}
                            completed={(): void => setCompletedItem(index + 1)}
                        />
                    </a>
                ))}
            </span>
        )
    } else {
        return null
    }
}

export default TerminalList
