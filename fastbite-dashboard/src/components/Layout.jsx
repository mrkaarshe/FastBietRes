"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  LayoutDashboard,
  Plus,
  List,
  ShoppingBag,
  LogOut,
  Menu,
  X,
  ArrowRightLeft,
  User
} from "lucide-react"
import { Button } from "./ui/button"

export default function Layout({ children, onLogout }) {
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true)
  const user = JSON.parse(localStorage.getItem("user")) || {}

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Add Food", href: "/add-food", icon: Plus },
    { name: "Manage Foods", href: "/manage-foods", icon: List },
    { name: "Orders", href: "/orders", icon: ShoppingBag },
  ]

  const isActive = (path) => location.pathname === path

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    onLogout()
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      
      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-black border-r border-zinc-800 z-40
          transition-all duration-300 ease-in-out
          ${sidebarCollapsed ? "w-20" : "w-64"}
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
        `}
      >
        <div className="flex flex-col h-full">

          {/* Logo */}
          <div className="py-3 px-6 border-b border-zinc-800 flex items-center justify-between">
            <Link to="/dashboard" className="text-xl font-bold text-yellow-400 transition-all duration-300">
              {sidebarCollapsed ? "FB" : "FastBite"}
            </Link>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-300 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-2 transition-all duration-300">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center rounded-xl transition-all duration-300 
                  ${sidebarCollapsed ? "justify-center py-4" : "px-4 py-3 gap-3 justify-start"}
                  ${isActive(item.href)
                    ? "bg-yellow-500 text-white"
                    : "text-gray-300 bg-zinc-900 hover:bg-zinc-800"
                  }
                `}
              >
                <item.icon className="h-6 w-6" />
                {!sidebarCollapsed && <span className="truncate">{item.name}</span>}
              </Link>
            ))}

            {/* Collapse Button */}
            {!sidebarOpen ? '' : (<button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-zinc-800 hover:bg-zinc-700 p-2 rounded-full transition-all duration-300"
            >
              <ArrowRightLeft className={`transition-transform duration-300 ${sidebarCollapsed ? "rotate-180" : ""}`} />
            </button>)}

          </nav>

          {/* User + Logout */}
          <div className="p-4 border-t border-zinc-800 flex flex-col items-center gap-3 transition-all duration-300">

            {sidebarCollapsed ? (
              <span className="bg-zinc-900 p-4 hover:bg-zinc-800 rounded-full"><User /></span>
            ) : (
              <div className="w-full bg-zinc-900 p-3 rounded-md text-sm text-gray-400 text-center">
                <p className="text-white font-semibold">Admin User</p>
                {user?.email && <p>@{user.email}</p>}
              </div>
            )}

            {sidebarCollapsed ? (
              <button onClick={handleLogout} className="bg-zinc-900 p-4 rounded-full hover:bg-zinc-800">
                <LogOut />
              </button>
            ) : (
              <button
                onClick={handleLogout}
                className="w-full border border-gray-600 py-3 rounded-md hover:bg-zinc-800 flex justify-center items-center gap-2"
              >
                <LogOut className="h-4 w-4" /> Sign Out
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Topbar */}
      <header
        className={`
          w-full fixed top-0 z-10 border-b border-zinc-800 bg-black py-[14px] px-4 flex justify-between items-center
          transition-all duration-300
          ${sidebarCollapsed ? "lg:pl-[8rem]" : "lg:pl-[20rem]"}
        `}
      >
        <Button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden border border-zinc-800 p-2 rounded-md hover:bg-zinc-900"
        >
          {sidebarOpen ? <X /> : <Menu />}
        </Button>

        <h2 className="text-gray-200  font-bold ">FastBite Dashboard</h2>
      </header>

      {/* Main */}
      <main
        className={`
          flex-1 pt-16 transition-all duration-300
          ${sidebarCollapsed ? "lg:ml-20" : "lg:ml-64"}
        `}
      >
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  )
}
