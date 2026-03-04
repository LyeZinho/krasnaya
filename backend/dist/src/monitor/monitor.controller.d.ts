import { MessageEvent } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare class MonitorController {
    sse(): Observable<MessageEvent>;
}
