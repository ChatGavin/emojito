import mojitoIcon from "@/assets/icons/mojito.svg";
import githubIcon from "@/assets/icons/github.svg";
import linkIcon from "@/assets/icons/link.svg";
import { Input } from "@/components/ui/input";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex items-center">
          <a href="/" className="flex items-center space-x-2">
            <img src={mojitoIcon} alt="Mojito" className="h-7 w-7" />
            <span className="font-bold text-xl">Emojito</span>
          </a>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-sm">
            <Input type="search" placeholder="搜索..." className="h-8" />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <a
            href="https://github.com/ChatGavin/emojito"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <img src={githubIcon} alt="GitHub" className="h-6 w-6" />
          </a>
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
                  Unicode Emoji
                </a>
                <a
                  href="https://unicode.org/Public/emoji/latest/emoji-test.txt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Emoji Test
                </a>
                <a
                  href="https://github.com/twitter/twemoji"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Twemoji
                </a>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      </div>
    </header>
  );
}
