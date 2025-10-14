// components/SkillBadge.tsx
export default function SkillBadge({ skill }: { skill: string }) {
  return (
    <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full m-1">{skill}</span>
  );
}
