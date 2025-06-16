"use client";

import MainPanel from "@/components/Dashboard/MainPanel";

export default function DevicePage() {
  return (
    <div className="min-h-screen font-sans bg-[#2b2b2b]  flex flex-col">
      <MainPanel />
      <div className="flex-1 flex items-center justify-center py-2">
        <div className="text-center font-bold text-lg text-[#f8f0f0] bg-[#6d8a55] rounded-lg p-12 w-[500px] max-w-full shadow-md">
          <p>Device</p>
        </div>
      </div>
    </div>
  );
}
//bg-[#87a96b]

// "use client";

// import MainPanel from "@/components/Dashboard/MainPanel";

// export default function DevicePage() {
//   return (
//     <div className="min-h-screen font-sans bg-gray-100 flex flex-col">
//       <MainPanel />
//       <div className="flex-1 flex items-center justify-center py-2">
//         <div className="text-center font-bold text-lg text-white bg-[#87a96b] rounded-lg p-6 w-[500px] max-w-full shadow-md">
//           <p>Device</p>
//         </div>
//       </div>
//     </div>
//   );
// }