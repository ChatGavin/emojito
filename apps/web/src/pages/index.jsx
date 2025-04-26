import { Header } from "./header/index";

export function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold">Welcome to Emojito</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          A lightweight emoji tool package
        </p>
      </main>
    </div>
  );
}
