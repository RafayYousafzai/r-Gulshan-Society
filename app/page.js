"use client";

// import useAdminContext from "@/context/FirebaseContext";
// const { bookings, customers, plots } = useAdminContext();

import { useState } from "react";
import useAdminContext from "@/context/FirebaseContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  CalendarIcon,
  CreditCardIcon,
  DollarSignIcon,
  HomeIcon,
  UserIcon,
} from "lucide-react";

export default function Page() {
  const { bookings, customers, plots } = useAdminContext();
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data for charts (replace with actual data processing)
  const bookingsData = [
    {
      address: "Mian Haider St",
      name: "Rafay Yousafzai",
      phone: "03311414970",
      date: "Sep 02, 2024",
      id: "371345",
      cnic: "12313213",
      time: "7:25 PM",
    },
  ];
  const CustomersData = [
    {
      address: "Mian Haider St",
      name: "Rafay Yousafzai",
      phone: "03311414970",
      date: "Sep 02, 2024",
      id: "371345",
      cnic: "12313213",
      time: "7:25 PM",
    },
  ];

  const plotTypesData = [
    {
      date: "29/02/2024",
      size: "5",
      id: "cvKgZ43MLKBbWivSm8NN",
      time: "11:13 PM",
    },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const recentActivity = [
    {
      id: 1,
      action: "New booking",
      customer: "John Doe",
      plot: "Plot A1",
      date: "2023-06-15",
    },
    {
      id: 2,
      action: "Customer inquiry",
      customer: "Jane Smith",
      plot: "Plot B2",
      date: "2023-06-14",
    },
    {
      id: 3,
      action: "Plot sold",
      customer: "Bob Johnson",
      plot: "Plot C3",
      date: "2023-06-13",
    },
  ];

  return (
    <div className="p-8 bg-background">
      <h1 className="text-4xl font-bold mb-8">Real Estate Dashboard</h1>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{bookings?.length || 0}</div>
            <p className="text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{customers?.length || 0}</div>
            <p className="text-muted-foreground">+2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Available Plots</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{plots?.length || 0}</div>
            <p className="text-muted-foreground">-3% from last month</p>
          </CardContent>
        </Card>
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Bookings Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={bookingsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="bookings" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Plot Types Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={plotTypesData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {plotTypesData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-full md:col-span-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {recentActivity.map((activity) => (
                <li key={activity.id} className="flex items-center space-x-4">
                  <div className="bg-primary rounded-full p-2">
                    {activity.action.includes("booking") && (
                      <CalendarIcon className="h-4 w-4 text-primary-foreground" />
                    )}
                    {activity.action.includes("inquiry") && (
                      <UserIcon className="h-4 w-4 text-primary-foreground" />
                    )}
                    {activity.action.includes("sold") && (
                      <HomeIcon className="h-4 w-4 text-primary-foreground" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">
                      {activity.customer} - {activity.plot}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.date}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            <Button>
              <CalendarIcon className="mr-2 h-4 w-4" />
              New Booking
            </Button>
            <Button variant="outline">
              <UserIcon className="mr-2 h-4 w-4" />
              Add Customer
            </Button>
            <Button variant="secondary">
              <HomeIcon className="mr-2 h-4 w-4" />
              List New Plot
            </Button>
            <Button variant="destructive">
              <CreditCardIcon className="mr-2 h-4 w-4" />
              Process Payment
            </Button>
          </CardContent>
        </Card>
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Search Plots</CardTitle>
            <CardDescription>Find available plots quickly</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2">
              <Input
                placeholder="Search by plot number or type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button>Search</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
