import "./globals.css";
import Providers from "./providers";
import Footer from "./components/Footer";
import { Space_Grotesk } from "next/font/google";
import CursorGlow from "./components/CursorGlow";
import ScrollProgress from "./components/ScrollProgress";

/* ---------- LOAD FONT ---------- */
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space",
});

/* ---------- SEO METADATA ---------- */
export const metadata = {
  title: "Chirag Kashyap | Full Stack Web Developer",
  description:
    "Chirag Kashyap – Full Stack Web Developer, MCA student skilled in React, Next.js, Firebase, and modern web technologies.",

  icons: {
    icon: "/favicon.png"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <body>
        <Providers>
          <ScrollProgress />
          <CursorGlow />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
