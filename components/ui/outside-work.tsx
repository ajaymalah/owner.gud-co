import React from "react";
import { Card, CardContent } from "./card";
import { OutsideWorkItem } from "@/app/sections/Projects";

function OutsideWork({ work, index, size }: { work: OutsideWorkItem; index: number, size: number }) {
  
  const layoutClasses = () => {
    if (size > 3) {
      switch (index) {
        case 0:
          return "md:col-span-2 md:row-span-1";
        case 1:
          return "md:col-span-1 md:row-span-2";
        default:
          return "md:col-span-1 md:row-span-1";
      }
    } else if (size === 3) {
      switch (index) {
        case 0:
          return "md:col-span-2 md:row-span-1";
        case 1:
          return "md:col-span-1 md:row-span-2";
        default:
          return "md:col-span-2 md:row-span-1";
      }
    } else if (size === 2) {
      switch (index) {
        case 0:
          return "md:col-span-2 md:row-span-2";
        default:
          return "md:col-span-1 md:row-span-2";
      }
    } else {
      return "md:col-span-3 md:row-span-2";
    }
  };

  return (
    <Card className={`relative overflow-hidden bg-gray-300 rounded-none col-span-1 row-span-1 ${layoutClasses()}`}>
      {/* ^ Mobile defaults, md: layout applied conditionally */}
      
      <CardContent className="p-0 w-full h-full">
        <img
          src={work.img || "/placeholder.jpg"}
          alt="outside work"
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center text-white transition-opacity">
          <p className="text-lg font-semibold">Outside Project</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default OutsideWork;
