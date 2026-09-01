import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.shortName,
    description: "Cozinha de fusão e pratos de assinatura em Mafra.",
    start_url: "/",
    display: "standalone",
    background_color: "#121009",
    theme_color: "#121009",
    icons: [{ src: "/icon.png", sizes: "512x512", type: "image/png" }],
  };
}
