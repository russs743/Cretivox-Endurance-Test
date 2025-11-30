import { Inter, Syne } from "next/font/google";
import "./globals.css";

// Font untuk teks biasa (paragraf)
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// Font untuk Judul Besar (Artsy style)
const syne = Syne({ 
  subsets: ["latin"], 
  weight: ["400", "700", "800"],
  variable: "--font-syne" 
});

export const metadata = {
  title: "Rusydi - Interactive Portfolio",
  description: "Cretivox Endurance Test Batch 4",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${syne.variable} bg-neutral-950 text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}