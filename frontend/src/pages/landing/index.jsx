import React, { useState } from 'react'
import LandingNav from './components/navbar'
import ExampleImage from '../../assets/example.png'
import { Button, ButtonGroup } from '@nextui-org/button'
import { Link } from 'react-router-dom'
import {
  FaQuoteLeft, FaQuoteRight
} from 'react-icons/fa'
import {
  Accordion, AccordionItem
} from '@nextui-org/react'

const LandingPage = () => {

  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    if (activeIndex === testimonials.length - 3) {
      setActiveIndex(0);
    } else {
      setActiveIndex(activeIndex + 1);
    }
  }

  const handlePrev = () => {
    if (activeIndex === 0) {
      setActiveIndex(testimonials.length - 3);
    } else {
      setActiveIndex(activeIndex - 1);
    }
  }


  const testimonials = [
    {
      name: 'Micheal Scott',
      review: 'Todoist is the best task management app I have ever used. It has helped me stay organized and on top of my tasks. I highly recommend it to everyone.',
      avatar: 'https://images.pexels.com/photos/5920775/pexels-photo-5920775.jpeg'
    },
    {
      name: 'Dwight Schrute',
      review: 'This app is amazing. It has helped me stay on top of my tasks and get things done. I highly recommend it to everyone.',
      avatar: 'https://images.pexels.com/photos/4347368/pexels-photo-4347368.jpeg'
    },
    {
      name: 'Harmanpreet Singh',
      review: 'Was looking for a task management app that was simple and easy to use. Todoist is exactly that. It has helped me stay organized and on top of my tasks.',
      avatar: 'https://images.pexels.com/photos/4307884/pexels-photo-4307884.jpeg'
    },
    {
      name: 'Pam Beesly',
      review: 'Simply the best task management app I have ever used. It has helped me stay organized and on top of my tasks. I highly recommend it to everyone.',
      avatar: 'https://images.pexels.com/photos/3183187/pexels-photo-3183187.jpeg'
    }
  ]

  const features = [
    {
      title: 'Task Management',
      description: 'Manage your tasks with ease and stay organized. You can create tasks, set due dates, and stay on top of your tasks.\n\nCreate tasks, set due dates, and stay organized.'
    },
    {
      title: 'Project Management',
      description: 'Manage your projects and stay on top of your tasks. You can create projects, add tasks to projects, and stay organized.\n\nCreate projects, add tasks to projects, and stay organized.'
    },
    {
      title: 'Team Collaboration',
      description: 'Collaborate with your team and get things done. You can create teams, add team members, and stay organized.\n\nCreate teams, add team members, and stay organized.'
    },
    {
      title: 'Calendar Integration',
      description: 'Integrate your calendar and stay organized. Sync your tasks with your calendar and stay on top of your tasks. Perfect for busy professionals.\n\nSync your tasks with your calendar and stay on top of your tasks. Perfect for busy professionals.'
    },
    {
      title: 'Priority Management',
      description: 'Set priorities and stay on top of your tasks. Track your tasks and set priorities to stay organized. Perfect for busy professionals.\n\nStay organized and set priorities for your tasks. Perfect for busy professionals.'
    },
    {
      title: 'Task Reminders',
      description: 'Set reminders and never miss a task. Remind yourself of important tasks and stay organized. Perfect for busy professionals.\n\nSet reminders for your tasks and stay organized. Perfect for busy professionals.'
    }
  ]

  return (
    <div className="h-full w-full flex flex-col">
      <LandingNav />
      <div className="flex flex-col items-center justify-center flex-1">
        <section className="w-full h-[calc(100vh-80px)] mx-auto bg-gradient-to-r from-blue-400 to-indigo-600 flex dark:bg-gray-900 flex-col">
          <div className="h-2/3 flex items-center justify-center flex-col">
            <h1 className="text-6xl font-semibold text-white text-center bg-gradient-to-r from-blue-400 to-indigo-600 text-pretty bg-clip-text">Managing your tasks<br />has never been easier</h1>
            <p className="text-white text-center mt-4 dark:text-gray-200 dark:bg-gray-900 dark:bg-opacity-50 dark:bg-clip-text bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600 text-pretty font-normal text-xl">Try our reliable task management app for free<br />and get your life organized</p>
            <div className="flex space-x-4 mt-4">
              <Link to="/login">
                <Button color="default" size="lg">Get started</Button>
              </Link>
              <Button className="bg-black text-white" size="lg">Learn more</Button>
            </div>
          </div>
          <div className="w-full flex flex-col justify-end items-center">
            <img src={ExampleImage} alt="example" className="h-96" />
          </div>
        </section>
        {/* Testimonials */}
        <section className="w-full h-[420px] mx-auto bg-black flex flex-col items-center justify-center space-y-4">
          <h1 className="text-4xl font-bold text-white">What our users say</h1>
          <div className="flex flex-col items-center justify-center w-full space-y-4">
            <div className="flex items-center justify-center space-x-4 w-full">
              {testimonials.slice(activeIndex, activeIndex + 3).map((testimonial, index) => (
                <div key={index} className="w-96 h-64 rounded-lg flex flex-col items-center justify-center space-y-4 bg-gray-800 text-white px-4 py-8">
                  <img src={testimonial.avatar} alt="avatar" className="w-20 h-20 rounded-full object-cover" />
                  <div className="w-full h-1/2 flex items-center justify-center space-y-4">
                    <FaQuoteLeft className="text-2xl text-white" />
                    <p className="text-center">{testimonial.review}</p>
                    <FaQuoteRight className="text-2xl text-white" />
                  </div>
                  <p className="self-end text-white font-semibold">-{testimonial.name}</p>
                </div>
              ))}
            </div>
            <div className="w-full flex items-center justify-center space-x-4">
              <ButtonGroup>
                <Button onClick={handlePrev} className="bg-black text-white">Prev</Button>
                <Button onClick={handleNext} className="bg-black text-white">Next</Button>
              </ButtonGroup>
            </div>
          </div>
        </section>
      </div>
      <div className="w-full h-[calc(100vh-220px)] bg-gray-100 flex flex-col items-center py-8">
        <div className="w-full h-20 flex items-center justify-between px-6">
          <div className="rounded-full border-2 border-black px-4 py-2">
            <span className="text-black font-semibold">About <span className="text-blue-500">Todoist</span></span>
          </div>
        </div>
        <div className="w-full h-96 flex justify-between px-6">
          <div className="w-1/2 h-full flex flex-col space-y-4">
            <Accordion defaultSelectedKeys={["feature-0"]} className="w-full h-full">
              {features.map((feature, index) => (
                <AccordionItem key={`feature-${index}`} title={feature.title} className="font-semibold text-lg">
                  {feature.description.split('\n').map((line, index) => (
                    <p key={index} className="text-gray-600">{line}</p>
                  ))}
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <div className="w-1/2 h-full flex items-center justify-center">
            <img src={ExampleImage} alt="example" className="h-96" />
          </div>
        </div>
      </div>
      <div className="h-20 w-full bg-black flex items-center justify-center">
        <p className="text-white">
          &copy; 2024 All rights reserved | Made with ❤️ by <a href="https:github.com/RohittCodes">RohittCodes</a>
        </p>
      </div>
    </div>
  )
}

export default LandingPage