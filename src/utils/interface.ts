/**
 * AliyunOSSInterface
 */
export { Options as AliyunOSSClientConfig } from 'ali-oss';
export interface UploadFile {
  OSSPath: string;
  localPath: string;
}
export interface BucketInputInfo {
  bucket: string;
  region: string;
}
export interface BucketDBItem extends BucketInputInfo {
  id: string;
  oss: string;
}
export interface OSSInputInfo {
  OSSName: string;
  accessKeyId: string;
  accessKeySecret: string;
}
export interface OSSDBItem extends OSSInputInfo {
  id: string;
  isCurrent: boolean;
  bucket: string;
}
export interface OSS extends OSSDBItem {
  bucketList: Array<BucketDBItem>;
}
