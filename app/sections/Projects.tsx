import OutsideWork from "@/components/ui/outside-work";
import SectionComponent from "@/components/ui/section-component";

export interface OutsideWorkItem {
  uid: string;
  img: string;
}

const outside_work: OutsideWorkItem[] = [
  { uid: "1", img: "" },
  { uid: "2", img: "" },
  { uid: "3", img: "" },
  { uid: "4", img: "" },
  { uid: "5", img: "" },
];

export default function Projects() {
  return (
    <div className="h-screen">
      <SectionComponent title="WORK">
        <div className="flex flex-col h-full">
          <div className=" flex justify-between items-center">
            <h1 className="mb-4 mt-8 text-2xl font-semibold">OUTSIDE WORK</h1>
            {outside_work.length > 4 ? <div>More</div> : <></>}
          </div>
          {/* Grid Layout */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 sm:grid-rows-2 gap-4 flex-1 py-6 h-full">

            {outside_work.map((work, index) => {
              if (index < 4) {
                return <OutsideWork key={work.uid} work={work} index={index} size={outside_work.length} />
              }
            })}
          </div>
        </div>
      </SectionComponent>
    </div>
  );
}
