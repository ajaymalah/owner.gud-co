"use client"


import { Card, CardHeader, CardContent } from "@/components/ui/card"

import Link from "next/link"
import { Button } from "@/components/ui/button"



export default function ProjectDetails() {

  // const { slug } = router.query

  return (
    <section className="p-8">
      <Card>
        <CardHeader>Project: {""}</CardHeader>
        <CardContent>
          <p>Detailed description, images, process, and results of this project.</p>
        </CardContent>
      </Card>
      <Link href="/"><Button variant="ghost" className="mt-4">Back to Projects</Button></Link>
    </section>
  )
}
