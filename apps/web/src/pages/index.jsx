import { Header } from "./header/index";
import { Sider } from "./sider/index";
import { Content } from "./content/index";

export function HomePage() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <div className="w-64 flex-shrink-0 overflow-y-auto">
          <Sider />
        </div>
        <div className="flex-1 overflow-y-auto">
          <main className="h-full">
            <Content />
          </main>
        </div>
      </div>
    </div>
  );
}
