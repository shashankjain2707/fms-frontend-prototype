"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Upload,
  Share2,
  Calendar,
  User,
  Building,
  ChevronRight,
  MapPin,
  Clock,
  FileText,
  CheckCircle,
  Eye,
  TrendingUp,
  Briefcase,
  ClipboardList,
  ShieldCheck,
  ShoppingCart,
  Factory,
  Search,
  Package,
  TestTube,
  Truck,
  Wrench,
  Flag,
} from "lucide-react"
import { ProjectSidebar } from "@/components/project-sidebar"
import { FileTable } from "@/components/file-table"
import { UploadPanel } from "@/components/upload-panel"
import { AnalyticsPanel } from "@/components/analytics-panel"
import { ShareModal } from "@/components/share-modal"
import { DocumentTraceability } from "@/components/document-traceability"
import { StageTraceability } from "@/components/stage-traceability"

const mockProjects = {
  "A1_2025_001": {
    id: "A1_2025_001",
    name: "A-1 Assignment",
    client: "A1 Construction Solutions",
    startDate: "2025-01-20",
    endDate: "2025-06-15",
    manager: "Sunflower Sakshi",
    location: "Mumbai, Maharashtra",
    totalDocs: 11,
    uploaded: 5,
    pending: 2,
    approved: 3,
    progress: 65,
    budget: "₹125 Crores",
    contractor: "A1 Construction Solutions",
  },
  "MH_2025_001": {
    id: "MH_2025_001",
    name: "Mumbai-Pune Expressway Extension",
    client: "Maharashtra State Road Development Corporation",
    startDate: "2025-01-15",
    endDate: "2025-12-31",
    manager: "Sunflower Sakshi",
    location: "Mumbai, Maharashtra",
    totalDocs: 11,
    uploaded: 8,
    pending: 2,
    approved: 6,
    progress: 73,
    budget: "₹250 Crores",
    contractor: "L&T Construction",
  },
}

const mockFolders = [
  { id: "1", name: "1_Sales", count: 3, completed: 3, department: "Sales", color: "bg-blue-500", icon: "Briefcase" },
  { id: "2", name: "2_PPC", count: 2, completed: 1, department: "PPC", color: "bg-purple-500", icon: "ClipboardList" },
  { id: "3", name: "3_Quality", count: 1, completed: 1, department: "Quality", color: "bg-green-500", icon: "ShieldCheck" },
  { id: "4", name: "4_Purchase", count: 0, completed: 0, department: "Purchase", color: "bg-orange-500", icon: "ShoppingCart" },
  { id: "5", name: "5_Production", count: 1, completed: 0, department: "Production", color: "bg-red-500", icon: "Factory" },
  { id: "6", name: "6_QAP", count: 1, completed: 1, department: "QAP", color: "bg-teal-500", icon: "Search" },
  { id: "7", name: "7_Packing", count: 0, completed: 0, department: "Packing", color: "bg-yellow-500", icon: "Package" },
  { id: "8", name: "8_Testing", count: 0, completed: 0, department: "Testing", color: "bg-pink-500", icon: "TestTube" },
  { id: "9", name: "9_Dispatch", count: 0, completed: 0, department: "Dispatch", color: "bg-indigo-500", icon: "Truck" },
  {
    id: "10",
    name: "10_Installation",
    count: 0,
    completed: 0,
    department: "Installation",
    color: "bg-cyan-500",
    icon: "Wrench",
  },
  {
    id: "11",
    name: "11_Completion",
    count: 0,
    completed: 0,
    department: "Completion",
    color: "bg-emerald-500",
    icon: "Flag",
  },
]

export default async function ProjectPage({ params }: { params: { id: string } }) {
  const awaitedParams = await params
  const [selectedFolder, setSelectedFolder] = useState("1")
  const [showUploadPanel, setShowUploadPanel] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [activeTab, setActiveTab] = useState("files")

  // Get the current project based on ID
  const currentProject = mockProjects[awaitedParams.id as keyof typeof mockProjects] || mockProjects["MH_2025_001"]

  const handleStageClick = (stageId: string) => {
    setSelectedFolder(stageId)
    setActiveTab("files")
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Enhanced Project Header with Visual Elements */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border p-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <span>Projects</span>
                <ChevronRight className="w-4 h-4 mx-2" />
                <span className="text-blue-600 font-medium">{currentProject.id}</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-3">{currentProject.name}</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-blue-600" />
                  <span className="font-medium">Client:</span>
                  <span className="text-gray-700">{currentProject.client}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-green-600" />
                  <span className="font-medium">Manager:</span>
                  <span className="text-gray-700">{currentProject.manager}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-red-600" />
                  <span className="font-medium">Location:</span>
                  <span className="text-gray-700">{currentProject.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-purple-600" />
                  <span className="font-medium">Duration:</span>
                  <span className="text-gray-700">
                    {currentProject.startDate} - {currentProject.endDate}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowShareModal(true)}>
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button onClick={() => setShowUploadPanel(true)} className="bg-blue-600 hover:bg-blue-700">
                <Upload className="w-4 h-4 mr-2" />
                Upload
              </Button>
            </div>
          </div>

          {/* Enhanced Progress Cards with Visual Indicators */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <FileText className="w-6 h-6 text-blue-600" />
                <span className="text-xs text-gray-500">Total</span>
              </div>
              <div className="text-2xl font-bold text-blue-600">{mockProject.uploaded}</div>
              <div className="text-sm text-gray-600">Documents Uploaded</div>
            </div>
            <div className="bg-white rounded-lg p-4 border-l-4 border-yellow-500 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <Clock className="w-6 h-6 text-yellow-600" />
                <span className="text-xs text-gray-500">Review</span>
              </div>
              <div className="text-2xl font-bold text-yellow-600">{mockProject.pending}</div>
              <div className="text-sm text-gray-600">Pending Review</div>
            </div>
            <div className="bg-white rounded-lg p-4 border-l-4 border-green-500 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <span className="text-xs text-gray-500">Done</span>
              </div>
              <div className="text-2xl font-bold text-green-600">{mockProject.approved}</div>
              <div className="text-sm text-gray-600">Approved</div>
            </div>
            <div className="bg-white rounded-lg p-4 border-l-4 border-purple-500 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="w-6 h-6 text-purple-600" />
                <span className="text-xs text-gray-500">Progress</span>
              </div>
              <div className="text-2xl font-bold text-purple-600">{mockProject.progress}%</div>
              <div className="text-sm text-gray-600">Overall Progress</div>
              <Progress value={mockProject.progress} className="mt-2 h-2" />
            </div>
            <div className="bg-white rounded-lg p-4 border-l-4 border-indigo-500 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <Building className="w-6 h-6 text-indigo-600" />
                <span className="text-xs text-gray-500">Budget</span>
              </div>
              <div className="text-lg font-bold text-indigo-600">{mockProject.budget}</div>
              <div className="text-sm text-gray-600">Total Budget</div>
            </div>
          </div>
        </div>

        {/* Main Content with Enhanced Visual Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Enhanced Sidebar */}
          <div className="lg:col-span-1">
            <ProjectSidebar folders={mockFolders} selectedFolder={selectedFolder} onFolderSelect={setSelectedFolder} />
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="files" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Files
                </TabsTrigger>
                <TabsTrigger value="stage-overview" className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Stage Overview
                </TabsTrigger>
                <TabsTrigger value="traceability" className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  Document Traceability
                </TabsTrigger>
                <TabsTrigger value="analytics" className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Analytics
                </TabsTrigger>
              </TabsList>

              <TabsContent value="files">
                <FileTable selectedFolder={selectedFolder} />
              </TabsContent>

              <TabsContent value="stage-overview">
                <StageTraceability onStageClick={handleStageClick} projectId={params.id} />
              </TabsContent>

              <TabsContent value="traceability">
                <DocumentTraceability selectedFolder={selectedFolder} />
              </TabsContent>

              <TabsContent value="analytics">
                <AnalyticsPanel />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Modals */}
      <UploadPanel isOpen={showUploadPanel} onClose={() => setShowUploadPanel(false)} selectedFolder={selectedFolder} />
      <ShareModal isOpen={showShareModal} onClose={() => setShowShareModal(false)} projectId={mockProject.id} />
    </DashboardLayout>
  )
}
