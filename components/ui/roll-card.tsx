import { Roles } from '@/app/sections/about/About1'
import React from 'react'
import { Card, CardContent, CardDescription, CardTitle } from './card'

function RollCard({ role }: { role: Roles }) {
    return (
        <Card className="h-full rounded-none flex flex-col ">
            <CardContent className="flex flex-col h-full justify-between">
                <div className=' h-full bg-gray-300 '>

                </div>
                <div
                    className=' h-4'
                ></div>
                <div className='flex gap-2 flex-col'>
                    <CardTitle className=' h-8 uppercase '>{role.role} @ {role.company}</CardTitle>
                    <CardDescription className=' h-12'>{role.description}</CardDescription>
                </div>
            </CardContent>
        </Card>
    )
}

export default RollCard
