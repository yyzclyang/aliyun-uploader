#!/usr/bin/env node
import program from 'commander';
import { uploader } from './main';
const pkg = require('../package.json');

function main() {
  program.version(pkg.version);

  // 上传文件
  program
    .command('upload <cdnFolder> [localFileFolder]')
    .description('upload local folder files')
    .action((cdnFolder, localFileFolder) => {
      uploader(cdnFolder, localFileFolder);
    });

  program.parse(process.argv);
}

main();
