const path = require('path');
const fs = require('fs');
const glob = require('glob');

const appDirectory = fs.realpathSync(process.cwd());
const entries = {};

glob.sync(resolveApp('src/!(_)*.{j,t}s?(x)')).forEach(function(file) {
    const basename = path.basename(file).replace(/\.[jt]sx?$/, '');

    entries[basename] = file;
});

function resolveApp(relativePath) {
    return path.resolve(appDirectory, relativePath);
}

module.exports = {
    appTsConfig: resolveApp('tsconfig.json'),
    appNodeModules: resolveApp('node_modules'),
    appSrc: resolveApp('src'),
    entries: entries,
    appPackageJson: resolveApp('package.json')
}