import { useEffect, useRef, useState } from 'react'
import './App.css'

function Icon({ name }) {
  const common = {
    fill: 'none',
    stroke: 'currentColor',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    strokeWidth: '1.9',
  }

  const icons = {
    arrow: <path {...common} d="M15.5 4.5 8 12l7.5 7.5" strokeWidth="2.8" />,
    check: <path {...common} d="m4.5 12.5 5 5 10-11" strokeWidth="3" />,
    energy: (
      <path
        {...common}
        d="M13.5 2.5 6.7 13h4.4l-1.1 8.5L17.3 11h-4.1l.3-8.5Z"
      />
    ),
    muscle: (
      <path
        {...common}
        d="m7 8 2 8m6-8-2 8M9 10h6M5.5 8.5h1.8a1 1 0 0 1 .97.758l2.46 9.484A1 1 0 0 1 9.76 20H8m10.5-11.5h-1.8a1 1 0 0 0-.97.758l-2.46 9.484A1 1 0 0 0 14.24 20H16M3.5 10.5a2.5 2.5 0 1 0 0 5m17-5a2.5 2.5 0 1 1 0 5"
      />
    ),
    weight: (
      <path
        {...common}
        d="M9.5 8.5a2.5 2.5 0 0 1 5 0M8.5 14c2.9-2 4.1-2 7 0M7.5 4h9A3.5 3.5 0 0 1 20 7.5v9A3.5 3.5 0 0 1 16.5 20h-9A3.5 3.5 0 0 1 4 16.5v-9A3.5 3.5 0 0 1 7.5 4Z"
      />
    ),
    shoe: (
      <path
        {...common}
        d="M6 16.5c1.5-2.7 2.8-5 4.9-7.1l2-2.1 2.4 1.1 1.7-1.3 1.5 1.2-2.2 1.8.6 2.4-2.1 1.6-1.9-.9-1.8 1.9c-1.5 1.6-3.4 2.5-5.7 2.5H4.5c-.2-1.6.3-2.7 1.5-3.1Z"
      />
    ),
    home: <path d="M4 10.5 12 4l8 6.5V19a1 1 0 0 1-1 1h-4.5v-5h-5v5H5a1 1 0 0 1-1-1v-8.5Z" fill="currentColor" />,
    nutrition: (
      <path
        {...common}
        d="M7 3v8m3-8v8M7 7h3M16 3c0 4.2-1.8 7.4-1.8 9.5V21M8.5 11.5V21"
      />
    ),
    fitness: (
      <path
        {...common}
        d="m7 8 2 8m6-8-2 8M9 10h6M5.5 8.5h1.8a1 1 0 0 1 .97.758l2.46 9.484A1 1 0 0 1 9.76 20H8m10.5-11.5h-1.8a1 1 0 0 0-.97.758l-2.46 9.484A1 1 0 0 0 14.24 20H16M3.5 10.5a2.5 2.5 0 1 0 0 5m17-5a2.5 2.5 0 1 1 0 5"
      />
    ),
    insights: <path {...common} d="M5 18h14M7.5 15v-6m4.5 6V6m4.5 9v-3" />,
    profile: (
      <path
        {...common}
        d="M12 12a4.25 4.25 0 1 0 0-8.5 4.25 4.25 0 0 0 0 8.5Zm-7 8c.8-3.3 3.8-5 7-5s6.2 1.7 7 5"
      />
    ),
    spark: <path d="M12 3.5 13.6 9 19 10.5l-5.4 1.5L12 17.5l-1.6-5.5L5 10.5 10.4 9 12 3.5Z" fill="currentColor" />,
    scan: <path {...common} d="M8 4H6a2 2 0 0 0-2 2v2m16 0V6a2 2 0 0 0-2-2h-2M4 16v2a2 2 0 0 0 2 2h2m8 0h2a2 2 0 0 0 2-2v-2M8.5 12h7" />,
    water: <path {...common} d="M12 3c3 4 5 6.8 5 10a5 5 0 1 1-10 0c0-3.2 2-6 5-10Z" />,
    calendar: <path {...common} d="M7 3v3m10-3v3M4 8h16M6 5h12a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm1.5 5.5h2m3 0h2m3 0h.5M7.5 14h2m3 0h2m3 0h.5" />,
    copy: <path {...common} d="M9 8.5V6a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-2.5M6 20h7a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2Z" />,
    trash: <path {...common} d="M5 7.5h14M9 4.5h6M8 7.5l.8 10a2 2 0 0 0 2 1.8h2.4a2 2 0 0 0 2-1.8l.8-10" />,
    avocado: <path {...common} d="M11.5 4c-3.8 0-7 4-7 8.6 0 4.1 2.8 7.4 6.5 7.4 4.7 0 8-4.2 8-9 0-3.9-3-7-7.5-7Zm.2 4.3A2.7 2.7 0 1 1 9 11a2.7 2.7 0 0 1 2.7-2.7Z" />,
    leaf: <path {...common} d="M12 20c0-6.2 1.3-10.4 7-14-1 6.7-3.7 10.5-7 12m0 2c0-6.2-1.1-9.4-7-12 1.2 5.6 4 9.3 7 10" />,
    veggie: <path {...common} d="M12 20c-4.7 0-8-2.9-8-7.1 0-2.8 2.2-5 5.3-5 .6-2.1 2.2-3.4 4.4-3.4 2.4 0 4.2 1.5 4.7 3.8 1.8.4 3.1 1.9 3.1 4 0 4.4-3.5 7.7-9.5 7.7Z" />,
    paleo: <path {...common} d="m14 5 3 3-2.2 2.2 1.4 1.4-1.9 1.9-1.4-1.4-5.7 5.7-2.4-2.4 5.7-5.7-1.4-1.4L11 7.5l1.4 1.4L14 5Zm-1.8 9.2-1.4-1.4" />,
    olive: <path {...common} d="M8 16c0-3.5 2.6-6 5.8-6 2.9 0 5.2 2.1 5.2 5 0 3.3-2.6 5.5-6 5.5-1.8 0-3.4-.5-4.7-1.4M8.6 7.2c3.1 0 4.6 2 4.8 5m-4.8-5c.3-1.9 1.4-3.2 3.2-4.2" />,
    balanced: <path {...common} d="M12 5v14M7 9h10M6 9l-2.5 4.5h5L6 9Zm12 0-2.5 4.5h5L18 9ZM9 5h6" />,
  }

  return <svg viewBox="0 0 24 24" aria-hidden="true">{icons[name]}</svg>
}

function AtomLogo() {
  return (
    <svg className="atom-logo" viewBox="0 0 320 320" role="img" aria-label="Health OS logo">
      <defs>
        <linearGradient id="orbitGreenMain" x1="10%" x2="90%" y1="10%" y2="90%">
          <stop offset="0%" stopColor="#e7ff8d" />
          <stop offset="55%" stopColor="#d8ffd2" />
          <stop offset="100%" stopColor="#78ff9a" />
        </linearGradient>
        <linearGradient id="orbitWhiteMain" x1="15%" x2="80%" y1="5%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="65%" stopColor="#effff8" />
          <stop offset="100%" stopColor="#dffff2" />
        </linearGradient>
        <filter id="softGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="10" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g filter="url(#softGlow)" fill="none" strokeLinecap="round">
        <ellipse cx="160" cy="150" rx="98" ry="48" transform="rotate(33 160 150)" stroke="url(#orbitGreenMain)" strokeWidth="22" />
        <ellipse cx="160" cy="150" rx="98" ry="48" transform="rotate(-58 160 150)" stroke="url(#orbitWhiteMain)" strokeWidth="22" />
      </g>
    </svg>
  )
}

const goals = [
  { id: 'energy', title: 'Increase Energy', subtitle: 'Feel stronger and more productive throughout the day.', icon: 'energy' },
  { id: 'muscle', title: 'Build Muscle', subtitle: 'Gain lean muscle with smarter training and recovery.', icon: 'muscle' },
  { id: 'weight', title: 'Lose Weight', subtitle: 'Create sustainable habits to reduce body fat gradually.', icon: 'weight' },
  { id: 'endurance', title: 'Improve Endurance', subtitle: 'Boost stamina for running, sports, and daily movement.', icon: 'shoe' },
]

const activityOptions = [
  { id: 'sedentary', title: 'Sedentary', subtitle: 'Spend most of the day sitting.', art: 'dot' },
  { id: 'lightly', title: 'Lightly Active', subtitle: 'Most of the day on your feet.', art: 'wave' },
  { id: 'moderately', title: 'Moderately Active', subtitle: 'Frequent movement throughout the day.', art: 'orbit' },
  { id: 'athlete', title: 'Athlete', subtitle: 'Intense daily activity and training.', art: 'orbit-dual' },
]

const dietOptions = [
  { id: 'keto', label: 'Keto', icon: 'avocado' },
  { id: 'vegan', label: 'Vegan', icon: 'leaf' },
  { id: 'vegetarian', label: 'Vegetarian', icon: 'veggie' },
  { id: 'paleo', label: 'Paleo', icon: 'paleo' },
  { id: 'mediterranean', label: 'Mediterranean', icon: 'olive' },
  { id: 'balanced', label: 'Balanced', icon: 'balanced' },
]

const macroPresets = {
  muscle: { protein: 0.35, carbs: 0.4, fats: 0.25 },
  endurance: { protein: 0.28, carbs: 0.47, fats: 0.25 },
  weight: { protein: 0.4, carbs: 0.28, fats: 0.32 },
  energy: { protein: 0.3, carbs: 0.42, fats: 0.28 },
}

const mealSections = [
  {
    title: 'Breakfast',
    items: [
      { name: 'Greek Yogurt Bowl', amount: '220g', calories: 247, protein: 28, carbs: 18, fats: 7 },
      { name: 'Protein Oats', amount: '1 bowl', calories: 318, protein: 24, carbs: 42, fats: 6 },
    ],
  },
  {
    title: 'Lunch',
    items: [{ name: 'Grilled Chicken Plate', amount: '150g', calories: 412, protein: 46, carbs: 22, fats: 12 }],
  },
  {
    title: 'Dinner',
    items: [{ name: 'Salmon & Greens', amount: '1 plate', calories: 486, protein: 38, carbs: 19, fats: 24 }],
  },
  {
    title: 'Snacks',
    items: [{ name: 'Apple + Peanut Butter', amount: '1 serving', calories: 210, protein: 6, carbs: 24, fats: 10 }],
  },
]

const dashboardTabs = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'nutrition', label: 'Nutrition', icon: 'nutrition' },
  { id: 'fitness', label: 'Fitness', icon: 'fitness' },
  { id: 'insights', label: 'Insights', icon: 'insights' },
  { id: 'profile', label: 'Profile', icon: 'profile' },
]

function calculateTargetCalories(profile, goal, activity) {
  const genderBase = profile.gender === 'female' ? -161 : 5
  const bmr = 10 * profile.weight + 6.25 * profile.height - 5 * profile.age + genderBase
  const factor = { sedentary: 1.2, lightly: 1.375, moderately: 1.55, athlete: 1.72 }[activity]
  const adjustment = { muscle: 260, endurance: 180, weight: -320, energy: 120 }[goal]

  return Math.max(1400, Math.round(bmr * factor + adjustment))
}

function calculateMacros(calories, goal) {
  const preset = macroPresets[goal] ?? macroPresets.energy

  return {
    protein: Math.round((calories * preset.protein) / 4),
    carbs: Math.round((calories * preset.carbs) / 4),
    fats: Math.round((calories * preset.fats) / 9),
  }
}

function ProgressHeader({ progress, onBack, title, rightLabel, centerTitle = false }) {
  return (
    <header className="progress-header">
      <div className="progress-row" aria-label={`Onboarding progress: ${progress}%`}>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <span className="progress-label">{rightLabel ?? `${progress}%`}</span>
      </div>
      <div className={`nav-row${centerTitle ? ' nav-row--centered' : ''}`}>
        <button className="back-button" type="button" onClick={onBack}>
          <Icon name="arrow" />
        </button>
        {title ? <div className="nav-title">{title}</div> : null}
        {title ? <div className="nav-spacer" aria-hidden="true" /> : null}
      </div>
    </header>
  )
}

function ActivityArt({ type }) {
  return (
    <span className={`activity-art activity-art--${type}`} aria-hidden="true">
      <span />
      <span />
      <span />
    </span>
  )
}

function WelcomeScreen({ onGetStarted }) {
  return (
    <>
      <div className="hero-section screen-fade">
        <AtomLogo />
        <div className="copy-block">
          <h1>
            Welcome to Your
            <br />
            Personal <span>Health OS</span>
          </h1>
          <p>Track nutrition, fitness, and health with AI-powered guidance.</p>
        </div>
      </div>
      <div className="action-block screen-fade">
        <button className="primary-button primary-button--hero" type="button" onClick={onGetStarted}>
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
    <div className="screen-panel screen-fade">
      <ProgressHeader progress={progressValue} onBack={onBack} />
      <section className="screen-copy">
        <h2>What is your primary goal?</h2>
        <p>This helps our AI calibrate your initial baseline.</p>
      </section>
      <div className="option-list" role="list" aria-label="Primary goal options">
        {goals.map((goal) => {
          const isSelected = activeGoal === goal.id

          return (
            <button key={goal.id} className={`option-card${isSelected ? ' is-selected' : ''}`} type="button" onClick={() => onSelectGoal(goal.id)}>
              <span className="option-card__icon">
                <Icon name={goal.icon} />
              </span>
              <span className="option-card__body">
                <span className="option-card__title">{goal.title}</span>
                <span className="option-card__subtitle">{goal.subtitle}</span>
              </span>
              {isSelected ? (
                <span className="option-card__check" aria-hidden="true">
                  <Icon name="check" />
                </span>
              ) : null}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function SliderCard({ label, unit, min, max, value, onChange }) {
  const fillPercent = ((value - min) / (max - min)) * 100

  return (
    <article className="metric-card" style={{ '--slider-fill': `${fillPercent}%` }}>
      <div className="metric-card__header">
        <div>
          <h3>{label}</h3>
          <p>Set your current baseline</p>
        </div>
        <strong>
          {value} {unit}
        </strong>
      </div>
      <input className="metric-card__range" type="range" min={min} max={max} value={value} onChange={(event) => onChange(Number(event.target.value))} />
    </article>
  )
}

function ProfileScreen({ profile, onBack, onChangeProfile, onContinue }) {
  return (
    <div className="screen-panel screen-fade">
      <ProgressHeader progress={52} onBack={onBack} />
      <section className="screen-copy">
        <span className="eyebrow-copy">Build your baseline</span>
        <h2>Tell us about yourself</h2>
        <p>These details help us create a plan that actually fits your body.</p>
      </section>
      <div className="metric-stack">
        <SliderCard label="Weight" unit="kg" min={35} max={150} value={profile.weight} onChange={(weight) => onChangeProfile({ weight })} />
        <SliderCard label="Height" unit="cm" min={135} max={220} value={profile.height} onChange={(height) => onChangeProfile({ height })} />
        <SliderCard label="Age" unit="years" min={16} max={80} value={profile.age} onChange={(age) => onChangeProfile({ age })} />
        <article className="metric-card">
          <div className="metric-card__header">
            <div>
              <h3>Gender</h3>
              <p>Used for a more accurate calorie estimate</p>
            </div>
          </div>
          <div className="segmented-control" role="tablist" aria-label="Gender">
            {[
              ['male', 'Male'],
              ['female', 'Female'],
              ['other', 'Other'],
            ].map(([value, label]) => (
              <button key={value} className={`segment-button${profile.gender === value ? ' is-active' : ''}`} type="button" onClick={() => onChangeProfile({ gender: value })}>
                {label}
              </button>
            ))}
          </div>
        </article>
      </div>
      <div className="sticky-footer">
        <button className="primary-button" type="button" onClick={onContinue}>
          Continue
        </button>
      </div>
    </div>
  )
}

function ActivityScreen({ selected, onBack, onSelect }) {
  return (
    <div className="screen-panel screen-fade">
      <ProgressHeader progress={66} onBack={onBack} title="Activity Level" centerTitle />
      <section className="screen-copy">
        <h2>What is your daily movement?</h2>
        <p>Excluding your dedicated workouts.</p>
      </section>
      <div className="activity-list">
        {activityOptions.map((option) => (
          <button key={option.id} className={`activity-card${selected === option.id ? ' is-selected' : ''}`} type="button" onClick={() => onSelect(option.id)}>
            <span className="activity-card__body">
              <span className="activity-card__title">{option.title}</span>
              <span className="activity-card__subtitle">{option.subtitle}</span>
            </span>
            <ActivityArt type={option.art} />
          </button>
        ))}
      </div>
    </div>
  )
}

function DietScreen({ selected, onBack, onSelect }) {
  return (
    <div className="screen-panel screen-fade">
      <ProgressHeader progress={95} onBack={onBack} rightLabel="95% Complete" />
      <section className="screen-copy">
        <h2>How do you prefer to eat?</h2>
        <p>Pick the nutrition style that feels easiest to sustain.</p>
      </section>
      <div className="diet-grid" role="list" aria-label="Diet preferences">
        {dietOptions.map((diet) => (
          <button key={diet.id} className={`diet-pill${selected === diet.id ? ' is-selected' : ''}`} type="button" onClick={() => onSelect(diet.id)}>
            <span className="diet-pill__icon">
              <Icon name={diet.icon} />
            </span>
            <span className="diet-pill__label">{diet.label}</span>
          </button>
        ))}
        <button className="diet-pill diet-pill--wide diet-pill--ghost" type="button">
          <span className="diet-pill__label">Custom Macros</span>
          <span className="diet-pill__plus">+</span>
        </button>
      </div>
    </div>
  )
}

function ResultScreen({ profile, goal, activity, diet, onBack, onEnter }) {
  const targetCalories = calculateTargetCalories(profile, goal, activity)
  const macros = calculateMacros(targetCalories, goal)

  return (
    <div className="screen-panel screen-fade">
      <ProgressHeader progress={100} onBack={onBack} title="Calorie Calculation" centerTitle rightLabel="Ready" />
      <div className="result-stage">
        <div className="result-ring-wrap">
          <div className="heartbeat heartbeat--left" aria-hidden="true" />
          <div className="heartbeat heartbeat--right heartbeat--warm" aria-hidden="true" />
          <div className="result-ring" aria-hidden="true" />
        </div>
        <div className="result-copy">
          <p>Analyzing metabolic rate...</p>
          <p>Calibrating macro ratios...</p>
          <p>Building your Health OS around {diet} habits...</p>
        </div>
        <article className="energy-target-card">
          <span className="energy-target-card__eyebrow">Your daily energy target</span>
          <strong className="energy-target-card__value">
            {targetCalories.toLocaleString()} <span>kcal</span>
          </strong>
          <div className="macro-chip-row">
            <span className="macro-chip macro-chip--protein">Protein {macros.protein}g</span>
            <span className="macro-chip macro-chip--carbs">Carbs {macros.carbs}g</span>
            <span className="macro-chip macro-chip--fats">Fats {macros.fats}g</span>
          </div>
          <p className="energy-target-card__note">Optimized for {goal} and {activity} days.</p>
        </article>
      </div>
      <div className="sticky-footer">
        <button className="primary-button" type="button" onClick={onEnter}>
          Enter My OS
        </button>
      </div>
    </div>
  )
}

function DashboardHome({ profile, goal, activity }) {
  const targetCalories = calculateTargetCalories(profile, goal, activity)
  const consumedCalories = Math.round(targetCalories * 0.84)
  const macros = calculateMacros(targetCalories, goal)
  const progressRows = [
    ['Protein', Math.round(macros.protein * 0.82), macros.protein, 'protein'],
    ['Carbs', Math.round(macros.carbs * 0.9), macros.carbs, 'carbs'],
    ['Fat', Math.round(macros.fats * 0.75), macros.fats, 'fats'],
  ]

  return (
    <div className="dashboard-view dashboard-view--home screen-fade">
      <header className="dashboard-header">
        <div>
          <span className="dashboard-header__kicker">Good Morning</span>
          <h2>Good Morning,<br />Alex</h2>
        </div>
        <button className="avatar-badge" type="button"><span>A</span></button>
      </header>
      <article className="dashboard-card dashboard-card--summary">
        <div className="calorie-ring">
          <div className="calorie-ring__inner">
            <strong>{consumedCalories}</strong>
            <span>/ {targetCalories} kcal</span>
          </div>
        </div>
        <div className="macro-breakdown">
          <h3>Macro Breakdown</h3>
          {progressRows.map(([label, value, total, tone]) => (
            <div key={label} className="macro-breakdown__row">
              <div className="macro-breakdown__labels"><span>{label}</span><span>{value}/{total}g</span></div>
              <div className="macro-breakdown__track"><div className={`macro-breakdown__fill macro-breakdown__fill--${tone}`} style={{ width: `${(value / total) * 100}%` }} /></div>
            </div>
          ))}
        </div>
      </article>
      <article className="dashboard-card">
        <h3>Today&apos;s Plan</h3>
        <div className="plan-item"><Icon name="spark" /><p>Nutrition: You&apos;re 30g short on protein. A Greek yogurt bowl closes the gap.</p></div>
        <div className="plan-item"><Icon name="energy" /><p>Fitness: Recovery is at 90%. Perfect day for a focused lower body session.</p></div>
      </article>
      <section className="quick-actions">
        {[
          ['Log Meal', 'nutrition'],
          ['Scan Food', 'scan'],
          ['Add Workout', 'fitness'],
          ['Track Water', 'water'],
        ].map(([label, icon]) => (
          <button key={label} className="quick-action" type="button">
            <span className="quick-action__icon"><Icon name={icon} /></span>
            <span>{label}</span>
          </button>
        ))}
      </section>
    </div>
  )
}

function DashboardNutrition() {
  return (
    <div className="dashboard-view dashboard-view--nutrition screen-fade">
      <header className="nutrition-header">
        <div>
          <h2>Today, Mar 19</h2>
          <p>Plan meals, review macros, and make fast edits.</p>
        </div>
        <button className="calendar-button" type="button"><Icon name="calendar" /></button>
      </header>
      <div className="meal-sections">
        {mealSections.map((section) => (
          <section key={section.title} className="meal-section">
            <div className="meal-section__header">
              <h3>{section.title}</h3>
              <button type="button">+ Add</button>
            </div>
            <div className="meal-section__list">
              {section.items.map((item) => (
                <article key={`${section.title}-${item.name}`} className="meal-card">
                  <div className="meal-card__main">
                    <div>
                      <h4>{item.name}</h4>
                      <span>{item.amount}</span>
                    </div>
                    <div className="meal-card__calories">
                      <strong>{item.calories} kcal</strong>
                      <span><b>{item.protein}g P</b> / {item.carbs}g C / {item.fats}g F</span>
                    </div>
                  </div>
                  <div className="meal-card__actions">
                    <button type="button"><Icon name="copy" /></button>
                    <button type="button" className="is-danger"><Icon name="trash" /></button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

function DashboardFitness() {
  return (
    <div className="dashboard-view screen-fade">
      <header className="tab-header">
        <h2>Fitness</h2>
        <p>Stay consistent with workouts, recovery, and movement streaks.</p>
      </header>
      <article className="dashboard-card">
        <h3>Recovery Status</h3>
        <div className="fitness-metric"><span>Readiness</span><strong>90%</strong></div>
        <div className="fitness-track"><div className="fitness-track__fill" style={{ width: '90%' }} /></div>
      </article>
      <article className="dashboard-card">
        <h3>This Week</h3>
        <div className="fitness-grid">
          <div><strong>4</strong><span>Workouts</span></div>
          <div><strong>39k</strong><span>Steps</span></div>
          <div><strong>7.6h</strong><span>Sleep Avg</span></div>
        </div>
      </article>
    </div>
  )
}

function DashboardInsights() {
  return (
    <div className="dashboard-view dashboard-view--insights screen-fade">
      <header className="tab-header">
        <h2>Insights</h2>
        <p>Powered by your last 30 days of data.</p>
      </header>
      <article className="insight-card insight-card--protein">
        <h3>Protein intake is up 20% this week.</h3>
        <div className="line-chart" />
        <span className="insight-tag">+ Muscle Synthesis</span>
      </article>
      <article className="insight-card">
        <h3>When you sleep <span>&lt; 6 hours</span>, you consume <span>+400 kcal</span>.</h3>
        <div className="bar-chart">{[38, 30, 34, 56, 28, 44].map((value, index) => <div key={value} className="bar-chart__bar"><span style={{ height: `${value}%`, background: index > 2 ? '#ff7c75' : '#304156' }} /></div>)}</div>
        <button className="insight-link" type="button">Adjust Sleep Schedule</button>
      </article>
    </div>
  )
}

function DashboardProfile({ profile, goal, activity, diet }) {
  const targetCalories = calculateTargetCalories(profile, goal, activity)

  return (
    <div className="dashboard-view screen-fade">
      <header className="tab-header">
        <h2>Profile</h2>
        <p>Your current Health OS calibration.</p>
      </header>
      <article className="dashboard-card">
        <div className="profile-summary">
          <div className="avatar-badge avatar-badge--large"><span>A</span></div>
          <div>
            <h3>Alex Carter</h3>
            <p>{goal} goal / {diet} nutrition / {activity} movement</p>
          </div>
        </div>
      </article>
      <article className="dashboard-card">
        <h3>Body Stats</h3>
        <div className="fitness-grid">
          <div><strong>{profile.weight}kg</strong><span>Weight</span></div>
          <div><strong>{profile.height}cm</strong><span>Height</span></div>
          <div><strong>{profile.age}</strong><span>Age</span></div>
        </div>
        <div className="fitness-metric"><span>Daily target</span><strong>{targetCalories} kcal</strong></div>
      </article>
    </div>
  )
}

function DashboardScreen({ activeTab, onTabChange, profile, goal, activity, diet }) {
  let content = null

  if (activeTab === 'home') content = <DashboardHome profile={profile} goal={goal} activity={activity} />
  else if (activeTab === 'nutrition') content = <DashboardNutrition />
  else if (activeTab === 'fitness') content = <DashboardFitness />
  else if (activeTab === 'insights') content = <DashboardInsights />
  else content = <DashboardProfile profile={profile} goal={goal} activity={activity} diet={diet} />

  return (
    <div className="dashboard-shell">
      <div className="dashboard-scroll">{content}</div>
      <nav className="tab-bar" aria-label="Main app navigation">
        {dashboardTabs.map((tab) => (
          <button key={tab.id} className={`tab-bar__item${activeTab === tab.id ? ' is-active' : ''}`} type="button" onClick={() => onTabChange(tab.id)}>
            <Icon name={tab.icon} />
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}

function App() {
  const [screen, setScreen] = useState('welcome')
  const [activeGoal, setActiveGoal] = useState(null)
  const [profile, setProfile] = useState({ weight: 75, height: 178, age: 29, gender: 'male' })
  const [activity, setActivity] = useState('lightly')
  const [diet, setDiet] = useState('paleo')
  const [activeTab, setActiveTab] = useState('home')
  const timeoutRef = useRef(null)

  useEffect(() => () => window.clearTimeout(timeoutRef.current), [])

  function goTo(nextScreen) {
    window.clearTimeout(timeoutRef.current)
    setScreen(nextScreen)
  }

  function queueNext(nextScreen, delay = 260) {
    window.clearTimeout(timeoutRef.current)
    timeoutRef.current = window.setTimeout(() => setScreen(nextScreen), delay)
  }

  function updateProfile(values) {
    setProfile((current) => ({ ...current, ...values }))
  }

  function handleGoalSelect(goalId) {
    setActiveGoal(goalId)
    queueNext('profile')
  }

  function handleActivitySelect(activityId) {
    setActivity(activityId)
    queueNext('diet')
  }

  function handleDietSelect(dietId) {
    setDiet(dietId)
    queueNext('result')
  }

  const screenClass = `phone-screen ${
    screen === 'welcome' ? 'phone-screen--welcome' : screen === 'dashboard' ? 'phone-screen--dashboard' : 'phone-screen--flow'
  }`

  return (
    <main className="app-shell">
      <section className={screenClass}>
        <div className="background-noise" aria-hidden="true" />
        <div className="background-orb orb-left" aria-hidden="true" />
        <div className="background-orb orb-right" aria-hidden="true" />

        {screen === 'welcome' ? <WelcomeScreen onGetStarted={() => goTo('goals')} /> : null}
        {screen === 'goals' ? <GoalScreen activeGoal={activeGoal} onBack={() => goTo('welcome')} onSelectGoal={handleGoalSelect} /> : null}
        {screen === 'profile' ? <ProfileScreen profile={profile} onBack={() => goTo('goals')} onChangeProfile={updateProfile} onContinue={() => goTo('activity')} /> : null}
        {screen === 'activity' ? <ActivityScreen selected={activity} onBack={() => goTo('profile')} onSelect={handleActivitySelect} /> : null}
        {screen === 'diet' ? <DietScreen selected={diet} onBack={() => goTo('activity')} onSelect={handleDietSelect} /> : null}
        {screen === 'result' ? <ResultScreen profile={profile} goal={activeGoal ?? 'energy'} activity={activity} diet={diet} onBack={() => goTo('diet')} onEnter={() => goTo('dashboard')} /> : null}
        {screen === 'dashboard' ? <DashboardScreen activeTab={activeTab} onTabChange={setActiveTab} profile={profile} goal={activeGoal ?? 'energy'} activity={activity} diet={diet} /> : null}
      </section>
    </main>
  )
}

export default App

