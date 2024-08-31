import React from 'react'
import { Typography } from '@material-tailwind/react';
import { Link } from 'react-router-dom';

export default function FooterComponent() {
  return (
    <footer className=" bottom-0 left-0 w-full bg-white rounded-lg shadow p-4 dark:bg-gray-800">
        <div className="w-full mx-auto max-w-screen-xl p-4 flex flex-col gap-3 items-center justify-center fo:flex-row fo:justify-around">
            <Typography variant='paragraph' className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                Usufruam o nosso site com segurança e respeito uns com os outros
            </Typography>
            <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                <li><Link to={'/petAlert_deploy/about'} className="hover:underline me-4 md:me-6">About</Link></li>
                <li><Link to={'/petAlert_deploy/feedback'} className="hover:underline me-4 md:me-6">FeedBack</Link></li>
                <li><Link to={'/petAlert_deploy/contact'} className="hover:underline me-4 md:me-6">Contact</Link></li>
            </ul>
        </div>
    </footer>
  )
}
