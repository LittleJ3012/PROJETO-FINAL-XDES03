import { Metadata } from "next";
import "./globals.css";

// Definindo o metadata, título, descrição, etc.
export const metadata: Metadata = {
  title: "Pokedéx",
  description: "Desenvolvido pelas alunas Julia e Juliana",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Link para importar a fonte Inter do Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: 'Inter, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
