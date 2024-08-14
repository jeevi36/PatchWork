import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TaskDashboard.css'; // Import the CSS file

const TaskDashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        status: 'Pending',
        priority: 'Low',
        dueDate: ''
    });
    const [selectedTask, setSelectedTask] = useState(null);
    const [filter, setFilter] = useState('');
    const [sort, setSort] = useState('title'); // Default sorting

    useEffect(() => {
        axios.get('/api/tasks')
            .then(response => setTasks(response.data))
            .catch(error => console.error('Error fetching tasks:', error));
    }, []);

    const handleCreateTask = () => {
        axios.post('/api/tasks', newTask)
            .then(response => {
                setTasks([...tasks, response.data]);
                setNewTask({
                    title: '',
                    description: '',
                    status: 'Pending',
                    priority: 'Low',
                    dueDate: ''
                });
            })
            .catch(error => console.error('Error creating task:', error));
    };

    const handleUpdateTask = (taskId) => {
        axios.put(`/api/tasks/${tasks}`, selectedTask)
            .then(response => {
                setTasks(tasks.map(task => (task.id === taskId ? response.data : task)));
                setSelectedTask(null);
            })
            .catch(error => console.error('Error updating task:', error));
    };

    const handleDeleteTask = (taskId) => {
        axios.delete(`/api/tasks/${taskId}`)
            .then(() => {
                setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
            })
            .catch(error => {
                console.error('Error deleting task:', error.response ? error.response.data : error.message);
                alert(`Failed to delete task: ${error.response ? error.response.data.message : error.message}`);
            });
    };
    
    
    

    const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(filter.toLowerCase())
    );

    const sortedTasks = filteredTasks.sort((a, b) => {
        if (sort === 'title') return a.title.localeCompare(b.title);
        if (sort === 'priority') return a.priority.localeCompare(b.priority);
        if (sort === 'dueDate') return new Date(a.dueDate) - new Date(b.dueDate);
        return 0;
    });

    return (
        <div className="task-dashboard-container">
            <h2>Task Dashboard</h2>

            {/* Task Creation Form */}
            <div className="task-form">
                <h3>Create New Task</h3>
                <input
                    type="text"
                    placeholder="Title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                />
                <textarea
                    placeholder="Description"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                />
                <select
                    value={newTask.status}
                    onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
                <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                <input
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                />
                <button onClick={handleCreateTask}>Create Task</button>
            </div>

            {/* Task Filters and Sorting */}
            <div className="task-filters">
                <input
                    type="text"
                    placeholder="Filter by title"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />
                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                >
                    <option value="title">Title</option>
                    <option value="priority">Priority</option>
                    <option value="dueDate">Due Date</option>
                </select>
            </div>

            {/* Task List */}
            {selectedTask && (
                <div className="task-form">
                    <h3>Edit Task</h3>
                    <input
                        type="text"
                        value={selectedTask.title}
                        onChange={(e) => setSelectedTask({ ...selectedTask, title: e.target.value })}
                    />
                    <textarea
                        value={selectedTask.description}
                        onChange={(e) => setSelectedTask({ ...selectedTask, description: e.target.value })}
                    />
                    <select
                        value={selectedTask.status}
                        onChange={(e) => setSelectedTask({ ...selectedTask, status: e.target.value })}
                    >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                    <select
                        value={selectedTask.priority}
                        onChange={(e) => setSelectedTask({ ...selectedTask, priority: e.target.value })}
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                    <input
                        type="date"
                        value={selectedTask.dueDate}
                        onChange={(e) => setSelectedTask({ ...selectedTask, dueDate: e.target.value })}
                    />
                    <button onClick={() => handleUpdateTask(selectedTask.id)}>Update Task</button>
                    <button onClick={() => setSelectedTask(null)}>Cancel</button>
                </div>
            )}

            <ul className="task-list">
                {sortedTasks.map(task => (
                    <li key={task.id} className="task-item">
                        <p>{task.title} - <span className={`status-badge ${task.status.toLowerCase().replace(' ', '-')}`}>{task.status}</span></p>
                        <button onClick={() => setSelectedTask(task)}>Edit</button>
                        <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskDashboard;
