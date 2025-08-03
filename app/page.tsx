"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Chrome, FileText, Users, Shield } from "lucide-react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    // Simulate login process
    setTimeout(() => {
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl border-0">
          <CardHeader className="text-center pb-8">
            <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">File Management System</CardTitle>
            <CardDescription className="text-gray-600">
              Secure document management from Sales to Dispatch
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Chrome className="w-5 h-5 mr-3" />
              {isLoading ? "Signing in..." : "Sign in with Google"}
            </Button>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="text-center">
                <Users className="w-6 h-6 mx-auto text-blue-600 mb-2" />
                <p className="text-xs text-gray-600">Multi-Role Access</p>
              </div>
              <div className="text-center">
                <Shield className="w-6 h-6 mx-auto text-blue-600 mb-2" />
                <p className="text-xs text-gray-600">Secure Sharing</p>
              </div>
              <div className="text-center">
                <FileText className="w-6 h-6 mx-auto text-blue-600 mb-2" />
                <p className="text-xs text-gray-600">Document Tracking</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
