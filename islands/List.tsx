// Import necessary libraries and components
import { useComputed, useSignal } from "@preact/signals"; // For state management
import { ListItem, type Reminder } from "../components/ListItem.tsx"; // The reminder item component
import { Button } from "../components/Button.tsx"; // Reusable button component
import { useEffect } from "preact/hooks"; // For lifecycle management

// Define what props our component accepts
interface ListProps {
  initialReminders?: Reminder[]; // Optional list of reminders to start with
}

// Main component function for managing a list of reminders
export default function List({ initialReminders = [] }: ListProps) {
  // State management using signals (similar to React's useState but more powerful)
  // These store the different pieces of data our app needs to track
  const reminders = useSignal<Reminder[]>(initialReminders); // All our reminders
  const newReminderText = useSignal(""); // Text for a new reminder being created
  const newReminderDate = useSignal(""); // Due date for a new reminder
  const filter = useSignal<"all" | "active" | "completed">("all"); // Current filter view

  // This runs once when the component first loads (like componentDidMount)
  // It loads any saved reminders from the browser's local storage
  useEffect(() => {
    try {
      // Try to get saved reminders from localStorage
      const savedReminders = localStorage.getItem("reminders");
      if (savedReminders) {
        // If we found saved data, parse it then convert date strings back to Date objects
        const parsedReminders = JSON.parse(savedReminders);
        const remindersWithDates = parsedReminders.map((
          reminder: Reminder,
        ) => ({
          ...reminder,
          dueDate: reminder.dueDate ? new Date(reminder.dueDate) : undefined,
        }));
        reminders.value = remindersWithDates;
      }
    } catch (e) {
      console.error("Failed to load reminders from localStorage", e);
    }
  }, []); // Empty array means this runs once on mount

  // This runs whenever our reminders change
  // It saves the current reminders to the browser's local storage
  useEffect(() => {
    try {
      localStorage.setItem("reminders", JSON.stringify(reminders.value));
    } catch (e) {
      console.error("Failed to save reminders to localStorage", e);
    }
  }, [reminders.value]); // Dependency array - runs when reminders change

  // Computed value that filters and sorts reminders based on current filter
  // This automatically updates whenever filter or reminders change
  const filteredReminders = useComputed(() => {
    // First, filter the reminders based on the selected filter
    let filtered: Reminder[];
    switch (filter.value) {
      case "active": // Show only active (not completed) reminders
        filtered = reminders.value.filter((r) => !r.completed);
        break;
      case "completed": // Show only completed reminders
        filtered = reminders.value.filter((r) => r.completed);
        break;
      default: // Show all reminders
        filtered = [...reminders.value];
        break;
    }

    // Then, sort them by due date (reminders with due dates first, then by date)
    return filtered.sort((a, b) => {
      // If neither has a due date, maintain original order
      if (!a.dueDate && !b.dueDate) return 0;
      // If only a has a due date, it comes first
      if (a.dueDate && !b.dueDate) return -1;
      // If only b has a due date, it comes first
      if (!a.dueDate && b.dueDate) return 1;
      // If both have due dates, compare them
      if (a.dueDate instanceof Date && b.dueDate instanceof Date) {
        return a.dueDate.getTime() - b.dueDate.getTime();
      }
      return 0;
    });
  });

  // Function to add a new reminder
  const addReminder = (e: Event) => {
    e.preventDefault(); // Prevent the form from refreshing the page
    if (!newReminderText.value.trim()) return; // Don't add empty reminders

    // Create a new reminder object
    const newReminder: Reminder = {
      id: crypto.randomUUID(), // Generate a unique ID
      text: newReminderText.value.trim(), // The reminder text
      completed: false, // New reminders start uncompleted
      dueDate: newReminderDate.value
        ? new Date(newReminderDate.value)
        : undefined, // Optional due date
    };

    // Add the new reminder to our list
    reminders.value = [...reminders.value, newReminder];

    // Reset the form fields
    newReminderText.value = "";
    newReminderDate.value = "";
  };

  // Function to toggle a reminder's completed status
  const toggleComplete = (id: string) => {
    // Map through all reminders and update the matching one
    reminders.value = reminders.value.map((reminder) =>
      reminder.id === id
        ? { ...reminder, completed: !reminder.completed }
        : reminder
    );
  };

  // Function to delete a reminder
  const deleteReminder = (id: string) => {
    // Filter out the reminder with the matching ID
    reminders.value = reminders.value.filter((reminder) => reminder.id !== id);
  };

  // Function

  // Function to clear all completed reminders
  const clearCompleted = () => {
    reminders.value = reminders.value.filter((reminder) => !reminder.completed);
  };

  // The JSX that renders our component's UI
  return (
    <div class="w-full max-w-lg mx-auto">
      {/* Page title */}
      <h1 class="mb-6 text-3xl font-bold text-center text-gray-800">
        Reminders
      </h1>

      {/* Form to add new reminders */}
      <form
        onSubmit={addReminder}
        class="mb-6 p-6 bg-white rounded-lg shadow-md"
      >
        <div class="mb-4">
          <label
            for="reminder-text"
            class="block text-sm font-medium text-gray-700 mb-2"
          >
            Reminder Text
          </label>
          <input
            id="reminder-text"
            type="text"
            placeholder="Add a new reminder..."
            value={newReminderText.value}
            onInput={(e) =>
              newReminderText.value = (e.target as HTMLInputElement).value}
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <div class="mb-4">
          <label
            for="reminder-date"
            class="block text-sm font-medium text-gray-700 mb-2"
          >
            Due Date (optional)
          </label>
          <input
            id="reminder-date"
            type="date"
            value={newReminderDate.value}
            onInput={(e) =>
              newReminderDate.value = (e.target as HTMLInputElement).value}
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <Button
          type="submit"
          class="w-full py-3 text-white bg-green-700 border-green-500 hover:bg-green-600"
        >
          Add Reminder
        </Button>
      </form>

      {/* Filter buttons to show different views */}
      <div class="mb-6 flex justify-center space-x-3">
        <Button
          onClick={() => filter.value = "all"}
          class={`px-5 py-2 font-medium rounded-full ${
            filter.value === "all"
              ? "border-green-500 bg-green-100 text-green-700"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          All
        </Button>
        <Button
          onClick={() => filter.value = "active"}
          class={`px-5 py-2 font-medium rounded-full ${
            filter.value === "active"
              ? "border-green-500 bg-green-100 text-green-700"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          Active
        </Button>
        <Button
          onClick={() => filter.value = "completed"}
          class={`px-5 py-2 font-medium rounded-full ${
            filter.value === "completed"
              ? "border-green-500 bg-green-100 text-green-700"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          Completed
        </Button>
      </div>

      {/* List of reminders */}
      <div class="space-y-3">
        {filteredReminders.value.length === 0
          ? (
            // Show this message when there are no reminders in the current filter
            <p class="text-center text-gray-500 p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              No reminders{" "}
              {filter.value !== "all" ? `marked as ${filter.value}` : ""}
            </p>
          )
          : (
            // Map through each reminder and render a ListItem component
            filteredReminders.value.map((reminder) => (
              <ListItem
                key={reminder.id}
                reminder={reminder}
                onToggleComplete={toggleComplete}
                onDelete={deleteReminder}
              />
            ))
          )}
      </div>

      {/* Show "Clear completed" button only when there are completed reminders */}
      {reminders.value.some((r) => r.completed) && (
        <div class="mt-5 text-center">
          <Button
            onClick={clearCompleted}
            class="text-red-500 border-red-300 hover:bg-red-50 font-medium px-5 py-2"
          >
            Clear completed
          </Button>
        </div>
      )}

      {/* Footer with summary information */}
      <div class="mt-8 text-center text-sm text-gray-600 pb-4">
        <span class="font-medium">{reminders.value.length}</span>{" "}
        reminder{reminders.value.length !== 1 ? "s" : ""} •{"  "}
        <span class="font-medium">
          {reminders.value.filter((r) => !r.completed).length}
        </span>{" "}
        active
      </div>
    </div>
  );
}
