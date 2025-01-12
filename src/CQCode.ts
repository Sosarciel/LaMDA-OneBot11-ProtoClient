/**图片消息段 */
type ImageClip = {
    type: "image";
    data: {
        /**文件路径
         * 发送时，file 参数除了支持使用收到的图片文件名直接发送外，还支持：
         * 绝对路径，例如 file:///C:\\Users\Richard\Pictures\1.png，格式使用 file URI
         * 网络 URL，例如 http://i1.piimg.com/567571/fdd6e7b6d93f1ef0.jpg
         * Base64 编码，例如 base64://iVBORw0KGgoAAAANSUhEUgAAABQAAAAVCAIAAADJt1n/AAAAKElEQVQ4EWPk5+RmIBcwkasRpG9UM4mhNxpgowFGMARGEwnBIEJVAAAdBgBNAZf+QAAAAABJRU5ErkJggg==
         */
        file: string;
    };
};
/**表情消息段 */
type FacrClip = {
    type: "face";
    data: {
        /**标签id */
        id: string;
    };
};
/**纯文本消息段 */
type TextClip = {
    type: "text";
    data: {
        /**纯文本 */
        text: string;
    };
};
/**语言消息段 */
type RecordClip = {
    type: "record";
    data: {
        /**语音路径 */
        file: string;
    };
};
/**任意CQ码 */
export type CQCode = `[CQ:${string}]`;
/**CQ码工具 */
export namespace CQCodeTool{
    export const face = (faceID: string):CQCode => `[CQ:face,id=${faceID}]`;
    export const at   = (userID: number):CQCode => `[CQ:at,qq=${userID}]`;
    /**创建一个本地图片的 CQ 码
     * @param filePath - 图片文件的本地路径
     */
    export const fileImage  = (filePath: string):CQCode => `[CQ:image,file=file:///${filePath}]`;
    /**创建一个本地音频的 CQ 码
     * @param filePath - 音频文件的本地路径
     */
    export const fileRecord = (filePath: string):CQCode =>`[CQ:record,file=file:///${filePath}]`;
    /**创建一个 base64 编码的图片的 CQ 码
     * @param base64Data - 图片的 base64 编码
     */
    export const base64Image  = (base64Data: string):CQCode => `[CQ:image,file=base64://${base64Data}]`;
    /**创建一个 base64 编码的音频的 CQ 码
     * @param base64Data - 音频的 base64 编码
     */
    export const base64Record = (base64Data: string):CQCode =>`[CQ:record,file=base64://${base64Data}]`;

}



/**消息段 */
export type MessageClip = TextClip|ImageClip|FacrClip|RecordClip;