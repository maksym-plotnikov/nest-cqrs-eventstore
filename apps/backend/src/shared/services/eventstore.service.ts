import { ConfigService } from './config.service';
import {
    EventStoreDBClient,
    jsonEvent,
    JSONEventData,
    ResolvedEvent,
    AppendResult,
    ErrorType,
    BACKWARDS,
    FORWARDS,
    START,
    END,
} from '@eventstore/db-client';
import {
    AppendToStreamOptions,
    ReadStreamOptions,
} from '@eventstore/db-client/dist/streams';
import { JSONType } from '@eventstore/db-client/dist/events/types';

const _config = new ConfigService();

export namespace EventStoreServiceConstants {
    export const forwards = FORWARDS;
    export const backwards = BACKWARDS;
    export const start = START;
    export const end = END;
}

export class EventStoreService {
    private client: EventStoreDBClient;

    constructor() {
        this.client = EventStoreDBClient.connectionString(
            _config.get('EVENTSTORE_DB_URL'),
        );
    }

    /**
     * Create event
     * @returns {JSONEventData}
     * @param payload
     */
    static event(payload: JSONEventData): JSONEventData {
        return jsonEvent(payload);
    }

    /**
     * Append event to stream
     * @returns {AppendResult}
     * @param streamName
     * @param payload
     * @param options
     */
    async appendToStream(
        streamName: string,
        payload: any,
        options: AppendToStreamOptions = {},
    ): Promise<AppendResult> {
        return this.client.appendToStream(
            streamName,
            EventStoreService.event(payload),
            options,
        );
    }

    /**
     * Read from stream
     * @returns {AppendResult}
     * @param streamName
     * @param options
     */
    async readStream(
        streamName: string,
        options: ReadStreamOptions,
    ): Promise<ResolvedEvent[]> {
        const events = [];
        try {
            const res = await this.client.readStream(streamName, options);
            for (const resolvedEvent of res) {
                events.push(resolvedEvent?.event.data);
            }
        } catch (error) {
            if (error.type == ErrorType.STREAM_NOT_FOUND) return;
            throw error;
        }
        return events;
    }
}
