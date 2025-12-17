"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CQCodeTool = void 0;
/**CQ码工具 */
var CQCodeTool;
(function (CQCodeTool) {
    CQCodeTool.face = (faceID) => `[CQ:face,id=${faceID}]`;
    CQCodeTool.at = (userID) => `[CQ:at,qq=${userID}]`;
    /**创建一个本地图片的 CQ 码
     * @param filePath - 图片文件的本地路径
     */
    CQCodeTool.fileImage = (filePath) => `[CQ:image,file=file:///${filePath}]`;
    /**创建一个本地音频的 CQ 码
     * @param filePath - 音频文件的本地路径
     */
    CQCodeTool.fileRecord = (filePath) => `[CQ:record,file=file:///${filePath}]`;
    /**创建一个 base64 编码的图片的 CQ 码
     * @param base64Data - 图片的 base64 编码
     */
    CQCodeTool.base64Image = (base64Data) => `[CQ:image,file=base64://${base64Data}]`;
    /**创建一个 base64 编码的音频的 CQ 码
     * @param base64Data - 音频的 base64 编码
     */
    CQCodeTool.base64Record = (base64Data) => `[CQ:record,file=base64://${base64Data}]`;
})(CQCodeTool || (exports.CQCodeTool = CQCodeTool = {}));
