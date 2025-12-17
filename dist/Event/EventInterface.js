"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuickOperationTool = void 0;
/**快速操作 */
class QuickOperationTool {
    _res;
    constructor(res) {
        this._res = res;
    }
    qo(jo) {
        return this._res.write(JSON.stringify(jo));
    }
}
exports.QuickOperationTool = QuickOperationTool;
