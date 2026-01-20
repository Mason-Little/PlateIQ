import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExerciseDefinition } from '@/types/exercise';
import back from '@/data/exercises/back.json';
import biceps from '@/data/exercises/biceps.json';
import chest from '@/data/exercises/chest.json';
import delts from '@/data/exercises/delts.json';
import glutes from '@/data/exercises/glutes.json';
import hamstrings from '@/data/exercises/hamstrings.json';
import quads from '@/data/exercises/quads.json';
import triceps from '@/data/exercises/triceps.json';

const categories = {
  back: { name: 'Back', data: back as ExerciseDefinition[] },
  biceps: { name: 'Biceps', data: biceps as ExerciseDefinition[] },
  chest: { name: 'Chest', data: chest as ExerciseDefinition[] },
  delts: { name: 'Delts', data: delts as ExerciseDefinition[] },
  glutes: { name: 'Glutes', data: glutes as ExerciseDefinition[] },
  hamstrings: { name: 'Hamstrings', data: hamstrings as ExerciseDefinition[] },
  quads: { name: 'Quads', data: quads as ExerciseDefinition[] },
  triceps: { name: 'Triceps', data: triceps as ExerciseDefinition[] },
};

type CategoryKey = keyof typeof categories;

interface Props {
  onClose: () => void;
  onSelect?: (exercise: ExerciseDefinition) => void;
}

export function ExerciseSelector({ onClose, onSelect }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey | null>(
    null
  );
  const [search, setSearch] = useState('');

  const currentExercises = selectedCategory
    ? categories[selectedCategory].data
    : [];

  const filtered = currentExercises.filter(
    (ex) =>
      ex.name.toLowerCase().includes(search.toLowerCase()) ||
      ex.primary_muscle.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }} // Standard iOS sheet feel
      className="fixed inset-0 z-50 flex flex-col bg-white"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b px-4 py-3 shadow-sm bg-white z-10">
        <div className="flex flex-1 items-center overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            {selectedCategory ? (
              <motion.div
                key="category-header"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2"
              >
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setSearch('');
                  }}
                  className="rounded-full p-1 hover:bg-slate-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                    <polyline points="12 19 5 12 12 5"></polyline>
                  </svg>
                </button>
                <h2 className="text-xl font-semibold">
                  {categories[selectedCategory].name}
                </h2>
              </motion.div>
            ) : (
              <motion.h2
                key="root-header"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="text-xl font-semibold"
              >
                Select Category
              </motion.h2>
            )}
          </AnimatePresence>
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
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
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </motion.button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden relative bg-slate-50">
        <AnimatePresence mode="wait" initial={false}>
          {!selectedCategory ? (
            // Category Grid
            <motion.div
              key="categories"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ ease: 'easeInOut', duration: 0.2 }}
              className="absolute inset-0 overflow-y-auto p-4"
            >
              <div className="grid grid-cols-2 gap-4">
                {(Object.keys(categories) as CategoryKey[]).map((key) => (
                  <motion.button
                    key={key}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedCategory(key)}
                    className="flex aspect-square flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <span className="text-lg font-medium text-slate-900">
                      {categories[key].name}
                    </span>
                    <span className="mt-1 text-sm text-slate-500">
                      {categories[key].data.length} exercises
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            // Exercise List
            <motion.div
              key="exercises"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 50, opacity: 0 }}
              transition={{ ease: 'easeInOut', duration: 0.2 }}
              className="absolute inset-0 overflow-y-auto p-4"
            >
              <div className="flex h-full flex-col">
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder={`Search ${categories[selectedCategory].name}...`}
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    autoFocus
                  />
                </div>

                <div className="space-y-2 pb-8">
                  {filtered.map((ex) => (
                    <motion.button
                      key={ex.id}
                      whileTap={{ scale: 0.98 }}
                      className="flex w-full flex-col rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm transition-shadow hover:shadow-md"
                      onClick={() => onSelect?.(ex)}
                    >
                      <div className="font-medium text-slate-900">
                        {ex.name}
                      </div>
                      <div className="mt-1 flex gap-2">
                        <span className="inline-flex items-center rounded bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-800 capitalize">
                          {ex.primary_muscle}
                        </span>
                        {ex.resistance_type && (
                          <span className="inline-flex items-center rounded bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-800 capitalize">
                            {ex.resistance_type.replace('_', ' ')}
                          </span>
                        )}
                      </div>
                    </motion.button>
                  ))}
                  {filtered.length === 0 && (
                    <p className="py-8 text-center text-slate-500">
                      No exercises found
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
