"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preFindHook = void 0;
function preFindHook(schema, fieldsToPopulate) {
    schema.pre(/^find/, function (next) {
        this.find({ deletedAt: null });
        if (fieldsToPopulate && fieldsToPopulate.length > 0) {
            this.populate(fieldsToPopulate.join(' '));
        }
        next();
    });
}
exports.preFindHook = preFindHook;
//# sourceMappingURL=databaseHooks.js.map