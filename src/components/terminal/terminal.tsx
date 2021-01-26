import { FunctionalComponent, h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { timer } from 'rxjs'
import { finalize, takeWhile } from 'rxjs/operators'

interface Props {
    content: string
    condition: boolean
    completed: Function
}

const Terminal: FunctionalComponent<Props> = (props: Props) => {
    const { content, condition, completed } = props
    const [message, setMessage] = useState('')

    const timer$ = timer(333, 25).pipe(
        takeWhile((i) => i < content.length),
        finalize(() => {
            completed()
        })
    )

    useEffect(() => {
        console.log('running effect')

        if (condition) {
            timer$.subscribe((i) => {
                setMessage(content.substr(0, i + 1))
            })
        }
    }, [condition])

    return <pre>{message}</pre>
}

export default Terminal
