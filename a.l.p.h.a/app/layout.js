import { GeistSans } from "geist/font/sans";

export const metadata = {
  title: "A.L.P.H.A",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body>{children}</body>
    </html>
  );
}
