"use client"

import { CardHeader } from "@/components/ui/card";
import RollCard from "@/components/ui/roll-card";
import SectionComponent from "@/components/ui/section-component";

export interface Roles {
  uid: string;
  role: string;
  company: string;
  description: string;
}

const roles: Roles[] = [
  {
    uid: "1",
    role: "Software Engineer",
    company: "Robokriti India Pvt Limited",
    description:
      "Here my role is to design and build different kinds of applications for web, mobile, IoT, and websites.",
  },
    {
    uid: "2",
    role: "Internship",
    company: "Robokriti India Pvt Limited",
    description:
      "Here my role is to design and build different kinds of applications for web, mobile, IoT, and websites.",
  },
    {
    uid: "3",
    role: "Internship",
    company: "Internship paid",
    description:
      "Here my role is to design and build different kinds of applications for web, mobile, IoT, and websites.",
  },
];

export default function About1() {
  return (
    <div className="h-screen">
      <SectionComponent title="ABOUT">
        <div className="flex flex-col h-full">
          {/* Heading */}
          <h1 className="mb-2 mt-8 text-2xl">Expertise</h1>

          {/* Role Cards Container */}
          <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4 flex-1 overflow-auto md:py-12">
            {roles.map((role) => (
              <RollCard key={role.uid} role={role} />
            ))}
          </div>
        </div>
      </SectionComponent>
    </div>
  );
}
