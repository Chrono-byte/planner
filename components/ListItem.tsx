import { Button } from "./Button.tsx";

// Define what a Reminder object looks like (its shape/structure)
export interface Reminder {
  id: string; // Unique identifier for each reminder
  text: string; // The main text content of the reminder
  completed: boolean; // Whether the reminder has been completed or not
  dueDate?: Date; // Optional due date (the ? means it's optional)
}

// Define the properties this component will receive
interface ListItemProps {
  reminder: Reminder; // The reminder to display
  onToggleComplete: (id: string) => void; // Function to call when toggling completion
  onDelete: (id: string) => void; // Function to call when deleting
}

// The ListItem component that displays a single reminder
export function ListItem(
  { reminder, onToggleComplete, onDelete }: ListItemProps,
) {
  // Format the date to be more readable (if it exists)
  const formattedDate = reminder.dueDate
    ? reminder.dueDate.toLocaleDateString()
    : null;

  // This renders our component
  return (
    <div class="flex items-center justify-between p-4 mb-2 border rounded-lg shadow-sm bg-white">
      <div class="flex items-center flex-1">
        {/* Checkbox to mark as complete/incomplete */}
        <input
          type="checkbox"
          checked={reminder.completed}
          onChange={() => onToggleComplete(reminder.id)}
          class="w-5 h-5 mr-4 accent-green-500"
        />
        <div class="flex flex-col">
          {/* The reminder text - add line-through style if completed */}
          <span
            class={`text-lg ${
              reminder.completed ? "line-through text-gray-500" : ""
            }`}
          >
            {reminder.text}
          </span>
          {/* Show the due date if it exists */}
          {formattedDate && (
            <span class="text-sm text-gray-500">
              Due: {formattedDate}
            </span>
          )}
        </div>
      </div>
      {/* Delete button */}
      <Button
        onClick={() => onDelete(reminder.id)}
        class="px-2 py-1 ml-4 text-white bg-red-500 border-red-500 hover:bg-red-600"
      >
        Delete
      </Button>
    </div>
  );
}
