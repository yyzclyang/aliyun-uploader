#!/usr/bin/env node
import program from 'commander';
const pkg = require('../package.json');
import {
  addBucket,
  addOSS,
  deleteBucket,
  deleteOSS,
  editOSS,
  setCurrentBucket,
  setCurrentOSS,
  showAllBucket,
  showAllOSS,
  showCurrentBucket,
  showCurrentOSS,
  uploader
} from './main';
import fs from 'fs-extra';
import { getBucketDBPath, getOSSDBPath } from './utils/pathUtil';
import { saveBucketDB, saveOSSDB } from './utils/aliyunOSSUtil';

async function main() {
  program.version(pkg.version);
  const OSSDBIsExists = fs.pathExistsSync(getOSSDBPath());
  if (!OSSDBIsExists) {
    await saveOSSDB([]);
  }
  const bucketDBIsExists = fs.pathExistsSync(getBucketDBPath());
  if (!bucketDBIsExists) {
    await saveBucketDB([]);
  }

  // 设置 OSS
  program
    .command('set-oss')
    .description('set current OSS')
    .action(() => {
      setCurrentOSS();
    });
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

  // 设置 Bucket
  program
    .command('set-bk')
    .description('set current bucket')
    .action(() => {
      setCurrentBucket();
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
  // 添加 Bucket 信息
  program
    .command('add-bk')
    .description('add bucket info')
    .action(_ => {
      addBucket();
    });
  // 删除 Bucket 信息
  program
    .command('delete-bk')
    .description('delete bucket info')
    .action(_ => {
      deleteBucket();
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
