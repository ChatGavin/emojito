import { Header } from "./header/index";
import { Sider } from "./sider/index";
import { Content } from "./content/index";
import { SidebarProvider } from "@/components/ui/sidebar";

export function HomePage() {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
      <SidebarProvider className="flex-1 h-full">
        <div className="flex h-full">
          <Sider />
          <div className="flex-1 h-full">
            <main className="h-full">
              <Content />
            </main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}
