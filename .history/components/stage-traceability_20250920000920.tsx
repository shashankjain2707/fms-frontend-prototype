"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  FileText,
  User,
  Clock,
  CheckCircle,
  AlertTriangle,
  Eye,
  Download,
  ArrowDown,
  MapPin,
  Calendar,
  MessageSquare,
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
  FolderOpen,
} from "lucide-react"

interface StageTraceabilityProps {
  onStageClick: (stageId: string) => void
  projectId?: string
}

// Mock data for all 11 stages with latest documents
const mockStageData = {
  // A-1 Assignment Project Data
  "A1_2025_001": [
    {
      stageId: "1",
      stageName: "Sales",
      stageNumber: 1,
      icon: Briefcase,
      color: "bg-blue-500",
      status: "completed",
      completionDate: "2025-01-21",
      latestDocument: {
        documentId: "2W0-000456",
        documentName: "Work_Order_A1_Assignment.pdf",
        documentType: "Work Order",
        version: "v3.0",
        uploadDate: "2025-01-21",
        uploader: "Divyaraj Rathore",
        approvalStatus: "approved",
        fileSize: "1.8 MB",
        fileType: "PDF",
      },
    },
    {
      stageId: "2",
      stageName: "PPC",
      stageNumber: 2,
      icon: ClipboardList,
      color: "bg-purple-500",
      status: "completed",
      completionDate: "2025-01-22",
      latestDocument: {
        documentId: "2JC-000123",
        documentName: "JRC_Production_Control.xlsx",
        documentType: "JRC",
        version: "v0.1",
        uploadDate: "2025-01-22",
        uploader: "Nidhi Shah",
        approvalStatus: "approved",
        fileSize: "956 KB",
        fileType: "XLSX",
      },
    },
    {
      stageId: "3",
      stageName: "Quality Assurance",
      stageNumber: 3,
      icon: ShieldCheck,
      color: "bg-green-500",
      status: "pending",
      completionDate: null,
      latestDocument: null,
    },
    {
      stageId: "4",
      stageName: "Purchase",
      stageNumber: 4,
      icon: ShoppingCart,
      color: "bg-orange-500",
      status: "pending",
      completionDate: null,
      latestDocument: null,
    },
    {
      stageId: "5",
      stageName: "Production",
      stageNumber: 5,
      icon: Factory,
      color: "bg-red-500",
      status: "completed",
      completionDate: "2025-01-23",
      latestDocument: {
        documentId: "2SFG-000111",
        documentName: "Machine_Loading_Schedule.pdf",
        documentType: "Machine Loading",
        version: "v1.0",
        uploadDate: "2025-01-23",
        uploader: "Aman",
        approvalStatus: "approved",
        fileSize: "2.1 MB",
        fileType: "PDF",
      },
    },
    {
      stageId: "6",
      stageName: "QAP",
      stageNumber: 6,
      icon: Search,
      color: "bg-teal-500",
      status: "completed",
      completionDate: "2025-01-24",
      latestDocument: {
        documentId: "2QC-000159",
        documentName: "Quality_Control_Checklist.xlsx",
        documentType: "Checklist",
        version: "v2.0",
        uploadDate: "2025-01-24",
        uploader: "Sunflower Sakshi",
        approvalStatus: "approved",
        fileSize: "1.2 MB",
        fileType: "XLSX",
      },
    },
    {
      stageId: "7",
      stageName: "Packing",
      stageNumber: 7,
      icon: Package,
      color: "bg-yellow-500",
      status: "pending",
      completionDate: null,
      latestDocument: null,
    },
    {
      stageId: "8",
      stageName: "Testing",
      stageNumber: 8,
      icon: TestTube,
      color: "bg-pink-500",
      status: "pending",
      completionDate: null,
      latestDocument: null,
    },
    {
      stageId: "9",
      stageName: "Dispatch",
      stageNumber: 9,
      icon: Truck,
      color: "bg-indigo-500",
      status: "in_progress",
      completionDate: null,
      latestDocument: {
        documentId: "2DP-000119",
        documentName: "Dispatch_Instructions.pdf",
        documentType: "Dispatch",
        version: "v0.1",
        uploadDate: "2025-01-25",
        uploader: "Shana Shashank",
        approvalStatus: "pending",
        fileSize: "758 KB",
        fileType: "PDF",
      },
    },
    {
      stageId: "10",
      stageName: "Installation",
      stageNumber: 10,
      icon: Wrench,
      color: "bg-cyan-500",
      status: "pending",
      completionDate: null,
      latestDocument: null,
    },
    {
      stageId: "11",
      stageName: "Completion",
      stageNumber: 11,
      icon: Flag,
      color: "bg-emerald-500",
      status: "pending",
      completionDate: null,
      latestDocument: null,
    },
  ],
  // Default/Mumbai Expressway Project Data
  "default": [
    {
      stageId: "1",
      stageName: "Sales",
      stageNumber: 1,
      icon: Briefcase,
      color: "bg-blue-500",
      status: "completed",
      completionDate: "2025-01-15",
      latestDocument: {
        documentId: "DOC_001",
        documentName: "Purchase_Order_Mumbai_Expressway.pdf",
        documentType: "Purchase Order",
        version: "v1.2",
        uploadDate: "2025-01-15",
        uploader: "Divyaraj Rathore",
        approvalStatus: "approved",
        fileSize: "2.4 MB",
        fileType: "PDF",
      },
    },
    {
      stageId: "2",
      stageName: "PPC",
      stageNumber: 2,
      icon: ClipboardList,
      color: "bg-purple-500",
      status: "completed",
      completionDate: "2025-01-18",
      latestDocument: {
        documentId: "DOC_002",
        documentName: "Production_Plan_Mumbai_Expressway.pdf",
        version: "v1.0",
        uploadDate: "2025-01-18",
        uploader: "Aman",
        approvalStatus: "approved",
        fileSize: "3.2 MB",
        fileType: "PDF",
      },
    },
    {
      stageId: "3",
      stageName: "Quality Assurance",
      stageNumber: 3,
      icon: ShieldCheck,
      color: "bg-green-500",
      status: "completed",
      completionDate: "2025-01-20",
      latestDocument: {
        documentId: "DOC_003",
        documentName: "Quality_Standards_Specification.pdf",
        version: "v2.1",
        uploadDate: "2025-01-20",
        uploader: "Sunflower Sakshi",
        approvalStatus: "approved",
        fileSize: "1.8 MB",
        fileType: "PDF",
      },
    },
    {
      stageId: "4",
      stageName: "Purchase",
      stageNumber: 4,
      icon: ShoppingCart,
      color: "bg-orange-500",
      status: "in_progress",
      completionDate: null,
      latestDocument: {
        documentId: "DOC_004",
        documentName: "Material_Procurement_Request.xlsx",
        version: "v1.0",
        uploadDate: "2025-01-21",
        uploader: "Nidhi Shah",
        approvalStatus: "pending",
        fileSize: "856 KB",
        fileType: "XLSX",
      },
    },
    {
      stageId: "5",
      stageName: "Production",
      stageNumber: 5,
      icon: Factory,
      color: "bg-red-500",
      status: "pending",
      completionDate: null,
      latestDocument: null,
    },
    {
      stageId: "6",
      stageName: "QAP",
      stageNumber: 6,
      icon: Search,
      color: "bg-teal-500",
      status: "pending",
      completionDate: null,
      latestDocument: null,
    },
    {
      stageId: "7",
      stageName: "Packing",
      stageNumber: 7,
      icon: Package,
      color: "bg-yellow-500",
      status: "pending",
      completionDate: null,
      latestDocument: null,
    },
    {
      stageId: "8",
      stageName: "Testing",
      stageNumber: 8,
      icon: TestTube,
      color: "bg-pink-500",
      status: "pending",
      completionDate: null,
      latestDocument: null,
    },
    {
      stageId: "9",
      stageName: "Dispatch",
      stageNumber: 9,
      icon: Truck,
      color: "bg-indigo-500",
      status: "pending",
      completionDate: null,
      latestDocument: null,
    },
    {
      stageId: "10",
      stageName: "Installation",
      stageNumber: 10,
      icon: Wrench,
      color: "bg-cyan-500",
      status: "pending",
      completionDate: null,
      latestDocument: null,
    },
    {
      stageId: "11",
      stageName: "Completion",
      stageNumber: 11,
      icon: Flag,
      color: "bg-emerald-500",
      status: "pending",
      completionDate: null,
      latestDocument: null,
    },
  ],
}

export function StageTraceability({ onStageClick, projectId = "default" }: StageTraceabilityProps) {
  // Get the appropriate stage data based on project ID
  const currentStageData = mockStageData[projectId as keyof typeof mockStageData] || mockStageData.default
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "in_progress":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "pending":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "in_progress":
        return <Clock className="w-4 h-4 text-yellow-600" />
      case "pending":
        return <AlertTriangle className="w-4 h-4 text-gray-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const getApprovalStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="w-5 h-5 text-blue-600" />
          Stage-wise Project Traceability
        </CardTitle>
        <p className="text-gray-600">
          Complete overview of project progression through all 11 stages from Sales to Completion
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {currentStageData.map((stage, index) => (
            <div key={stage.stageId} className="relative">
              {/* Connecting Line */}
              {index < currentStageData.length - 1 && (
                <div className="absolute left-6 top-16 w-0.5 h-8 bg-gray-200"></div>
              )}

              {/* Stage Container */}
              <div className="relative flex items-start gap-4">
                {/* Stage Number & Icon */}
                <div
                  className={`relative z-10 w-12 h-12 rounded-full border-4 flex items-center justify-center ${
                    stage.status === "completed"
                      ? "bg-green-100 border-green-500"
                      : stage.status === "in_progress"
                        ? "bg-yellow-100 border-yellow-500"
                        : "bg-gray-100 border-gray-300"
                  }`}
                >
                  <stage.icon className="w-5 h-5" />
                </div>

                {/* Stage Content */}
                <div className="flex-1 min-w-0">
                  <div className="bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    {/* Stage Header */}
                    <div className="p-4 border-b bg-gray-50 rounded-t-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${stage.color}`}></div>
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {stage.stageNumber}. {stage.stageName}
                            </h3>
                            <p className="text-sm text-gray-600">Stage {stage.stageNumber} of 11</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <Badge className={getStatusColor(stage.status)}>
                            {getStatusIcon(stage.status)}
                            <span className="ml-1 capitalize">{stage.status.replace("_", " ")}</span>
                          </Badge>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onStageClick(stage.stageId)}
                            className="flex items-center gap-2"
                          >
                            <FolderOpen className="w-4 h-4" />
                            View Files
                          </Button>
                        </div>
                      </div>

                      {stage.completionDate && (
                        <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>Completed on: {stage.completionDate}</span>
                        </div>
                      )}
                    </div>

                    {/* Document Information */}
                    <div className="p-4">
                      {stage.latestDocument ? (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-gray-900">Latest Document</h4>
                            <Badge className={getApprovalStatusColor(stage.latestDocument.approvalStatus)}>
                              {stage.latestDocument.approvalStatus}
                            </Badge>
                          </div>

                          <div className="bg-blue-50 rounded-lg p-3">
                            <div className="flex items-start gap-3">
                              <FileText className="w-5 h-5 text-blue-600 mt-1" />
                              <div className="flex-1 min-w-0">
                                <div className="font-medium text-gray-900 truncate">
                                  {stage.latestDocument.documentName}
                                </div>
                                <div className="grid grid-cols-2 gap-4 mt-2 text-sm text-gray-600">
                                  <div>
                                    <span className="font-medium">ID:</span> {stage.latestDocument.documentId}
                                  </div>
                                  <div>
                                    <span className="font-medium">Version:</span> {stage.latestDocument.version}
                                  </div>
                                  <div>
                                    <span className="font-medium">Type:</span> {stage.latestDocument.fileType}
                                  </div>
                                  <div>
                                    <span className="font-medium">Size:</span> {stage.latestDocument.fileSize}
                                  </div>
                                </div>
                                <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                                  <div className="flex items-center gap-1">
                                    <User className="w-4 h-4" />
                                    <span>Uploaded by: {stage.latestDocument.uploader}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    <span>{stage.latestDocument.uploadDate}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                  <Eye className="w-4 h-4 mr-1" />
                                  Preview
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Download className="w-4 h-4 mr-1" />
                                  Download
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-6 text-gray-500">
                          <FileText className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                          <p className="text-sm">No documents uploaded in this stage yet</p>
                          <p className="text-xs text-gray-400 mt-1">
                            Documents will appear here once uploaded to this stage
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Project Completion Indicator */}
          <div className="relative flex items-center justify-center pt-4">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 text-center border-2 border-dashed border-blue-200">
              <Flag className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <h3 className="font-semibold text-blue-900">Project Completion</h3>
              <p className="text-sm text-blue-700 mt-1">
                All stages completed successfully - Project ready for handover
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}