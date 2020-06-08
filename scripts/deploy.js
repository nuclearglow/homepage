const fs = require('fs')
const du = require('du')
const NodeSSH = require('node-ssh')

const name = require('../package.json').name
const version = require('../package.json').version
const credentials = require('../.credentials.json')

/**
 * Deployment: connect to SSH, copy dist folder to remote
 */
console.log(`Deploying ${name}@${version}`)

const deploy = async () => {
    const ssh = new NodeSSH()

    console.log(`Connecting to ${credentials.remoteHost}`)

    await ssh.connect({
        host: credentials.remoteHost,
        username: credentials.remoteUsername,
        port: 22,
        privateKey: credentials.privateKeyPath,
        passphrase: fs.readFileSync(credentials.privateKeyPassphrasePath, 'utf8').trim()
    })

    console.log(`Cleaning up...`)

    const result = await ssh.execCommand('rm -Rf *', { cwd: credentials.remotePath })
    if (result.code > 0) {
        console.err(result.stderr)
    }

    const size = await du('dist')
    const deploymentSize = (size / 1024 / 1024).toFixed(2)

    console.log(`Uploading files (${deploymentSize} MB)`)

    const failed = []
    const successful = []

    const status = await ssh.putDirectory('dist/', credentials.remotePath, {
        recursive: true,
        concurrency: 3,
        tick: (localPath, remotePath, error) => {
            if (error) {
                failed.push(localPath)
            } else {
                successful.push(localPath)
            }
        }
    })

    if (status) {
        console.log('Deployment complete')
        if (failed.length) {
            console.err('failed transfers')
            console.err(failed.join('\n'))
        }
    } else {
        console.err('Deployment failed!')
        if (failed.length) {
            console.err('failed transfers')
            console.err(failed.join('\n'))
        }
        process.exit(1)
    }

    ssh.dispose()
}

deploy()
