"use client"

import { useCity } from '@/contexts/CityContext';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import dynamic from 'next/dynamic';
import { DashboardHeader } from '@/components/ui/dashboard-header';

const CityMap = dynamic(() => import('@/components/CityMap'), {
  ssr: false,
  loading: () => <p>Loading map...</p>
});

const cityData = {
  sargoda: {
    name: "Sargodha",
    country: "Pakistan",
    description: "Sargodha, known as the 'City of Eagles', is famous for its citrus fruits, especially kinnow. It's an important agricultural trade center in Punjab, Pakistan. The city's landscape is characterized by dense urban development, with a prominent mosque at its center, showcasing the blend of modern city life and traditional architecture.",
    image: "/sargoda.png",
    population: "1.5 million",
    area: "5,854 km²",
  },
  nairobi: {
    name: "Nairobi",
    country: "Kenya",
    description: "Nairobi is the capital and largest city of Kenya. Known as the 'Green City in the Sun', it's a major business and cultural hub in East Africa.",
    image: "/nairobi.png",
    population: "4.4 million",
    area: "696 km²",
  },
  abijan: {
    name: "Abidjan",
    country: "Ivory Coast",
    description: "Abidjan is the economic capital of Ivory Coast and one of the most populous French-speaking cities in Africa. It's known for its modern architecture and vibrant culture.",
    image: "/abidjan.png",
    population: "4.7 million",
    area: "2,119 km²",
  },
  "novi-sad": {
    name: "Novi Sad",
    country: "Serbia",
    description: "Novi Sad is the second-largest city in Serbia. It's known for its beautiful architecture, rich history, and as the host of the EXIT music festival.",
    image: "/novisad.PNG",
    population: "380,000",
    area: "699 km²",
  },
};

export default function CityOverviewPage() {
  const { selectedCity } = useCity();
  const city = selectedCity || 'sargoda';
  const data = cityData[city];

  return (
    <div className="h-full overflow-y-auto p-6 space-y-6">
      <DashboardHeader 
        title={`City Overview: ${data.name}`}
        badge={data.country}
      />

      <Image
        src={data.image}
        alt={`${data.name} cityscape`}
        width={1000}
        height={600}
        className="rounded-lg shadow-lg object-cover w-full h-[300px]"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>About {data.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{data.description}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quick Facts</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              <li>Country: {data.country}</li>
              <li>Population: {data.population}</li>
              <li>Area: {data.area}</li>
            </ul>
          </CardContent>
        </Card>
      </div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>City Location</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <CityMap city={selectedCity} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}