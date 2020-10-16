import { AliyunOSS, AliyunOSSConfig, BucketInfo } from './interface';

export function logBucketInfo({ bucket, region }: BucketInfo, spaceNumber = 2) {
  console.log(`${spaceGenerator(spaceNumber)}bucket: ${bucket}`);
  console.log(`${spaceGenerator(spaceNumber)}region: ${region}`);
}

export function logBucketList(
  bucketList: Array<BucketInfo>,
  currentBucket: string,
  spaceNumber = 2
) {
  bucketList.forEach(({ bucket, region }) => {
    console.log(
      `${
        bucket === currentBucket
          ? '* ' + spaceGenerator(spaceNumber - 2)
          : spaceGenerator(spaceNumber)
      }${bucket}`
    );
    console.log(`${spaceGenerator(spaceNumber + 2)}bucketName: ${bucket}`);
    console.log(`${spaceGenerator(spaceNumber + 2)}region: ${region}`);
  });
}

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
