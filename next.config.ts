import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Development only: let a phone on the same Wi-Fi load the dev scripts (`npm run dev:phone`).
  // Without this, Next.js blocks them for any address other than localhost and the page never becomes interactive.
  // Unusual network? Add it when starting: DEV_ORIGINS=100.64.*.* npm run dev:phone
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*", "172.*.*.*", "*.local", ...(process.env.DEV_ORIGINS?.split(",") ?? [])],
};

export default nextConfig;
