"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
const logging_interceptor_1 = require("./common/interceptors/logging.interceptor");
const class_validator_1 = require("class-validator");
const exception_utility_1 = require("./common/utility/exception.utility");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalInterceptors(new logging_interceptor_1.LoggingInterceptor());
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        exceptionFactory: (errors) => {
            if (errors.length > 0)
                throw new common_1.BadRequestException((0, exception_utility_1.normalizeValidationError)(errors));
        },
    }));
    (0, class_validator_1.useContainer)(app.select(app_module_1.AppModule), { fallbackOnErrors: true });
    const documentApiConfig = new swagger_1.DocumentBuilder()
        .setTitle('NEST API')
        .setDescription('Boiler plate Nest')
        .setVersion('1.0')
        .build();
    const documentApi = swagger_1.SwaggerModule.createDocument(app, documentApiConfig);
    swagger_1.SwaggerModule.setup('/', app, documentApi);
    app.enableCors();
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map