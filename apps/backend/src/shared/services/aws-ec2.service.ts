import * as AWS from 'aws-sdk';
import { Logger } from 'winston';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from './config.service';
import { IAwsConfig, InstanceParams } from '@smplct-view/shared/interfaces';

@Injectable()
export class AwsEC2Service {
    private readonly _ec2: AWS.EC2;
    private readonly _awsEC2Config: IAwsConfig;
    private readonly _defaultParams: InstanceParams;

    constructor(
        @Inject('winston') private readonly _logger: Logger,
        private readonly _configService: ConfigService,
    ) {
        const options: AWS.EC2.Types.ClientConfiguration = {
            apiVersion: 'latest',
            region: this._configService.awsEC2Config.region,
        };
        this._awsEC2Config = this._configService.awsEC2Config;
        const { accessKeyId, secretAccessKey } = this._awsEC2Config;
        if (accessKeyId && secretAccessKey) {
            options.credentials = this._awsEC2Config;
            this._ec2 = new AWS.EC2(options);
        } else {
            AWS.config.credentials = new AWS.EC2MetadataCredentials({
                httpOptions: { timeout: 15000 }, // 15 second timeout
                maxRetries: 10,
            });
            this._ec2 = new AWS.EC2({ region: this._configService.awsEC2Config.region });
        }
        this._defaultParams = {
            InstanceIds: [this._awsEC2Config.instanceId],
        };
    }

    async getInstanceInfo() {
        try {
            const {
                InstanceStatuses: [instanceInfo],
            } = await this._ec2.describeInstanceStatus(this._defaultParams).promise();
            this._logger.info(
                `\n====> AWS Instance Info: ${JSON.stringify(
                    instanceInfo?.InstanceState,
                )}`,
            );
            return (
                instanceInfo || {
                    InstanceState: {
                        Code: 80,
                        Name: 'stopped',
                    },
                }
            );
        } catch (e) {
            this._logger.error(`${JSON.stringify(e)}`);
            return e;
        }
    }

    async stopInstance() {
        const params = {
            ...this._defaultParams,
            Hibernate: false,
        };
        try {
            const {
                StoppingInstances: [instanceInfo],
            } = await this._ec2.stopInstances(params).promise();
            return instanceInfo;
        } catch (e) {
            this._logger.error(`${JSON.stringify(e)}`);
            return e;
        }
    }

    async startInstance() {
        try {
            const {
                StartingInstances: [instanceInfo],
            } = await this._ec2.startInstances(this._defaultParams).promise();
            return instanceInfo;
        } catch (e) {
            this._logger.error(`${JSON.stringify(e)}`);
            return e;
        }
    }
}
