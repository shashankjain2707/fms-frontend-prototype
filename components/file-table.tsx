"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { FileText, Download, Eye, MoreHorizontal, Search, Calendar } from "lucide-react"

const mockFiles = {
  "1": [
    {
      id: "1",
      name: "Purchase_Order_Mumbai_Expressway.pdf",
      type: "Purchase Order",
      department: "Sales",
      uploadDate: "2025-01-15",
      uploader: "Priya Sharma",
      version: "v1.2",
      status: "approved",
      size: "2.4 MB",
    },
    {
      id: "2",
      name: "Technical_Specifications_MSRDC.pdf",
      type: "Technical Spec",
      department: "Sales",
      uploadDate: "2025-01-16",
      uploader: "Amit Patel",
      version: "v1.0",
      status: "approved",
      size: "1.8 MB",
    },
    {
      id: "3",
      name: "Client_Requirements_Maharashtra.docx",
      type: "Requirements",
      department: "Sales",
      uploadDate: "2025-01-17",
      uploader: "Priya Sharma",
      version: "v2.1",
      status: "approved",
      size: "856 KB",
    },
  ],
  "2": [
    {
      id: "4",
      name: "Production_Plan_Mumbai_Expressway.pdf",
      type: "Production Plan",
      department: "PPC",
      uploadDate: "2025-01-18",
      uploader: "Ravi Kumar",
      version: "v1.0",
      status: "pending",
      size: "3.2 MB",
    },
    {
      id: "5",
      name: "Material_List_Expressway.xlsx",
      type: "Material List",
      department: "PPC",
      uploadDate: "2025-01-19",
      uploader: "Sunita Reddy",
      version: "v1.1",
      status: "approved",
      size: "445 KB",
    },
  ],
}

interface FileTableProps {
  selectedFolder: string
}

export function FileTable({ selectedFolder }: FileTableProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFile, setSelectedFile] = useState<string | null>(null)

  const files = mockFiles[selectedFolder as keyof typeof mockFiles] || []

  const filteredFiles = files.filter(
    (file) =>
      file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.type.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
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

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase()
    return <FileText className="w-4 h-4 text-blue-600" />
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>Files & Documents</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search files..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full sm:w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredFiles.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No files found in this folder</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>File Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Upload Date</TableHead>
                    <TableHead>Version</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFiles.map((file) => (
                    <TableRow key={file.id} className={selectedFile === file.id ? "bg-blue-50" : ""}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getFileIcon(file.name)}
                          <span className="font-medium">{file.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{file.type}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{file.department}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Calendar className="w-3 h-3" />
                          {file.uploadDate}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{file.version}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(file.status)}>{file.status}</Badge>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">{file.size}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setSelectedFile(file.id)}>
                              <Eye className="w-4 h-4 mr-2" />
                              Preview
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* File Preview */}
      {selectedFile && (
        <Card>
          <CardHeader>
            <CardTitle>File Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-100 rounded-lg p-8 text-center">
              <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600">Preview for {filteredFiles.find((f) => f.id === selectedFile)?.name}</p>
              <p className="text-sm text-gray-500 mt-2">File preview would be embedded here</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
