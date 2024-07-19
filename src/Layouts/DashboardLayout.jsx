import { NavLink, Outlet } from 'react-router-dom';
import {
  Bell,
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package2,
  Search,
  HelpingHandIcon,
  SettingsIcon,
} from "lucide-react"
import { Button } from "../Components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../Components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../Components/ui/dropdown-menu"
import { Input } from "../Components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "../Components/ui/sheet"
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { useContext } from 'react';
import { Toaster } from "@/Components/ui/toaster";
const DashboardLayout = () => {

  const navigate = useNavigate();
  const { auth, logout } = useContext(AuthContext) || {};

  const handleLogout = () => {
    logout();
  };

  const handleSettingsClick = () => {
    navigate('/dashboard/setting');
  };

  const handleHelpsClick = () => {
    navigate('/dashboard/help');
  };

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] dark">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <NavLink to='/' className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <h1 className="text-2xl">UpStatus</h1>
            </NavLink>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <NavLink
                to='/dashboard'
                end
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${isActive ? 'bg-muted text-primary' : 'text-muted-foreground hover:text-primary'
                  }`
                }
              >
                <Home className="h-4 w-4" />
                Home
              </NavLink>
              <NavLink
                to='monitor'
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${isActive ? 'bg-muted text-primary' : 'text-muted-foreground hover:text-primary'
                  }`
                }
              >
                <LineChart className="h-4 w-4" />
                Monitoring & Analytics
              </NavLink>
              <NavLink
                to='setting'
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${isActive ? 'bg-muted text-primary' : 'text-muted-foreground hover:text-primary'
                  }`
                }
              >
                <SettingsIcon className="h-4 w-4" />
                Settings
              </NavLink>
              <NavLink
                to='help'
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${isActive ? 'bg-muted text-primary' : 'text-muted-foreground hover:text-primary'
                  }`
                }
              >
                <HelpingHandIcon className="h-4 w-4" />
                Help & Support
              </NavLink>
            </nav>
          </div>
          <div className="mt-auto p-4">
            <Card x-chunk="dashboard-02-chunk-0">
              <CardHeader className="p-2 pt-0 md:p-4">
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>
                  Unlock all features and get unlimited access to our support
                  team.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <Button size="sm" className="w-full">
                  Upgrade
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <div>
                  <NavLink
                    href="#"
                    className="flex items-center gap-2 text-lg font-semibold"
                  >
                    <Package2 className="h-6 w-6" />
                    <span className="sr-only">Up Status</span>
                  </NavLink>
                  <NavLink
                    to="/dashboard"
                    end
                    className={({ isActive }) =>
                      `mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 transition-all ${isActive ? 'bg-muted text-primary' : 'text-muted-foreground hover:text-primary'
                      }`
                    }
                  >
                    <Home className="h-5 w-5" />
                    Home
                  </NavLink>
                  <NavLink
                    to="monitor"
                    className={({ isActive }) =>
                      `mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 transition-all ${isActive ? 'bg-muted text-primary' : 'text-muted-foreground hover:text-primary'
                      }`
                    }
                  >
                    <LineChart className="h-5 w-5" />
                    Montioring & Analytics
                  </NavLink>
                  <NavLink
                    to="setting"
                    className={({ isActive }) =>
                      `mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 transition-all ${isActive ? 'bg-muted text-primary' : 'text-muted-foreground hover:text-primary'
                      }`
                    }
                  >
                    <SettingsIcon className="h-5 w-5" />
                    Settings
                  </NavLink>
                </div>

              </nav>
              <div className="mt-auto">
                <NavLink
                  to="help"
                  className={({ isActive }) =>
                    `mx-[-0.65rem] flex items-center justify-center gap-4 rounded-xl px-3 py-2 transition-all ${isActive ? 'bg-muted text-primary' : 'text-muted-foreground hover:text-primary'
                    }`
                  }
                >
                  <HelpingHandIcon className="h-5 w-5" />
                  Help & Support
                </NavLink>
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <DropdownMenu >
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='dark' align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSettingsClick}>Settings</DropdownMenuItem>
              <DropdownMenuItem onClick={handleHelpsClick}>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} >Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <Outlet />
          <Toaster />
        </main>
      </div>
    </div>
  )

};

export default DashboardLayout;