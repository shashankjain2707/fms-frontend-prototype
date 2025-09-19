"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
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
  LineChart,
  Line,
} from "recharts"
import { TrendingUp, FileText, Clock, CheckCircle, AlertTriangle } from "lucide-react"

const departmentData = [
  { name: "Sales", uploaded: 12, pending: 2, approved: 10 },
  { name: "PPC", uploaded: 8, pending: 3, approved: 5 },
  { name: "Quality", uploaded: 6, pending: 1, approved: 5 },
  { name: "Production", uploaded: 4, pending: 2, approved: 2 },
  { name: "Dispatch", uploaded: 2, pending: 1, approved: 1 },
]

const statusData = [
  { name: "Approved", value: 23, color: "#10B981" },
  { name: "Pending", value: 9, color: "#F59E0B" },
  { name: "Rejected", value: 2, color: "#EF4444" },
]

const activityData = [
  { date: "2025-01-15", uploads: 3 },
  { date: "2025-01-16", uploads: 5 },
  { date: "2025-01-17", uploads: 2 },
  { date: "2025-01-18", uploads: 7 },
  { date: "2025-01-19", uploads: 4 },
  { date: "2025-01-20", uploads: 6 },
  { date: "2025-01-21", uploads: 8 },
]

const recentActivity = [
  {
    id: 1,
    action: "Document approved",
    file: "Purchase_Order_ABC.pdf",
    user: "Divyaraj Rathore",
    time: "2 hours ago",
    type: "approval",
  },
  {
    id: 2,
    action: "New document uploaded",
    file: "Technical_Spec_v2.pdf",
    user: "Nidhi Shah",
    time: "4 hours ago",
    type: "upload",
  },
  {
    id: 3,
    action: "Document rejected",
    file: "Quality_Report.pdf",
    user: "Aman",
    time: "6 hours ago",
    type: "rejection",
  },
  {
    id: 4,
    action: "Document shared",
    file: "Production_Plan.pdf",
    user: "Shana Shashank",
    time: "1 day ago",
    type: "share",
  },
]

export function AnalyticsPanel() {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "approval":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "upload":
        return <FileText className="w-4 h-4 text-blue-500" />
      case "rejection":
        return <AlertTriangle className="w-4 h-4 text-red-500" />
      case "share":
        return <TrendingUp className="w-4 h-4 text-purple-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">34</div>
            <p className="text-xs text-muted-foreground">+12% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">9</div>
            <p className="text-xs text-muted-foreground">-2 from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">+5 today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <Progress value={68} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Upload Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Uploads by Department</CardTitle>
            <CardDescription>Document upload activity across departments</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="approved" fill="#10B981" name="Approved" />
                <Bar dataKey="pending" fill="#F59E0B" name="Pending" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Document Status Distribution</CardTitle>
            <CardDescription>Current status of all documents</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Activity Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Upload Activity</CardTitle>
            <CardDescription>Daily upload trends over the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="uploads" stroke="#3B82F6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest document activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  {getActivityIcon(activity.type)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-sm text-gray-600 truncate">{activity.file}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500">{activity.user}</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
