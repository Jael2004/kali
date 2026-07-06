import 'tailwindcss/tailwind.css';
import React from 'react';

export const metadata = {
  title: "Pour mon bébé Kali💜",
  description: "Joyeux Anniversaire Babe !",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
