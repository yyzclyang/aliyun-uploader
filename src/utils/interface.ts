/**
 * AliyunOSSInterface
 */
export { Options as OSSOptions } from 'ali-oss';
export interface UploadFile {
  OSSPath: string;
  localPath: string;
}
export interface AccessKey {
  accessKeyId: string;
  accessKeySecret: string;
}
export interface BucketInfo {
  bucket: string;
  region: string;
}
export interface AliyunOSS {
  OSSName: string;
  accessKey: AccessKey;
  currentBucket: string;
  bucketList: Array<BucketInfo>;
}
export interface AliyunOSSConfig {
  current: string;
  aliyunOSSList: Array<AliyunOSS>;
}
export interface AliyunOSSInputInfo {
  OSSName: string;
  accessKeyId: string;
  accessKeySecret: string;
}
