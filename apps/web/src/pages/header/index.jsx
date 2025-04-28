import mojitoIcon from "@/assets/icons/mojito.svg";
import githubIcon from "@/assets/icons/github.svg";
import linkIcon from "@/assets/icons/link.svg";
import npmIcon from "@/assets/icons/npm.svg";
import { Preview } from "@/pages/preview";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";

export function Header() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const dialogRef = useRef(null);

  // 计算居中位置
  useEffect(() => {
    if (isPreviewOpen && dialogRef.current) {
      const dialog = dialogRef.current;
      const rect = dialog.getBoundingClientRect();
      const x = (window.innerWidth - rect.width) / 2;
      const y = (window.innerHeight - rect.height) / 2;
      setPosition({ x, y });
    }
  }, [isPreviewOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="w-full px-4 flex h-14 items-center justify-between">
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2">
              <img src={mojitoIcon} alt="Mojito" className="h-7 w-7" />
              <span className="font-bold text-xl">Emojito</span>
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="default"
              size="sm"
              className="h-7 px-2 bg-black text-white hover:bg-black/90 text-xs"
              onClick={() => setIsPreviewOpen(true)}
            >
              预览
            </Button>
            <a
              href="https://www.npmjs.com/package/emojito"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <img src={npmIcon} alt="NPM" className="h-6 w-6" />
            </a>
            <a
              href="https://github.com/ChatGavin/emojito"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <img src={githubIcon} alt="GitHub" className="h-6 w-6" />
            </a>
            <div style={{ display: "none" }}>
              <HoverCard>
                <HoverCardTrigger className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                  <img src={linkIcon} alt="Links" className="h-6 w-6" />
                </HoverCardTrigger>
                <HoverCardContent className="w-48">
                  <div className="flex flex-col space-y-2">
                    <a
                      href="https://home.unicode.org/emoji/about-emoji/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Emoji 官网
                    </a>
                    <a
                      href="https://unicode.org/Public/emoji/latest/emoji-test.txt"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Emoji 测试文件
                    </a>
                    <a
                      href="https://github.com/twitter/twemoji"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Twitter 表情符号图片
                    </a>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
          </div>
        </div>
      </header>
      {isPreviewOpen && (
        <Draggable
          handle=".drag-handle"
          bounds="parent"
          position={position}
          onDrag={(e, data) => setPosition({ x: data.x, y: data.y })}
          defaultPosition={{ x: 0, y: 0 }}
          nodeRef={dialogRef}
        >
          <div
            ref={dialogRef}
            className="fixed z-50 w-full max-w-lg bg-background border shadow-lg duration-200 animate-in fade-in-0 zoom-in-95 slide-in-from-left-1/2 slide-in-from-top-[48%] sm:rounded-lg will-change-transform"
            style={{ transform: "none" }}
          >
            <div className="flex items-center justify-between p-4 border-b drag-handle cursor-move select-none">
              <h2 className="text-lg font-medium">Emojito 组件示例</h2>
              <button
                className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                onClick={() => setIsPreviewOpen(false)}
                aria-label="关闭"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-4">
              <Preview />
            </div>
          </div>
        </Draggable>
      )}
    </>
  );
}
