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
} from "lucide-react"
import { Button } from "./ui/button"

export default function Layout({ children, onLogout }) {
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const user = JSON.parse(localStorage.getItem("user")) || {}

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Add Food", href: "/add-food", icon: Plus },
    { name: "Manage Foods", href: "/manage-foods", icon: List },
    { name: "Orders", href: "/orders", icon: ShoppingBag },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <div className="min-h-screen bg-black text-white fle">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-black border-r border-zinc-800 transform transition-transform duration-200 ease-in-out z-40
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="py-4 px-6 border-b border-zinc-800 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-yellow-400">FastBite</h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive(item.href)
                      ? "bg-white text-black font-semibold"
                      : "text-gray-300 hover:bg-zinc-800 hover:text-white"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* User info */}
      

          {/* Logout */}
          <div className="p-4 border-t border-zinc-800">
          <div className="p-2 w-full my-1 rounded-md border-t border-zinc-800 text-xs bg-zinc-800 text-gray-400">
            <p className="text-lg font-bold text-white">Admin User</p>
            {user?.email && <p className="text-gray-400">@{user.email}</p>}
          </div>
            <Button
              onClick={onLogout}
              className="w-full border border-gray-600 hover:bg-red-700 text-white flex items-center justify-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>

      </aside>


      {/* Topbar */}
      <header className="w-full lg:ml-64 border-b border-zinc-800 py-3 px-4 flex items-center justify-between bg-black overflow-hidden">
        <div className="flex items-center gap-4">
          <Button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-md border border-zinc-800 hover:bg-zinc-900 transition-colors"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
          <h2 className="text-lg font-semibold text-gray-200">
            FastBite Dashboard
          </h2>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 min-h-[90vh] overflow-hidden">
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  )
}
