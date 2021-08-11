// Banner text
export const banner = `
\t _   _      _ _
\t| | | |    | | |
\t| |_| | ___| | | ___
\t|  _  |/ _ \\ | |/ _ \\
\t| | | |  __/ | | (_) |
\t\\_| |_/\\___|_|_|\\___/


> Nice to meet you!

> I'm Sven Vowe
    a full stack web dev

> Reach me here:

`

// Contact texts
export interface Contacts {
    text: string
    link: string
}

export const contacts: Contacts[] = [
    {
        text: '\t-> email\n',
        link: 'mailto:svenvowe@gmail.com'
    },
    {
        text: '\t-> github\n',
        link: 'https://github.com/nuclearglow'
    },
    {
        text: '\t-> linkedin\n',
        link: 'https://www.linkedin.com/in/svenvowe/'
    },
    {
        text: '\t-> xing\n',
        link: 'https://xing.to/svenvowe'
    }
]

export const footer = `
> Cheers and have a nice day !\n
`

export const prompt = `~ % `
