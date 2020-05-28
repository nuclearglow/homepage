import { timer } from 'rxjs'
import { takeWhile } from 'rxjs/operators'
import './src/styles.scss'

// Banner text
const banner = `
processing...
          _________
 |\     /|\__   __/
 | )   ( |   ) (
 | (___) |   | |
 |  ___  |   | |
 | (   ) |   | |
 | )   ( |___) (___
 |/     \|\_______/

`

// Contact texts
const contactInfo = {
    email: 'svenvowe@gmail.com',
    github: 'https://github.com/nuclearglow',
    linkedin: 'https://twitter.com/andersevenrud',
    xing: ''
}

const load = () => {
    timer(333, 50)
        .pipe(takeWhile((i) => i < banner.length))
        .subscribe((i) => {
            if (i === 0) {
                // setup
            }
            // set banner.charAt(i)
        })
}

document.addEventListener('DOMContentLoaded', load)
