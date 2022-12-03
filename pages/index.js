import Head from 'next/head'
import Image from 'next/image'
import Chatbot from './comp/chatbot'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (<>
  <div className="background"></div>
  <div id="app"><Chatbot/></div>
  
  </>
  )
}
