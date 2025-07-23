import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans, Roboto } from "next/font/google";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "./globals.css";
import Header from "./components/layot/header/header";
import TopBar from "./components/layot/topbar/topbar";

config.autoAddCss = false;

const robotoSans = Roboto({
  variable: "--font-roboto-sans",
  subsets: ["latin"],
});

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AVTO STATUS - Доставка авто из Китая, Кореи, Японии",
  description: "AVTO STATUS - Подбор авто, помощь в покупке автомобиля",
  keywords: [
    "авто из Японии",
    "авто из Кореи",
    "авто из Китая",
    "доставка авто",
    "выкуп авто",
    "авто под заказ",
    "автостатус"
  ],
  openGraph: {
    title: "AVTO STATUS - Доставка авто из Китая, Кореи, Японии",
    description: "AVTO STATUS - Подбор авто, помощь в покупке автомобиля",
    url: "https://avtostatus.com", // свой домен!
    type: "website",
    siteName: "AVTO STATUS",
    images: [
      {
        url: "https://avtostatus.com/og-image.jpg", // свой логотип/превью!
        width: 1200,
        height: 630,
        alt: "AVTO STATUS - логотип"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "AVTO STATUS - Доставка авто из Китая, Кореи, Японии",
    description: "AVTO STATUS - Подбор авто, помощь в покупке автомобиля",
    site: "@avtostatus", // если есть
    images: ["https://avtostatus.ru/og-image.jpg"]
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  }
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${notoSans.variable} ${robotoSans.variable} ${geistMono.variable} antialiased`}>
          <Header />
        {children}
      </body>
    </html>
  );
}
