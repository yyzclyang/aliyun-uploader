import { AliyunOSS, AliyunOSSConfig, BucketInfo } from './interface';

export function logAliyunOSSInfo(
  { OSSName, accessKey, currentBucket, bucketList }: AliyunOSS,
  spaceNumber = 2
) {
  console.log(`${spaceGenerator(spaceNumber)}OSS Name: ${OSSName}`);
  console.log(
    `${spaceGenerator(spaceNumber)}accessKeyId: ${accessKey.accessKeyId}`
  );
  console.log(
    `${spaceGenerator(spaceNumber)}accessKeySecret: ${
      accessKey.accessKeySecret
    }`
  );
  console.log('OSS bucket list:');
  logBucketList(bucketList, currentBucket, 4);
}

export function logBucketList(
  bucketList: Array<BucketInfo>,
  currentBucket: string,
  spaceNumber: number
) {
  bucketList.forEach(({ bucket, region }) => {
    console.log(
      `${
        bucket === currentBucket
          ? '* ' + spaceGenerator(2)
          : spaceGenerator(spaceNumber)
      }${bucket}`
    );
    console.log(`${spaceGenerator(spaceNumber + 2)}bucketName: ${bucket}`);
    console.log(`${spaceGenerator(spaceNumber + 2)}region: ${region}`);
  });
}

export function logAliyunOSSList(aliyunOSSConfig: AliyunOSSConfig) {
  const { current, aliyunOSSList } = aliyunOSSConfig;
  aliyunOSSList.forEach(({ OSSName }) => {
    console.log(
      `${current === OSSName ? '* ' : spaceGenerator(2)}OSSName: ${OSSName}`
    );
  });
}

export function spaceGenerator(number: number) {
  return new Array(number + 1).join(' ');
}
