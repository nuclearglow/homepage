const fs = require('fs')
const client = require('scp2')
const SSH = require('simple-ssh')
const getFolderSize = require('get-folder-size')

const version = require('../package.json').version
const credentials = require('../.credentials.json')

/**
 * Deployment: connect to SSH, copy dist folder to remote
 */
console.log(`Deploying svenvowe.de ${version}`)

console.log('Cleaning up remote files')

const ssh = new SSH({
    host: credentials.remoteHost,
    user: credentials.remoteUsername,
    port: 22,
    key: fs.readFileSync(credentials.privateKeyPath, 'utf8'),
    passphrase: fs.readFileSync(credentials.privateKeyPassphrasePath, 'utf8').trim(),
    baseDir: credentials.remotePath
})

// clean up directory
ssh.exec('rm -Rf *', {
    out: (stdout) => {
        console.log(stdout)
    },
    err: (stderr) => {
        console.log(stderr)
    }
}).start()
ssh.end()

getFolderSize('dist', (err, size) => {
    if (err) {
        console.error(err)
    }
    const deploymentSize = (size / 1024 / 1024).toFixed(2)
    console.log(`Uploading files (${deploymentSize} MB)`)
})

client.scp(
    'dist/',
    {
        path: credentials.remotePath,
        host: credentials.remoteHost,
        username: credentials.remoteUsername,
        port: 22,
        privateKey: fs.readFileSync(credentials.privateKeyPath, 'utf8'),
        passphrase: fs.readFileSync(credentials.privateKeyPassphrasePath, 'utf8').trim()
    },
    (err) => {
        if (err) {
            console.error('Error during Deployment: ', err)
        }
        console.log('Deployment complete')
    }
)
