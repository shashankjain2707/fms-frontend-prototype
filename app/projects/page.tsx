"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Plus, MoreHorizontal, Calendar, Users, FileText, Archive, Trash2, Edit, Eye } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

const allProjects = [
  {
    id: "MH_2025_001",
    name: "Mumbai-Pune Expressway Extension",
    client: "Maharashtra State Road Development Corporation",
    manager: "Sakshi Jain",
    startDate: "2025-01-15",
    endDate: "2025-12-31",
    status: "active",
    progress: 73,
    totalDocs: 11,
    uploaded: 8,
    pending: 2,
    approved: 6,
    budget: "₹250 Crores",
    team: 12,
  },
  {
    id: "DL_2025_002",
    name: "Delhi Metro Phase 4 - Janakpuri West",
    client: "Delhi Metro Rail Corporation",
    manager: "Priya Sharma",
    startDate: "2025-01-10",
    endDate: "2025-11-30",
    status: "active",
    progress: 91,
    totalDocs: 11,
    uploaded: 11,
    pending: 1,
    approved: 10,
    budget: "₹180 Crores",
    team: 8,
  },
  {
    id: "KA_2025_003",
    name: "Bangalore IT Park Infrastructure",
    client: "Karnataka Industrial Areas Development Board",
    manager: "Amit Patel",
    startDate: "2025-02-01",
    endDate: "2025-10-15",
    status: "pending",
    progress: 45,
    totalDocs: 11,
    uploaded: 5,
    pending: 4,
    approved: 1,
    budget: "₹320 Crores",
    team: 15,
  },
  {
    id: "TN_2024_004",
    name: "Chennai Port Expansion Project",
    client: "Chennai Port Trust",
    manager: "Sunita Reddy",
    startDate: "2024-06-01",
    endDate: "2024-12-31",
    status: "completed",
    progress: 100,
    totalDocs: 11,
    uploaded: 11,
    pending: 0,
    approved: 11,
    budget: "₹410 Crores",
    team: 20,
  },
  {
    id: "GJ_2024_005",
    name: "Ahmedabad Smart City Housing",
    client: "Gujarat Housing Board",
    manager: "Ravi Kumar",
    startDate: "2024-03-15",
    endDate: "2024-09-30",
    status: "archived",
    progress: 100,
    totalDocs: 11,
    uploaded: 11,
    pending: 0,
    approved: 11,
    budget: "₹150 Crores",
    team: 10,
  },
]

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [managerFilter, setManagerFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("all")

  const filteredProjects = allProjects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || project.status === statusFilter
    const matchesManager = managerFilter === "all" || project.manager === managerFilter
    const matchesTab = activeTab === "all" || project.status === activeTab

    return matchesSearch && matchesStatus && matchesManager && matchesTab
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "archived":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getProjectStats = (status: string) => {
    return allProjects.filter((p) => (status === "all" ? true : p.status === status)).length
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
            <p className="text-gray-600 mt-1">Manage all your construction projects</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{allProjects.length}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{getProjectStats("active")}</div>
              <p className="text-xs text-muted-foreground">In progress</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{getProjectStats("pending")}</div>
              <p className="text-xs text-muted-foreground">Awaiting approval</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <Archive className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{getProjectStats("completed")}</div>
              <p className="text-xs text-muted-foreground">Successfully finished</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Tabs */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search projects, clients, or IDs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
              <Select value={managerFilter} onValueChange={setManagerFilter}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Manager" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Managers</SelectItem>
                  <SelectItem value="Sakshi Jain">Sakshi Jain</SelectItem>
                  <SelectItem value="Priya Sharma">Priya Sharma</SelectItem>
                  <SelectItem value="Amit Patel">Amit Patel</SelectItem>
                  <SelectItem value="Sunita Reddy">Sunita Reddy</SelectItem>
                  <SelectItem value="Ravi Kumar">Ravi Kumar</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all">All ({allProjects.length})</TabsTrigger>
                <TabsTrigger value="active">Active ({getProjectStats("active")})</TabsTrigger>
                <TabsTrigger value="pending">Pending ({getProjectStats("pending")})</TabsTrigger>
                <TabsTrigger value="completed">Completed ({getProjectStats("completed")})</TabsTrigger>
                <TabsTrigger value="archived">Archived ({getProjectStats("archived")})</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="mt-6">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Project</TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead>Manager</TableHead>
                        <TableHead>Progress</TableHead>
                        <TableHead>Documents</TableHead>
                        <TableHead>Budget</TableHead>
                        <TableHead>Team</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="w-12"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProjects.map((project) => (
                        <TableRow key={project.id}>
                          <TableCell>
                            <div>
                              <Link
                                href={`/project/${project.id}`}
                                className="font-medium text-blue-600 hover:text-blue-800"
                              >
                                {project.name}
                              </Link>
                              <div className="text-sm text-gray-500">{project.id}</div>
                            </div>
                          </TableCell>
                          <TableCell>{project.client}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-gray-400" />
                              {project.manager}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>{project.progress}%</span>
                              </div>
                              <Progress value={project.progress} className="h-2" />
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div className="flex gap-2">
                                <span className="text-green-600">{project.approved}</span>
                                <span className="text-yellow-600">{project.pending}</span>
                                <span className="text-gray-400">/{project.totalDocs}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{project.budget}</TableCell>
                          <TableCell>{project.team} members</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem asChild>
                                  <Link href={`/project/${project.id}`}>
                                    <Eye className="w-4 h-4 mr-2" />
                                    View Details
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="w-4 h-4 mr-2" />
                                  Edit Project
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Archive className="w-4 h-4 mr-2" />
                                  Archive
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
