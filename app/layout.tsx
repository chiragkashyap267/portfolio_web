import "./globals.css";
import Providers from "./providers";
import Footer from "./components/Footer";
import { Inter } from "next/font/google";
import CursorGlow from "./components/CursorGlow";
import ScrollProgress from "./components/ScrollProgress";
import WelcomeOverlay from "./components/WelcomeOverlay";
import AnnouncementBar from "./components/AnnouncementBar";
import { Box } from "@mui/material";

/* ---------- LOAD FONT ---------- */
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "600", "800"],
  variable: "--font-inter",
  display: "swap",
});

/* ---------- SEO METADATA ---------- */
export const metadata = {
  title: "Chirag Kashyap | Full Stack Web Developer",
  description:
    "Chirag Kashyap – Full Stack Web Developer, MCA student skilled in React, Next.js, WordPress, Shopify, Firebase, and modern web technologies. 20+ live professional websites built.",

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
    <html lang="en" className={inter.variable}>
      <body>
        <Providers>
          <WelcomeOverlay />
          <AnnouncementBar />
          <ScrollProgress />
          <CursorGlow />
          <Box component="main" sx={{ width: "100vw", maxWidth: "100%", overflowX: "hidden", position: "relative" }}>
            {children}
          </Box>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
