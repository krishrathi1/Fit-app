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

Screen 11: Add Food (The Speed Hub)
Purpose: The single biggest drop-off point in health apps is how long it takes to log a meal. This screen prioritizes speed and muscle memory.

Top Navigation & Search:

Spacing: padding-top: 24px.

Search Bar: A large, highly visible input field. height: 56px, border-radius: 16px. Background is slightly lighter than the app background (rgba(255,255,255,0.08)).

Focus State: Auto-focuses on entry. The border glows with a 1px Electric Lime ring.

Trailing Icon: A barcode scanner icon. Tapping it instantly opens the camera.

Navigation Tabs (The Segmented Control):

Layout: A horizontal, scrollable list of pill-shaped tabs directly below the search bar. margin-top: 16px.

Tabs: "Recent", "Frequent", "Saved Meals", "Recipes".

Active State: The active tab is solid White with Soft Charcoal text. Inactive tabs are transparent with Muted Gray text.

List Layout (Populated Data):

Items: Clean list view. No bulky cards here to maximize screen real estate.

Quick Add Action: Every item in the list has a 32x32px circular "+" button on the far right. Tapping it adds the food instantly without opening the detail screen, accompanied by a subtle success checkmark animation.

Screen 12: Food Detail (The Intelligence View)
Purpose: When a user taps into a specific food, they aren't just looking for numbers; they want to understand its impact on their OS.

Top Layout (Hero Section):

Image: A premium, dark-gradient masked image of the food item at the top (if available), smoothly fading into the Soft Charcoal background.

Title: "Avocado Toast with Egg" (SF Pro Display, 32px, Bold, White).

Portion Selector: A sleek, inline horizontal scroller for sizes (e.g., "1 Slice", "100g", "Custom").

Macro Visualization (The Radial Graph):

Spacing: margin-top: 32px, centered.

Design: Inspired by Apple Watch activity rings but unified into a single, elegant 3-part segmented donut chart.

Ring Segments: Cyan (#06B6D4) for Protein, Electric Lime (#8EFF4F) for Carbs, Warm Coral (#FF6B6B) for Fat. The ring has a beautiful neon glow effect (filter: drop-shadow).

Center Data: "340" (SF Pro, 48px, Bold) stacked above "Calories" (Inter, 14px, Muted Gray).

Nutrition Breakdown (The Grid):

Layout: A 2-column masonry grid below the radial graph. margin-top: 32px, gap: 12px.

Grid Cards: Small glassmorphic tiles (height: 72px, Deep Indigo background).

Card Content:

Protein: "22g" (Cyan, 20px) / "Protein" (Gray, 12px)

Carbs: "28g" (Lime, 20px) / "Carbs" (Gray, 12px)

Fat: "16g" (Coral, 20px) / "Fat" (Gray, 12px)

Fiber: "8g" (White, 20px) / "Fiber" (Gray, 12px)

Sodium: "450mg" (White, 20px) / "Sodium" (Gray, 12px)

Bottom (The Action):

Floating CTA: Locked to the bottom safe area. Full-width Electric Lime button. "Log Food".

Intelligent Subtext: Directly above the button, a small AI insight text: "This will hit 100% of your daily fiber goal." (Inter, 13px, Cyan).

Screen 13: Barcode Scanner (The Precision Tool)
Purpose: Instantaneous capture. It shouldn't feel like a separate screen; it should feel like a native, high-end optical tool.

Top Navigation (Overlay):

Layout: Floating over the live camera feed.

Controls: A 40x40px glassmorphic rgba(0,0,0,0.4) back chevron on the left. A flashlight toggle on the right.

Main Content (The Viewfinder):

Background: Full-screen live camera feed.

The Mask: A dark, translucent overlay (rgba(15, 18, 22, 0.6)) covers the screen, with a clear, rounded rectangle cut out in the dead center.

The Reticle (Frame): The cutout is framed by four sleek, Electric Lime (#8EFF4F) corner brackets (border-radius: 8px, stroke-width: 3px).

Dynamic AI Feedback:

Animation: A soft, Electric Lime gradient line smoothly scans up and down inside the reticle frame.

Text: Centered below the reticle. "Scanning food..." (Inter, 16px, Medium, Pure White). The text has a subtle, breathing opacity loop to indicate active searching.

Haptics: As soon as a barcode is detected, the scan line snaps to it, the device gives a sharp, heavy haptic thud, and instantly transitions to the Food Detail screen. No confirmation tap required.

Bottom Action:

Fallback: A subtle text button at the bottom: "Enter Manually" (Inter, 14px, Muted Gray rgba(255,255,255,0.6)).

Screen 14: AI Food Recognition (The "Magic" Moment)
Purpose: To make logging a multi-item plate as easy as taking a photo for Instagram. This is the ultimate "Intelligent Guidance" flex.

Phase 1: The Capture & Processing:

User snaps the photo. The image freezes and takes up the top 60% of the screen.

Animation: Small, glowing Cyan (#06B6D4) rings pulse over the different food items in the image, connected by thin, futuristic bezier lines as the AI "thinks".

Phase 2: The Results (Bottom Sheet):

Layout: A Deep Indigo (#1E2A38) glassmorphic sheet smoothly slides up from the bottom, occupying the lower 40% of the screen. border-top-radius: 32px, backdrop-filter: blur(24px).

Sheet Header: A subtle 40px wide pill handle at the very top. Below it: "Detected on plate" (SF Pro, 20px, Bold, White).

Detected Items List:

Layout: A clean, vertical list of the identified items with high visual hierarchy. margin-top: 16px.

Item Rows:

Left: "Chicken Breast" (Inter, 16px, Medium, White) • "150g est." (Inter, 13px, Cyan).

Right: A minimalist toggle switch (currently ON, Electric Lime) so the user can easily deselect an item if the AI caught a garnish they don't want to track.

Visual tie-in: Tapping an item in the list briefly flashes the corresponding glowing ring on the photo above.

(Other rows follow: "White Rice" • "100g est.", "Steamed Broccoli" • "80g est.")

Bottom (The Action):

CTA Button: Floating above the bottom edge. Full-width Electric Lime button. "Confirm & Log (3 Items)".

Screen 15: Meal Builder (The Power-User Engine)
Purpose: Turn frequent behaviors into one-tap templates. This screen needs to balance robust data inputs with a clean, uncrowded aesthetic.

Top Navigation:

Header: Back chevron top left. "Create Meal" (SF Pro Display, 24px, Bold) top center.

Hero Section (The Dynamic Aggregator):

Layout: A premium Deep Indigo card at the very top. This acts as the "receipt" that updates in real-time.

Meal Name Input: A large, borderless input field. Placeholder: "Name your meal..." (SF Pro, 28px, Bold, Muted Gray). When typed, text is Pure White. e.g., "Chicken + Rice Bowl".

Aggregated Stats: Below the title, the total stats.

Hero Number: "450" (SF Pro, 40px, Bold, Electric Lime) stacked next to "kcal" (Inter, 14px, Muted Gray).

Macro Rollup: A minimalist horizontal bar showing the combined P/C/F split, with text below: "45g P • 40g C • 12g F".

Animation: When a new food is added below, these numbers spin like a digital odometer to the new total.

Ingredients List (The Building Blocks):

Section Header: "Ingredients" (Inter, 14px, Semi-bold, Muted Gray). margin-top: 32px.

List Items: Minimalist rows mirroring the Food Diary layout (Screen 10). Clean typography, Swipe-to-delete enabled.

Add Button: A dashed-border, transparent button: "+ Add Ingredient" (Inter, 16px, Cyan). Tapping this slides over to Screen 11 (Add Food).

Bottom (The Investment):

Spacing: Locked to the bottom safe area.

CTA Button: Full-width button with a smooth Cyan to Electric Lime gradient. "Save as Template".

Intelligent Subtext: "This will be available in your 'Saved Meals' for 1-tap logging." (Inter, 12px, Muted Gray).

Screen 16: Recipe Explorer (The Inspiration Engine)
Purpose: A visually immersive cookbook that feels like a premium editorial magazine, cross-referenced with their specific macro goals.

Top Navigation:

Header: "Discover" (SF Pro Display, 32px, Bold, Pure White).

Trailing Icons: A minimal search glass icon and a slider/filter icon (rgba(255,255,255,0.8)).

Category Tabs (Horizontal Scroll):

Spacing: margin-top: 24px.

Pills: "High Protein", "Low Carb", "Quick Meals", "Vegan".

Active State: The selected pill is Solid White with Soft Charcoal text. Inactive pills are transparent with a 1px translucent border and Muted Gray text.

Featured Recipe (The Hero Card):

Layout: A massive, beautiful card dominating the top half of the scroll. height: 340px, border-radius: 24px.

Visual: A high-resolution, dark-mood culinary photo spanning the entire card.

Overlay: A smooth linear gradient from bottom (100% Soft Charcoal) to top (0% transparent).

Content (Bottom aligned):

Smart Tag: "✨ Perfect for your protein goal" (Inter, 12px, Cyan background at 15% opacity, Cyan text).

Title: "Spicy Salmon Crunch Bowl" (SF Pro, 28px, Bold, White).

Metrics: "450 kcal • 42g Protein • 15 min prep" (Inter, 14px, Muted Gray).

Scrolling Recipe Feed (The Grid):

Layout: A horizontal carousel of smaller recipe cards below the Hero section. margin-top: 32px.

Card Styling: width: 200px, height: 240px, Deep Indigo background. Image takes up the top 60%, text takes up the bottom 40%.

Micro-interaction: Pressing a card scales it down slightly (0.98) before smoothly expanding it into the full-screen Recipe Detail view.

Screen 17: Grocery Planner (The Execution Tool)
Purpose: Transform the abstract "meal plan" into a highly actionable, frictionless real-world tool. It categorizes items exactly how a user walks through a supermarket.

Top Navigation:

Header: "Grocery List" (SF Pro Display, 32px, Bold).

Subtext: "Auto-generated for this week's plan." (Inter, 14px, Electric Lime).

Progress Bar (Gamification):

A sleek, thin progress bar under the header showing how many items are checked off. (e.g., 4/15 items).

Categorized List Layout (Aisle-Based):

Instead of a chaotic single list, group items by supermarket sections.

Section Header: "Produce" (Inter, 16px, Semi-bold, Muted Gray). margin-top: 24px.

The Checkbox UI (Elite Detail):

Layout: Deep Indigo glassmorphic row (height: 56px, border-radius: 16px, margin-bottom: 8px).

Left (The Box): A 24x24px rounded square (border-radius: 6px, 2px Deep Indigo border).

Text: "Spinach" / "Avocado" (Inter, 16px, White).

Right (Quantity): "2 bags" / "3 large" (Inter, 14px, Muted Gray).

Interaction (The Magic): When the user taps the row, the checkbox fills with Electric Lime (#8EFF4F), a crisp white checkmark appears, a satisfying haptic tick fires, and the text gets a smooth 0.3s strikethrough animation while dimming to 40% opacity.

Other Sections (Follow same UI):

Meat & Poultry: Chicken (1.5 kg)

Dairy: Eggs (1 dozen)

Pantry: Rice (1 kg bag)

Floating Action:

A circular Floating Action Button (FAB) locked to the bottom right. Electric Lime background, Soft Charcoal "+" icon to quickly add custom household items.

Screen 18: Fitness Hub (The Movement Dashboard)
Purpose: A dramatic shift in context from Nutrition to Exertion. This is the central command for physical performance, utilizing the "Intelligent Guidance" philosophy.

Top Navigation:

Header: "Fitness" (SF Pro Display, 32px, Bold).

Trailing Icon: An Apple Watch/Wearable sync icon pulsing subtly in the top right to assure the user their data is live.

Hero Card: The Fitness Score (The Differentiator):

Instead of just showing "workouts done," we give them a unified OS health metric.

Layout: Large Deep Indigo card (padding: 24px, border-radius: 24px).

Visual: A beautiful, glowing half-gauge (speedometer style) in the center. The gradient sweeps from Warm Coral (low) to Cyan (medium) to Electric Lime (high).

Center Data: "84" (SF Pro, 64px, Heavy, Pure White).

Subtext: "Optimal Recovery & Output." (Inter, 14px, Electric Lime).

Secondary Cards (The 2x2 Grid):

Spacing: gap: 16px, margin-top: 16px.

Card 1 (Steps):

Styling: Deep Indigo, square card.

Header: "Steps" (Muted Gray, 13px) + Footprint icon.

Data: "8,432" (White, 24px, Bold).

Intelligent Subtext: "Just 1,500 more. A 15-min walk hits your goal." (Inter, 12px, Cyan).

Card 2 (Calories Burned):

Styling: Deep Indigo, square card.

Header: "Active Burn" (Muted Gray, 13px) + Flame icon.

Data: "420 kcal" (Warm Coral, 24px, Bold).

Visual: A minimalist mini-bar chart at the bottom of the card showing the burn distribution over the last 6 hours.

Card 3 (Workouts - The Action Area):

Layout: Full-width card below the grid.

Header: "Today's Plan" (Inter, 16px, Semi-bold).

Content: "Upper Body Hypertrophy • 45 mins" (White, 16px).

Button: A sleek, pill-shaped "Start Session" button inside the card. Cyan border, transparent background. When tapped, it fills with solid Cyan to transition into the workout flow.

Screen 19: Workout Library (The Blueprint Hub)
Purpose: A highly organized, visually stimulating command center for physical training. It should feel like browsing a premium masterclass.

Top Navigation:

Header: "Training" (SF Pro Display, 32px, Bold, Pure White).

Trailing Icons: A sleek search icon and a "Filter" slider icon (Inter, 24x24px, outline style).

Category Navigation (The Bento Grid):

Layout: A 2x2 masonry grid dominating the top section (margin-top: 24px, gap: 12px).

Cards (Strength, Cardio, Mobility, HIIT):

Styling: height: 100px, border-radius: 20px.

Visuals: Instead of photos, use high-end abstract 3D glass renders on Deep Indigo backgrounds. (e.g., A glowing Cyan metallic sphere for Strength, overlapping vibrant rings for Cardio, fluid waves for Mobility).

Text: Positioned bottom-left of each card. (SF Pro, 18px, Semi-bold).

"For You" Section (Intelligent Guidance):

Spacing: margin-top: 32px.

Header: "Recommended Today" (Inter, 16px, Semi-bold, Muted Gray).

Hero Card: A wide, cinematic card (height: 200px).

Background: A dark, moody gym photo, faded heavily into the Charcoal background.

Content: "Heavy Push Day" (SF Pro, 24px, Bold) • "Based on your recovery score." (Inter, 13px, Electric Lime).

UI Behavior: Scrolling feels weighty and smooth. Tapping a category instantly filters the list below with a fluid layout animation (Shared Element Transition).

Screen 20: Workout Detail (The Mission Briefing)
Purpose: Prepare the user mentally and physically before they hit start. Clear expectations, zero surprises.

Top Layout (The Hero Banner):

Visual: A full-bleed cinematic image or a subtle, slow-motion looping video of the targeted muscle group at the top.

Header: "Upper Body Power" (SF Pro Display, 32px, Heavy, Pure White) overlapping the bottom edge of the image.

The Metrics Row (Quick Glance):

Layout: A horizontal glassmorphic pill bar just below the header (margin-top: 16px, padding: 16px, Deep Indigo).

Data Points (Split into 3 columns):

Time: "45 Min" (White, 16px) / "Duration" (Gray, 12px).

Burn: "350 kcal" (Cyan, 16px) / "Est. Burn" (Gray, 12px).

Level: "Intense" (Warm Coral, 16px) / "Intensity" (Gray, 12px).

Exercise List (The Flight Plan):

Spacing: margin-top: 32px.

Layout: A vertical timeline-style list. A thin dashed line connects each exercise vertically down the left side, indicating flow.

Exercise Rows:

Left (The Node): A glowing Electric Lime dot on the dashed line.

Middle (The Details): "Barbell Bench Press" (Inter, 18px, Medium). Below it: "4 Sets • 8-10 Reps" (Inter, 14px, Muted Gray).

Right (The Visual): A small 48x48px thumbnail showing a wireframe animation of the movement.

Bottom (The Commitment):

Floating Action Area: Deep gradient fade at the bottom.

CTA Button: Massive, pulsing Cyan to Electric Lime gradient button: "Begin Session".

Micro-interaction: Pressing it triggers a 3-second countdown overlay ("3... 2... 1... GO") with escalating haptic heartbeats.

Screen 21: Workout Logging (The Arena)
Purpose: This screen is designed for sweaty fingers and physical exhaustion. Touch targets are 30% larger than standard screens. Data entry must take less than 2 seconds per set.

Top Navigation (Active State):

Layout: Locked to the top. Deep Indigo, solid background (no blur, saves battery during active workouts).

Center: A running timer "00:14:23" (SF Pro Monospaced, 20px, Cyan).

Right: "Finish" (Inter, 16px, Warm Coral—requires a long-press to avoid accidental taps).

Current Exercise Header:

Title: "Barbell Bench Press" (SF Pro Display, 28px, Bold).

Intelligent Guidance Subtext: "Last week: 60kg for 8 reps. Aim for 65kg today." (Inter, 14px, Electric Lime).

Logging UI (The Set Matrix):

Layout: A clean spreadsheet-style list of large, rounded rows (margin-top: 24px).

Column Headers: "Set" | "Previous" | "kg" | "Reps" | "Done"

Active Row (e.g., Set 1):

Styling: height: 64px, border-radius: 16px, background: rgba(255,255,255,0.05).

Set #: "1" (Inter, 16px, White).

Previous: "60 x 8" (Inter, 14px, Muted Gray).

Inputs (kg & Reps): Huge touch areas. Instead of invoking the native iOS keyboard (which is awful for gym use), tapping an input slides up a custom, massive, minimalist Number Pad from the bottom of the screen.

Values: "60" [kg] and "8" [reps] pre-filled based on last week. User just taps to confirm or edits.

The "Done" Button: A large circular checkbox on the far right.

Interaction (The Dopamine Hit):

When the user taps the circular checkbox, it fills with solid Electric Lime.

The text in the row turns bright white, confirming the log.

A heavy, satisfying haptic SNAP fires.

A subtle rest timer (e.g., "90s Rest") automatically drops down below the completed row and begins counting down.

Bottom Actions:

Layout: Two large ghost buttons below the sets.

" + Add Set" (Left) and "Next Exercise →" (Right, highlights in Cyan when all sets are logged).