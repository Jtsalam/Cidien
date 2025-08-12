"use client";

import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/sign-in'); // Send users directly to unified sign-in
} 
