import { Injectable, InjectionToken } from '@angular/core';

export const LoggingServiceToken = new InjectionToken<LoggingService>('logging-service-token');

// @Injectable({ providedIn: 'root' })
export class LoggingService {
  log(message: string) {
    const timestamp = new Date().toLocaleTimeString();
    console.log(`[${timestamp}]: ${message}`);
  }
}
