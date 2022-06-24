"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeValidationError = void 0;
function normalizeValidationError(errors) {
    return errors.map(err => ({
        field: err.property,
        errorDetail: err.constraints,
    }));
}
exports.normalizeValidationError = normalizeValidationError;
//# sourceMappingURL=exception.utility.js.map