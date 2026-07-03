import { Metadata } from "next";
import WebOnlyClient from "./WebOnlyClient";

export const metadata: Metadata = {
  title: "Websites Built by Chirag Kashyap",
  description:
    "A collection of live websites designed and developed by Chirag Kashyap — including WordPress, Shopify, and custom web projects.",
};

export default function WebOnlyPage() {
  return <WebOnlyClient />;
}
