# React Gym Tracker

A simple gym workout tracking app built with React, TypeScript, and modern tooling. This project is designed as a learning playground for React concepts.

## Tech Stack

- **Runtime**: Bun
- **Build Tool**: Vite
- **Framework**: React 18 + TypeScript
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Linting**: ESLint + Prettier

## Getting Started

```bash
# Install dependencies
bun install

# Start dev server
bun dev

# Build for production
bun run build

# Preview production build
bun preview

# Lint code
bun run lint

# Fix linting issues
bun run lint:fix

# Format code
bun run format

# Type check
bun run type-check
```

## Project Structure

```
src/
├── components/
│   ├── Layout.tsx          # Main layout with navigation
│   ├── WorkoutCard.tsx     # Display individual workout
│   ├── WorkoutForm.tsx     # Add new workout form
│   └── ExerciseList.tsx    # List of exercises in workout
├── pages/
│   ├── Home.tsx            # Dashboard/workout list
│   ├── AddWorkout.tsx      # Add workout page
│   └── WorkoutDetail.tsx   # View single workout details
├── store/
│   └── workoutStore.ts     # Zustand store for workouts
├── types/
│   └── workout.ts          # TypeScript interfaces
├── App.tsx                 # Routes setup
├── main.tsx                # Entry point
└── index.css               # Tailwind imports
```

## Features

- **Home Page** (`/`): View all your workouts in a grid layout
- **Add Workout** (`/add`): Create new workouts with exercises
- **Workout Detail** (`/workout/:id`): View and delete individual workouts

## Learning Resources

### React Concepts Demonstrated

1. **React Hooks**:
   - `useState` - Managing component state
   - `useEffect` - Side effects (if needed)
   - Custom hooks with Zustand

2. **Zustand State Management**:
   - Similar to Pinia from Vue
   - Simple, centralized state
   - Actions and selectors
   - Located in `src/store/workoutStore.ts`

3. **React Router**:
   - Declarative routing
   - Route parameters (`/workout/:id`)
   - Programmatic navigation with `useNavigate`
   - Nested routes with `<Outlet />`

4. **TypeScript**:
   - Type-safe props and state
   - Interfaces for data structures
   - Type inference

5. **Component Composition**:
   - Reusable components with props
   - Children components
   - Layout pattern

6. **Forms in React**:
   - Controlled components
   - Form validation
   - Dynamic form fields

## Key Differences from Vue

### State Management
**Pinia (Vue)**:
```js
const store = defineStore('workout', {
  state: () => ({ workouts: [] }),
  actions: { addWorkout() {} }
})
```

**Zustand (React)**:
```ts
const useWorkoutStore = create((set) => ({
  workouts: [],
  addWorkout: (workout) => set((state) => ({ ... }))
}))
```

### Routing
**Vue Router**:
```vue
<router-link to="/add">Add Workout</router-link>
<router-view />
```

**React Router**:
```tsx
<Link to="/add">Add Workout</Link>
<Outlet />
```

### Reactivity
- **Vue**: Automatic reactivity with `ref()` and `reactive()`
- **React**: Explicit updates with `useState()` and immutable state

### Templates vs JSX
- **Vue**: Template syntax with directives (`v-for`, `v-if`)
- **React**: JSX with JavaScript expressions (`.map()`, `&&`, ternary)

## Sample Data

The app comes with 2 sample workouts to help you get started:
1. Upper Body Strength
2. Leg Day

You can delete these and add your own workouts.

## Next Steps

Try modifying the app to practice:
- Add edit workout functionality
- Add filtering/search
- Persist data to localStorage
- Add exercise templates
- Create workout stats/analytics
- Add dark mode toggle

## Tips for Learning React

1. Think in components - Break UI into small, reusable pieces
2. State flows down, events flow up
3. Immutability is key - Never mutate state directly
4. Use TypeScript - Type safety helps catch bugs early
5. Read the React docs - They're excellent!

Enjoy learning React!
