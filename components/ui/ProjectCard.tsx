// components/ProjectCard.tsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface ProjectCardProps {
  title: string;
  description: string;
  image?: string;
  link?: string;
}

export default function ProjectCard({ title, description, image, link }: ProjectCardProps) {
  return (
    <Card className="w-96 m-4 hover:shadow-lg transition">
      {image && <img src={image} alt={title} className="rounded-t-lg w-full h-48 object-cover"/>}
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
        {link && <a href={link} target="_blank" className="text-blue-600 underline mt-2 block">View Project</a>}
      </CardContent>
    </Card>
  );
}
