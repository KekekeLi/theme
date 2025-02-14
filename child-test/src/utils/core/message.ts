export type Message = {
    type: string, // 消息类型（如 THEME_UPDATE、FONT_SIZE_UPDATE）
    data: any, // 消息数据 
    timestamp: number, // 时间戳 
    source: string, // 消息来源（父应用或子应用）
    signature: string // 安全签名（用于验证）
}