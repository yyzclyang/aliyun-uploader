#!/usr/bin/env node
import program from 'commander';
const pkg = require('../package.json');
import { uploader } from './main';

function main() {
  program.version(pkg.version);

  // 上传文件
  program
    .command('upload <cdnFolder> [localFileFolder]', { isDefault: true })
    .description('upload local folder files')
    .action((cdnFolder, localFileFolder) => {
      uploader(cdnFolder, localFileFolder);
    });

  program.parse(process.argv);
}

main();
