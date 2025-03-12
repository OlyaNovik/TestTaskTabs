'use client';
import React from "react";
import Link from "next/link";

const Custom404 = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="text-xl text-gray-600">Page not found</p>
      <Link href="/">
        <a className="mt-4 text-blue-500 hover:underline">Go back to home</a>
      </Link>
    </div>
  );
};

export default Custom404;
