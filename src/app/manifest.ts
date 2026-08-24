import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Minseok Shin | Portfolio",
    short_name: "Minseok Shin",
    description: "UX Designer & Frontend Developer Portfolio",
    start_url: "/",
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#FFFFFF",
    icons: [
      {
        src: "/img/profile.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/img/profile.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
