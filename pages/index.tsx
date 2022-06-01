import React from 'react';
import HomeLayout from '../components/HomeLayout';
import 'antd/dist/antd.css';
import HomePage from '../components/HomePage'

export default function Home() {
  return (
    <HomeLayout>
      <HomePage />
    </HomeLayout>
   )
}

