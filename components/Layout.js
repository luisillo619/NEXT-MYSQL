export function Layout({ children }) {
  return (
    <>
      <h3>Nav Bar</h3>
      <div className="bg-gray-100 h-screen p-10">
        <div className="container mx-auto h-full">{children}</div>
      </div>
    </>
  );
}
