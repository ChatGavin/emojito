import mojitoIcon from "../../assets/icons/mojito.svg";
import githubIcon from "../../assets/icons/github.svg";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <a href="/" className="mr-6 flex items-center space-x-2">
            <img src={mojitoIcon} alt="Mojito" className="h-6 w-6" />
            <span className="font-bold">Emojito</span>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <a
            href="https://github.com/ChatGavin/emojito"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <img src={githubIcon} alt="GitHub" className="h-5 w-5" />
          </a>
        </div>
      </div>
    </header>
  );
}
