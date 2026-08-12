import React, { useState } from "react";
import {
  LayoutDashboard,
  AppWindow,
  Layers,
  UserCheck,
  Users,
  Calendar,
  ListOrdered,
  MapPin,
  Stethoscope,
  Award,
  Box,
  Activity,
  MessageSquare,
  FlaskConical,
  Bot,
  BrainCircuit,
  TrendingUp,
  Clock,
  Mic,
  Pill,
  Package,
  Building2,
  Briefcase,
  CalendarCheck,
  CalendarDays,
  Palmtree,
  Wallet,
  Receipt,
  DollarSign,
  FileText,
  CreditCard,
  ArrowRightLeft,
  ShieldCheck,
  UserCog,
  FileBarChart,
  File,
  Newspaper,
  MessageCircle,
  HelpCircle,
  Mail,
  Ticket,
  Megaphone,
  MailCheck,
  FileCode,
  User,
  Image,
  History,
  Tag,
  Hourglass,
  Wrench,
  Shield,
  FileCheck,
  LogIn,
  UserPlus,
  KeyRound,
  RefreshCw,
  ShieldAlert,
  Lock,
  AlertTriangle,
  Settings,
  Globe,
  Sliders,
  Cpu,
  MoreHorizontal
} from "lucide-react";

// Section Header Component
function SectionHeader({ title }) {
  return (
    <h3 className="px-3 text-xs font-semibold uppercase tracking-wider text-gray-400 mt-5 mb-2">
      {title}
    </h3>
  );
}

// Single Link Item Component
function MenuItem({ icon: Icon, label, badge, hasChevron, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors group text-left"
    >
      {Icon && <Icon className="size-4 shrink-0 text-gray-500 group-hover:text-blue-600 transition-colors" />}
      <span className="flex-1 truncate">{label}</span>
      {badge && (
        <span className="px-2 py-0.5 text-xs font-bold text-blue-600 bg-blue-50 rounded-full">
          {badge}
        </span>
      )}
      {hasChevron && (
        <span className="text-gray-400 group-hover:text-blue-600">›</span>
      )}
    </button>
  );
}

// Collapsible Menu Section Component
function CollapsibleMenuItem({ icon: Icon, label, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors text-left ${
          isOpen
            ? "text-blue-600 bg-blue-50/70"
            : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
        }`}
      >
        {Icon && <Icon className="size-4 shrink-0 text-gray-500" />}
        <span className="flex-1 truncate">{label}</span>
        <span className={`text-xs text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}>
          ›
        </span>
      </button>

      {isOpen && <div className="ml-4 pl-3 border-l border-gray-100 mt-1 flex flex-col gap-1">{children}</div>}
    </div>
  );
}

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="relative">
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-900/20 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col w-64 bg-white border-r border-gray-200 transition-transform duration-300 md:translate-x-0 md:static md:h-screen ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
          <div className="flex items-center justify-center size-9 bg-blue-600 rounded-xl text-white font-bold text-lg shadow-sm">
            M
          </div>
          <div>
            <h2 className="font-bold text-gray-900 leading-tight">MedPrecision</h2>
            <p className="text-xs text-gray-500">Medical Management</p>
          </div>
        </div>

        {/* Scrollable Navigation */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1 custom-scrollbar">

          {/* MAIN MENU */}
          <SectionHeader title="Main Menu" />
          <MenuItem icon={LayoutDashboard} label="Dashboard" hasChevron />
          <CollapsibleMenuItem icon={AppWindow} label="Applications">
            <MenuItem label="Calendar" />
            <MenuItem label="Chat" />
            <MenuItem label="Mail" />
          </CollapsibleMenuItem>
          <CollapsibleMenuItem icon={Layers} label="Layouts">
            <MenuItem label="Default" />
            <MenuItem label="Collapsed" />
          </CollapsibleMenuItem>

          {/* CLINIC */}
          <SectionHeader title="Clinic" />
          <CollapsibleMenuItem icon={UserCheck} label="Doctors">
            <MenuItem label="Doctor List" />
            <MenuItem label="Add Doctor" />
            <MenuItem label="Doctor Profile" />
          </CollapsibleMenuItem>
          <CollapsibleMenuItem icon={Users} label="Patients">
            <MenuItem label="Patient List" />
            <MenuItem label="Add Patient" />
            <MenuItem label="Patient Case Study" />
          </CollapsibleMenuItem>
          <CollapsibleMenuItem icon={Calendar} label="Appointments">
            <MenuItem label="Book Appointment" />
            <MenuItem label="All Appointments" />
          </CollapsibleMenuItem>
          <CollapsibleMenuItem icon={ListOrdered} label="Queue Management">
            <MenuItem label="Live Queue" />
            <MenuItem label="Queue History" />
          </CollapsibleMenuItem>
          <MenuItem icon={MapPin} label="Locations" />
          <MenuItem icon={Stethoscope} label="Services" />
          <MenuItem icon={Award} label="Specializations" />
          <MenuItem icon={Box} label="Assets" />
          <MenuItem icon={Activity} label="Activities" />
          <MenuItem icon={MessageSquare} label="Messages" badge="4" />

          {/* CLINICAL SYSTEM */}
          <SectionHeader title="Clinical System" />
          <CollapsibleMenuItem icon={FlaskConical} label="Lab & Diagnostics">
            <MenuItem label="Lab Tests" />
            <MenuItem label="Test Results" />
          </CollapsibleMenuItem>

          {/* AI & AUTOMATION */}
          <SectionHeader title="AI & Automation" />
          <MenuItem icon={Bot} label="AI Assistant" />
          <MenuItem icon={BrainCircuit} label="Smart Diagnosis" />
          <MenuItem icon={TrendingUp} label="Patient Risk Prediction" />
          <MenuItem icon={Clock} label="Auto Scheduling" />
          <MenuItem icon={Mic} label="Voice Notes" />

          {/* PHARMACY & INVENTORY */}
          <SectionHeader title="Pharmacy & Inventory" />
          <MenuItem icon={Pill} label="Medicines" />
          <CollapsibleMenuItem icon={Package} label="Inventory">
            <MenuItem label="Stock List" />
            <MenuItem label="Purchase Orders" />
          </CollapsibleMenuItem>

          {/* HRM */}
          <SectionHeader title="HRM" />
          <MenuItem icon={Users} label="Staffs" />
          <MenuItem icon={Building2} label="Departments" />
          <MenuItem icon={Briefcase} label="Designation" />
          <MenuItem icon={CalendarCheck} label="Attendance" />
          <CollapsibleMenuItem icon={CalendarDays} label="Leaves">
            <MenuItem label="Leave Requests" />
            <MenuItem label="Leave Types" />
          </CollapsibleMenuItem>
          <MenuItem icon={Palmtree} label="Holidays" />
          <MenuItem icon={Wallet} label="Payroll" />

          {/* FINANCE & ACCOUNTS */}
          <SectionHeader title="Finance & Accounts" />
          <CollapsibleMenuItem icon={Receipt} label="Expenses">
            <MenuItem label="Expense List" />
            <MenuItem label="Add Expense" />
          </CollapsibleMenuItem>
          <MenuItem icon={DollarSign} label="Income" />
          <CollapsibleMenuItem icon={FileText} label="Invoices">
            <MenuItem label="Invoice List" />
            <MenuItem label="Create Invoice" />
          </CollapsibleMenuItem>
          <MenuItem icon={CreditCard} label="Payments" />
          <MenuItem icon={ArrowRightLeft} label="Transactions" />
          <MenuItem icon={ShieldCheck} label="Insurance Claims" />

          {/* ADMINISTRATION */}
          <SectionHeader title="Administration" />
          <CollapsibleMenuItem icon={UserCog} label="Users">
            <MenuItem label="User List" />
            <MenuItem label="Roles & Permissions" />
          </CollapsibleMenuItem>
          <CollapsibleMenuItem icon={FileBarChart} label="Reports">
            <MenuItem label="Financial Report" />
            <MenuItem label="Patient Report" />
          </CollapsibleMenuItem>

          {/* CONTENT */}
          <SectionHeader title="Content" />
          <MenuItem icon={File} label="Pages" />
          <CollapsibleMenuItem icon={Newspaper} label="Blogs">
            <MenuItem label="All Posts" />
            <MenuItem label="Categories" />
          </CollapsibleMenuItem>
          <CollapsibleMenuItem icon={MapPin} label="Location">
            <MenuItem label="Clinics" />
            <MenuItem label="Map Settings" />
          </CollapsibleMenuItem>
          <MenuItem icon={MessageCircle} label="Testimonials" />
          <MenuItem icon={HelpCircle} label="FAQ" />

          {/* SUPPORT */}
          <SectionHeader title="Support" />
          <MenuItem icon={Mail} label="Contact Messages" />
          <MenuItem icon={Ticket} label="Tickets" />
          <MenuItem icon={Megaphone} label="Announcements" />
          <MenuItem icon={MailCheck} label="Newsletters" />

          {/* PAGES */}
          <SectionHeader title="Pages" />
          <MenuItem icon={FileCode} label="Starter" />
          <MenuItem icon={User} label="Profile" />
          <MenuItem icon={Image} label="Gallery" />
          <MenuItem icon={History} label="Timeline" />
          <MenuItem icon={Tag} label="Pricing" />
          <MenuItem icon={Hourglass} label="Coming Soon" />
          <MenuItem icon={Wrench} label="Under Maintenance" />
          <MenuItem icon={Shield} label="Privacy Policy" />
          <MenuItem icon={FileCheck} label="Terms & Conditions" />

          {/* AUTHENTICATION */}
          <SectionHeader title="Authentication" />
          <CollapsibleMenuItem icon={LogIn} label="Login">
            <MenuItem label="Simple Login" />
            <MenuItem label="With Background" />
          </CollapsibleMenuItem>
          <CollapsibleMenuItem icon={UserPlus} label="Register">
            <MenuItem label="Simple Register" />
          </CollapsibleMenuItem>
          <CollapsibleMenuItem icon={KeyRound} label="Forgot Password">
            <MenuItem label="Send Link" />
          </CollapsibleMenuItem>
          <CollapsibleMenuItem icon={RefreshCw} label="Reset Password">
            <MenuItem label="Set New Password" />
          </CollapsibleMenuItem>
          <CollapsibleMenuItem icon={MailCheck} label="Email Verification">
            <MenuItem label="Verify OTP" />
          </CollapsibleMenuItem>
          <CollapsibleMenuItem icon={ShieldAlert} label="2 Step Verification">
            <MenuItem label="Authenticator App" />
          </CollapsibleMenuItem>
          <MenuItem icon={Lock} label="Lock Screen" />
          <CollapsibleMenuItem icon={AlertTriangle} label="Error Pages">
            <MenuItem label="404 Not Found" />
            <MenuItem label="500 Internal Error" />
          </CollapsibleMenuItem>

          {/* SETTINGS */}
          <SectionHeader title="Settings" />
          <CollapsibleMenuItem icon={UserCog} label="Account Settings">
            <MenuItem label="Profile Info" />
            <MenuItem label="Security" />
          </CollapsibleMenuItem>
          <CollapsibleMenuItem icon={Globe} label="Website Settings">
            <MenuItem label="General" />
            <MenuItem label="Header/Footer" />
          </CollapsibleMenuItem>
          <CollapsibleMenuItem icon={Building2} label="Clinic Settings">
            <MenuItem label="Timing & Shifts" />
            <MenuItem label="Departments" />
          </CollapsibleMenuItem>

        </div>
      </aside>
    </div>
  );
}
