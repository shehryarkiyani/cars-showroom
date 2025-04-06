export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex items-center justify-center h-full min-h-screen py-10 bg-gray-300">
      <div className="flex flex-col items-center justify-center gap-14">
        {children}
      </div>
    </div>
  );
}
