import ProjectCard from "@/components/ui/ProjectCard";

const projects = [
  { title: "Project One", description: "A web app built with Next.js & Tailwind.", link: "#" },
  { title: "Project Two", description: "An automation tool built with Node.js.", link: "#" },
  { title: "Project Three", description: "Mobile app with React Native.", link: "#" },
];

export default function Projects() {
  return (
    <section className="py-20 flex flex-col items-center">
      <h2 className="text-4xl font-bold mb-10">My Projects</h2>
      <div className="flex flex-wrap justify-center">
        {projects.map((proj, index) => (
          <ProjectCard key={index} {...proj} />
        ))}
      </div>
    </section>
  );
}
