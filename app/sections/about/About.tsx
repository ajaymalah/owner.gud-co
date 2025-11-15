import SectionComponent from "@/components/ui/section-component";

export default function About() {
  return (
    <div className="h-screen px-8">
      <div className="grid md:grid-cols-3  h-full">
        {/* Left Column */}
        <SectionComponent title={"ABOUT"} className="!px-0">
          <div>
            Hello dere
          </div>
        </SectionComponent>
        {/* Right Column */}
        <div className="md:col-span-2 grid bg-gray-300 grid-rows-3 gap-4 h-full">
          <div className="flex items-center justify-center text-center border-b">
            <p>Current Role</p>
          </div>

          <div className="flex items-center justify-center text-center border-b">
            <p>Previous Role</p>
          </div>

          <div className="flex items-center justify-center text-center border-b">
            <p>US Boot Camp</p>
          </div>
        </div>
      </div>
    </div>
  );
}
