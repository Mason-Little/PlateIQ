import { useExercises } from "@/hooks/useExercises";
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from "@mui/material";
import { useState } from "react";

interface ExerciseSelectorProps {
	onSelect: (exercise: string) => void;
}

export const ExerciseSelector: React.FC<ExerciseSelectorProps> = ({
	onSelect,
}) => {
	const { exercises } = useExercises();
	const [filter, setFilter] = useState("");
	const [open, setOpen] = useState(false);
	const filteredExercises = exercises.filter((exercise) =>
		exercise.primaryMuscle.includes(filter),
	);

	const muscleGroups = exercises.reduce((acc, exercise) => {
		if (!acc.includes(exercise.primaryMuscle)) {
			acc.push(exercise.primaryMuscle);
		}
		return acc;
	}, [] as string[]);

	const handleAddEntry = (exercise: string) => {
		onSelect(exercise);
		setOpen(false);
		setFilter("");
	};

	const handleClose = () => {
		setOpen(false);
		setFilter("");
	};

	return (
		<>
			<Button onClick={() => setOpen(true)}>Add Exercise</Button>

			<Dialog open={open} onClose={() => handleClose()}>
				<DialogTitle>Exercise Selector</DialogTitle>
				<Box
					sx={{ display: "flex", justifyContent: "flex-end", marginBottom: 2 }}
				>
					{filter && (
						<Button onClick={() => setFilter("")}>Clear Filter</Button>
					)}
				</Box>
				<DialogContent>
					{filter ? (
						<Box
							sx={{
								flexDirection: "column",
								gap: 2,
								display: "flex",
								flexWrap: "wrap",
							}}
						>
							{filteredExercises.map((exercise) => (
								<Button
									fullWidth
									variant="outlined"
									onClick={() => handleAddEntry(exercise.slug)}
									key={exercise.slug}
								>
									{exercise.name}
								</Button>
							))}
						</Box>
					) : (
						<Box
							sx={{
								display: "grid",
								gridTemplateColumns: "repeat(3, 1fr)",
								gap: 2,
							}}
						>
							{muscleGroups.map((muscleGroup) => (
								<Button
									variant="outlined"
									onClick={() => setFilter(muscleGroup)}
									key={muscleGroup}
									fullWidth
								>
									{muscleGroup}
								</Button>
							))}
						</Box>
					)}
				</DialogContent>
				<DialogActions>
					<Button onClick={() => handleClose()}>Cancel</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};
