export default function BoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-row">
      {/* Include shared UI here e.g. a header or sidebar */}
      <nav>또잉</nav>

      {children}
    </section>
  );
}
