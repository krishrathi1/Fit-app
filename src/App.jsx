import { useState } from 'react'
import './App.css'

function AtomLogo() {
  return (
    <svg
      className="atom-logo"
      viewBox="0 0 320 320"
      role="img"
      aria-label="Health OS logo"
    >
      <defs>
        <linearGradient id="orbitGreen" x1="10%" x2="90%" y1="10%" y2="90%">
          <stop offset="0%" stopColor="#e7ff8d" />
          <stop offset="55%" stopColor="#d8ffd2" />
          <stop offset="100%" stopColor="#78ff9a" />
        </linearGradient>
        <linearGradient id="orbitWhite" x1="15%" x2="80%" y1="5%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="65%" stopColor="#effff8" />
          <stop offset="100%" stopColor="#dffff2" />
        </linearGradient>
        <filter
          id="softGlow"
          x="-40%"
          y="-40%"
          width="180%"
          height="180%"
        >
          <feGaussianBlur stdDeviation="10" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g filter="url(#softGlow)" fill="none" strokeLinecap="round">
        <ellipse
          cx="160"
          cy="150"
          rx="98"
          ry="48"
          transform="rotate(33 160 150)"
          stroke="url(#orbitGreen)"
          strokeWidth="22"
        />
        <ellipse
          cx="160"
          cy="150"
          rx="98"
          ry="48"
          transform="rotate(-58 160 150)"
          stroke="url(#orbitWhite)"
          strokeWidth="22"
        />
      </g>
    </svg>
  )
}

function ArrowLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M15.5 4.5 8 12l7.5 7.5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.8"
      />
    </svg>
  )
}

function EnergyIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M13.5 2.5 6.7 13h4.4l-1.1 8.5L17.3 11h-4.1l.3-8.5Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  )
}

function MuscleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <path d="M3.5 10.5a2.5 2.5 0 1 0 0 5" />
        <path d="M20.5 10.5a2.5 2.5 0 1 1 0 5" />
        <path d="m7 8 2 8" />
        <path d="m15 8-2 8" />
        <path d="M9 10h6" />
        <path d="M5.5 8.5h1.8a1 1 0 0 1 .97.758l2.46 9.484a1 1 0 0 1-.97 1.258H8" />
        <path d="M18.5 8.5h-1.8a1 1 0 0 0-.97.758l-2.46 9.484a1 1 0 0 0 .97 1.258H16" />
      </g>
    </svg>
  )
}

function WeightIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <rect x="4" y="4" width="16" height="16" rx="3.5" />
        <path d="M9.5 8.5a2.5 2.5 0 0 1 5 0" />
        <path d="M8.5 14c2.9-2 4.1-2 7 0" />
      </g>
    </svg>
  )
}

function EnduranceIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M6 16.5c1.5-2.7 2.8-5 4.9-7.1l2-2.1 2.4 1.1 1.7-1.3 1.5 1.2-2.2 1.8.6 2.4-2.1 1.6-1.9-.9-1.8 1.9c-1.5 1.6-3.4 2.5-5.7 2.5H4.5c-.2-1.6.3-2.7 1.5-3.1Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="m4.5 12.5 5 5 10-11"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
      />
    </svg>
  )
}

const goals = [
  {
    id: 'energy',
    title: 'Increase Energy',
    subtitle: 'Feel stronger and more productive throughout the day.',
    Icon: EnergyIcon,
  },
  {
    id: 'muscle',
    title: 'Build Muscle',
    subtitle: 'Gain lean muscle with smarter training and recovery.',
    Icon: MuscleIcon,
  },
  {
    id: 'weight',
    title: 'Lose Weight',
    subtitle: 'Create sustainable habits to reduce body fat gradually.',
    Icon: WeightIcon,
  },
  {
    id: 'endurance',
    title: 'Improve Endurance',
    subtitle: 'Boost stamina for running, sports, and daily movement.',
    Icon: EnduranceIcon,
  },
]

function WelcomeScreen({ onGetStarted }) {
  return (
    <>
      <div className="hero-section">
        <AtomLogo />

        <div className="copy-block">
          <h1>
            Welcome to Your
            <br />
            Personal <span>Health OS</span>
          </h1>
          <p>
            Track nutrition, fitness, and health with AI-powered guidance.
          </p>
        </div>
      </div>

      <div className="action-block">
        <button className="cta-button" type="button" onClick={onGetStarted}>
          Get Started
        </button>
        <p className="login-copy">
          Already have an account? <a href="/">Log in</a>
        </p>
      </div>
    </>
  )
}

function GoalScreen({ activeGoal, onBack, onSelectGoal }) {
  const progressValue = activeGoal ? 33 : 0

  return (
    <div className="goal-screen">
      <header className="goal-header">
        <div
          className="progress-row"
          aria-label={`Onboarding progress: ${progressValue}%`}
        >
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${progressValue}%` }}
            />
          </div>
          <span className="progress-label">{progressValue}%</span>
        </div>

        <button className="back-button" type="button" onClick={onBack}>
          <ArrowLeftIcon />
        </button>
      </header>

      <section className="goal-copy">
        <h2>What is your primary goal?</h2>
        <p>This helps our AI calibrate your initial baseline.</p>
      </section>

      <div className="goal-list" role="list" aria-label="Primary goal options">
        {goals.map(({ id, title, subtitle, Icon }) => {
          const isSelected = activeGoal === id

          return (
            <button
              key={id}
              className={`goal-card${isSelected ? ' is-selected' : ''}`}
              type="button"
              onClick={() => onSelectGoal(id)}
            >
              <span className="goal-icon-wrap">
                <Icon />
              </span>
              <span className="goal-text">
                <span className="goal-title">{title}</span>
                <span className="goal-subtitle">{subtitle}</span>
              </span>
              {isSelected ? (
                <span className="goal-check" aria-hidden="true">
                  <CheckIcon />
                </span>
              ) : null}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function App() {
  const [screen, setScreen] = useState('welcome')
  const [activeGoal, setActiveGoal] = useState(null)

  return (
    <main className="app-shell">
      <section className="welcome-screen">
        <div className="background-noise" aria-hidden="true" />
        <div className="background-orb orb-left" aria-hidden="true" />
        <div className="background-orb orb-right" aria-hidden="true" />
        {screen === 'welcome' ? (
          <WelcomeScreen onGetStarted={() => setScreen('goals')} />
        ) : (
          <GoalScreen
            activeGoal={activeGoal}
            onBack={() => setScreen('welcome')}
            onSelectGoal={setActiveGoal}
          />
        )}
      </section>
    </main>
  )
}

export default App
