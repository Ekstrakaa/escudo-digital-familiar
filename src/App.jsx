import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import HomeScreen   from './screens/HomeScreen'
import ChatScreen   from './screens/ChatScreen'
import QuizScreen   from './screens/QuizScreen'
import ResultsScreen from './screens/ResultsScreen'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: .3, ease: [.4,0,.2,1] } },
  exit:    { opacity: 0, y: -12, transition: { duration: .2 } },
}

export default function App() {
  const [screen, setScreen] = useState('home')          // home | chat | quiz | results
  const [chatSeed, setChatSeed] = useState(null)        // pre-loaded chat message
  const [quizResult, setQuizResult] = useState(null)    // { pct, hits, total, score }

  const go = {
    home:    ()          => setScreen('home'),
    chat:    (seed='')   => { setChatSeed(seed); setScreen('chat') },
    quiz:    ()          => setScreen('quiz'),
    results: (data)      => { setQuizResult(data); setScreen('results') },
  }

  return (
    <div className="min-h-screen bg-bg text-t1 font-sans overflow-x-hidden">
      {/* Ambient glows */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-64 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(0,200,255,.07) 0%, transparent 70%)' }} />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(0,229,160,.05) 0%, transparent 70%)' }} />
      </div>

      <AnimatePresence mode="wait">
        {screen === 'home' && (
          <motion.div key="home" variants={pageVariants} initial="initial" animate="animate" exit="exit">
            <HomeScreen go={go} />
          </motion.div>
        )}
        {screen === 'chat' && (
          <motion.div key="chat" variants={pageVariants} initial="initial" animate="animate" exit="exit">
            <ChatScreen go={go} seed={chatSeed} />
          </motion.div>
        )}
        {screen === 'quiz' && (
          <motion.div key="quiz" variants={pageVariants} initial="initial" animate="animate" exit="exit">
            <QuizScreen go={go} />
          </motion.div>
        )}
        {screen === 'results' && (
          <motion.div key="results" variants={pageVariants} initial="initial" animate="animate" exit="exit">
            <ResultsScreen go={go} result={quizResult} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
