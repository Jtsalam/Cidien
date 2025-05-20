// app/api/organization/route.ts

import { NextResponse } from 'next/server';

export async function GET() {
  const organizations = [
    'Erindale Health center',
    'Parkville Manor',
    'Kenderdine Medical Clinic',
    'Jim Pattison Children\'s Hospital',
    'Evergreen Medical Clinic',
  ];

  return NextResponse.json(organizations);
}

export async function POST(request: Request) {
  try{
  const data = await request.json();
  
  // For example, let's simulate saving organization data
  const { organization } = data;

  if (!organization) {
    return NextResponse.json({ error: 'Organization is required' }, { status: 400 });
  }

  console.log ('Organization received: ', organization);

  // Simulate successful POST request
  return NextResponse.json({ message: 'Organization saved successfully!' });
} catch (err){
  return NextResponse.json({error: "Invalid JSON"}, {status: 400});
}
}
