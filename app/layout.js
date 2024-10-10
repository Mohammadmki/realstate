
import { yekan } from "@/utils/Fonts";
import "./globals.css";
import Layout from "@/components/layout/Layout";
import NextAuthProvider from "./providers/NextAuthProvider";



export const metadata = {
  title: "پروژه املاک",
  description: "سامانه خرید و فروش املاک",
};

export default function RootLayout({ children }) {
  return (
    <html dir="rtl"  lang="fa">
      <body dir="rtl" className={yekan.className}>
       <NextAuthProvider>
        <Layout>
        {children}
        </Layout>
       </NextAuthProvider>
        </body>
         
    </html>
  );
}
