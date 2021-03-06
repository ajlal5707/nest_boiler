import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
    colorizeLogToGreen(string: string): string;
    colorizeLogToYellow(string: any): string;
    colorizeLogToMagenta(string: any): string;
}
