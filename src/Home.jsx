import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaHome, FaCalendarAlt, FaChartLine, FaCog, FaPlus, FaTimes, FaTrophy, FaUserCircle, FaBell, FaSearch, FaClipboardList, FaRegClock, FaRegStar, FaRegLightbulb, FaSignOutAlt, FaUserCog, FaEllipsisV } from 'react-icons/fa'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'

const Home = () => {
  const [habits, setHabits] = useState(() => {
    const savedHabits = localStorage.getItem('habits')
    return savedHabits ? JSON.parse(savedHabits) : [
      { id: 1, name: 'Meditating', completed: false, streak: 3, category: 'Wellness' },
      { id: 2, name: 'Read Philosophy', completed: false, streak: 5, category: 'Learning' },
      { id: 3, name: 'Journaling', completed: false, streak: 2, category: 'Wellness' },
      { id: 4, name: 'Exercise', completed: false, streak: 7, category: 'Health' },
      { id: 5, name: 'Learn a new language', completed: false, streak: 1, category: 'Learning' },
    ]
  })

  const [newHabit, setNewHabit] = useState('')
  const [activeTab, setActiveTab] = useState('habits')
  const [showSettings, setShowSettings] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [notifications, setNotifications] = useState([
    { id: 1, message: "You've achieved a 7-day streak!", read: false },
    { id: 2, message: "New feature: Weekly reports now available", read: false },
  ])
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showAddHabitModal, setShowAddHabitModal] = useState(false)
  const [newHabitGoal, setNewHabitGoal] = useState('')
  const [newHabitPeriod, setNewHabitPeriod] = useState('1 Month (30 Days)')
  const [newHabitType, setNewHabitType] = useState('Everyday')
  const [userName, setUserName] = useState('')
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits))
  }, [habits])

  useEffect(() => {
    // Retrieve the user's name from local storage
    const storedName = localStorage.getItem('userName')
    if (storedName) {
      setUserName(storedName)
    } else {
      // If no name is stored, prompt the user
      const name = prompt('Please enter your name:')
      if (name) {
        localStorage.setItem('userName', name)
        setUserName(name)
      }
    }
  }, [])

  const currentDate = format(new Date(), 'EEE, d MMMM yyyy')

  const completedHabits = habits.filter(habit => habit.completed).length
  const totalHabits = habits.length
  const completionPercentage = totalHabits > 0 ? Math.round((completedHabits / totalHabits) * 100) : 0

  const toggleHabit = (id) => {
    const updatedHabits = habits.map(habit =>
      habit.id === id ? { ...habit, completed: !habit.completed, streak: habit.completed ? habit.streak : habit.streak + 1 } : habit
    )
    setHabits(updatedHabits)
    const habit = updatedHabits.find(h => h.id === id)
    if (habit.completed) {
      toast.success(`Great job! You've completed "${habit.name}"!`)
    }
  }

  const addHabit = (e) => {
    e.preventDefault()
    if (newHabit.trim() && newHabitGoal.trim()) {
      const newId = Math.max(...habits.map(h => h.id), 0) + 1
      setHabits([...habits, {
        id: newId,
        name: newHabit,
        goal: newHabitGoal,
        period: newHabitPeriod,
        type: newHabitType,
        completed: false,
        streak: 0,
        category: 'Uncategorized'
      }])
      setNewHabit('')
      setNewHabitGoal('')
      setNewHabitPeriod('1 Month (30 Days)')
      setNewHabitType('Everyday')
      setShowAddHabitModal(false)
      setShowConfirmationModal(true)
    }
  }

  const deleteHabit = (id) => {
    const habitToDelete = habits.find(h => h.id === id)
    setHabits(habits.filter(habit => habit.id !== id))
    toast.warn(`Habit "${habitToDelete.name}" deleted.`)
  }

  const markAllNotificationsAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
  }

  const filteredHabits = habits.filter(habit =>
    habit.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const pieChartData = [
    { name: 'Completed', value: completedHabits },
    { name: 'Remaining', value: totalHabits - completedHabits },
  ]

  const COLORS = ['#00C49F', '#FFBB28']

  const mockChartData = [
    { name: 'Mon', completed: 3 },
    { name: 'Tue', completed: 4 },
    { name: 'Wed', completed: 2 },
    { name: 'Thu', completed: 5 },
    { name: 'Fri', completed: 3 },
    { name: 'Sat', completed: 4 },
    { name: 'Sun', completed: 5 },
  ]

  return (
    <div className="bg-gray-100 min-h-screen relative">
      <ToastContainer position="bottom-right" />
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-2xl font-bold text-orange-500">HabitRail</h1>
            </div>
            <div className="flex items-center">
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link to={"/"} className="border-orange-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  <FaHome className="mr-1" /> Home
                </Link>
                <Link to={"/progress"} className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  <FaChartLine className="mr-1" /> Progress
                </Link>
                <Link to={"/settings"} className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  <FaCog className="mr-1" /> Settings
                </Link>
              </div>
              <div className="ml-4 flex items-center">
                {/* Notifications button */}
                <div className="ml-4 relative">
                  <button 
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  >
                    <FaBell size={20} />
                    {notifications.some(n => !n.read) && (
                      <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
                    )}
                  </button>
                  {showNotifications && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {notifications.map(notification => (
                        <a
                          key={notification.id}
                          href="#"
                          className={`block px-4 py-2 text-sm text-gray-700 ${notification.read ? '' : 'font-bold'}`}
                        >
                          {notification.message}
                        </a>
                      ))}
                      <button
                        onClick={markAllNotificationsAsRead}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Mark all as read
                      </button>
                    </div>
                  )}
                </div>
                {/* User menu */}
                <div className="ml-4 relative">
                  <button 
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  >
                    <FaUserCircle size={32} className="text-white" />
                  </button>
                  {showUserMenu && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <FaUserCog className="inline mr-2" /> Profile Settings
                      </a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <FaSignOutAlt className="inline mr-2" /> Sign out
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full lg:w-2/3 px-4">
              {/* Today's Habits section */}
              <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-semibold">Today's Habits</h2>
                  <Link to="/all-habits" className="text-orange-500 hover:text-orange-600">See all</Link>
                </div>
                <ul className="space-y-2">
                  <AnimatePresence>
                    {filteredHabits.map((habit) => (
                      <motion.li 
                        key={habit.id} 
                        className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={habit.completed}
                            onChange={() => toggleHabit(habit.id)}
                            className="w-5 h-5 text-green-500 border-gray-300 rounded-full focus:ring-green-500 cursor-pointer mr-3"
                          />
                          <span className={`text-lg ${habit.completed ? 'text-green-500' : 'text-gray-700'} transition-colors duration-200`}>
                            {habit.name}
                          </span>
                        </div>
                        <button 
                          className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                        >
                          <FaEllipsisV size={16} />
                        </button>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              </div>

              {/* Your Goals section */}
              <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-semibold">Your Goals</h2>
                  <Link to="/all-goals" className="text-orange-500 hover:text-orange-600">See all</Link>
                </div>
                <ul className="space-y-4">
                  {habits.slice(0, 2).map((habit) => (
                    <li key={habit.id} className="pb-4 last:pb-0">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-lg font-medium">{habit.name}</span>
                        <button className="text-gray-400 hover:text-gray-600">
                          <FaEllipsisV size={16} />
                        </button>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                        <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: `${(habit.streak / 7) * 100}%` }}></div>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">{habit.streak} from 7 days target</span>
                        <span className="text-orange-500">{habit.type}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Weekly Progress section */}
              <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <h2 className="text-2xl font-semibold mb-4">Weekly Progress</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={mockChartData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="completed" stroke="#8884d8" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="w-full lg:w-1/3 px-4">
              <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <h2 className="text-2xl font-semibold mb-4">Today's Progress</h2>
                <div className="flex justify-center">
                  <ResponsiveContainer width={200} height={200}>
                    <PieChart>
                      <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-center mt-4">
                  <p className="text-3xl font-bold">{completedHabits} of {totalHabits}</p>
                  <p className="text-gray-600">habits completed today</p>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <h2 className="text-2xl font-semibold mb-4">Quick Stats</h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <FaRegClock className="text-orange-500 mr-2" size={24} />
                    <div>
                      <p className="text-gray-600">Longest Streak</p>
                      <p className="text-2xl font-bold">{Math.max(...habits.map(h => h.streak))} days</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FaClipboardList className="text-orange-500 mr-2" size={24} />
                    <div>
                      <p className="text-gray-600">Total Habits</p>
                      <p className="text-2xl font-bold">{totalHabits}</p>
                    </div>
                    </div>
                  <div className="flex items-center">
                    <FaChartLine className="text-orange-500 mr-2" size={24} />
                    <div>
                      <p className="text-gray-600">Completion Rate</p>
                      <p className="text-2xl font-bold">{completionPercentage}%</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-semibold mb-4">Achievements</h2>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col items-center">
                    <FaTrophy className="text-yellow-500 text-4xl mb-2" />
                    <span className="text-sm text-center">5-Day Streak</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <FaRegStar className="text-gray-400 text-4xl mb-2" />
                    <span className="text-sm text-center">10 Habits Completed</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <FaRegLightbulb className="text-yellow-700 text-4xl mb-2" />
                    <span className="text-sm text-center">30-Day Challenge</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showSettings && (
        <motion.div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="bg-white rounded-lg p-8 w-1/2">
            <h2 className="text-2xl font-semibold mb-4">Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Theme</label>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Light</option>
                  <option>Dark</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Notification Preferences</label>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center">
                    <input id="push" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    <label htmlFor="push" className="ml-2 block text-sm text-gray-900">Push Notifications</label>
                  </div>
                  <div className="flex items-center">
                    <input id="email" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    <label htmlFor="email" className="ml-2 block text-sm text-gray-900">Email Notifications</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button 
                onClick={() => setShowSettings(false)}
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button 
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                Save Changes
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Add Floating Action Button */}
      <button
        onClick={() => setShowAddHabitModal(true)}
        className="fixed right-8 bottom-8 bg-green-500 text-white rounded-full p-4 shadow-lg hover:bg-green-600 transition-colors duration-200"
      >
        <FaPlus size={24} />
      </button>

      {/* Add Habit Modal */}
      {showAddHabitModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Create New Habit Goal</h2>
              <button onClick={() => setShowAddHabitModal(false)} className="text-gray-500 hover:text-gray-700">
                <FaTimes />
              </button>
            </div>
            <form onSubmit={addHabit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Goal</label>
                <input
                  type="text"
                  value={newHabitGoal}
                  onChange={(e) => setNewHabitGoal(e.target.value)}
                  placeholder="Enter your goal"
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Habit Name</label>
                <input
                  type="text"
                  value={newHabit}
                  onChange={(e) => setNewHabit(e.target.value)}
                  placeholder="Enter habit name"
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Period</label>
                <select
                  value={newHabitPeriod}
                  onChange={(e) => setNewHabitPeriod(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                >
                  <option>1 Month (30 Days)</option>
                  <option>2 Months (60 Days)</option>
                  <option>3 Months (90 Days)</option>
                </select>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Habit Type</label>
                <select
                  value={newHabitType}
                  onChange={(e) => setNewHabitType(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                >
                  <option>Everyday</option>
                  <option>Weekdays</option>
                  <option>Weekends</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
              >
                Create New
              </button>
            </form>
          </div>
        </div>
      )}

      {showConfirmationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-80 text-center">
            <div className="mb-4">
              <svg className="mx-auto w-16 h-16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 3H15L17 5H21C21.5523 5 22 5.44772 22 6V18C22 18.5523 21.5523 19 21 19H3C2.44772 19 2 18.5523 2 18V6C2 5.44772 2.44772 5 3 5H7L9 3Z" stroke="#FF9500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 13L11 15L15 11" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">Done!</h2>
            <p className="text-gray-600 mb-6">New Habit Goal has been added! Let's do the best to achieve your goal!</p>
            <button
              onClick={() => setShowConfirmationModal(false)}
              className="w-full px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
            >
              OK
            </button>
          </div>
        </div>
      )}

    </div>
  )
}

export default Home
