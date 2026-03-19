Global Design Variables (Applied to All Screens)
Background: Deep, immersive Soft Charcoal (#0F1216).

Typography: SF Pro Display for dynamic, emotional headers; Inter for crisp, readable data.

Grid System: Strict 8pt spacing system. App padding is a consistent 24px on the left and right.

Surfaces: Deep Indigo (#1E2A38) with a subtle backdrop-filter: blur(12px) and a 1px translucent white inner border (rgba(255,255,255,0.05)) to create a premium glass effect.

Screen 1: The "Welcome" Entrance
Purpose: Create immediate visceral excitement. Zero clutter. High emotional resonance.

Top (Visual Anchor):

Spacing: padding-top: 120px

Element: A minimal, abstract 3D illustration (e.g., three intersecting, soft-glowing rings representing Nutrition, Fitness, and Insights). It slowly rotates on a continuous, subtle 15-second loop.

Center (The Hook):

Spacing: margin-top: 64px

H1 Heading: "Welcome to Your \nPersonal Health OS"

Styling: SF Pro Display, 36px, Bold. Text is white, but "Health OS" has a subtle gradient text-fill transitioning from Electric Lime (#8EFF4F) to Fresh Green (#2ED573).

Subtext: "Track nutrition, fitness, and health with AI-powered guidance."

Styling: Inter, 16px, Regular. Color: rgba(255, 255, 255, 0.6) (Subtle gray). line-height: 1.5. margin-top: 16px.

Bottom (The Action):

Spacing: Fixed to the bottom, padding-bottom: 48px.

Primary CTA (Get Started):

Styling: Full-width button, height: 56px, border-radius: 100px (pill shape). Background: Electric Lime (#8EFF4F). Text: Soft Charcoal (#0F1216), Inter, 18px, Semi-bold.

Micro-interaction: On press, the button scales down to 0.95, and the device triggers a soft haptic tick.

Secondary CTA (Login):

Styling: Text-only button below the primary CTA. margin-top: 24px. Text: "Already have an account? Log in" (White, Inter 14px).

Screen 2: The "Personal Goal" Selection
Purpose: Establish intent with a tactile, delightful, and frictionless selection process.

Top Navigation:

Element: Minimal progress bar at the very top edge. A 2px high line; 33% filled with Electric Lime.

Back Button: 24x24px chevron-left icon (outline style) in the top left, margin-top: 24px.

Main Content (The Question):

Spacing: margin-top: 40px.

H2 Heading: "What is your primary goal?"

Styling: SF Pro Display, 28px, Bold, Pure White.

Subtext: "This helps our AI calibrate your initial baseline." (Inter 14px, muted white, margin-top: 8px).

Cards Section (The Grid):

Layout: A 2x2 grid (or a vertical stack of 4 if you prefer longer text, but let's use vertical stack for premium readability). gap: 16px, margin-top: 40px.

Card Design:

Styling: height: 80px, border-radius: 20px. Background: Deep Indigo (#1E2A38).

Internal Layout: Flex-row, centered vertically. Left padding 20px.

Iconography: Left side features a 32x32px softly glowing icon inside a subtle circle (e.g., Lightning bolt for Energy, Dumbbell for Muscle).

Text: Inter, 18px, Medium, Pure White.

UI Behavior (3D Press):

Interaction: When the user presses a card, it utilizes a 3D transform. It shrinks slightly (scale: 0.97) and dips backward in space.

Selection State: The border lights up with a 2px Electric Lime glow, and a small, smooth checkmark animates into the right side of the card. Auto-advances to the next screen after 0.4 seconds to eliminate the need for a "Next" button.

Screen 3: "Body Information" via Fluid Sliders
Purpose: Remove the friction of native keyboards. Make data entry feel like tuning a high-end synthesizer.

Top Navigation:

Element: Progress bar updates to 66% filled. Back chevron in the top left.

Main Content:

Spacing: margin-top: 40px, margin-bottom: 32px.

H2 Heading: "Tell us about yourself"

Styling: SF Pro Display, 28px, Bold, Pure White.

Slider-Based Input Fields:

Instead of a traditional form, we use a vertical stack of "Input Cards".

Card Styling: Deep Indigo (#1E2A38), padding: 24px, border-radius: 24px, margin-bottom: 16px.

Interaction Design (The Sliders):

Header per card: e.g., "Weight" (Left aligned, Inter 14px, muted gray) and the Dynamic Value "75 kg" (Right aligned, SF Pro 20px, Electric Lime, Bold).

The Track: A thick, rounded track (height: 12px), dark charcoal background.

The Fill: Electric Lime fill from left to current position.

The Thumb (Knob): A 24x24px pure white circle with a soft drop shadow (box-shadow: 0 4px 12px rgba(0,0,0,0.5)).

Haptic Feedback: As the user drags the slider, the phone fires light haptic ticks (UIImpactFeedbackGenerator) for every integer changed. It feels mechanical and precise.

Special Case (Gender):

Instead of a slider, use a sleek, segmented toggle inside the card. Smooth sliding animation behind the selected text.

Bottom (Floating Action Area):

Element: Floating action button area locked to the bottom with a dark gradient fade from transparent to #0F1216 to prevent text from clashing.

CTA Button: Full width, Electric Lime. "Generate My Plan". Include a subtle shimmer animation passing over the button text to indicate the AI is ready to work.

Screen 4: Activity Level
Purpose: Accurately capture lifestyle data without making the user read paragraphs of text. Visuals do the heavy lifting.

Top Navigation:

Progress Bar: Now fills to 80%, smoothly animating in from the previous screen. Back chevron top left.

Main Content:

Spacing: margin-top: 40px.

H2 Heading: "What is your daily movement?"

Styling: SF Pro Display, 28px, Bold, Pure White.

Subtext: "Excluding your dedicated workouts." (Inter 14px, muted white rgba(255,255,255,0.6)).

Visual Cards Section (Vertical Stack):

Layout: A vertical list of 4 large, prominent cards. gap: 16px, margin-top: 32px.

Card Styling: height: 96px, border-radius: 24px, Deep Indigo (#1E2A38).

Internal Layout (Left/Right split):

Left Side (Text): * Title: e.g., "Lightly Active" (Inter, 18px, Semi-bold, White).

Subtitle: "Most of the day on your feet." (Inter, 13px, Muted Gray).

Right Side (The Illustration): * Visual: Instead of cheesy stock vectors, use abstract, glowing 3D geometries or sleek line-art animations.

Example: "Sedentary" shows a single, calm, slowly pulsing dot. "Athlete" shows multiple overlapping, high-energy rings spinning dynamically in Electric Lime and Warm Coral.

UI Behavior: 3D press interaction. On tap, the selected card triggers a satisfying haptic thud, glows with an Electric Lime border, and auto-advances.

Screen 5: Diet Preference
Purpose: Personalize the nutrition engine while keeping cognitive load at zero.

Top Navigation:

Progress Bar: Hits 95%. Almost there.

Main Content:

Spacing: margin-top: 40px.

H2 Heading: "How do you prefer to eat?"

Styling: SF Pro Display, 28px, Bold, Pure White.

Options Grid (The "Pill" Layout):

Instead of heavy horizontal cards, we switch the rhythm to a dynamic, masonry-style grid of large, tactile "chips" or "pills". It feels lightweight and modern.

Layout: 2-column grid. gap: 16px.

Pill Styling: * height: 64px, border-radius: 20px.

Background: Deep Indigo (rgba(30, 42, 56, 0.5)) — slightly more transparent than previous cards to feel lighter.

Inside: A minimalist 24x24 outline icon (e.g., an avocado for Keto, a leaf for Vegan) next to the text (Inter, 16px, Medium).

The "Custom" Option:

The last card spans the full width of the grid.

Styling: Transparent background with a 1px dashed border rgba(255,255,255,0.2).

Text: "Custom Macros" with a + icon.

UI Behavior: On selection, the background of the chosen pill snaps to solid Deep Indigo, text turns Electric Lime, and an immediate auto-transition is triggered to the calculation screen.

Screen 6: Calorie Calculation (The "Magic" Moment)
Purpose: This is the bridge. We transition the user from inputting data to receiving intelligent guidance. We must build trust through a visually stunning processing state.

Top Navigation: Completely hidden. We want immersive focus.

Phase 1: The AI Analysis (0 to 3 Seconds):

Center Element: A large, ultra-smooth, glowing ring in the center of the screen. It uses a conic gradient of Electric Lime (#8EFF4F) and Warm Coral (#FF6B6B), spinning rapidly but smoothly.

Dynamic Text: Placed directly under the ring. (SF Pro, 20px, Muted White). The text cross-fades every 1 second:

"Analyzing metabolic rate..."

"Calibrating macro ratios..."

"Building your Health OS..."

Haptics: A continuous, escalating heartbeat vibration that builds anticipation.

Phase 2: The Reveal (3 Seconds onwards):

Animation: The spinning ring snaps sharply into a perfectly solid Electric Lime circle, then morphs into the hero data card. The background dims slightly.

Main Card (The Result):

Subtext: "Your daily energy target" (Inter, 14px, tracked out, uppercase, Muted Gray). margin-bottom: 8px.

Hero Number: 2,150 (SF Pro Display, 64px, Heavy weight).

Unit: "kcal" (SF Pro, 24px, Muted Gray, aligned to the baseline of the numbers).

The Elite UX Touch (Intelligent Guidance):

Below the hero number, we don't just leave them with calories. We show the translation.

A sleek, horizontal segmented bar (height: 8px, border-radius: 4px) showing their personalized macro split (Protein in Lime, Carbs in Cyan, Fats in Coral).

Text below bar: "Optimized for Muscle Building & High Energy." (Validating their Screen 2 choice).

Bottom (The Launch):

Spacing: Locked to the bottom safe area.

CTA Button: "Enter My OS".

Styling: Electric Lime background, Soft Charcoal text. Large, confident, pill-shaped.

Micro-interaction: The button has a subtle, sweeping shine effect that loops every 3 seconds, drawing the thumb to finalize the onboarding.

Screen 7: Home Dashboard (The Central Intelligence Hub)
Purpose: Give the user an instant, holistic view of their day without overwhelming them with spreadsheets. It should feel like a high-end dashboard, not a medical chart.

Top Navigation & Greeting:

Spacing: padding-top: 64px, padding-horizontal: 24px.

Element: A dynamic greeting. "Good Morning, Alex" (SF Pro Display, 28px, Bold, Pure White).

Avatar: Top right corner, a 40x40px circular glassmorphic container holding a subtle Memoji or user photo, outlined with a 1px Electric Lime ring indicating a "streak" or active status.

Hero Section (Cards 1 & 2 Combined):

Layout: A massive, ultra-premium Deep Indigo card (border-radius: 24px, padding: 24px, margin-top: 24px). We combine Calories and Macros here for a unified energy view.

Left (Calorie Ring): A large, glowing progress ring.

Visuals: The track is muted charcoal. The fill is a gradient from Cyan (#06B6D4) to Electric Lime (#8EFF4F).

Center Data: "1800" (SF Pro, 32px, Bold) stacked over "/ 2150 kcal" (Inter, 12px, Muted Gray).

Right (Macro Breakdown): A vertical stack of 3 sleek progress bars next to the ring.

Protein: Cyan bar. Text: "120/150g"

Carbs: Electric Lime bar. Text: "180/200g"

Fat: Warm Coral bar. Text: "45/60g"

Styling: Bars are thin (height: 6px, border-radius: 4px), feeling precise and elegant.

Card 3: Today's Plan (Intelligent Guidance):

Spacing: margin-top: 16px.

Layout: Deep Indigo card. This replaces the standard "To-Do" list with active AI coaching.

Content: * Row 1 (Nutrition context): A small Cyan spark icon. Text: "You're 30g short on protein. A Greek yogurt would close the gap." (Inter, 15px, White).

Row 2 (Fitness context): A small Lime lightning icon. Text: "Recovery is at 90%. Perfect day for the planned Heavy Legs session."

Card 4: Quick Actions (The Command Center):

Layout: A horizontal grid of 4 floating, circular buttons or a sleek segmented pill bar (margin-top: 24px).

Styling: width: 64px, height: 64px circular glass buttons (rgba(255,255,255,0.05)).

Icons: Sleek outline icons for Log Meal, Scan Food, Add Workout, Track Water.

Micro-interaction: On press, the icon shrinks by 5% and the background briefly flashes Electric Lime.

Bottom Navigation:

Fixed glassmorphic tab bar (backdrop-filter: blur(20px)). 5 minimalist icons: Home (active), Nutrition, Fitness, Insights, Profile. Active state is highlighted with a soft Electric Lime glow beneath the icon.

Screen 8: Smart Insights (The Differentiator)
Purpose: This is the "aha" moment of the app. It proves the software is thinking for the user. It looks like Stripe Analytics mixed with Notion's clean typography.

Top Navigation:

Heading: "Insights" (SF Pro Display, 32px, Bold).

Subtext: "Powered by your last 30 days of data." (Inter, 14px, Muted Gray).

Card 1: The Positive Trend (Protein Insight):

Layout: Deep Indigo card, margin-top: 32px, padding: 24px, border-radius: 24px.

Header: "Protein intake is up 20% this week." (SF Pro, 20px, Medium, White).

Visual: A beautiful, smooth bezier curve line chart spanning the width of the card. The line is Electric Lime with a soft, faded gradient dropping down to the x-axis.

Impact Tag: A small pill tag saying "+ Muscle Synthesis" (Cyan background, 10% opacity, Cyan text).

Card 2: The Behavioral Correlation (Sleep vs. Calories):

Layout: Deep Indigo card, margin-top: 16px.

Header: "When you sleep < 6 hours, you consume +400 kcal." (SF Pro, 20px, Medium, White). Highlight the numbers in Warm Coral (#FF6B6B) to indicate a warning trend.

Visual: A minimalist dual-bar chart. Dark translucent bars for sleep duration, stacked next to Coral bars for calorie overages. No axes, just clean data points.

Guidance CTA: A subtle button at the bottom of the card: "Adjust Sleep Schedule →" (Inter, 14px, Cyan).

UI Behavior: As the user scrolls, the charts draw themselves using a smooth 0.8s easing animation. It feels alive.

Screen 9: Nutrition Hub
Purpose: A dedicated space for food that focuses on quality, planning, and ease of logging, rather than just raw metrics.

Top Layout:

Heading: "Nutrition" (SF Pro, 32px, Bold).

Date Picker: A horizontally scrollable week view (margin-top: 16px). Today is highlighted with a Deep Indigo pill and an Electric Lime dot.

Section 1: Today's Meals:

Layout: Vertical stack of minimal cards (margin-top: 32px).

Cards (Breakfast, Lunch, Dinner, Snacks): * Styling: height: 72px, border-radius: 16px, rgba(255,255,255,0.03) background.

Left: Meal Name (e.g., "Breakfast") and a subtle "+" icon if empty, or a small, elegantly cropped photo of the food if logged.

Right: The specific calories and protein for that meal (e.g., "450 kcal • 30g P").

Section 2: Weekly Nutrition (The Heatmap):

Spacing: margin-top: 32px.

Heading: "Consistency" (Inter, 16px, Semi-bold, Muted Gray).

Visual: A 7-day mini heatmap. 7 rounded squares. If they hit their target, the square is solid Electric Lime. If they missed, it's translucent charcoal. A highly visual, Apple Activity-style way to see the week at a glance.

Section 3: Discovery (Recipes & Grocery Planner):

Layout: 2-column grid (margin-top: 24px).

Card 1 (Recipes): * Visual: A high-quality, dark-mood food image filling the card, masked by the 20px border radius.

Overlay: A dark gradient from the bottom up. Text: "High Protein Recipes" (White, Bold).

Card 2 (Grocery Planner):

Styling: Deep Indigo background.

Icon: A minimal shopping cart icon.

Text: "Auto-Generate Grocery List" (Inter, 15px).

Micro-interaction: Tapping it triggers a sheet modal sliding up from the bottom with the week's required ingredients grouped by aisle.

Screen 10: Food Diary (The Frictionless Log)
Purpose: Reviewing and managing daily intake should feel as effortless as clearing notifications. Zero clutter, high utility.

Top Navigation:

Header: "Today, Mar 17" (SF Pro, 24px, Bold, Pure White) with a subtle dropdown arrow to quickly jump to other dates.

Trailing Icon: A minimalist calendar icon to jump to the Screen 9 Nutrition Hub.

Main Content Layout (Vertical Scroll):

Section Headers: "Breakfast", "Lunch", "Dinner", "Snacks". (SF Pro, 18px, Semi-bold, Muted Gray). These stick to the top of the screen as the user scrolls.

Add Button per Section: A subtle text button aligned right of the section header: "+ Add" (Inter, 14px, Electric Lime).

Food Item Cards (The Entries):

Styling: height: 72px, Deep Indigo (#1E2A38), border-radius: 16px, margin-bottom: 8px.

Left Side (Details): * Food Name: "Grilled Chicken Breast" (Inter, 16px, Medium, White).

Serving: "150g" (Inter, 13px, Muted Gray).

Right Side (Data):

Calories: "247 kcal" (SF Pro, 16px, Semi-bold, White).

Macros: "46g P • 0g C • 5g F" (Inter, 12px, Cyan for Protein, Gray for others to highlight the primary macro).

Gesture System (The Micro-interactions):

Swipe Right (Duplicate): Swiping the card right reveals a Fresh Green (#2ED573) background with a white "Copy" icon. Releasing triggers a haptic snap, instantly duplicating the item for quick meal repetition.

Swipe Left (Delete): Swiping left reveals a Warm Coral (#FF6B6B) background with a white "Trash" icon. Releasing deletes the item with a smooth shrinking exit animation.