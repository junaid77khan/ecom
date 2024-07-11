
import React, { Suspense } from "react";
import { motion } from "framer-motion";

const World = React.lazy(() => import("./ui/globe").then((m) => ({ default: m.World })));

function GlobeDemo() {
  const globeConfig = {
    pointSize: 4,
    globeColor: "#F97316", // Updated to bg-orange-500 color
    showAtmosphere: true,
    atmosphereColor: "#FFFF00",
    atmosphereAltitude: 0.1,
    emissive: "#062056",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    polygonColor: "rgba(255,255,255,0.7)",
    ambientLight: "#38bdf8",
    directionalLeftLight: "#DC143C",
    directionalTopLight: "#DC143C",
    pointLight: "#DC143C",
    arcTime: 1000,
    arcLength: 0.9,
    rings: 3,
    maxRings: 3,
    initialPosition: { lat: 22.3193, lng: 114.1694 },
    autoRotate: true,
    autoRotateSpeed: 0.3,
  };

  const colors = ["#06b6d4", "#3b82f6", "#6366f1"];
  const sampleArcs = [
    {
      order: 1,
      startLat: -19.885592,
      startLng: -43.951191,
      endLat: -22.9068,
      endLng: -43.1729,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    // ... (other arc data omitted for brevity)
  ];

  return (
    <div className="flex flex-row items-center justify-center py-20 h-screen md:h-auto  relative w-full">
      <div className="max-w-7xl mx-auto w-full relative overflow-hidden h-full md:h-[40rem] px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="div"
        >
          <h2 className="text-center text-xl md:text-4xl font-bold text-black ">
            We sell worldwide
          </h2>
          <p className="text-center text-base md:text-lg font-normal text-neutral-700  max-w-md mt-2 mx-auto">
          Style for Every Space & Global Inspiration, Delivered Locally.

          </p>
        </motion.div>
        <div className="absolute w-full bottom-0 inset-x-0 h-40 z-40" />
        <div className="absolute w-full -bottom-20 h-72 md:h-full z-10">
          <Suspense fallback={<div></div>}>
            <World data={sampleArcs} globeConfig={globeConfig} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

// Export the component
export { GlobeDemo };
