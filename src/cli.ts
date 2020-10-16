#!/usr/bin/env node
import program from 'commander';
const pkg = require('../package.json');
import {
  addOSS,
  deleteOSS,
  editOSS,
  showAllBucket,
  showAllOSS,
  showCurrentBucket,
  showCurrentOSS,
  uploader
} from './main';

function main() {
  program.version(pkg.version);

  // 展示 OSS 信息
  program
    .command('show-oss')
    .description('show OSS info')
    .option('-a, --all', 'show all OSS info')
    .action(({ all }) => {
      if (all) {
        showAllOSS();
      } else {
        showCurrentOSS();
      }
    });
  // 添加 OSS 信息
  program
    .command('add-oss')
    .description('add OSS info')
    .action(_ => {
      addOSS();
    });
  // 修改 OSS 信息
  program
    .command('edit-oss')
    .description('edit OSS info')
    .action(_ => {
      editOSS();
    });
  // 删除 OSS 信息
  program
    .command('delete-oss')
    .description('delete OSS info')
    .action(_ => {
      deleteOSS();
    });

  // 展示 Bucket 信息
  program
    .command('show-bk')
    .description('show bucket info')
    .option('-a, --all', 'show all bucket info')
    .action(({ all }) => {
      if (all) {
        showAllBucket();
      } else {
        showCurrentBucket();
      }
    });

  // 上传文件
  program
    .command('upload <OSSFolder> [localFileFolder]', { isDefault: true })
    .description('upload local folder files to aliyun OSS')
    .action((OSSFolder, localFileFolder) => {
      uploader(OSSFolder, localFileFolder);
    });

  program.parse(process.argv);
}

main();
