import * as AWS from 'aws-sdk';
import { Logger } from 'winston';
import { PutObjectRequest } from 'aws-sdk/clients/s3';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { ConfigService } from './config.service';
import { ValidatorService } from './validator.service';
import { FileExistsException } from '../../exceptions';
import { IAssetResponse, IFile } from '@smplct-view/shared/interfaces';

@Injectable()
export class AwsS3Service {
    private readonly _s3: AWS.S3;
    private readonly _s3UrlPrefix: string;

    constructor(
        @Inject('winston') private readonly _logger: Logger,
        private readonly _configService: ConfigService,
        private readonly _validatorService: ValidatorService,
    ) {
        const options: AWS.S3.Types.ClientConfiguration = {
            apiVersion: 'latest',
            region: this._configService.get('S3_REGION'),
        };
        const awsS3Config = this._configService.awsS3Config;
        const { accessKeyId, secretAccessKey } = awsS3Config;
        if (accessKeyId && secretAccessKey) {
            options.credentials = awsS3Config;
            this._s3 = new AWS.S3(options);
        } else {
            AWS.config.credentials = new AWS.EC2MetadataCredentials({
                httpOptions: { timeout: 10000 }, // 10 second timeout
            });
            this._s3 = new AWS.S3({ region: this._configService.get('S3_REGION') });
        }
        this._s3UrlPrefix = `https://${this._configService.awsS3Config.bucketName}.s3.${this._configService.awsS3Config.region}.amazonaws.com/`;
    }

    async listObjects(): Promise<Record<string, any>[]> {
        try {
            const response = await this._s3
                .listObjects({
                    Bucket: this._configService.awsS3Config.bucketName,
                })
                .promise();
            const data = response.Contents.filter(item => item.Size > 0);
            data.map(i => {
                i.Key = `${this._s3UrlPrefix}${i.Key}`;
                delete i.StorageClass;
                delete i.Owner;
                delete i.ETag;
            });
            return data;
        } catch (e) {
            return e;
        }
    }

    async uploadBuffer(file: Buffer, key: string, mimetype = null): Promise<string> {
        // Upload on top of existing file with no checks
        const params: PutObjectRequest = {
            Bucket: this._configService.awsS3Config.bucketName,
            Body: file,
            ACL: 'public-read',
            Key: key,
        };
        if (mimetype) {
            params.ContentType = mimetype;
        }
        try {
            await this._s3.putObject(params).promise();
            this._logger.info(`uploadBuffer: ${this._s3UrlPrefix}${key}`);
            return `${this._s3UrlPrefix}${key}`;
        } catch (e) {
            this._logger.error('Error uploading buffer: ' + JSON.stringify(e));
            throw new HttpException('Cannot upload file', HttpStatus.GONE);
        }
    }

    generateFilename(name: string, type: string): string {
        const fileName = name.replace(/\s/g, '');
        const prefix = this._validatorService.isImage(type) ? 'images' : 'videos';
        return `${prefix}/${fileName}`;
    }

    async uploadFile(
        file: IFile,
        needCheck = true,
        filePrefix = '',
    ): Promise<IAssetResponse> {
        let name = file.originalname;
        // Add prefix folder
        if (filePrefix.length > 0) {
            name = filePrefix + '/' + name;
        }
        const key = this.generateFilename(name, file.mimetype);
        let fileExist;
        try {
            const params = {
                Bucket: this._configService.awsS3Config.bucketName,
                Key: key,
            };
            fileExist = await this._s3.headObject(params).promise();
        } catch (e) {
            console.info(e.code);
        }
        if (fileExist && fileExist.ContentLength && needCheck) {
            throw new FileExistsException();
        }
        try {
            await this._s3
                .putObject({
                    Bucket: this._configService.awsS3Config.bucketName,
                    Body: file.buffer,
                    ACL: 'public-read',
                    Key: key,
                    ContentType: file.mimetype,
                })
                .promise();
            this._logger.info(`uploadFile: ${this._s3UrlPrefix}${key}`);
            return { url: `${this._s3UrlPrefix}${key}` };
        } catch (e) {
            this._logger.error(`${JSON.stringify(e)}`);
        }
    }

    async deleteFile(url): Promise<string> {
        const params = {
            Bucket: this._configService.awsS3Config.bucketName,
            Key: url,
        };
        try {
            await this._s3.headObject(params).promise();
            this._logger.info('File found in S3');
            try {
                await this._s3.deleteObject(params).promise();
                this._logger.info('File deleted successfully');
                return 'File deleted successfully';
            } catch (err) {
                this._logger.info('Error during deleting file: ' + JSON.stringify(err));
                return 'Error during deleting file';
            }
        } catch (err) {
            this._logger.info('File not found: ' + err.code);
            return 'File not found';
        }
    }

    async deleteFileByOriginUrl(url: string): Promise<string> {
        const bucketPrefix = `https://${this._configService.awsS3Config.bucketName}.s3.${this._configService.awsS3Config.region}.amazonaws.com/`;
        const key = url.replace(bucketPrefix, '');
        this._logger.info('Deleting next file: ' + key);
        const deletionResult = await this.deleteFile(key);
        this._logger.info(`Deletion ${key} result: ${deletionResult}`);
        return deletionResult;
    }
}
