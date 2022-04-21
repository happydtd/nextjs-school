import React from 'react'
import { Card } from 'antd';
import Image from 'next/image';

interface Course{
    name: string
}
interface CourseCardProp {
    course: Course
}


export default function CourseCard({course}:CourseCardProp) {

  return (
    <>
        <Card title="Default size card" hoverable 
        cover={
            <Image
            alt="Next.js logo"
            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
            width={300}
            height={150}
            />}>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        </Card>
    </>
  )
}
