import { Header } from "./header/index";
import { Sider } from "./sider/index";
import { Content } from "./content/index";

export function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8 flex">
        <div className="w-64">
          <Sider />
        </div>
        <div className="flex-1 ml-8">
          <Content />
        </div>
      </main>
    </div>
  );
}
