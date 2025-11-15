import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ProjectCard({ title, description, slug }: { title: string, description: string, slug: string }) {
  return (
    <Card className="m-2">
      <CardHeader>{title}</CardHeader>
      <CardContent>{description}</CardContent>
      <Link href={`/projects/${slug}`}><Button variant="secondary">See Details</Button></Link>
    </Card>
  )
}
