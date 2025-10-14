import SkillBadge from "@/components/ui/SkillBadge";


const skills = ["Next.js", "React", "Node.js", "TypeScript", "Tailwind CSS", "Shadcn/UI"];

export default function Skills() {
  return (
    <section className="py-20 text-center">
      <h2 className="text-4xl font-bold mb-10">My Skills</h2>
      <div className="flex flex-wrap justify-center">
        {skills.map((skill, idx) => <SkillBadge key={idx} skill={skill} />)}
      </div>
    </section>
  );
}