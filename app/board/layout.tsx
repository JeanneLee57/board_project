export default function BoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-row w-3/4">
      <nav>또잉</nav>
      {children}
    </section>
  );
}
