import Emojito from "@emojito/core";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ClipboardPaste } from "lucide-react";

export function Preview() {
  const [emojiCode, setEmojiCode] = useState("🙂"); // 默认笑脸
  const [size, setSize] = useState(24); // 默认大小

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setEmojiCode(text);
    } catch (err) {
      console.error("Failed to read clipboard:", err);
    }
  };

  return (
    <div className="space-y-6">
      {/* 控制面板 */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Emoji 输入</label>
          <div className="flex gap-2">
            <Input
              value={emojiCode}
              onChange={(e) => setEmojiCode(e.target.value)}
              placeholder="输入表情符号或 Unicode 码点 (如: U+1F642)"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={handlePaste}
              title="粘贴"
            >
              <ClipboardPaste className="h-4 w-4" />
            </Button>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            支持直接输入表情符号或 Unicode 码点，例如：U+1F642 表示 🙂
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            字体大小: {size}px
          </label>
          <div className="px-2">
            <Slider
              min={12}
              max={48}
              step={1}
              value={[size]}
              onValueChange={(value) => setSize(value[0])}
            />
          </div>
        </div>
      </div>

      {/* 预览区域 */}
      <div className="p-6 border rounded-lg bg-gray-50">
        <div className="w-[200px] h-[100px] mx-auto flex items-center justify-center">
          <Emojito code={emojiCode} size={size} />
        </div>
      </div>
    </div>
  );
}
