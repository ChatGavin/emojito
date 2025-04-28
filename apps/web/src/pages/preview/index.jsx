import Emojito from "@emojito/core";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { DialogTitle, DialogDescription } from "@/components/ui/dialog";

export function Preview() {
  const [emojiCode, setEmojiCode] = useState("U+1F642"); // 默认笑脸
  const [size, setSize] = useState(24); // 默认大小

  return (
    <div className="w-full h-full p-4">
      <div className="space-y-4">
        <div>
          <DialogTitle className="text-lg font-medium mb-4 text-center">
            Emojito 组件示例
          </DialogTitle>
          <DialogDescription className="text-center mb-4">
            输入 emoji 或 Unicode 码点，调整大小查看效果
          </DialogDescription>

          {/* 控制面板 */}
          <div className="mb-6 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Emoji 输入
              </label>
              <Input
                value={emojiCode}
                onChange={(e) => setEmojiCode(e.target.value)}
                placeholder="输入 emoji 或 Unicode 码点"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                字体大小: {size}px
              </label>
              <Slider
                min={12}
                max={48}
                step={1}
                value={[size]}
                onValueChange={(value) => setSize(value[0])}
              />
            </div>
          </div>

          {/* 预览区域 */}
          <div className="p-6 border rounded-lg bg-gray-50">
            <div className="w-[200px] h-[100px] mx-auto flex items-center justify-center">
              <Emojito code={emojiCode} size={size} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
