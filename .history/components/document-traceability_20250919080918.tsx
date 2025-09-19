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
  ArrowRight,
  MapPin,
  Calendar,
  MessageSquare,
} from "lucide-react"

interface DocumentTraceabilityProps {
  selectedFolder: string
}

const mockTraceabilityData = {
  "1": [
    {
      documentId: "DOC_001",
      documentName: "Purchase_Order_Mumbai_Expressway.pdf",
      currentStage: "Sales",
      status: "approved",
      timeline: [
        {
          stage: "Upload",
          user: "Divyaraj Rathore",
          userRole: "Sales Executive",
          timestamp: "2025-01-15 09:30 AM",
          action: "Document uploaded",
          status: "completed",
          location: "Mumbai Office",
          comments: "Initial purchase order for expressway project materials",
          avatar: "DR",
        },
        {
          stage: "Review",
          user: "Nidhi Shah",
          userRole: "Sales Manager",
          timestamp: "2025-01-15 11:45 AM",
          action: "Document reviewed and approved",
          status: "completed",
          location: "Mumbai Office",
          comments: "Approved after verifying client requirements and specifications",
          avatar: "NS",
        },
        {
          stage: "Forward to PPC",
          user: "Nidhi Shah",
          userRole: "Sales Manager",
          timestamp: "2025-01-15 12:00 PM",
          action: "Forwarded to PPC Department",
          status: "completed",
          location: "Mumbai Office",
          comments: "Ready for production planning and control review",
          avatar: "NS",
        },
      ],
      nextStage: "PPC",
      assignedTo: "Ravi Kumar",
      priority: "high",
      documentType: "Purchase Order",
      version: "v1.2",
      fileSize: "2.4 MB",
    },
  ],
  "2": [
    {
      documentId: "DOC_002",
      documentName: "Production_Plan_Mumbai_Expressway.pdf",
      currentStage: "PPC",
      status: "pending",
      timeline: [
        {
          stage: "Received from Sales",
          user: "Ravi Kumar",
          userRole: "PPC Manager",
          timestamp: "2025-01-15 12:15 PM",
          action: "Document received from Sales",
          status: "completed",
          location: "Pune Office",
          comments: "Received purchase order for production planning",
          avatar: "RK",
        },
        {
          stage: "Analysis",
          user: "Ravi Kumar",
          userRole: "PPC Manager",
          timestamp: "2025-01-16 10:30 AM",
          action: "Production analysis in progress",
          status: "in_progress",
          location: "Pune Office",
          comments: "Analyzing material requirements and production timeline",
          avatar: "RK",
        },
      ],
      nextStage: "Quality",
      assignedTo: "Sunita Reddy",
      priority: "medium",
      documentType: "Production Plan",
      version: "v1.0",
      fileSize: "3.2 MB",
    },
  ],
}

export function DocumentTraceability({ selectedFolder }: DocumentTraceabilityProps) {
  const documents = mockTraceabilityData[selectedFolder as keyof typeof mockTraceabilityData] || []

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "in_progress":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "pending":
        return "bg-red-100 text-red-800 border-red-200"
      case "approved":
        return "bg-blue-100 text-blue-800 border-blue-200"
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
        return <AlertTriangle className="w-4 h-4 text-red-600" />
      case "approved":
        return <CheckCircle className="w-4 h-4 text-blue-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  if (documents.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-8 text-gray-500">
            <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No documents found in this stage for traceability</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {documents.map((doc) => (
        <Card key={doc.documentId} className="overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <FileText className="w-6 h-6 text-blue-600" />
                  <div>
                    <CardTitle className="text-lg">{doc.documentName}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                      <span>ID: {doc.documentId}</span>
                      <span>Type: {doc.documentType}</span>
                      <span>Version: {doc.version}</span>
                      <span>Size: {doc.fileSize}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Badge className={getStatusColor(doc.status)}>
                    {getStatusIcon(doc.status)}
                    <span className="ml-1 capitalize">{doc.status}</span>
                  </Badge>

                  <div className="flex items-center gap-1">
                    <div className={`w-2 h-2 rounded-full ${getPriorityColor(doc.priority)}`}></div>
                    <span className="text-sm text-gray-600 capitalize">{doc.priority} Priority</span>
                  </div>

                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <User className="w-4 h-4" />
                    <span>Assigned to: {doc.assignedTo}</span>
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
          </CardHeader>

          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Document Journey Timeline</h3>
                <div className="text-sm text-gray-600">
                  Next Stage: <span className="font-medium text-blue-600">{doc.nextStage}</span>
                </div>
              </div>

              {/* Timeline */}
              <div className="relative">
                {doc.timeline.map((event, index) => (
                  <div key={index} className="relative flex items-start gap-4 pb-8">
                    {/* Timeline Line */}
                    {index < doc.timeline.length - 1 && (
                      <div className="absolute left-6 top-12 w-0.5 h-full bg-gray-200"></div>
                    )}

                    {/* Timeline Node */}
                    <div
                      className={`relative z-10 w-12 h-12 rounded-full border-4 flex items-center justify-center ${
                        event.status === "completed"
                          ? "bg-green-100 border-green-500"
                          : event.status === "in_progress"
                            ? "bg-yellow-100 border-yellow-500"
                            : "bg-gray-100 border-gray-300"
                      }`}
                    >
                      {getStatusIcon(event.status)}
                    </div>

                    {/* Timeline Content */}
                    <div className="flex-1 min-w-0">
                      <div className="bg-white border rounded-lg p-4 shadow-sm">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
                              <AvatarFallback className="text-xs">{event.avatar}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-gray-900">{event.user}</div>
                              <div className="text-sm text-gray-600">{event.userRole}</div>
                            </div>
                          </div>

                          <Badge variant="outline" className="text-xs">
                            {event.stage}
                          </Badge>
                        </div>

                        <div className="space-y-2">
                          <div className="font-medium text-gray-900">{event.action}</div>

                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {event.timestamp}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {event.location}
                            </div>
                          </div>

                          {event.comments && (
                            <div className="bg-gray-50 rounded-md p-3 mt-3">
                              <div className="flex items-start gap-2">
                                <MessageSquare className="w-4 h-4 text-gray-500 mt-0.5" />
                                <div className="text-sm text-gray-700">{event.comments}</div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Next Stage Indicator */}
                <div className="relative flex items-start gap-4">
                  <div className="relative z-10 w-12 h-12 rounded-full border-4 border-dashed border-blue-300 bg-blue-50 flex items-center justify-center">
                    <ArrowRight className="w-5 h-5 text-blue-500" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="bg-blue-50 border-2 border-dashed border-blue-200 rounded-lg p-4">
                      <div className="font-medium text-blue-900">Next: {doc.nextStage} Department</div>
                      <div className="text-sm text-blue-700 mt-1">
                        Assigned to: <span className="font-medium">{doc.assignedTo}</span>
                      </div>
                      <div className="text-xs text-blue-600 mt-2">
                        Waiting for document to be processed in {doc.nextStage} stage
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
