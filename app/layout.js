import "./globals.css";

export const metadata = {
  title: "RC-001 | Ultra-Low-N₂O BNR Design Platform",
  description: "Prototype engineering evidence and assurance interface for RC-001.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
