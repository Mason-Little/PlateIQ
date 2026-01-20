import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ExerciseSelector } from '@components/ExerciseSelector';

export default function Home() {
  const [showSelector, setShowSelector] = useState(false);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-2xl px-6 py-16">
        <h1 className="text-3xl font-semibold">React Gym</h1>
      </section>

      <AnimatePresence>
        {showSelector && (
          <ExerciseSelector
            onClose={() => setShowSelector(false)}
            onSelect={(ex) => {
              console.log('Selected:', ex);
              setShowSelector(false);
            }}
          />
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowSelector(true)}
        className="fixed bottom-8 right-8 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label="Action button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </motion.button>
    </main>
  );
}
