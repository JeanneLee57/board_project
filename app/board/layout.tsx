export default function BoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-row w-full">
      <nav className="mr-3">난 내브바야</nav>
      {children}
    </section>
  );
}
