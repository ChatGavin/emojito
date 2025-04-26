import { Header } from "./header/index";
import { Sider } from "./sider/index";
import { Content } from "./content/index";

export function HomePage() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex">
        <div className="w-64 h-[calc(100vh-3.5rem)] flex-shrink-0">
          <Sider />
        </div>
        <div className="flex-1 h-[calc(100vh-3.5rem)]">
          <main className="h-full">
            <Content />
          </main>
        </div>
      </div>
    </div>
  );
}
