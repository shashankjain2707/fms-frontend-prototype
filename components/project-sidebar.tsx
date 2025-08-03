"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Clock, AlertTriangle, Construction } from "lucide-react"
import { cn } from "@/lib/utils"
import {
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

interface ProjectSidebarProps {
  folders: {
    id: string
    name: string
    count: number
    completed: number
    department: string
    color: string
    icon: string
  }[]
  selectedFolder: string
  onFolderSelect: (folderId: string) => void
}

export function ProjectSidebar({ folders, selectedFolder, onFolderSelect }: ProjectSidebarProps) {
  const iconMap: { [key: string]: React.ComponentType<any> } = {
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
  }

  const getStatusIcon = (folder: any) => {
    if (folder.count === 0) {
      return <Clock className="w-4 h-4 text-gray-400" />
    } else if (folder.completed === folder.count) {
      return <CheckCircle className="w-4 h-4 text-green-500" />
    } else if (folder.completed > 0) {
      return <AlertTriangle className="w-4 h-4 text-yellow-500" />
    } else {
      return <Clock className="w-4 h-4 text-red-500" />
    }
  }

  const getStatusColor = (folder: any) => {
    if (folder.count === 0) return "bg-gray-100 text-gray-600"
    if (folder.completed === folder.count) return "bg-green-100 text-green-800"
    if (folder.completed > 0) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Construction className="w-5 h-5 text-blue-600" />
          Project Workflow
        </CardTitle>
        <p className="text-sm text-gray-600">11-Stage Document Flow</p>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-2">
          {folders.map((folder, index) => {
            const isSelected = folder.id === selectedFolder
            const isCompleted = folder.count > 0 && folder.completed === folder.count
            const progress = folder.count > 0 ? (folder.completed / folder.count) * 100 : 0

            return (
              <div key={folder.id} className="relative">
                {/* Connection Line */}
                {index < folders.length - 1 && <div className="absolute left-8 top-12 w-0.5 h-6 bg-gray-200 z-0"></div>}

                <button
                  onClick={() => onFolderSelect(folder.id)}
                  className={cn(
                    "w-full text-left p-4 hover:bg-gray-50 transition-all duration-200 border-l-4 relative z-10",
                    isSelected ? "bg-blue-50 border-l-blue-500 shadow-sm" : "border-l-transparent",
                  )}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      {/* Department Icon */}
                      <div
                        className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center text-white text-sm",
                          folder.color,
                        )}
                      >
                        {(() => {
                          const IconComponent = iconMap[folder.icon]
                          return IconComponent ? <IconComponent className="w-4 h-4" /> : null
                        })()}
                      </div>

                      <div>
                        <span className={cn("text-sm font-medium", isSelected ? "text-blue-900" : "text-gray-700")}>
                          {folder.name}
                        </span>
                        <div className="text-xs text-gray-500">{folder.department}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {getStatusIcon(folder)}
                      <Badge variant="secondary" className={cn("text-xs", getStatusColor(folder))}>
                        {folder.completed}/{folder.count}
                      </Badge>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {folder.count > 0 && (
                    <div className="mt-2">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Progress</span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                  )}

                  {/* Status Indicator */}
                  <div className="mt-2 flex items-center gap-2">
                    <div
                      className={cn(
                        "w-2 h-2 rounded-full",
                        folder.count === 0
                          ? "bg-gray-300"
                          : isCompleted
                            ? "bg-green-500"
                            : folder.completed > 0
                              ? "bg-yellow-500"
                              : "bg-red-500",
                      )}
                    ></div>
                    <span className="text-xs text-gray-500">
                      {folder.count === 0
                        ? "Not Started"
                        : isCompleted
                          ? "Completed"
                          : folder.completed > 0
                            ? "In Progress"
                            : "Pending"}
                    </span>
                  </div>
                </button>
              </div>
            )
          })}
        </div>

        {/* Overall Progress Summary */}
        <div className="p-4 border-t bg-gray-50">
          <div className="text-sm font-medium text-gray-700 mb-2">Overall Project Progress</div>
          <div className="flex items-center gap-2">
            <Progress value={73} className="flex-1 h-3" />
            <span className="text-sm font-medium text-gray-700">73%</span>
          </div>
          <div className="text-xs text-gray-500 mt-1">8 of 11 stages active</div>
        </div>
      </CardContent>
    </Card>
  )
}
