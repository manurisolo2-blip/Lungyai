import { MotionConfig } from "framer-motion";
import { ReactLenis } from "lenis/react";
import { SiteHeader } from "@/components/SiteHeader";
import { VideoHero } from "@/components/VideoHero";
import { Recognition } from "@/components/Recognition";
import { ChefRecommendations } from "@/components/ChefRecommendations";
import { KhaoSoiScroll } from "@/components/KhaoSoiScroll";
import { HouseRules } from "@/components/HouseRules";
import { DishGallery } from "@/components/DishGallery";
import { Watch } from "@/components/Watch";
import { CalleOcho } from "@/components/CalleOcho";
import { Story } from "@/components/Story";
import { SiteFooter } from "@/components/SiteFooter";
import { MobileOrderBar } from "@/components/MobileOrderBar";
import { NewTabNote } from "@/components/ExternalLink";

export default function App() {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.075,
        smoothWheel: true,
        anchors: { offset: -88 },
      }}
    >
      {/* "user": transform animations switch off when the visitor asks for reduced motion. */}
      <MotionConfig reducedMotion="user">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <NewTabNote />
        <SiteHeader />
        <main id="main" tabIndex={-1} className="outline-none">
          <VideoHero />
          <Recognition />
          <ChefRecommendations />
          <KhaoSoiScroll />
          <HouseRules />
          <DishGallery />
          <Watch />
          <CalleOcho />
          <Story />
        </main>
        <SiteFooter />
        <MobileOrderBar />
      </MotionConfig>
    </ReactLenis>
  );
}
