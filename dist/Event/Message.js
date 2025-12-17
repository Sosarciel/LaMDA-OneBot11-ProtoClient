"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrivateMessageQO = exports.GroupMessageQO = void 0;
const EventInterface_1 = require("./EventInterface");
/**群快速操作 */
class GroupMessageQO extends EventInterface_1.QuickOperationTool {
    /**快速回复
     * @param reply       - 消息内容
     * @param auto_escape - 消息内容是否作为纯文本发送（即不解析 CQ 码），只在 reply 字段是字符串时有效
     * @param at_sender   - 是否要在回复开头 at 发送者（自动添加），发送者是匿名用户时无效
     */
    reply(reply, auto_escape, at_sender) {
        return this.qo({
            reply,
            auto_escape,
            at_sender,
        });
    }
    /**撤回该条消息 */
    delete() {
        return this.qo({ 'delete': true });
    }
    /**把发送者踢出群组 */
    kick() {
        return this.qo({ 'kick': true });
    }
    /**把发送者禁言
     * @param ban_duration - 禁言时长
     */
    ban(ban_duration) {
        return this.qo({
            'ban': true,
            'ban_duration': ban_duration
        });
    }
}
exports.GroupMessageQO = GroupMessageQO;
/**私聊快速操作 */
class PrivateMessageQO extends EventInterface_1.QuickOperationTool {
    /**快速回复
     * @param reply       - 消息内容
     * @param auto_escape - 消息内容是否作为纯文本发送（即不解析 CQ 码），只在 reply 字段是字符串时有效
     */
    reply(reply, auto_escape) {
        return this.qo({
            reply,
            auto_escape,
        });
    }
}
exports.PrivateMessageQO = PrivateMessageQO;
