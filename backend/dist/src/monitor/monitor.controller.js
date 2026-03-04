"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonitorController = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
let MonitorController = class MonitorController {
    sse() {
        return (0, rxjs_1.interval)(5000).pipe((0, rxjs_1.map)((_) => ({ data: JSON.stringify({ message: 'System healthy', timestamp: Date.now() }) })));
    }
};
exports.MonitorController = MonitorController;
__decorate([
    (0, common_1.Sse)('sse'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", rxjs_1.Observable)
], MonitorController.prototype, "sse", null);
exports.MonitorController = MonitorController = __decorate([
    (0, common_1.Controller)('api/v1/internal/monitor')
], MonitorController);
//# sourceMappingURL=monitor.controller.js.map