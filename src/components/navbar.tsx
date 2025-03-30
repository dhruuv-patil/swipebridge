
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AvatarWithBadge } from "@/components/ui/avatar-with-badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X, Home, Users, MessageSquare, Briefcase, Bell, Settings, LogOut } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Mock user data - in a real app, this would come from an auth context
  const user = {
    name: "Rahul Patel",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  };
  
  // Check if user is logged in - in a real app, this would use an auth hook
  const isLoggedIn = window.location.pathname !== "/";

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { icon: Home, label: "Home", path: "/dashboard" },
    { icon: Users, label: "Connections", path: "/connections" },
    { icon: MessageSquare, label: "Messages", path: "/messages" },
    { icon: Briefcase, label: "Jobs", path: "/jobs" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link to={isLoggedIn ? "/dashboard" : "/"} className="flex items-center space-x-2">
            <span className="text-xl font-bold text-primary">SwipeNet</span>
          </Link>
        </div>
        
        {isLoggedIn && (
          <>
            <nav className="hidden md:flex flex-1 items-center justify-center">
              <ul className="flex space-x-4">
                {menuItems.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.path}
                      className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-accent"
                    >
                      <item.icon className="h-4 w-4 mr-2" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" aria-label="Notifications">
                <Bell className="h-5 w-5" />
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <AvatarWithBadge src={user.avatar} fallback={user.name} status="online" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link to="/profile" className="flex items-center w-full">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/" className="flex items-center w-full">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button variant="outline" size="sm" className="md:hidden" onClick={toggleMenu}>
                {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </div>
            
            {/* Mobile menu */}
            {isOpen && (
              <div className="md:hidden fixed inset-0 top-14 bg-background z-50 animate-fade-in">
                <nav className="container py-6">
                  <ul className="space-y-4">
                    {menuItems.map((item) => (
                      <li key={item.label}>
                        <Link
                          to={item.path}
                          className="flex items-center px-3 py-2 text-lg rounded-md hover:bg-accent"
                          onClick={toggleMenu}
                        >
                          <item.icon className="h-5 w-5 mr-3" />
                          {item.label}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link
                        to="/profile"
                        className="flex items-center px-3 py-2 text-lg rounded-md hover:bg-accent"
                        onClick={toggleMenu}
                      >
                        <Settings className="h-5 w-5 mr-3" />
                        Settings
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/"
                        className="flex items-center px-3 py-2 text-lg rounded-md hover:bg-accent"
                        onClick={toggleMenu}
                      >
                        <LogOut className="h-5 w-5 mr-3" />
                        Log out
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            )}
          </>
        )}
        
        {!isLoggedIn && (
          <div className="flex-1 flex items-center justify-end space-x-2">
            <Link to="/login">
              <Button variant="outline">Log In</Button>
            </Link>
            <Link to="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
