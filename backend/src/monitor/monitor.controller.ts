import { Controller, Sse, MessageEvent } from '@nestjs/common';
import { Observable, interval, map } from 'rxjs';

@Controller('api/v1/internal/monitor')
export class MonitorController {

    @Sse('sse')
    sse(): Observable<MessageEvent> {
        // This is a placeholder stream.
        // In a real scenario, this would subscribe to Redis Pub/Sub to listen for Bot/BullMQ events.
        return interval(5000).pipe(
            map((_) => ({ data: JSON.stringify({ message: 'System healthy', timestamp: Date.now() }) })),
        );
    }
}
