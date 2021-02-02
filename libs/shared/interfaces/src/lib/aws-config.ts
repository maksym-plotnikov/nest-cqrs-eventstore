export interface IAwsConfig {
    accessKeyId: string;
    secretAccessKey: string;
    region: string;
    bucketName?: string;
    instanceId?: string;
}

export interface InstanceParams {
    InstanceIds: string[];
}
