import React from 'react'
import ShortenItem from './ShortenItem'
import { Card, CardContent } from '../../../../components/Card/Card'
export const ShortenUrlCards = ({ data }) => {
  return (
    <div className='flex flex-col gap-5'>
      {data.map((item) => (
        <Card key={item.id} className="w-full dark:border-gray-700 bg-white">
          <CardContent className="text-white bg-gray-800 z-10">
            <ShortenItem {...item} />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
