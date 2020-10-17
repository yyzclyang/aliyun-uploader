import { OSS, OSSDBItem, BucketDBItem } from './interface';

export function logBucket({ bucket, region }: BucketDBItem, spaceNumber = 2) {
  console.log(`${spaceGenerator(spaceNumber)}bucket: ${bucket}`);
  console.log(`${spaceGenerator(spaceNumber)}region: ${region}`);
}

export function logBucketList(
  bucketList: Array<BucketDBItem>,
  currentBucketId: string,
  spaceNumber = 2
) {
  bucketList.forEach(({ id, bucket, region }) => {
    console.log(
      `${
        id === currentBucketId
          ? '* ' + spaceGenerator(spaceNumber - 2)
          : spaceGenerator(spaceNumber)
      }${bucket}`
    );
    console.log(`${spaceGenerator(spaceNumber + 2)}bucketName: ${bucket}`);
    console.log(`${spaceGenerator(spaceNumber + 2)}region: ${region}`);
  });
}

export function logOSS(
  { OSSName, accessKeyId, accessKeySecret, bucket, bucketList }: OSS,
  spaceNumber = 2
) {
  console.log(`${spaceGenerator(spaceNumber)}OSS Name: ${OSSName}`);
  console.log(`${spaceGenerator(spaceNumber)}accessKeyId: ${accessKeyId}`);
  console.log(
    `${spaceGenerator(spaceNumber)}accessKeySecret: ${accessKeySecret}`
  );
  console.log('OSS bucket list:');
  logBucketList(bucketList, bucket, 4);
}

export function logOSSList(OSSList: Array<OSSDBItem>) {
  OSSList.forEach(({ isCurrent, OSSName }) => {
    console.log(`${isCurrent ? '* ' : spaceGenerator(2)}OSSName: ${OSSName}`);
  });
}

export function spaceGenerator(number: number) {
  return new Array(number + 1).join(' ');
}
