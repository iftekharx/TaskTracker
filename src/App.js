import { useState, useEffect } from "react"
import "./App.css"
import { Header } from "./components/Header"
import { Tasks } from "./components/Tasks"
import { AddTask } from "./components/AddTask"
import { Footer } from "./components/Footer"
import { About } from "./components/About"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

function App() {
  const [showAddTask, setShowAddTask] = useState(false)

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])

  const fetchTasks = async () => {
    const res = await fetch(
      "https://tasktracker-server-json.onrender.com/tasks"
    )
    const data = res.json()
    return data
  }

  const fetchTask = async (id) => {
    const res = await fetch(
      `https://tasktracker-server-json.onrender.com/tasks/${id}`
    )
    const data = res.json()
    return data
  }

  // delete
  const deleteTask = async (id) => {
    await fetch(`https://tasktracker-server-json.onrender.com/tasks/${id}`, {
      method: "DELETE",
    })
    setTasks(tasks.filter((tasks) => tasks.id !== id))
  }

  // toggle
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(
      `https://tasktracker-server-json.onrender.com/tasks/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      }
    )

    const data = await res.json()

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    )
  }

  // add task
  const addTask = async (task) => {
    const res = await fetch(
      "https://tasktracker-server-json.onrender.com/tasks",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(task),
      }
    )

    const data = await res.json()

    setTasks([...tasks, data])

    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask])
  }
  return (
    <Router>
      <div className="container">
        <Header
          showAdd={showAddTask}
          onAdd={() => setShowAddTask(!showAddTask)}
          title={"Task Tracker"}
        />
        <Routes>
          <Route
            path="/TaskTracker"
            element={
              <>
                {showAddTask && <AddTask onAdd={addTask} />}
                {tasks.length > 0 ? (
                  <Tasks
                    onToggle={toggleReminder}
                    tasks={tasks}
                    onDelete={deleteTask}
                  />
                ) : (
                  "No Tasks To Show"
                )}
              </>
            }
          />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
