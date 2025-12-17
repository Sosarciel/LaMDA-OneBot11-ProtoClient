"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupRequestQO = exports.FriendRequestQO = void 0;
const EventInterface_1 = require("./EventInterface");
/**加好友请求快速操作 */
class FriendRequestQO extends EventInterface_1.QuickOperationTool {
    /**快速回复
     * @param approve - 是否同意请求
     * @param remark - 添加后的好友备注（仅在同意时有效）
     */
    approve(approve, remark) {
        return this.qo({
            approve,
            remark,
        });
    }
}
exports.FriendRequestQO = FriendRequestQO;
/**加群请求／邀请快速操作 */
class GroupRequestQO extends EventInterface_1.QuickOperationTool {
    /**快速回复
     * @param approve - 是否同意请求／邀请
     * @param reason - 拒绝理由（仅在拒绝时有效）
     */
    approve(approve, reason) {
        return this.qo({
            approve,
            reason,
        });
    }
}
exports.GroupRequestQO = GroupRequestQO;
