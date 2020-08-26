const { exec } = require('child_process')
const path = require('path')

let client_work_dir = path.resolve(__dirname, '../client')

function npm_link(pkg) {
  exec(`npm link ../packages/${pkg}`, { cwd: client_work_dir })
}

npm_link('core')
