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
    plus: <path {...common} d="M12 5v14M5 12h14" strokeWidth="2.4" />,
    search: <path {...common} d="m18.5 18.5-3.8-3.8M10.8 17a6.2 6.2 0 1 1 0-12.4 6.2 6.2 0 0 1 0 12.4Z" />,
    flash: <path {...common} d="M13 2.8 7.7 12h3.8L10.9 21l5.4-9.2h-3.8L13 2.8Z" strokeWidth="2.2" />,
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
    settings: <path {...common} d="M12 3.8v2.1m0 12.2v2.1m8.2-8.2h-2.1M5.9 12H3.8m13.9 5.9-1.5-1.5M7.8 7.8 6.3 6.3m11.4 0-1.5 1.5M7.8 16.2l-1.5 1.5M12 15.8a3.8 3.8 0 1 0 0-7.6 3.8 3.8 0 0 0 0 7.6Z" />,
    bell: <path {...common} d="M6.8 16.5h10.4m-8.7 0V10a3.5 3.5 0 1 1 7 0v6.5m-9.1 0h-.9c.6-1 .9-2 .9-3.1V10a5.6 5.6 0 1 1 11.2 0v3.4c0 1.1.3 2.2.9 3.1h-.9m-7 0a1.8 1.8 0 0 0 3.6 0" />,
    moon: <path {...common} d="M18.2 14.6A7 7 0 1 1 9.4 5.8a5.8 5.8 0 1 0 8.8 8.8Z" />,
    help: <path {...common} d="M9.6 9.3a2.8 2.8 0 1 1 4.8 2c-.8.8-1.8 1.4-1.8 2.9m-.1 4.1h.1M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />,
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

function HeartbeatWave() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const waveFrame = canvas?.parentElement
    const ringWrap = waveFrame?.parentElement
    const context = canvas?.getContext('2d')

    if (!canvas || !waveFrame || !ringWrap || !context) return undefined

    let animationFrame = 0
    let tick = 0
    let width = 0
    let height = 0
    let ringOuter = 0
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    function ecgShape(time) {
      if (time < 0.1) return 0

      if (time < 0.2) {
        const phase = (time - 0.1) / 0.1
        return -Math.sin(phase * Math.PI) * 5
      }

      if (time < 0.28) return 0

      if (time < 0.32) {
        const phase = (time - 0.28) / 0.04
        return Math.sin((phase * Math.PI) / 2) * 7
      }

      if (time < 0.38) {
        const phase = (time - 0.32) / 0.06
        return 7 - Math.sin((phase * Math.PI) / 2) * 55
      }

      if (time < 0.44) {
        const phase = (time - 0.38) / 0.06
        return -48 + Math.sin((phase * Math.PI) / 2) * 56
      }

      if (time < 0.5) return -2

      if (time < 0.68) {
        const phase = (time - 0.5) / 0.18
        return -Math.sin(phase * Math.PI) * 13 - 2
      }

      return 0
    }

    function getEcg(phase, period) {
      const normalizedPhase = (((phase % period) + period) % period) / period
      return ecgShape(normalizedPhase)
    }

    function resize() {
      const frameRect = waveFrame.getBoundingClientRect()
      const wrapRect = ringWrap.getBoundingClientRect()
      const pixelRatio = window.devicePixelRatio || 1

      width = Math.round(frameRect.width)
      height = Math.round(frameRect.height)
      ringOuter = wrapRect.width / 2

      canvas.width = Math.round(width * pixelRatio)
      canvas.height = Math.round(height * pixelRatio)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    }

    function drawWave(xStart, xEnd, color, side) {
      const centerY = height / 2
      const centerX = width / 2
      const period = 100
      const speed = 1.4
      const gradient = context.createLinearGradient(xStart, 0, xEnd, 0)

      if (side === 'left') {
        gradient.addColorStop(0, 'rgba(166, 255, 69, 0)')
        gradient.addColorStop(0.55, 'rgba(166, 255, 69, 0.68)')
        gradient.addColorStop(1, color)
      } else {
        gradient.addColorStop(0, color)
        gradient.addColorStop(0.45, 'rgba(255, 124, 117, 0.68)')
        gradient.addColorStop(1, 'rgba(255, 124, 117, 0)')
      }

      context.beginPath()
      context.strokeStyle = gradient
      context.lineWidth = 1.7
      context.lineCap = 'round'
      context.lineJoin = 'round'

      for (let x = xStart; x <= xEnd; x += 1) {
        const phase = side === 'left'
          ? (centerX - ringOuter + 8 - x) + tick * speed
          : (x - (centerX + ringOuter - 8)) + tick * speed
        const y = centerY + getEcg(phase, period)

        if (x === xStart) context.moveTo(x, y)
        else context.lineTo(x, y)
      }

      context.stroke()
    }

    function draw() {
      const centerX = width / 2
      const overlap = 8
      const leftEnd = centerX - ringOuter + overlap
      const rightStart = centerX + ringOuter - overlap

      context.clearRect(0, 0, width, height)
      drawWave(0, leftEnd, 'rgba(166, 255, 69, 0.9)', 'left')
      drawWave(rightStart, width, 'rgba(255, 124, 117, 0.9)', 'right')

      if (prefersReducedMotion) return

      tick += 1
      animationFrame = window.requestAnimationFrame(draw)
    }

    resize()
    draw()

    const resizeObserver = new ResizeObserver(() => resize())
    resizeObserver.observe(waveFrame)
    resizeObserver.observe(ringWrap)

    return () => {
      resizeObserver.disconnect()
      window.cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <div className="result-wave" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
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

const mealSectionsSeed = [
  {
    id: 'breakfast',
    title: 'Breakfast',
    items: [
      { id: 'meal-breakfast-avocado', name: 'Avocado Toast with Egg', amount: '1 slice', calories: 340, protein: 22, carbs: 28, fats: 16, fiber: 8, sodium: 450, detailFoodId: 'avocado-toast-egg' },
      { id: 'meal-breakfast-yogurt', name: 'Greek Yogurt Bowl', amount: '220g', calories: 247, protein: 28, carbs: 18, fats: 7 },
    ],
  },
  {
    id: 'lunch',
    title: 'Lunch',
    items: [{ id: 'meal-lunch-chicken', name: 'Grilled Chicken Plate', amount: '150g', calories: 412, protein: 46, carbs: 22, fats: 12 }],
  },
  {
    id: 'snacks',
    title: 'Snacks',
    items: [{ id: 'meal-snacks-apple', name: 'Apple + Peanut Butter', amount: '1 serving', calories: 210, protein: 6, carbs: 24, fats: 10 }],
  },
  {
    id: 'dinner',
    title: 'Dinner',
    items: [{ id: 'meal-dinner-salmon', name: 'Salmon & Greens', amount: '1 plate', calories: 486, protein: 38, carbs: 19, fats: 24 }],
  },
  {
    id: 'other',
    title: 'Other',
    items: [],
  },
]

const addFoodTabs = [
  { id: 'recent', label: 'Recent' },
  { id: 'frequent', label: 'Frequent' },
  { id: 'saved', label: 'Saved Meals' },
  { id: 'recipes', label: 'Recipes' },
]

const addFoodLibrary = {
  recent: [
    { id: 'oatmeal', name: 'Oatmeal', amount: '1 bowl', calories: 190, protein: 6, carbs: 33, fats: 4 },
    { id: 'scrambled-eggs', name: 'Scrambled Eggs', amount: '2 eggs', calories: 180, protein: 13, carbs: 2, fats: 13 },
    { id: 'chicken-breast', name: 'Chicken Breast', amount: '150g', calories: 247, protein: 46, carbs: 0, fats: 5 },
    { id: 'brown-rice', name: 'Brown Rice', amount: '140g', calories: 168, protein: 4, carbs: 35, fats: 1 },
    { id: 'apple', name: 'Apple', amount: '1 medium', calories: 95, protein: 0, carbs: 25, fats: 0 },
    { id: 'almonds', name: 'Almonds', amount: '28g', calories: 164, protein: 6, carbs: 6, fats: 14 },
  ],
  frequent: [
    { id: 'greek-yogurt', name: 'Greek Yogurt Bowl', amount: '220g', calories: 247, protein: 28, carbs: 18, fats: 7 },
    { id: 'protein-oats', name: 'Protein Oats', amount: '1 bowl', calories: 318, protein: 24, carbs: 42, fats: 6 },
    { id: 'salmon-greens', name: 'Salmon & Greens', amount: '1 plate', calories: 486, protein: 38, carbs: 19, fats: 24 },
  ],
  saved: [
    { id: 'avocado-toast-egg', name: 'Avocado Toast with Egg', amount: '1 slice', calories: 340, protein: 22, carbs: 28, fats: 16, fiber: 8, sodium: 450, detailFoodId: 'avocado-toast-egg' },
    { id: 'high-protein-wrap', name: 'High Protein Wrap', amount: '1 wrap', calories: 410, protein: 32, carbs: 28, fats: 18 },
    { id: 'recovery-smoothie', name: 'Recovery Smoothie', amount: '420ml', calories: 280, protein: 24, carbs: 30, fats: 7 },
  ],
  recipes: [
    { id: 'mediterranean-bowl', name: 'Mediterranean Bowl', amount: '1 bowl', calories: 430, protein: 21, carbs: 42, fats: 18 },
    { id: 'turkey-chili', name: 'Turkey Chili', amount: '1 serving', calories: 360, protein: 29, carbs: 24, fats: 15 },
    { id: 'veg-power-salad', name: 'Veg Power Salad', amount: '1 bowl', calories: 290, protein: 12, carbs: 26, fats: 15 },
  ],
}

const foodDetails = {
  'avocado-toast-egg': {
    id: 'avocado-toast-egg',
    name: 'Avocado Toast with Egg',
    art: 'toast',
    insight: 'This will hit 100% of your daily fiber goal.',
    portions: [
      { id: 'half-slice', label: 'Half Slice', amount: '1/2 slice', calories: 170, protein: 11, carbs: 14, fats: 8, fiber: 4, iron: 2, sodium: 225 },
      { id: 'hundred-grams', label: '100g', amount: '100g', calories: 318, protein: 20, carbs: 26, fats: 15, fiber: 7, iron: 3, sodium: 410 },
      { id: 'one-slice', label: '1 Slice', amount: '1 slice', calories: 340, protein: 22, carbs: 28, fats: 16, fiber: 8, iron: 3, sodium: 450 },
      { id: 'custom', label: 'Custom', amount: '1.25 slice', calories: 386, protein: 25, carbs: 31, fats: 18, fiber: 9, iron: 4, sodium: 500 },
    ],
  },
  'cinnamon-oat-bar': {
    id: 'cinnamon-oat-bar',
    name: 'Cinnamon Oat Bar',
    art: 'bar',
    insight: 'A fast carb top-up with enough fiber to keep it steady.',
    portions: [
      { id: 'half-bar', label: '1/2 Bar', amount: '0.5 bar', calories: 105, protein: 4, carbs: 16, fats: 4, fiber: 2, iron: 1, sodium: 75 },
      { id: 'one-bar', label: '1 Bar', amount: '1 bar', calories: 210, protein: 8, carbs: 32, fats: 8, fiber: 4, iron: 2, sodium: 150 },
      { id: 'hundred-grams', label: '100g', amount: '100g', calories: 412, protein: 15, carbs: 58, fats: 16, fiber: 7, iron: 3, sodium: 290 },
      { id: 'two-bars', label: '2 Bars', amount: '2 bars', calories: 420, protein: 16, carbs: 64, fats: 16, fiber: 8, iron: 4, sodium: 300 },
    ],
  },
}

function pickFoodArt(name = '') {
  const normalized = name.toLowerCase()

  if (normalized.includes('bar')) return 'bar'

  return 'toast'
}

function buildLoggedFoodDetail(item) {
  const protein = item.protein ?? 0
  const carbs = item.carbs ?? 0
  const fats = item.fats ?? 0
  const calories = item.calories ?? 0
  const fiber = item.fiber ?? Math.max(2, Math.round(carbs * 0.16))
  const iron = item.iron ?? Math.max(1, Math.round(protein * 0.08))
  const sodium = item.sodium ?? Math.max(90, Math.round(calories * 1.1))

  return {
    id: item.detailFoodId ?? `logged-${item.id}`,
    name: item.name,
    art: pickFoodArt(item.name),
    insight: protein >= 24
      ? 'Strong protein coverage for this meal.'
      : fiber >= 8
        ? 'Solid fiber support for digestion and fullness.'
        : 'A balanced log with a clear macro breakdown.',
    portions: [
      {
        id: 'logged-serving',
        label: item.amount ?? '1 Serving',
        amount: item.amount ?? '1 serving',
        calories,
        protein,
        carbs,
        fats,
        fiber,
        iron,
        sodium,
      },
    ],
  }
}

const recognitionItemsSeed = [
  { id: 'recognition-chicken', name: 'Chicken Breast', amount: '150g est.', calories: 247, protein: 46, carbs: 0, fats: 5, ringX: 104, ringY: 200 },
  { id: 'recognition-rice', name: 'White Rice', amount: '100g est.', calories: 130, protein: 3, carbs: 28, fats: 0, ringX: 220, ringY: 356 },
  { id: 'recognition-broccoli', name: 'Steamed Broccoli', amount: '80g est.', calories: 28, protein: 2, carbs: 6, fats: 0, ringX: 284, ringY: 118 },
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

function FoodHeroArt({ variant = 'toast' }) {
  if (variant === 'bar') {
    return (
      <svg className="food-hero-art" viewBox="0 0 320 232" role="img" aria-label="Packaged oat bar">
        <defs>
          <linearGradient id="barHeroBg" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#1f242c" />
            <stop offset="45%" stopColor="#121922" />
            <stop offset="100%" stopColor="#070a11" />
          </linearGradient>
          <linearGradient id="barBoxGreen" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#8edb55" />
            <stop offset="100%" stopColor="#4e8d34" />
          </linearGradient>
          <linearGradient id="barWrap" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#ce8248" />
            <stop offset="100%" stopColor="#7f4122" />
          </linearGradient>
          <filter id="barHeroBlur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="16" />
          </filter>
        </defs>
        <rect width="320" height="232" fill="url(#barHeroBg)" />
        <circle cx="70" cy="188" r="54" fill="rgba(255,255,255,0.1)" filter="url(#barHeroBlur)" />
        <circle cx="254" cy="36" r="44" fill="rgba(142,255,79,0.18)" filter="url(#barHeroBlur)" />
        <g opacity="0.84">
          <rect x="78" y="34" width="102" height="138" rx="18" fill="#4d3826" opacity="0.3" />
          <rect x="72" y="28" width="102" height="138" rx="18" fill="url(#barBoxGreen)" />
          <rect x="84" y="56" width="76" height="28" rx="10" fill="rgba(255,255,255,0.2)" />
          <rect x="84" y="96" width="64" height="7" rx="3.5" fill="rgba(255,255,255,0.28)" />
          <rect x="84" y="110" width="58" height="7" rx="3.5" fill="rgba(255,255,255,0.2)" />
          <rect x="84" y="124" width="52" height="7" rx="3.5" fill="rgba(255,255,255,0.16)" />
        </g>
        <g transform="translate(184 66) rotate(28 44 68)">
          <rect x="8" y="8" width="88" height="132" rx="22" fill="#533017" opacity="0.38" />
          <rect x="0" y="0" width="88" height="132" rx="22" fill="url(#barWrap)" />
          <rect x="14" y="20" width="60" height="34" rx="10" fill="rgba(255,255,255,0.18)" />
          <rect x="56" y="20" width="12" height="86" fill="#fffdf6" opacity="0.92" />
          <g stroke="#0d1117" strokeWidth="1.8">
            {[0, 6, 12, 18, 24, 30].map((offset) => (
              <line key={offset} x1={60 + offset * 0.55} y1="28" x2={60 + offset * 0.55} y2="96" />
            ))}
          </g>
          <g transform="translate(14 70)">
            {[0, 12, 24, 34, 46].map((x, index) => (
              <ellipse key={x} cx={x + 8} cy={index % 2 ? 18 : 10} rx="9" ry="5" fill={index % 2 ? '#e7bf71' : '#d8ad5d'} />
            ))}
          </g>
        </g>
        <rect width="320" height="232" fill="url(#barHeroBg)" opacity="0.12" />
      </svg>
    )
  }

  return (
    <svg className="food-hero-art" viewBox="0 0 320 232" role="img" aria-label="Avocado toast with egg">
      <defs>
        <linearGradient id="foodHeroBg" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#202733" />
          <stop offset="55%" stopColor="#101720" />
          <stop offset="100%" stopColor="#070a11" />
        </linearGradient>
        <radialGradient id="foodHeroPlate" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#1f2937" />
          <stop offset="100%" stopColor="#0a0f16" />
        </radialGradient>
        <linearGradient id="foodHeroToast" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#9f6437" />
          <stop offset="100%" stopColor="#6a3f1d" />
        </linearGradient>
        <linearGradient id="foodHeroAvocado" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#8be46f" />
          <stop offset="100%" stopColor="#54b852" />
        </linearGradient>
        <filter id="foodGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <rect width="320" height="232" fill="url(#foodHeroBg)" />
      <ellipse cx="156" cy="103" rx="128" ry="92" fill="url(#foodHeroPlate)" />
      <ellipse cx="156" cy="103" rx="118" ry="84" fill="none" stroke="rgba(255,255,255,0.05)" />
      <g transform="translate(92 48) rotate(-18 68 56)">
        <rect x="18" y="12" width="112" height="88" rx="24" fill="#4d2e15" opacity="0.38" />
        <rect x="14" y="8" width="112" height="88" rx="24" fill="url(#foodHeroToast)" />
        <path d="M31 28c12-10 31-12 43-8 17-6 36 0 49 14-8 9-8 22 0 35-10 12-29 18-45 14-14 8-31 3-45-11-9-14-10-29-2-44Z" fill="url(#foodHeroAvocado)" filter="url(#foodGlow)" opacity="0.95" />
        <path d="M50 32c10-8 26-9 37-6 15-4 29 0 40 12-6 8-6 19 0 30-8 9-22 14-35 11-12 6-25 2-36-8-7-11-8-24-1-39Z" fill="#74d766" opacity="0.82" />
        <ellipse cx="82" cy="52" rx="26" ry="20" fill="#fff8ef" filter="url(#foodGlow)" />
        <circle cx="82" cy="52" r="10.5" fill="#ffbf28" />
        <circle cx="82" cy="52" r="6.5" fill="#ff9f11" opacity="0.72" />
        <circle cx="108" cy="33" r="5.6" fill="#ef6c4c" />
        <circle cx="115" cy="44" r="4.3" fill="#f58c5d" />
        <circle cx="101" cy="39" r="2.1" fill="#f6cf80" />
      </g>
      <ellipse cx="282" cy="41" rx="34" ry="44" fill="rgba(171,255,70,0.18)" transform="rotate(18 282 41)" />
      <rect width="320" height="232" fill="url(#foodHeroBg)" opacity="0.12" />
    </svg>
  )
}

function ScannerSceneArt() {
  return (
    <svg className="scanner-scene-art" viewBox="0 0 430 932" role="img" aria-label="Camera preview of packaged food">
      <defs>
        <linearGradient id="scannerBg" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#2a3138" />
          <stop offset="60%" stopColor="#151a20" />
          <stop offset="100%" stopColor="#0a0d12" />
        </linearGradient>
        <filter id="scannerBlur" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
      </defs>
      <rect width="430" height="932" fill="url(#scannerBg)" />
      <rect x="24" y="200" width="72" height="160" rx="10" fill="#656c73" opacity="0.65" filter="url(#scannerBlur)" />
      <rect x="110" y="140" width="70" height="190" rx="14" fill="#86684b" opacity="0.78" filter="url(#scannerBlur)" />
      <rect x="148" y="178" width="112" height="206" rx="18" fill="#5e8d35" opacity="0.92" filter="url(#scannerBlur)" />
      <rect x="286" y="154" width="48" height="164" rx="12" fill="#7a674b" opacity="0.72" filter="url(#scannerBlur)" />
      <rect x="344" y="166" width="44" height="150" rx="10" fill="#405b34" opacity="0.68" filter="url(#scannerBlur)" />
      <ellipse cx="138" cy="824" rx="154" ry="88" fill="#4d3a2c" opacity="0.46" filter="url(#scannerBlur)" />
      <ellipse cx="332" cy="704" rx="182" ry="96" fill="#6a4832" opacity="0.34" filter="url(#scannerBlur)" />
      <g transform="translate(198 326)">
        <rect x="0" y="0" width="108" height="252" rx="26" fill="#c57f47" opacity="0.34" />
        <rect x="8" y="12" width="96" height="228" rx="24" fill="#b87138" />
        <rect x="26" y="36" width="42" height="146" rx="10" fill="#fffdf3" />
        <g stroke="#0b1117" strokeWidth="2">
          {[0, 8, 16, 24, 32, 40].map((offset) => (
            <line key={offset} x1={32 + offset} y1="44" x2={32 + offset} y2="174" />
          ))}
        </g>
        <g transform="translate(18 148)">
          {[0, 18, 34, 50].map((x, index) => (
            <ellipse key={x} cx={x + 10} cy={index % 2 ? 30 : 14} rx="11" ry="7" fill={index % 2 ? '#dfb86e' : '#c9924a'} />
          ))}
        </g>
      </g>
      <rect width="430" height="932" fill="#0d1218" opacity="0.34" />
    </svg>
  )
}

function RecognitionPlateArt({ activeItemId }) {
  const isActive = (id) => activeItemId === id

  return (
    <svg className="recognition-plate-art" viewBox="0 0 430 520" role="img" aria-label="Plate with detected foods">
      <defs>
        <radialGradient id="plateBg" cx="50%" cy="36%" r="70%">
          <stop offset="0%" stopColor="#1b2029" />
          <stop offset="100%" stopColor="#0c1016" />
        </radialGradient>
        <filter id="ringGlow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
      </defs>
      <rect width="430" height="520" fill="url(#plateBg)" />
      <circle cx="214" cy="238" r="176" fill="#e9ecef" />
      <circle cx="214" cy="238" r="171" fill="none" stroke="#2d323b" strokeWidth="4" />
      <ellipse cx="126" cy="264" rx="80" ry="120" fill="#f3c38f" />
      <path d="M77 204c22-38 80-34 99 7 16 33 15 100-1 146-14 40-58 74-100 34-25-25-34-88-16-142 3-9 9-28 18-45Z" fill="#e3ad73" />
      <g stroke="#8d421a" strokeWidth="7" strokeLinecap="round" opacity="0.72">
        <path d="M88 228c28 8 70 12 92 8" />
        <path d="M84 258c26 11 77 14 101 10" />
        <path d="M94 294c34 12 70 16 87 14" />
      </g>
      <g fill="#f8f8f1">
        {[
          [170, 346], [188, 336], [206, 350], [220, 336], [238, 348], [254, 336],
          [154, 376], [172, 368], [190, 382], [208, 370], [226, 382], [244, 370], [262, 382],
          [164, 408], [182, 398], [200, 412], [218, 400], [236, 414], [254, 402],
        ].map(([x, y]) => <ellipse key={`${x}-${y}`} cx={x} cy={y} rx="14" ry="8" />)}
      </g>
      {[
        [248, 130], [304, 140], [332, 194], [308, 250], [262, 212], [340, 256], [284, 290],
      ].map(([x, y], index) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r="28" fill={index % 2 ? '#3d8f2d' : '#4caf3f'} />
          <circle cx={x - 12} cy={y - 8} r="18" fill="#63bd4a" />
          <circle cx={x + 10} cy={y - 6} r="18" fill="#2f7e28" />
          <rect x={x - 5} y={y + 16} width="10" height="28" rx="5" fill="#86c45d" />
        </g>
      ))}
      <g fill="none" stroke="#18ccef" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.86">
        <path d="M104 200C172 164 252 154 284 118" />
        <path d="M104 200C164 214 212 256 220 356" />
        <path d="M220 356C312 336 338 212 284 118" />
      </g>
      {recognitionItemsSeed.map((item) => (
        <g key={item.id}>
          <circle cx={item.ringX} cy={item.ringY} r={isActive(item.id) ? 34 : 24} fill="#08c5eb" opacity={isActive(item.id) ? 0.22 : 0.14} filter="url(#ringGlow)" />
          <circle cx={item.ringX} cy={item.ringY} r={isActive(item.id) ? 22 : 18} fill="none" stroke="#22d3ee" strokeWidth={isActive(item.id) ? 7 : 5} />
          <circle cx={item.ringX} cy={item.ringY} r="10" fill="#1fcbe8" />
        </g>
      ))}
      <rect width="430" height="520" fill="#0d1218" opacity="0.08" />
    </svg>
  )
}

function RadialMacroChart({ calories, protein, carbs, fats }) {
  const segments = [
    { id: 'protein', value: protein, color: '#06B6D4', glow: 'rgba(6, 182, 212, 0.54)' },
    { id: 'carbs', value: carbs, color: '#8EFF4F', glow: 'rgba(142, 255, 79, 0.52)' },
    { id: 'fats', value: fats, color: '#FF6B6B', glow: 'rgba(255, 107, 107, 0.48)' },
  ]
  const radius = 82
  const circumference = 2 * Math.PI * radius
  const gap = 12
  const total = segments.reduce((sum, segment) => sum + segment.value, 0)
  let progress = 0

  return (
    <div className="macro-ring-card">
      <svg className="macro-ring-chart" viewBox="0 0 240 240" aria-hidden="true">
        <circle className="macro-ring-chart__track" cx="120" cy="120" r={radius} />
        {segments.map((segment) => {
          const ratio = segment.value / total
          const length = Math.max(circumference * ratio - gap, 18)
          const offset = -(circumference * progress)
          progress += ratio

          return (
            <circle
              key={segment.id}
              className="macro-ring-chart__segment"
              cx="120"
              cy="120"
              r={radius}
              stroke={segment.color}
              strokeDasharray={`${length} ${circumference}`}
              strokeDashoffset={offset}
              style={{ filter: `drop-shadow(0 0 14px ${segment.glow})` }}
            />
          )
        })}
      </svg>
      <div className="macro-ring-card__center">
        <strong>{calories}</strong>
        <span>Calories</span>
        <p>Per serving</p>
      </div>
    </div>
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
          <HeartbeatWave />
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
        <button className="primary-button primary-button--shiny" type="button" onClick={onEnter}>
          <span>Enter My OS</span>
        </button>
      </div>
    </div>
  )
}

function HomeMacroBar({ label, current, goal, colorClass }) {
  const pct = Math.min((current / goal) * 100, 100)

  return (
    <div className="macro-item" data-testid={`macro-${label.toLowerCase()}`}>
      <div className="macro-header">
        <span className="macro-label">{label}</span>
        <span className="macro-values">
          <span className={`macro-current ${colorClass}`}>{Math.round(current)}</span>
          <span className="macro-goal">/{goal}g</span>
        </span>
      </div>
      <div className="macro-bar-bg">
        <div className={`macro-bar-fill ${colorClass}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

function HomeQuickAction({ icon, label, onClick, active = false, accentClass = '' }) {
  return (
    <button className={`quick-action-btn${active ? ' is-active' : ''}`} type="button" onClick={onClick} data-testid={`qa-${label.toLowerCase().replace(/\s/g, '-')}`}>
      <div className={`quick-action-icon${accentClass ? ` ${accentClass}` : ''}`}>{icon}</div>
      <span className="quick-action-label">{label}</span>
    </button>
  )
}

function HomeCalorieRing({ current, goal }) {
  const radius = 58
  const stroke = 10
  const center = 70
  const circumference = 2 * Math.PI * radius
  const progress = Math.min(current / goal, 1)
  const offset = circumference * (1 - progress)

  return (
    <div className="calorie-ring-wrapper" data-testid="calorie-ring">
      <svg width="140" height="140" viewBox="0 0 140 140" aria-hidden="true">
        <defs>
          <linearGradient id="ringGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00BCD4" />
            <stop offset="50%" stopColor="#4AE87C" />
            <stop offset="100%" stopColor="#8EFF4F" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={stroke}
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="url(#ringGrad)"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${center} ${center})`}
          filter="url(#glow)"
          style={{ transition: 'stroke-dashoffset 1s cubic-bezier(0.22, 1, 0.36, 1)' }}
        />
      </svg>
      <div className="calorie-ring-text">
        <span className="calorie-value">{Math.round(current)}</span>
        <span className="calorie-goal">/ {goal} kcal</span>
      </div>
    </div>
  )
}

function DashboardHome({ profile, goal, activity, onLogMeal, onScanFood, onAddWorkout }) {
  const targetCalories = calculateTargetCalories(profile, goal, activity)
  const consumedCalories = Math.round(targetCalories * 0.84)
  const macros = calculateMacros(targetCalories, goal)
  const [showWater, setShowWater] = useState(false)
  const [waterConsumed, setWaterConsumed] = useState(1250)
  const progressRows = [
    ['Protein', Math.round(macros.protein * 0.82), macros.protein, 'macro-cyan'],
    ['Carbs', Math.round(macros.carbs * 0.9), macros.carbs, 'macro-lime'],
    ['Fat', Math.round(macros.fats * 0.75), macros.fats, 'macro-coral'],
  ]

  function handleLogWater(amount) {
    setWaterConsumed((current) => current + amount)
    setShowWater(false)
  }

  return (
    <div className="dashboard-view dashboard-view--home screen-fade">
      <header className="dashboard-header dashboard-header--home">
        <div>
          <h1 className="greeting">Good Morning,</h1>
          <h1 className="greeting">Alex</h1>
        </div>
        <div className="avatar-ring avatar-ring--home" data-testid="avatar">
          <div className="avatar-inner" />
        </div>
      </header>

      <article className="card scale-in home-card" data-testid="calorie-card">
        <div className="calorie-card-content">
          <div className="calorie-left">
            <span className="card-label">Calories</span>
            <HomeCalorieRing current={consumedCalories} goal={targetCalories} />
          </div>
          <div className="macro-right">
            <span className="card-label">Macro Breakdown</span>
            {progressRows.map(([label, value, total, colorClass]) => (
              <HomeMacroBar key={label} label={label} current={value} goal={total} colorClass={colorClass} />
            ))}
          </div>
        </div>
      </article>

      <article className="card scale-in stagger-1 home-card" data-testid="todays-plan">
        <span className="card-label">Today&apos;s Plan</span>
        <div className="coaching-tip">
          <div className="coaching-icon coaching-icon--nutrition">
            <Icon name="spark" />
          </div>
          <div>
            <span className="tip-type">Nutrition:</span>{' '}
            <span className="tip-message">You&apos;re 30g short on protein. A Greek yogurt would close the gap.</span>
          </div>
        </div>
        <div className="coaching-tip">
          <div className="coaching-icon coaching-icon--fitness">
            <Icon name="energy" />
          </div>
          <div>
            <span className="tip-type">Fitness:</span>{' '}
            <span className="tip-message">Recovery is at 90%. Perfect day for the planned Heavy Legs session.</span>
          </div>
        </div>
      </article>

      <div className="quick-actions scale-in stagger-2" data-testid="quick-actions">
        <HomeQuickAction icon={<Icon name="nutrition" />} label="Log Meal" onClick={onLogMeal} />
        <HomeQuickAction icon={<Icon name="scan" />} label="Scan Food" onClick={onScanFood} />
        <HomeQuickAction icon={<Icon name="fitness" />} label="Add Workout" onClick={onAddWorkout} active />
        <HomeQuickAction icon={<Icon name="water" />} label="Track Water" onClick={() => setShowWater(true)} />
      </div>

      {showWater ? (
        <div className="water-modal-overlay" onClick={() => setShowWater(false)} data-testid="water-modal">
          <div className="water-modal" onClick={(event) => event.stopPropagation()}>
            <h3>Track Water</h3>
            <p>
              Current: {waterConsumed}ml / 3000ml
            </p>
            <div className="water-btns">
              <button className="water-btn water-btn-add" type="button" onClick={() => handleLogWater(250)} data-testid="water-250">
                +250ml
              </button>
              <button className="water-btn water-btn-add" type="button" onClick={() => handleLogWater(500)} data-testid="water-500">
                +500ml
              </button>
            </div>
            <button className="water-btn water-btn-cancel" type="button" onClick={() => setShowWater(false)}>
              Close
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}

function DashboardNutritionUnused({ mealSections, onOpenAddFood }) {
  const weekDays = [
    { id: 'mon', label: 'Mon', date: 18 },
    { id: 'tue', label: 'Tue', date: 19, active: true, note: 'today' },
    { id: 'wed', label: 'Wed', date: 20 },
    { id: 'thu', label: 'Thu', date: 21 },
    { id: 'fri', label: 'Fri', date: 22 },
    { id: 'sat', label: 'Sat', date: 23 },
    { id: 'sun', label: 'Sun', date: 24 },
  ]

  const consistency = ['hit', 'hit', 'miss', 'hit', 'miss', 'hit', 'hit']
  const previewMap = { breakfast: 'breakfast', lunch: 'lunch', dinner: 'dinner', snacks: 'snacks' }

  const mealCards = mealSections.map((section) => {
    const totals = section.items.reduce((sum, item) => ({
      calories: sum.calories + item.calories,
      protein: sum.protein + item.protein,
    }), { calories: 0, protein: 0 })
    const latestItem = section.items[0] ?? null

    return {
      id: section.id,
      title: section.title,
      calories: totals.calories,
      protein: totals.protein,
      itemCount: section.items.length,
      latestItem,
      isEmpty: section.items.length === 0,
      preview: latestItem?.detailFoodId ? (foodDetails[latestItem.detailFoodId]?.art ?? previewMap[section.id] ?? 'breakfast') : (previewMap[section.id] ?? 'breakfast'),
    }
  })

  return (
    <div className="dashboard-view dashboard-view--nutrition screen-fade">
      <header className="nutrition-header">
        <div>
          <h2>Nutrition</h2>
        </div>
        <button className="calendar-button" type="button"><Icon name="calendar" /></button>
      </header>
      <div className="nutrition-week-strip" role="list" aria-label="Week overview">
        {weekDays.map((day) => (
          <button key={day.id} className={`nutrition-week-day${day.active ? ' is-active' : ''}`} type="button" role="listitem">
            <span>{day.label}</span>
            <strong>{day.date}</strong>
            {day.note ? <em>{day.note}</em> : null}
          </button>
        ))}
      </div>

      <section className="nutrition-section">
        <div className="nutrition-section__head">
          <h3>Today&apos;s Meals</h3>
        </div>
        <div className="nutrition-meal-list">
          {mealCards.map((meal) => (
            <button key={meal.id} className="nutrition-meal-card" type="button" onClick={() => onOpenAddFood(meal.id)}>
              <MealPreviewArt type={meal.preview} />
              <span className="nutrition-meal-card__title">{meal.title}</span>
              <span className="nutrition-meal-card__meta">{meal.calories} kcal • {meal.protein}g P</span>
            </button>
          ))}
        </div>
      </section>

      <section className="nutrition-section nutrition-section--consistency">
        <div className="nutrition-section__head">
          <h3>Consistency</h3>
          <p>7-day nutrition target streak</p>
        </div>
        <div className="consistency-grid" role="list" aria-label="Weekly nutrition consistency">
          {consistency.map((state, index) => (
            <span key={`${state}-${index}`} className={`consistency-grid__cell consistency-grid__cell--${state}`} role="listitem" />
          ))}
        </div>
      </section>
    </div>
  )
}

function MealPreviewArt({ type }) {
  if (type === 'lunch') {
    return (
      <svg className="meal-preview-art" viewBox="0 0 64 64" aria-hidden="true">
        <defs>
          <linearGradient id="mealLunchBg" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#1f2937" />
            <stop offset="100%" stopColor="#0f1720" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="18" fill="url(#mealLunchBg)" />
        <circle cx="32" cy="32" r="22" fill="#f7fafc" />
        <circle cx="24" cy="28" r="7" fill="#8fd267" />
        <circle cx="39" cy="27" r="8" fill="#d97d52" />
        <ellipse cx="31" cy="39" rx="13" ry="6.5" fill="#72b95f" />
        <circle cx="41" cy="38" r="5" fill="#f3d068" />
      </svg>
    )
  }

  if (type === 'dinner') {
    return (
      <svg className="meal-preview-art" viewBox="0 0 64 64" aria-hidden="true">
        <defs>
          <linearGradient id="mealDinnerBg" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#1f2937" />
            <stop offset="100%" stopColor="#111827" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="18" fill="url(#mealDinnerBg)" />
        <circle cx="32" cy="32" r="22" fill="#f7fafc" />
        <ellipse cx="26" cy="30" rx="9" ry="13" fill="#7fb264" />
        <ellipse cx="40" cy="29" rx="7" ry="11" fill="#6c4a37" />
        <path d="M33 18c7 2 10 8 8 16" stroke="#ecb36d" strokeWidth="2.8" strokeLinecap="round" fill="none" />
        <path d="M19 41c7-2 13-2 24 0" stroke="#a3d57a" strokeWidth="3" strokeLinecap="round" fill="none" />
      </svg>
    )
  }

  if (type === 'snacks') {
    return (
      <div className="meal-preview-art meal-preview-art--empty">
        <Icon name="plus" />
      </div>
    )
  }

  return (
    <svg className="meal-preview-art" viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id="mealBreakfastBg" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#202a36" />
          <stop offset="100%" stopColor="#101720" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="18" fill="url(#mealBreakfastBg)" />
      <circle cx="32" cy="32" r="22" fill="#f8fafc" />
      <ellipse cx="27" cy="32" rx="10" ry="7" fill="#8bcd63" />
      <ellipse cx="37" cy="28" rx="7" ry="6" fill="#f0cf6b" />
      <circle cx="40" cy="28" r="3.5" fill="#f7b731" />
      <path d="M19 39c7-2 13-1 24 2" stroke="#7db65b" strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  )
}

function DashboardNutritionLegacy({ mealSections, onOpenAddFood, onOpenFoodDetail }) {
  const weekDays = [
    { id: 'mon', label: 'Mon', date: 18 },
    { id: 'tue', label: 'Tue', date: 19, active: true, note: 'today' },
    { id: 'wed', label: 'Wed', date: 20 },
    { id: 'thu', label: 'Thu', date: 21 },
    { id: 'fri', label: 'Fri', date: 22 },
    { id: 'sat', label: 'Sat', date: 23 },
    { id: 'sun', label: 'Sun', date: 24 },
  ]

  const consistency = ['hit', 'hit', 'miss', 'hit', 'miss', 'hit', 'hit']
  const previewMap = { breakfast: 'breakfast', lunch: 'lunch', dinner: 'dinner', snacks: 'snacks' }

  const mealCards = mealSections.map((section) => {
    const totals = section.items.reduce((sum, item) => ({
      calories: sum.calories + item.calories,
      protein: sum.protein + item.protein,
    }), { calories: 0, protein: 0 })

    return {
      id: section.id,
      title: section.title,
      calories: totals.calories,
      protein: totals.protein,
      preview: previewMap[section.id] ?? 'breakfast',
    }
  })

  return (
    <div className="dashboard-view dashboard-view--nutrition screen-fade">
      <header className="nutrition-header">
        <div>
          <h2>Nutrition</h2>
        </div>
        <button className="calendar-button" type="button"><Icon name="calendar" /></button>
      </header>
      <div className="nutrition-week-strip" role="list" aria-label="Week overview">
        {weekDays.map((day) => (
          <button key={day.id} className={`nutrition-week-day${day.active ? ' is-active' : ''}`} type="button" role="listitem">
            <span>{day.label}</span>
            <strong>{day.date}</strong>
            {day.note ? <em>{day.note}</em> : null}
          </button>
        ))}
      </div>

      <section className="nutrition-section">
        <div className="nutrition-section__head">
          <h3>Today&apos;s Meals</h3>
        </div>
        <div className="nutrition-meal-list">
          {mealCards.map((meal) => (
            <button key={meal.id} className="nutrition-meal-card" type="button" onClick={() => onOpenAddFood(meal.id)}>
              <MealPreviewArt type={meal.preview} />
              <span className="nutrition-meal-card__title">{meal.title}</span>
              <span className="nutrition-meal-card__meta">{meal.calories} kcal • {meal.protein}g P</span>
            </button>
          ))}
        </div>
      </section>

      <section className="nutrition-section nutrition-section--consistency">
        <div className="nutrition-section__head">
          <h3>Consistency</h3>
          <p>7-day nutrition target streak</p>
        </div>
        <div className="consistency-grid" role="list" aria-label="Weekly nutrition consistency">
          {consistency.map((state, index) => (
            <span key={`${state}-${index}`} className={`consistency-grid__cell consistency-grid__cell--${state}`} role="listitem" />
          ))}
        </div>
      </section>
    </div>
  )
}

function SwipeMealCard({ sectionId, item, onOpenFoodDetail, onDeleteMealItem, onDuplicateMealItem }) {
  const [offset, setOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const startXRef = useRef(0)
  const draggingRef = useRef(false)
  const movedRef = useRef(false)
  const offsetRef = useRef(0)
  const actionTimeoutRef = useRef(null)
  const maxOffset = 92
  const triggerOffset = 68

  useEffect(() => () => window.clearTimeout(actionTimeoutRef.current), [])

  function beginSwipe(clientX) {
    window.clearTimeout(actionTimeoutRef.current)
    startXRef.current = clientX
    draggingRef.current = true
    movedRef.current = false
    offsetRef.current = 0
    setIsDragging(true)
  }

  function updateSwipe(clientX) {
    if (!draggingRef.current) return
    const nextOffset = Math.max(-maxOffset, Math.min(maxOffset, clientX - startXRef.current))
    if (Math.abs(nextOffset) > 6) movedRef.current = true
    offsetRef.current = nextOffset
    setOffset(nextOffset)
  }

  function resetSwipe() {
    offsetRef.current = 0
    setOffset(0)
    actionTimeoutRef.current = window.setTimeout(() => {
      movedRef.current = false
    }, 120)
  }

  function endSwipe() {
    if (!draggingRef.current) return

    draggingRef.current = false
    setIsDragging(false)

    if (offsetRef.current <= -triggerOffset) {
      onDeleteMealItem(sectionId, item.id)
      resetSwipe()
      return
    }

    if (offsetRef.current >= triggerOffset) {
      onDuplicateMealItem(sectionId, item.id)
      resetSwipe()
      return
    }

    resetSwipe()
  }

  function handleCardClick(event) {
    if (movedRef.current) {
      event.preventDefault()
      event.stopPropagation()
      movedRef.current = false
      return
    }

    onOpenFoodDetail(item.detailFoodId ?? item, sectionId, 'hub')
  }

  return (
    <div className="swipe-meal">
      <div className="swipe-meal__action swipe-meal__action--copy" aria-hidden="true">
        <Icon name="copy" />
        <span>Copy</span>
      </div>
      <div className="swipe-meal__action swipe-meal__action--delete" aria-hidden="true">
        <Icon name="trash" />
        <span>Delete</span>
      </div>
      <article
        className={`meal-card swipe-meal__card${isDragging ? ' is-dragging' : ''}`}
        style={{ transform: `translateX(${offset}px)` }}
        onPointerDown={(event) => {
          if (event.pointerType === 'mouse' && event.button !== 0) return
          event.currentTarget.setPointerCapture?.(event.pointerId)
          beginSwipe(event.clientX)
        }}
        onPointerMove={(event) => updateSwipe(event.clientX)}
        onPointerUp={endSwipe}
        onPointerCancel={endSwipe}
      >
        <button className="meal-card__main meal-card__main--interactive" type="button" onClick={handleCardClick}>
          <div>
            <h4>{item.name}</h4>
            <span>{item.amount}</span>
          </div>
          <div className="meal-card__calories">
            <strong>{Math.round(item.calories)}</strong>
            <span>kcal</span>
            <b>{Math.round(item.protein)}g P</b>
          </div>
        </button>
      </article>
    </div>
  )
}

function DashboardNutrition({ mealSections, onOpenAddFood, onOpenFoodDetail, onDeleteMealItem, onDuplicateMealItem }) {
  const weekDays = [
    { id: 'mon', label: 'Mon', date: 18 },
    { id: 'tue', label: 'Tue', date: 19, active: true, note: 'today' },
    { id: 'wed', label: 'Wed', date: 20 },
    { id: 'thu', label: 'Thu', date: 21 },
    { id: 'fri', label: 'Fri', date: 22 },
    { id: 'sat', label: 'Sat', date: 23 },
    { id: 'sun', label: 'Sun', date: 24 },
  ]

  const consistency = ['hit', 'hit', 'miss', 'hit', 'miss', 'hit', 'hit']
  return (
    <div className="dashboard-view dashboard-view--nutrition screen-fade">
      <header className="nutrition-header">
        <div>
          <h2>Nutrition</h2>
        </div>
        <button className="calendar-button" type="button"><Icon name="calendar" /></button>
      </header>
      <div className="nutrition-week-strip" role="list" aria-label="Week overview">
        {weekDays.map((day) => (
          <button key={day.id} className={`nutrition-week-day${day.active ? ' is-active' : ''}`} type="button" role="listitem">
            <span>{day.label}</span>
            <strong>{day.date}</strong>
            {day.note ? <em>{day.note}</em> : null}
          </button>
        ))}
      </div>

      <section className="nutrition-section">
        <div className="nutrition-section__head">
          <h3>Today&apos;s Meals</h3>
          <p>Add food to each meal and tap an item to see calories and details.</p>
        </div>
        <div className="meal-sections">
          {mealSections.map((section) => (
            <section key={section.id} className="meal-section">
              <div className="meal-section__header">
                <div className="meal-section__heading">
                  <h3>{section.title}</h3>
                  <span>{section.items.length ? `${section.items.length} ${section.items.length === 1 ? 'item' : 'items'}` : 'No items yet'}</span>
                </div>
                <button type="button" onClick={() => onOpenAddFood(section.id)}>
                  <Icon name="plus" />
                  <span>Add</span>
                </button>
              </div>
              <div className="meal-section__list">
                {section.items.length ? (
                  section.items.map((item) => (
                    <SwipeMealCard
                      key={item.id}
                      sectionId={section.id}
                      item={item}
                      onOpenFoodDetail={onOpenFoodDetail}
                      onDeleteMealItem={onDeleteMealItem}
                      onDuplicateMealItem={onDuplicateMealItem}
                    />
                  ))
                ) : (
                  <button className="meal-card meal-card--empty" type="button" onClick={() => onOpenAddFood(section.id)}>
                    <div className="meal-card__placeholder">
                      <Icon name="plus" />
                    </div>
                    <div className="meal-card__empty-copy">
                      <h4>Log Meal</h4>
                      <span>Add your {section.title.toLowerCase()} food</span>
                    </div>
                  </button>
                )}
              </div>
            </section>
          ))}
        </div>
      </section>

      <section className="nutrition-section nutrition-section--consistency">
        <div className="nutrition-section__head">
          <h3>Consistency</h3>
          <p>7-day nutrition target streak</p>
        </div>
        <div className="consistency-grid" role="list" aria-label="Weekly nutrition consistency">
          {consistency.map((state, index) => (
            <span key={`${state}-${index}`} className={`consistency-grid__cell consistency-grid__cell--${state}`} role="listitem" />
          ))}
        </div>
      </section>
    </div>
  )
}

function AddFoodScreen({ onBack, onQuickAdd, onOpenFoodDetail, onOpenScanner }) {
  const [query, setQuery] = useState('')
  const [activeTab, setActiveTab] = useState('recent')
  const [successItemId, setSuccessItemId] = useState(null)
  const inputRef = useRef(null)
  const successTimeoutRef = useRef(null)
  const visibleFoods = addFoodLibrary[activeTab].filter((food) => food.name.toLowerCase().includes(query.trim().toLowerCase()))

  useEffect(() => {
    inputRef.current?.focus()

    return () => window.clearTimeout(successTimeoutRef.current)
  }, [])

  function handleQuickAdd(food) {
    onQuickAdd(food)
    setSuccessItemId(food.id)
    window.clearTimeout(successTimeoutRef.current)
    successTimeoutRef.current = window.setTimeout(() => setSuccessItemId(null), 900)
  }

  return (
    <div className="food-flow screen-fade">
      <div className="food-flow__top">
        <button className="back-button back-button--minimal" type="button" onClick={onBack} aria-label="Back to food diary">
          <Icon name="arrow" />
        </button>
      </div>
      <div className="food-search">
        <span className="food-search__icon">
          <Icon name="search" />
        </span>
        <input ref={inputRef} type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search" aria-label="Search foods" />
        <button className="food-search__scan" type="button" onClick={onOpenScanner} aria-label="Open barcode scanner">
          <Icon name="scan" />
        </button>
      </div>
      <div className="food-tab-row" role="tablist" aria-label="Food filters">
        {addFoodTabs.map((tab) => (
          <button
            key={tab.id}
            className={`food-tab-pill${activeTab === tab.id ? ' is-active' : ''}`}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="food-list" role="list" aria-label={`${addFoodTabs.find((tab) => tab.id === activeTab)?.label} foods`}>
        {visibleFoods.length ? (
          visibleFoods.map((food) => {
            const canOpenDetail = Boolean(food.detailFoodId)

            return (
              <div key={food.id} className="food-row" role="listitem">
                {canOpenDetail ? (
                  <button className="food-row__detail food-row__detail--interactive" type="button" onClick={() => onOpenFoodDetail(food.detailFoodId, undefined, 'addFood')}>
                    <span>{food.name}</span>
                  </button>
                ) : (
                  <div className="food-row__detail">
                    <span>{food.name}</span>
                  </div>
                )}
                <button
                  className={`food-row__action${successItemId === food.id ? ' is-success' : ''}`}
                  type="button"
                  onClick={() => handleQuickAdd(food)}
                  aria-label={`Quick add ${food.name}`}
                >
                  <Icon name={successItemId === food.id ? 'check' : 'plus'} />
                </button>
              </div>
            )
          })
        ) : (
          <div className="food-list__empty">
            <strong>No matches yet</strong>
            <span>Try a broader search or switch tabs.</span>
          </div>
        )}
      </div>
    </div>
  )
}

function BarcodeScannerScreen({ onBack, onDetected, onManualEntry }) {
  const [flashOn, setFlashOn] = useState(false)
  const [isDetected, setIsDetected] = useState(false)
  const detectionTimeoutRef = useRef(null)
  const transitionTimeoutRef = useRef(null)

  useEffect(() => {
    detectionTimeoutRef.current = window.setTimeout(() => {
      setIsDetected(true)
      window.navigator.vibrate?.(22)
      transitionTimeoutRef.current = window.setTimeout(onDetected, 260)
    }, 1650)

    return () => {
      window.clearTimeout(detectionTimeoutRef.current)
      window.clearTimeout(transitionTimeoutRef.current)
    }
  }, [onDetected])

  return (
    <div className="scanner-screen screen-fade">
      <ScannerSceneArt />
      <div className="scanner-screen__veil" />
      <div className="scanner-screen__topbar">
        <button className="scanner-glass-button" type="button" onClick={onBack} aria-label="Back to add food">
          <Icon name="arrow" />
        </button>
        <button className={`scanner-glass-button${flashOn ? ' is-active' : ''}`} type="button" onClick={() => setFlashOn((current) => !current)} aria-label="Toggle flashlight">
          <Icon name="flash" />
        </button>
      </div>
      <div className={`scanner-reticle${isDetected ? ' is-detected' : ''}`}>
        <span className="scanner-reticle__corner scanner-reticle__corner--tl" />
        <span className="scanner-reticle__corner scanner-reticle__corner--tr" />
        <span className="scanner-reticle__corner scanner-reticle__corner--bl" />
        <span className="scanner-reticle__corner scanner-reticle__corner--br" />
        <span className="scanner-reticle__scanline" />
      </div>
      <div className="scanner-screen__copy">
        <p>Scanning food...</p>
      </div>
      <button className="scanner-screen__manual" type="button" onClick={onManualEntry}>
        Enter Manually
      </button>
    </div>
  )
}

function RecognitionScreen({ onBack, onConfirm }) {
  const [items, setItems] = useState(() => recognitionItemsSeed.map((item) => ({ ...item, enabled: true })))
  const [activeItemId, setActiveItemId] = useState(recognitionItemsSeed[0]?.id ?? null)
  const flashTimeoutRef = useRef(null)
  const enabledItems = items.filter((item) => item.enabled)

  useEffect(() => () => window.clearTimeout(flashTimeoutRef.current), [])

  function handleHighlight(itemId) {
    setActiveItemId(itemId)
    window.clearTimeout(flashTimeoutRef.current)
    flashTimeoutRef.current = window.setTimeout(() => setActiveItemId(null), 850)
  }

  function handleToggle(itemId) {
    setItems((current) => current.map((item) => (
      item.id === itemId ? { ...item, enabled: !item.enabled } : item
    )))
    handleHighlight(itemId)
  }

  return (
    <div className="recognition-screen screen-fade">
      <div className="recognition-screen__photo">
        <button className="recognition-screen__back scanner-glass-button" type="button" onClick={onBack} aria-label="Back">
          <Icon name="arrow" />
        </button>
        <RecognitionPlateArt activeItemId={activeItemId} />
      </div>
      <div className="recognition-sheet">
        <div className="recognition-sheet__handle" aria-hidden="true" />
        <h2>Detected on plate</h2>
        <div className="recognition-list">
          {items.map((item) => (
            <article key={item.id} className={`recognition-row${activeItemId === item.id ? ' is-active' : ''}`}>
              <button className="recognition-row__focus" type="button" onClick={() => handleHighlight(item.id)}>
                <strong>{item.name}</strong>
                <span>{item.amount}</span>
              </button>
              <button
                className={`recognition-toggle${item.enabled ? ' is-on' : ''}`}
                type="button"
                role="switch"
                aria-checked={item.enabled}
                aria-label={`Toggle ${item.name}`}
                onClick={() => handleToggle(item.id)}
              >
                <span />
              </button>
            </article>
          ))}
        </div>
        <button className="primary-button recognition-sheet__cta" type="button" onClick={() => onConfirm(enabledItems)} disabled={!enabledItems.length}>
          {`Confirm & Log (${enabledItems.length} ${enabledItems.length === 1 ? 'Item' : 'Items'})`}
        </button>
      </div>
    </div>
  )
}

function FoodDetailScreen({ food, selectedPortionId, onSelectPortion, onBack, onLogFood, showLogButton = true }) {
  const activePortion = food?.portions.find((portion) => portion.id === selectedPortionId) ?? food?.portions[0]

  if (!food || !activePortion) return null

  const nutritionCards = [
    { id: 'protein', label: 'Protein', value: `${activePortion.protein}g`, tone: 'protein' },
    { id: 'carbs', label: 'Carbs', value: `${activePortion.carbs}g`, tone: 'carbs' },
    { id: 'fats', label: 'Fat', value: `${activePortion.fats}g`, tone: 'fats' },
    { id: 'fiber', label: 'Fiber', value: `${activePortion.fiber}g`, tone: 'neutral' },
    { id: 'iron', label: 'Iron', value: `${activePortion.iron}mg`, tone: 'neutral' },
    { id: 'sodium', label: 'Sodium', value: `${activePortion.sodium}mg`, tone: 'neutral', wide: true },
  ]

  const insight = activePortion.fiber >= 8
    ? food.insight
    : activePortion.protein >= 24
      ? 'This lands nearly halfway to your protein target.'
      : food.insight ?? 'Balanced macros with enough fat to stay satisfying.'

  return (
    <div className="food-detail screen-fade">
      <section className="food-detail__hero">
        <div className="food-detail__media">
          <button className="back-button food-detail__back" type="button" onClick={onBack} aria-label="Back">
            <Icon name="arrow" />
          </button>
          <FoodHeroArt variant={food.art} />
          <div className="food-detail__media-copy">
            <h2>{food.name}</h2>
          </div>
        </div>
        <div className="portion-strip" role="tablist" aria-label="Portion selector">
          {food.portions.map((portion) => (
            <button
              key={portion.id}
              className={`portion-strip__pill${portion.id === activePortion.id ? ' is-active' : ''}`}
              type="button"
              role="tab"
              aria-selected={portion.id === activePortion.id}
              onClick={() => onSelectPortion(portion.id)}
            >
              {portion.label}
            </button>
          ))}
        </div>
      </section>

      <section className="food-detail__stats">
        <RadialMacroChart calories={activePortion.calories} protein={activePortion.protein} carbs={activePortion.carbs} fats={activePortion.fats} />
        <div className="nutrition-grid">
          {nutritionCards.map((card) => (
            <article key={card.id} className={`nutrition-card nutrition-card--${card.tone}${card.wide ? ' nutrition-card--wide' : ''}`}>
              <strong>{card.value}</strong>
              <span>{card.label}</span>
            </article>
          ))}
        </div>
      </section>

      <div className="food-detail__footer">
        <p>{insight}</p>
        {showLogButton ? (
          <button className="primary-button food-detail__cta" type="button" onClick={onLogFood}>
            Log Food
          </button>
        ) : (
          <button className="primary-button food-detail__cta food-detail__cta--secondary" type="button" onClick={onBack}>
            Back to Meals
          </button>
        )}
      </div>
    </div>
  )
}

function DashboardFitness() {
  return (
    <div className="dashboard-view dashboard-view--fitness screen-fade">
      <header className="tab-header tab-header--fitness">
        <h2>Fitness</h2>
        <p>Stay consistent with workouts, recovery, and movement streaks.</p>
      </header>
      <article className="dashboard-card dashboard-card--fitness-recovery scale-in">
        <span className="card-label">Today&apos;s Recovery</span>
        <div className="fitness-recovery__value">90%</div>
        <p>Perfect day for the planned Heavy Legs session.</p>
      </article>
      <article className="workout-card scale-in stagger-1">
        <div className="workout-card__icon">
          <Icon name="fitness" />
        </div>
        <div className="workout-card__copy">
          <strong>Heavy Legs</strong>
          <span>Squats · Deadlifts · Leg Press</span>
        </div>
      </article>
      <article className="dashboard-card dashboard-card--fitness-stats scale-in stagger-2">
        <span className="card-label">This Week</span>
        <div className="fitness-stat-grid">
          <div>
            <strong>4</strong>
            <span>Workouts</span>
          </div>
          <div>
            <strong>2,840</strong>
            <span>Calories</span>
          </div>
          <div>
            <strong>5.2h</strong>
            <span>Active</span>
          </div>
        </div>
      </article>
    </div>
  )
}

const proteinTrendData = [
  { day: 'Mon', value: 98 },
  { day: 'Tue', value: 112 },
  { day: 'Wed', value: 107 },
  { day: 'Thu', value: 120 },
  { day: 'Fri', value: 135 },
  { day: 'Sat', value: 118 },
  { day: 'Sun', value: 142 },
]

const sleepCaloriesData = [
  { sleep: 5.2, excess: 420 },
  { sleep: 7.5, excess: 60 },
  { sleep: 5.8, excess: 380 },
  { sleep: 8.0, excess: 20 },
  { sleep: 5.5, excess: 410 },
  { sleep: 7.2, excess: 80 },
  { sleep: 6.0, excess: 310 },
  { sleep: 7.8, excess: 40 },
  { sleep: 5.1, excess: 450 },
  { sleep: 6.5, excess: 150 },
  { sleep: 7.0, excess: 90 },
  { sleep: 5.3, excess: 400 },
  { sleep: 8.2, excess: 10 },
  { sleep: 6.8, excess: 120 },
]

function buildSmoothPath(points) {
  let path = `M ${points[0].x} ${points[0].y}`

  for (let index = 1; index < points.length; index += 1) {
    const p0 = points[Math.max(0, index - 2)]
    const p1 = points[index - 1]
    const p2 = points[index]
    const p3 = points[Math.min(points.length - 1, index + 1)]
    const c1x = p1.x + (p2.x - p0.x) / 6
    const c1y = p1.y + (p2.y - p0.y) / 6
    const c2x = p2.x - (p3.x - p1.x) / 6
    const c2y = p2.y - (p3.y - p1.y) / 6
    path += ` C ${c1x} ${c1y},${c2x} ${c2y},${p2.x} ${p2.y}`
  }

  return path
}

function ProteinTrendChart() {
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const width = 360
  const height = 140
  const top = 10
  const bottom = 28
  const left = 8
  const right = 8
  const values = proteinTrendData.map((point) => point.value)
  const min = Math.min(...values) - 8
  const max = Math.max(...values) + 8
  const plotBottom = height - bottom
  const step = (width - left - right) / (proteinTrendData.length - 1)
  const points = proteinTrendData.map((point, index) => ({
    ...point,
    x: left + (step * index),
    y: top + (1 - ((point.value - min) / (max - min))) * (height - top - bottom),
  }))
  const linePath = buildSmoothPath(points)
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${plotBottom} L ${points[0].x} ${plotBottom} Z`
  const hoveredPoint = hoveredIndex === null ? null : points[hoveredIndex]
  const tooltipLeft = hoveredPoint ? Math.min(92, Math.max(10, (hoveredPoint.x / width) * 100)) : 50

  return (
    <div className="chart-wrap">
      <div
        className={`chart-tooltip${hoveredPoint ? ' is-visible' : ''}`}
        style={{ left: `${tooltipLeft}%`, top: '2px', transform: 'translateX(-50%)' }}
      >
        {hoveredPoint ? `${hoveredPoint.day}: ${hoveredPoint.value}g protein` : ''}
      </div>
      <svg className="insights-chart-svg" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="proteinAreaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8EFF4F" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#8EFF4F" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="proteinLineGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#4AE87C" />
            <stop offset="100%" stopColor="#8EFF4F" />
          </linearGradient>
        </defs>
        <line x1="0" y1="110" x2={width} y2="110" className="insights-grid-line" />
        <line x1="0" y1="75" x2={width} y2="75" className="insights-grid-line" />
        <line x1="0" y1="40" x2={width} y2="40" className="insights-grid-line" />
        <path d={areaPath} fill="url(#proteinAreaGradient)" />
        <path d={linePath} fill="none" stroke="url(#proteinLineGradient)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {points.map((point, index) => (
          <circle
            key={point.day}
            cx={point.x}
            cy={point.y}
            r="4.5"
            className={`insight-point${hoveredIndex === index ? ' is-visible' : ''}`}
          />
        ))}
        {points.map((point) => (
          <text key={`${point.day}-label`} x={point.x} y={plotBottom + 18} textAnchor="middle" className="axis-lbl">
            {point.day}
          </text>
        ))}
        {points.map((point, index) => (
          <rect
            key={`${point.day}-hit`}
            x={point.x - (step / 2)}
            y={top}
            width={step}
            height={height - top - bottom}
            fill="transparent"
            className="chart-hit-zone"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          />
        ))}
      </svg>
    </div>
  )
}

function SleepCaloriesChart() {
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const width = 360
  const height = 140
  const top = 10
  const bottom = 10
  const left = 8
  const right = 8
  const chartHeight = height - top - bottom
  const maxExcess = Math.max(...sleepCaloriesData.map((point) => point.excess))
  const maxSleep = Math.max(...sleepCaloriesData.map((point) => point.sleep))
  const groupWidth = (width - left - right) / sleepCaloriesData.length
  const barWidth = Math.min(16, groupWidth * 0.55)
  const thinWidth = Math.min(9, groupWidth * 0.3)
  const plotBottom = top + chartHeight
  const hoveredPoint = hoveredIndex === null ? null : sleepCaloriesData[hoveredIndex]
  const hoveredX = hoveredIndex === null ? width / 2 : left + (hoveredIndex * groupWidth) + (groupWidth / 2)
  const tooltipLeft = Math.min(92, Math.max(10, (hoveredX / width) * 100))

  return (
    <div className="chart-wrap">
      <div
        className={`chart-tooltip${hoveredPoint ? ' is-visible' : ''}`}
        style={{ left: `${tooltipLeft}%`, top: '2px', transform: 'translateX(-50%)' }}
      >
        {hoveredPoint ? (
          <>
            <span className="chart-tooltip__accent">{hoveredPoint.excess} kcal excess</span>
            <br />
            <span className="chart-tooltip__muted">Sleep: {hoveredPoint.sleep}h</span>
          </>
        ) : null}
      </div>
      <svg className="insights-chart-svg" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" aria-hidden="true">
        <line x1="0" y1="110" x2={width} y2="110" className="insights-grid-line" />
        <line x1="0" y1="75" x2={width} y2="75" className="insights-grid-line" />
        <line x1="0" y1="40" x2={width} y2="40" className="insights-grid-line" />
        {sleepCaloriesData.map((point, index) => {
          const centerX = left + (index * groupWidth) + (groupWidth / 2)
          const excessHeight = (point.excess / maxExcess) * chartHeight * 0.93
          const sleepHeight = (point.sleep / maxSleep) * chartHeight * 0.65
          const isLowSleep = point.sleep < 6

          return (
            <g key={`${point.sleep}-${point.excess}`}>
              <rect
                x={centerX - (barWidth / 2)}
                y={plotBottom - excessHeight}
                width={barWidth}
                height={excessHeight}
                rx="4"
                className={`sleep-bar${isLowSleep ? ' sleep-bar--danger' : ''}`}
                style={{ transformOrigin: `${centerX}px ${plotBottom}px`, animationDelay: `${index * 0.04}s` }}
              />
              <rect
                x={centerX + (barWidth / 2) - (thinWidth / 2) + 2}
                y={plotBottom - sleepHeight}
                width={thinWidth}
                height={sleepHeight}
                rx="3"
                className="sleep-bar sleep-bar--sleep"
                style={{ transformOrigin: `${centerX}px ${plotBottom}px`, animationDelay: `${(index * 0.04) + 0.06}s` }}
              />
              <rect
                x={centerX - (groupWidth / 2)}
                y={top}
                width={groupWidth}
                height={chartHeight}
                fill="transparent"
                className="chart-hit-zone"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
            </g>
          )
        })}
      </svg>
    </div>
  )
}

function DashboardInsights() {
  return (
    <div className="dashboard-view dashboard-view--insights screen-fade">
      <header className="tab-header tab-header--insights">
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
        <button className="insight-link" type="button">Adjust Sleep Schedule →</button>
      </article>
    </div>
  )
}

function DashboardInsightsPage() {
  return (
    <div className="dashboard-view dashboard-view--insights screen-fade">
      <header className="tab-header tab-header--insights">
        <h2>Insights</h2>
        <p>Powered by your last 30 days of data.</p>
      </header>
      <article className="insight-card insight-card--protein scale-in">
        <div className="insight-title">
          Protein intake is up <span className="text-lime">12%</span> this week.
        </div>
        <ProteinTrendChart />
        <span className="impact-tag tag-cyan">+ Muscle Synthesis</span>
      </article>
      <article className="insight-card scale-in stagger-1">
        <div className="insight-title">
          When you sleep <span className="text-coral">&lt; 6 hours</span>, you consume
          <span className="text-coral"> +400 kcal</span>.
        </div>
        <SleepCaloriesChart />
        <button className="guidance-cta" type="button">
          Adjust Sleep Schedule
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12,5 19,12 12,19" />
          </svg>
        </button>
      </article>
    </div>
  )
}

function DashboardProfile({ profile, goal, activity, diet }) {
  return (
    <div className="dashboard-view dashboard-view--profile screen-fade">
      <header className="tab-header tab-header--profile">
        <h2>Profile</h2>
        <p>Your current Health OS calibration.</p>
      </header>
      <article className="dashboard-card dashboard-card--profile-member scale-in">
        <div className="profile-member-card">
          <div className="avatar-ring avatar-ring--home profile-member-card__avatar">
            <div className="avatar-inner" />
          </div>
          <div className="profile-member-card__copy">
            <strong>Alex</strong>
            <span>Premium Member</span>
          </div>
        </div>
      </article>
      <article className="dashboard-card dashboard-card--profile-goals scale-in stagger-1">
        <span className="card-label">Daily Goals</span>
        <div className="profile-goals-grid">
          <div>
            <strong>2150</strong>
            <span>Calories</span>
          </div>
          <div>
            <strong>150g</strong>
            <span>Protein</span>
          </div>
          <div>
            <strong>200g</strong>
            <span>Carbs</span>
          </div>
          <div>
            <strong>60g</strong>
            <span>Fat</span>
          </div>
        </div>
      </article>
      <article className="dashboard-card dashboard-card--profile-menu scale-in stagger-2">
        {[
          ['settings', 'Settings'],
          ['bell', 'Notifications'],
          ['moon', 'Appearance'],
          ['help', 'Help & Support'],
        ].map(([icon, label]) => (
          <button key={label} className="profile-menu-row" type="button">
            <span className="profile-menu-row__icon"><Icon name={icon} /></span>
            <span>{label}</span>
          </button>
        ))}
      </article>
    </div>
  )
}

function DashboardScreen({
  activeTab,
  onTabChange,
  profile,
  goal,
  activity,
  diet,
  mealSections,
  nutritionView,
  nutritionReturnView,
  selectedFood,
  selectedPortionId,
  onSelectPortion,
  onOpenAddFood,
  onOpenScanner,
  onOpenRecognition,
  onOpenFoodDetail,
  onQuickAddFood,
  onConfirmRecognition,
  onLogFood,
  onDuplicateMealItem,
  onDeleteMealItem,
  onCloseNutritionFlow,
  onCloseScannerFlow,
  onCloseRecognitionFlow,
}) {
  let content = null
  const isImmersiveNutrition = activeTab === 'nutrition' && nutritionView !== 'hub'
  const isFoodDetailNutrition = activeTab === 'nutrition' && nutritionView === 'food-detail'
  const isFullBleedNutrition = activeTab === 'nutrition' && ['scanner', 'recognition'].includes(nutritionView)

  if (activeTab === 'home') content = <DashboardHome profile={profile} goal={goal} activity={activity} onLogMeal={() => onOpenAddFood('breakfast')} onScanFood={() => onOpenRecognition('lunch')} onAddWorkout={() => onTabChange('fitness')} />
  else if (activeTab === 'nutrition') {
    if (nutritionView === 'addFood') {
      content = <AddFoodScreen onBack={onCloseNutritionFlow} onQuickAdd={onQuickAddFood} onOpenFoodDetail={onOpenFoodDetail} onOpenScanner={onOpenScanner} />
    } else if (nutritionView === 'scanner') {
      content = <BarcodeScannerScreen onBack={onCloseScannerFlow} onDetected={() => onOpenFoodDetail('cinnamon-oat-bar', undefined, 'scanner')} onManualEntry={onCloseScannerFlow} />
    } else if (nutritionView === 'recognition') {
      content = <RecognitionScreen onBack={onCloseRecognitionFlow} onConfirm={onConfirmRecognition} />
    } else if (nutritionView === 'food-detail') {
      content = (
        <FoodDetailScreen
          food={selectedFood}
          selectedPortionId={selectedPortionId}
          onSelectPortion={onSelectPortion}
          onBack={onCloseNutritionFlow}
          onLogFood={onLogFood}
          showLogButton={nutritionReturnView !== 'hub'}
        />
      )
    } else {
      content = (
        <DashboardNutrition
          mealSections={mealSections}
          onOpenAddFood={onOpenAddFood}
          onOpenFoodDetail={onOpenFoodDetail}
          onDuplicateMealItem={onDuplicateMealItem}
          onDeleteMealItem={onDeleteMealItem}
        />
      )
    }
  }
  else if (activeTab === 'fitness') content = <DashboardFitness />
  else if (activeTab === 'insights') content = <DashboardInsightsPage />
  else content = <DashboardProfile profile={profile} goal={goal} activity={activity} diet={diet} />

  return (
    <div className={`dashboard-shell${isImmersiveNutrition ? ' dashboard-shell--immersive' : ''}${isFullBleedNutrition ? ' dashboard-shell--full-bleed' : ''}`}>
      <div className={`dashboard-scroll${isImmersiveNutrition ? ' dashboard-scroll--immersive' : ''}${isFoodDetailNutrition ? ' dashboard-scroll--food-detail' : ''}${isFullBleedNutrition ? ' dashboard-scroll--full-bleed' : ''}`}>{content}</div>
      {!isImmersiveNutrition ? (
        <nav className="tab-bar" aria-label="Main app navigation">
          {dashboardTabs.map((tab) => (
            <button key={tab.id} className={`tab-bar__item${activeTab === tab.id ? ' is-active' : ''}`} type="button" onClick={() => onTabChange(tab.id)}>
              <Icon name={tab.icon} />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      ) : null}
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
  const [mealSections, setMealSections] = useState(mealSectionsSeed)
  const [nutritionView, setNutritionView] = useState('hub')
  const [nutritionTargetSectionId, setNutritionTargetSectionId] = useState('breakfast')
  const [nutritionReturnView, setNutritionReturnView] = useState('hub')
  const [selectedFoodId, setSelectedFoodId] = useState('avocado-toast-egg')
  const [selectedFoodData, setSelectedFoodData] = useState(null)
  const [selectedPortionId, setSelectedPortionId] = useState('one-slice')
  const timeoutRef = useRef(null)
  const mealEntryRef = useRef(0)

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

  function createMealEntry(food, detailFoodId = null) {
    mealEntryRef.current += 1

    return {
      id: `meal-${mealEntryRef.current}`,
      name: food.name,
      amount: food.amount,
      calories: food.calories,
      protein: food.protein,
      carbs: food.carbs,
      fats: food.fats,
      fiber: food.fiber,
      iron: food.iron,
      sodium: food.sodium,
      detailFoodId,
    }
  }

  function insertMealEntry(sectionId, entry) {
    setMealSections((current) => current.map((section) => (
      section.id === sectionId
        ? { ...section, items: [entry, ...section.items] }
        : section
    )))
  }

  function insertMealEntries(sectionId, entries) {
    setMealSections((current) => current.map((section) => (
      section.id === sectionId
        ? { ...section, items: [...entries, ...section.items] }
        : section
    )))
  }

  function openAddFood(sectionId = 'breakfast') {
    setActiveTab('nutrition')
    setNutritionTargetSectionId(sectionId)
    setNutritionView('addFood')
  }

  function openScanner() {
    setActiveTab('nutrition')
    setNutritionView('scanner')
  }

  function closeScannerFlow() {
    setNutritionView('addFood')
  }

  function openRecognition(sectionId = 'lunch') {
    setActiveTab('nutrition')
    setNutritionTargetSectionId(sectionId)
    setNutritionView('recognition')
  }

  function closeRecognitionFlow() {
    setNutritionView('hub')
    setActiveTab('home')
  }

  function openFoodDetail(foodIdOrMeal, sectionId = nutritionTargetSectionId, returnView = 'hub') {
    const detail = typeof foodIdOrMeal === 'string'
      ? (foodDetails[foodIdOrMeal] ?? foodDetails['avocado-toast-egg'])
      : buildLoggedFoodDetail(foodIdOrMeal)
    const defaultPortion = detail.portions.find((portion) => portion.id === 'one-slice')?.id ?? detail.portions.find((portion) => portion.id === 'one-bar')?.id ?? detail.portions[0]?.id

    setActiveTab('nutrition')
    setNutritionTargetSectionId(sectionId ?? 'breakfast')
    setNutritionReturnView(returnView)
    setSelectedFoodData(typeof foodIdOrMeal === 'string' ? null : detail)
    setSelectedFoodId(detail.id)
    setSelectedPortionId(defaultPortion)
    setNutritionView('food-detail')
  }

  function closeNutritionFlow() {
    if (nutritionView === 'food-detail' && nutritionReturnView === 'addFood') {
      setSelectedFoodData(null)
      setNutritionView('addFood')
      return
    }

    if (nutritionView === 'food-detail' && nutritionReturnView === 'scanner') {
      setSelectedFoodData(null)
      setNutritionView('scanner')
      return
    }

    setSelectedFoodData(null)
    setNutritionView('hub')
  }

  function handleQuickAddFood(food) {
    insertMealEntry(nutritionTargetSectionId, createMealEntry(food, food.detailFoodId))
  }

  function handleLogFood() {
    const food = selectedFoodData ?? foodDetails[selectedFoodId] ?? foodDetails['avocado-toast-egg']
    const portion = food.portions.find((item) => item.id === selectedPortionId) ?? food.portions[0]

    insertMealEntry(nutritionTargetSectionId, createMealEntry({ ...portion, name: food.name }, food.id))
    setNutritionView('hub')
    setSelectedFoodData(null)
  }

  function handleConfirmRecognition(items) {
    const entries = items.map((item) => createMealEntry({
      name: item.name,
      amount: item.amount.replace(' est.', ''),
      calories: item.calories,
      protein: item.protein,
      carbs: item.carbs,
      fats: item.fats,
    }))

    insertMealEntries(nutritionTargetSectionId, entries)
    setNutritionView('hub')
    setActiveTab('nutrition')
  }

  function handleDuplicateMealItem(sectionId, itemId) {
    setMealSections((current) => current.map((section) => {
      if (section.id !== sectionId) return section

      const nextItems = []

      section.items.forEach((item) => {
        nextItems.push(item)

        if (item.id === itemId) {
          mealEntryRef.current += 1
          nextItems.push({ ...item, id: `meal-${mealEntryRef.current}` })
        }
      })

      return { ...section, items: nextItems }
    }))
  }

  function handleDeleteMealItem(sectionId, itemId) {
    setMealSections((current) => current.map((section) => (
      section.id === sectionId
        ? { ...section, items: section.items.filter((item) => item.id !== itemId) }
        : section
    )))
  }

  const screenClass = `phone-screen ${screen === 'welcome' ? 'phone-screen--welcome' : screen === 'dashboard' ? 'phone-screen--dashboard' : 'phone-screen--flow'
    }`
  const selectedFood = selectedFoodData ?? foodDetails[selectedFoodId] ?? foodDetails['avocado-toast-egg']

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
        {screen === 'dashboard' ? (
          <DashboardScreen
            activeTab={activeTab}
            onTabChange={setActiveTab}
            profile={profile}
            goal={activeGoal ?? 'energy'}
            activity={activity}
            diet={diet}
            mealSections={mealSections}
            nutritionView={nutritionView}
            nutritionReturnView={nutritionReturnView}
            selectedFood={selectedFood}
            selectedPortionId={selectedPortionId}
            onSelectPortion={setSelectedPortionId}
            onOpenAddFood={openAddFood}
            onOpenScanner={openScanner}
            onOpenRecognition={openRecognition}
            onOpenFoodDetail={openFoodDetail}
            onQuickAddFood={handleQuickAddFood}
            onConfirmRecognition={handleConfirmRecognition}
            onLogFood={handleLogFood}
            onDuplicateMealItem={handleDuplicateMealItem}
            onDeleteMealItem={handleDeleteMealItem}
            onCloseNutritionFlow={closeNutritionFlow}
            onCloseScannerFlow={closeScannerFlow}
            onCloseRecognitionFlow={closeRecognitionFlow}
          />
        ) : null}
      </section>
    </main>
  )
}

export default App
