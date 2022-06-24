"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
let LoggingInterceptor = class LoggingInterceptor {
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const auth = request.headers.Authorizion ? true : false;
        const requestInformation = {
            params: request.params,
            query: request.query,
            body: request.body,
            auth: auth
        };
        const timeStartRequest = new Date();
        let log = `[${timeStartRequest.toLocaleString('en-US', { timeZone: 'UTC' })}] `
            + `${this.colorizeLogToMagenta(`REQUEST`)}: {url: ${this.colorizeLogToGreen(request.url)}, method: ${this.colorizeLogToGreen(request.method)}, `
            + `detail:${JSON.stringify(requestInformation)}} `;
        const responseStatusCode = context.switchToHttp().getResponse().statusCode;
        return next
            .handle()
            .pipe((0, operators_1.tap)(() => {
            const executionTime = Date.now() - timeStartRequest.getTime();
            log += `${this.colorizeLogToMagenta(`RESPONSE`)}: {status: ${this.colorizeLogToYellow(responseStatusCode)}, execution_time: ${this.colorizeLogToYellow(String(executionTime) + `ms`)}}`;
            console.log(log);
        }));
    }
    colorizeLogToGreen(string) {
        return `\x1b[4m\x1b[32m${string}\x1b[0m`;
    }
    colorizeLogToYellow(string) {
        return `\x1b[4m\x1b[33m${string}\x1b[0m`;
    }
    colorizeLogToMagenta(string) {
        return `\x1b[35m${string}\x1b[0m`;
    }
};
LoggingInterceptor = __decorate([
    (0, common_1.Injectable)()
], LoggingInterceptor);
exports.LoggingInterceptor = LoggingInterceptor;
//# sourceMappingURL=logging.interceptor.js.map