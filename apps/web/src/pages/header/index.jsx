import mojitoIcon from "@/assets/icons/mojito.svg";
import githubIcon from "@/assets/icons/github.svg";
import linkIcon from "@/assets/icons/link.svg";
import npmIcon from "@/assets/icons/npm.svg";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full px-4 flex h-14 items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="flex items-center space-x-2">
            <img src={mojitoIcon} alt="Mojito" className="h-7 w-7" />
            <span className="font-bold text-xl">Emojito</span>
          </a>
        </div>
        <div className="flex items-center space-x-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="default"
                size="sm"
                className="h-7 px-2 bg-black text-white hover:bg-black/90 text-xs"
              >
                预览
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
                <X className="h-4 w-4" />
                <span className="sr-only">关闭</span>
              </DialogClose>
              <div className="p-4">{/* 对话框内容 */}</div>
            </DialogContent>
          </Dialog>
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
  );
}
