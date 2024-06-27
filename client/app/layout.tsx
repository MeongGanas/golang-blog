"use client";

import React from "react";
import "./globals.css";
import { Provider } from "react-redux";
import store from "./store";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <Provider store={store}>
        <head>
          <title>Discussion App</title>
          <meta name="description" content="Discussion App" />
        </head>
        <body>{children}</body>
      </Provider>
    </html>
  );
}
