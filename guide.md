# Lab Guide: Programming – Reminders App

This guide supports students in exploring the basics of making a Reminders App
in TypeScript with Deno Fresh.

## Table of Contents

1. [Getting Started: Setting Up Your Project](#getting-started-setting-up-your-project)
2. [Creating Your First Components](#creating-your-first-components)
3. [Building the Components](#building-the-components)
   - [Building the ListItem Component](#building-the-listitem-component)
   - [Building the List Component](#building-the-list-component)
4. [Tying it all together in routes/index.tsx](#tying-it-all-together-in-routesindextsx)
5. [Conclusion](#conclusion)
   - [What is Tailwind CSS?](#what-is-tailwind-css)

## Getting Started: Setting Up Your Project

---

First, you'll need to get the starter code for our project.

1. **Open the Project:** Navigate to the project's GitHub page:
   [https://github.com/Chrono-byte/planner](https://github.com/Chrono-byte/planner).
2. **Access the Code:** Click on the green `<> Code` button.
3. **Create a Codespace:** In the dropdown menu, select the "Codespaces" tab and
   click "Create a codespace on main". This will set up a development
   computer.

Once everything is set up, you will have a blank Deno Fresh project. Fresh is a
web framework that we'll use to build our application.

## Creating Your First Components

---

In web development, we often break our user interface into reusable pieces
called **components**. For our planner, we will need two main components:

- `List`: This will be the main component that displays all our reminders and
  buttons to manage them.
- `ListItem`: This will be a smaller component that displays a single reminder.

Deno Fresh distinguishes between two types of components: Islands, which are
dynamic and can change with code, and Components, which are static and remain
unchanged.

Let's create the files for these components. In the file explorer on the left
side of your Codespace, navigate to the `islands/` directory and create a new
file named `List.tsx`. Then, navigate to the `components/` directory and create
a new file named `ListItem.tsx`.

## Building the Components

---

### Building the `ListItem` Component

Let's start by setting up the basic structure for our `ListItem` component. This
component will be responsible for displaying a single to-do item.

Open the `components/ListItem.tsx` file and add the following code:

```tsx
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
  // Component logic will go here

  return (
    <div class="flex items-center justify-between p-3 mb-1 border border-gray-200 bg-white">
      {/* Component UI will go here */}
    </div>
  );
}
```

#### Explanation of the `ListItem` Code

- **`import { Button } from "./Button.tsx";`**: This line imports a `Button`
  component that we can use in our `ListItem`.
- **`export interface Reminder`**: An `interface` is like a blueprint for an
  object. Here, we're defining what a `Reminder` object looks like. It must have
  an `id`, `text`, and `completed` status, and it can optionally have a
  `dueDate`.
- **`interface ListItemProps`**: This interface defines the `props` (properties)
  that our `ListItem` component will accept. Props are how components receive
  data. Our `ListItem` needs the `reminder` it's going to display, as well as
  functions to handle toggling its completion status and deleting it.
- **`export function ListItem(...)`**: This is the main function for our
  component. It receives the `props` we just defined.
- **`return (...)`**: This is the part that defines the structure of our
  component. For now, it's just an empty `div` with some styling.

Now let's add the logic to format the due date and display all the reminder
information.

Add the date formatting logic inside the `ListItem` function, before the
`return` statement:

```tsx
// ...existing code...

export function ListItem(
  { reminder, onToggleComplete, onDelete }: ListItemProps,
) {
  // Format the date to be more readable (if it exists)
  const formattedDate = reminder.dueDate
    ? reminder.dueDate.toLocaleDateString()
    : null;

  // Rest of component...
}
```

#### Explanation of Date Formatting

- **`const formattedDate = ...`**: We're creating a variable to hold our nicely
  formatted date.
- **`reminder.dueDate ? ... : null`**: This is a ternary operator, which is a
  compact way of writing an if-else statement. It checks if `reminder.dueDate`
  exists. If it does, it formats the date using `toLocaleDateString()`. If not,
  it sets `formattedDate` to `null`.

Now, let's add the UI inside the `return` statement to display the reminder's
text, the formatted date, and a delete button.

```tsx
// ...existing code...

export function ListItem({ reminder, onToggleComplete, onDelete }: ListItemProps) {
  // ...existing date formatting...

  return (
    <div class="flex items-center justify-between p-3 mb-1 border border-gray-200 bg-white">
      <div class="flex items-center flex-1">
        {/* Checkbox to mark as complete/incomplete */}
        <input
          type="checkbox"
          checked={reminder.completed}
          onChange={() => onToggleComplete(reminder.id)}
          class="w-4 h-4 mr-3"
        />
        <div class="flex flex-col">
          {/* The reminder text - add line-through style if completed */}
          <span
            class={`${reminder.completed ? "line-through text-gray-500" : ""}`}
          >
            {reminder.text}
          </span>
          
          {/* Show the due date if it exists */}
          {formattedDate && (
            <span class="text-xs text-gray-500">
              Due: {formattedDate}
            </span>
          )}
        </div>
      </div>
      
      {/* Delete button */}
      <Button
        onClick={() => onDelete(reminder.id)}
        class="px-2 py-1 ml-4 text-red-600 border border-gray-300 hover:bg-red-600 hover:text-white"
      >
        Delete
      </Button>
    </div>
  );
}
```

#### Explanation of the UI

- **`<input type="checkbox">`**: This creates the checkbox. Its `checked` status
  is tied to `reminder.completed`, and when it's clicked (`onChange`), it calls
  the `onToggleComplete` function we passed in through the props.
- **`<span class={...}>`**: This displays the reminder text. The `class` uses a
  template literal to conditionally add a `line-through` style if the reminder
  is completed.
- **`{formattedDate && ...}`**: This is a way to conditionally render something.
  If `formattedDate` is not `null`, the `span` with the due date will be
  displayed.
- **`<Button>`**: This is our delete button. When clicked, it calls the
  `onDelete` function.

That's it for our `ListItem` component! It's now a self-contained, reusable
piece of our UI.

### Building the `List` Component

---

Now let's move on to the `List` component, which will manage the state of all
our reminders.

Open the `islands/List.tsx` file and add the following basic structure:

```tsx
import { useSignal, useComputed } from "@preact/signals";
import { ListItem, type Reminder } from "../components/ListItem.tsx";
import { Button } from "../components/Button.tsx";
import { useEffect } from "preact/hooks";

// Define what props our component accepts
interface ListProps {
  initialReminders?: Reminder[];
}

// Main component function for managing a list of reminders
export default function List({ initialReminders = [] }: ListProps) {
  // Component state and logic will go here

  return (
    <div class="w-full max-w-lg mx-auto">
      {/* Component UI will go here */}
    </div>
  );
}
```

#### Explanation of the `List` Structure

- **`import ...`**: We're importing various functions and components.
  `useSignal` and `useComputed` are from Preact Signals, a library for managing
  state. `useEffect` is a hook from Preact for handling side effects. We also
  import our `ListItem` component.
- **`interface ListProps`**: Defines that our `List` component can accept an
  optional array of `initialReminders`.
- **`export default function List(...)`**: The main function for our `List`
  component.

#### State Management with Signals

Now, let's add state to our `List` component using signals. A **signal** is a
special object that holds a value. When that value changes, any part of our UI
that uses that signal will automatically update.

```tsx
// ...existing code...

export default function List({ initialReminders = [] }: ListProps) {
  // State management using signals (similar to React's useState but more powerful)
  // These store the different pieces of data our app needs to track
  const reminders = useSignal<Reminder[]>(initialReminders);  // All our reminders
  const newReminderText = useSignal("");  // Text for a new reminder being created
  const newReminderDate = useSignal("");  // Due date for a new reminder
  const filter = useSignal<"all" | "active" | "completed">("all");  // Current filter view

  // Rest of component...
}
```

##### Explanation of State Signals

- **`reminders`**: This signal will hold our array of reminder objects.
- **`newReminderText` and `newReminderDate`**: These signals will be linked to
  the input fields for adding a new reminder.
- **`filter`**: This signal will keep track of which reminders to show ("all",
  "active", or "completed").

#### Saving and Loading from `localStorage`

To make sure our reminders don't disappear when we refresh the page, we'll save
them to `localStorage`, which is a small storage area in the browser. We use the
`useEffect` hook to handle this.

```tsx
// ...existing code...

export default function List({ initialReminders = [] }: ListProps) {
  // ...existing state...

  // Load reminders from localStorage on mount
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
  }, []);

  // Save reminders to localStorage when they change
  useEffect(() => {
    try {
      localStorage.setItem("reminders", JSON.stringify(reminders.value));
    } catch (e) {
      console.error("Failed to save reminders to localStorage", e);
    }
  }, [reminders.value]);

  // Rest of component...
}
```

##### Explanation of `useEffect`

- **First `useEffect`**: The empty dependency array `[]` at the end means this
  effect runs only once when the component first loads. It tries to get the
  reminders from `localStorage`, parse the JSON string back into an array, and
  update the `reminders` signal.
- **Second `useEffect`**: This effect has `[reminders.value]` as its dependency.
  This means it will run every time the value of the `reminders` signal changes.
  It saves the current list of reminders to `localStorage`.

#### Filtering Reminders

Next, we'll create a **computed** value. A computed value is derived from other
signals and will also update automatically when its dependencies change.

```tsx
// ...existing code...

export default function List({ initialReminders = [] }: ListProps) {
  // ...existing state and effects...

  // Computed value for filtered reminders
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

  // Rest of component...
}
```

##### Explanation of `useComputed`

- **`filteredReminders`**: This computed value depends on the `filter` and
  `reminders` signals. Whenever either of those changes, this code re-runs. It
  uses the `filter()` array method to return only the reminders that match the
  current filter setting.

#### Handling User Actions

We need to create functions to handle adding, toggling, deleting, and clearing
reminders. These functions will update our `reminders` signal.

```tsx
// ...existing code...

export default function List({ initialReminders = [] }: ListProps) {
  // ...existing state, effects, and computed values...

  // Function to add a new reminder
  const addReminder = (e: Event) => {
    e.preventDefault();
    if (!newReminderText.value.trim()) return;

    const newReminder: Reminder = {
      id: crypto.randomUUID(),
      text: newReminderText.value.trim(),
      completed: false,
      dueDate: newReminderDate.value ? new Date(newReminderDate.value) : undefined,
    };

    reminders.value = [...reminders.value, newReminder];

    // Reset form fields
    newReminderText.value = "";
    newReminderDate.value = "";
  };

  // Toggle a reminder's completed status
  const toggleComplete = (id: string) => {
    reminders.value = reminders.value.map(reminder =>
      reminder.id === id ? { ...reminder, completed: !reminder.completed } : reminder
    );
  };

  // Delete a reminder
  const deleteReminder = (id: string) => {
    reminders.value = reminders.value.filter(reminder => reminder.id !== id);
  };

  // Clear all completed reminders
  const clearCompleted = () => {
    reminders.value = reminders.value.filter(reminder => !reminder.completed);
  };

  // Rest of component...
}
```

##### Explanation of Handler Functions

- **`addReminder`**: Creates a new reminder object and adds it to our
  `reminders` array. It uses `crypto.randomUUID()` to generate a unique ID.
- **`toggleComplete`**: Finds the reminder with the matching `id` and flips its
  `completed` status.
- **`deleteReminder`**: Creates a new array that includes all reminders _except_
  the one with the matching `id`.
- **`clearCompleted`**: Filters the array to keep only the reminders that are
  not completed.

#### Building the User Interface

Finally, let's build the UI for the `List` component. We'll add a form for new
reminders, filter buttons, and the list of reminders itself.

First, add the form and filter buttons inside the `return` statement:

```tsx
// ...existing code...

export default function List({ initialReminders = [] }: ListProps) {
  // ...existing state, effects, computed values, and handlers...

  return (
    <div class="w-full mx-auto px-4">
      {/* Page title */}
      <h1 class="mb-6 text-xl text-center text-gray-800 border-b border-gray-200 pb-2">
        Reminders
      </h1>

      {/* Form to add new reminders */}
      <form
        onSubmit={addReminder}
        class="mb-6 p-4 bg-white border border-gray-200"
      >
        <div class="mb-4">
          <label
            for="reminder-text"
            class="block text-sm mb-2"
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
            class="w-full p-2 border border-gray-300 focus:outline-none"
            autoComplete="off"
          />
        </div>
        <div class="mb-4">
          <label
            for="reminder-date"
            class="block text-sm mb-2"
          >
            Due Date (optional)
          </label>
          <input
            id="reminder-date"
            type="date"
            value={newReminderDate.value}
            onInput={(e) =>
              newReminderDate.value = (e.target as HTMLInputElement).value}
            class="w-full p-2 border border-gray-300 focus:outline-none"
          />
        </div>
        <Button
          type="submit"
          class="w-full py-2 text-black bg-gray-100 border border-gray-300 hover:bg-gray-200"
        >
          Add Reminder
        </Button>
      </form>

      {/* Filter buttons to show different views */}
      <div class="mb-6 flex justify-center space-x-3">
        <Button
          onClick={() => filter.value = "all"}
          class={`px-4 py-1 ${
            filter.value === "all"
              ? "border-b-2 border-gray-800 font-bold"
              : "text-gray-600 hover:border-gray-300"
          }`}
        >
          All
        </Button>
        <Button
          onClick={() => filter.value = "active"}
          class={`px-4 py-1 ${
            filter.value === "active"
              ? "border-b-1 border-gray-800 font-bold"
              : "text-gray-600 hover:border-gray-300"
          }`}
        >
          Active
        </Button>
        <Button
          onClick={() => filter.value = "completed"}
          class={`px-4 py-1 ${
            filter.value === "completed"
              ? "border-b-1 border-gray-800 font-bold"
              : "text-gray-600 hover:border-gray-300"
          }`}
        >
          Completed
        </Button>
      </div>

      {/* Rest of component... */}
    </div>
  );
}
```

Now, add the list of reminders and the footer:

```tsx
// ...existing code...

export default function List({ initialReminders = [] }: ListProps) {
  // ...existing state, effects, computed values, and handlers...

  return (
    <div class="w-full max-w-lg mx-auto">
      {/* ...existing title, form and filter UI... */}

      {/* List of reminders */}
      <div class="space-y-1">
        {filteredReminders.value.length === 0
          ? (
            // Show this message when there are no reminders in the current filter
            <p class="text-center text-gray-500 p-4 bg-white border border-gray-200">
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
        <div class="mt-4 text-center">
          <Button
            onClick={clearCompleted}
            class="text-gray-700 border border-gray-300 hover:bg-gray-100 px-4 py-1"
          >
            Clear completed
          </Button>
        </div>
      )}

      {/* Footer with summary information */}
      <div class="mt-8 text-center text-xs text-gray-600 pb-4 border-t border-gray-200 pt-2">
        <span>{reminders.value.length}</span>{" "}
        reminder{reminders.value.length !== 1 ? "s" : ""} |{"  "}
        <span>
          {reminders.value.filter((r) => !r.completed).length}
        </span>{" "}
        active
      </div>
    </div>
  );
}
```

##### Explanation of the Final UI

- **`<form>`**: The form's `onSubmit` event is linked to our `addReminder`
  function. The input fields' `value` and `onInput` are bound to our
  `newReminderText` and `newReminderDate` signals, creating a two-way data
  binding.
- **Filter Buttons**: Each button has an `onClick` handler that updates the
  `filter` signal to the corresponding value.
- **List of Reminders**: Here, we use our `filteredReminders` computed value.
  The `.map()` function iterates over the array and renders a `ListItem`
  component for each reminder. We pass the necessary props (`reminder`,
  `onToggleComplete`, `deleteReminder`) down to each `ListItem`.
- **Conditional Rendering**: We show a "No reminders" message if the list is
  empty and only show the "Clear completed" button if there is at least one
  completed reminder.

## Tying it all together in `routes/index.tsx`

---

Last step, change our main file to render the final page.

```tsx
import List from "../islands/List.tsx";

export default function Home() {
  return (
    <div class="p-4 mx-auto min-h-screen">
      <div class="max-w-xl mx-auto">
        <List />
      </div>
    </div>
  );
}
```

## Conclusion

---

Congratulations! You have successfully built a simple reminders app. You've
learned about components, props, state management with signals, handling user
events, and saving data to `localStorage`.

### What is Tailwind CSS?

You'll notice `class="..."` attributes throughout our code. These are Tailwind
CSS framework that lets us style components directly in our app instead of
writing custom CSS.

**Example:**

`<div class="flex items-center justify-between p-3 mb-1 border border-gray-200 bg-white">`

Each class has a specific purpose:

- `flex`: Makes element flexible
- `items-center`: Centers items vertically
- `p-4`: Adds padding
- `border`: Adds a border
- `rounded-lg`: Rounds corners
- `bg-white`: Sets white background

By combining these classes, we can create complex designs without writing
separate CSS files.

For bonus, try changing around the styling to make this app all your own. You
can read all the documentation for Tailwind on their website:
[https://tailwindcss.com/docs/](https://tailwindcss.com/docs/aspect-ratio)
