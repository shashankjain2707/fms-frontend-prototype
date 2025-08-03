"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search, HelpCircle, Book, MessageCircle, Mail, Phone, Video, FileText, Clock, CheckCircle } from "lucide-react"

const faqData = [
  {
    category: "Getting Started",
    questions: [
      {
        question: "How do I create a new project?",
        answer:
          "To create a new project, navigate to the Dashboard and click the 'New Project' button. Fill in the project details including name, client, start date, and assign a project manager. The system will automatically create the 11-stage folder structure for document management.",
      },
      {
        question: "How do I upload documents?",
        answer:
          "You can upload documents by navigating to a project, selecting the appropriate stage folder, and clicking the 'Upload' button. You can drag and drop files or select them manually. Make sure to specify the document type and version before uploading.",
      },
      {
        question: "What file formats are supported?",
        answer:
          "The system supports PDF, DOC, DOCX, XLS, XLSX, and common image formats (JPG, PNG, GIF). Maximum file size is 10MB per document. For larger files, please contact your administrator.",
      },
    ],
  },
  {
    category: "Document Management",
    questions: [
      {
        question: "How does the approval process work?",
        answer:
          "Documents go through a multi-stage approval process. After upload, documents are marked as 'Pending' and assigned to the appropriate department head for review. They can approve, reject, or request modifications. You'll receive notifications at each stage.",
      },
      {
        question: "Can I share documents with external parties?",
        answer:
          "Yes, you can generate secure sharing links for external parties. Go to the project page, select the documents you want to share, and click 'Share'. You can set expiry dates and control access permissions.",
      },
      {
        question: "How do I track document versions?",
        answer:
          "The system automatically tracks document versions. When uploading a new version of an existing document, increment the version number (e.g., v1.0 to v1.1). All previous versions are preserved and accessible through the document history.",
      },
    ],
  },
  {
    category: "User Management",
    questions: [
      {
        question: "How do I add new team members?",
        answer:
          "Administrators can add new users by going to the Users page and clicking 'Add User'. Specify their role (Admin, Department Head, Employee, or External Auditor) and department. New users will receive an invitation email to set up their account.",
      },
      {
        question: "What are the different user roles?",
        answer:
          "There are four user roles: Admin (full system access), Department Head (manage department documents and users), Employee (upload assigned documents), and External Auditor (view-only access to shared documents).",
      },
      {
        question: "How do I reset a user's password?",
        answer:
          "Administrators can reset passwords from the Users page. Click on the user's menu and select 'Reset Password'. The user will receive an email with instructions to set a new password.",
      },
    ],
  },
  {
    category: "Technical Support",
    questions: [
      {
        question: "What browsers are supported?",
        answer:
          "The system works best with modern browsers including Chrome 90+, Firefox 88+, Safari 14+, and Edge 90+. For optimal performance, we recommend using the latest version of Chrome or Firefox.",
      },
      {
        question: "How do I report a bug or issue?",
        answer:
          "You can report issues through the Help page contact form, email support@company.com, or call our support hotline. Please include details about the issue, steps to reproduce it, and your browser information.",
      },
      {
        question: "Is my data secure?",
        answer:
          "Yes, we use enterprise-grade security including SSL encryption, regular backups, and secure data centers. All documents are stored securely and access is logged for audit purposes.",
      },
    ],
  },
]

const tutorialVideos = [
  {
    title: "Getting Started with FMS",
    duration: "5:30",
    description: "Learn the basics of navigating the File Management System",
    thumbnail: "/placeholder.svg?height=120&width=200&text=Video+Thumbnail",
  },
  {
    title: "Creating Your First Project",
    duration: "8:15",
    description: "Step-by-step guide to setting up a new construction project",
    thumbnail: "/placeholder.svg?height=120&width=200&text=Video+Thumbnail",
  },
  {
    title: "Document Upload and Management",
    duration: "6:45",
    description: "How to upload, organize, and manage project documents",
    thumbnail: "/placeholder.svg?height=120&width=200&text=Video+Thumbnail",
  },
  {
    title: "User Roles and Permissions",
    duration: "4:20",
    description: "Understanding different user roles and access levels",
    thumbnail: "/placeholder.svg?height=120&width=200&text=Video+Thumbnail",
  },
]

const supportArticles = [
  {
    title: "Project Setup Best Practices",
    category: "Best Practices",
    readTime: "5 min read",
    description: "Learn how to structure your projects for maximum efficiency",
  },
  {
    title: "Document Naming Conventions",
    category: "Guidelines",
    readTime: "3 min read",
    description: "Standardized naming conventions for better organization",
  },
  {
    title: "Security and Compliance Guide",
    category: "Security",
    readTime: "8 min read",
    description: "Understanding security features and compliance requirements",
  },
  {
    title: "Integration with Google Drive",
    category: "Integrations",
    readTime: "6 min read",
    description: "How to connect and sync with Google Drive",
  },
]

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredFAQ = faqData.filter((category) => {
    if (selectedCategory !== "all" && category.category !== selectedCategory) return false

    if (searchQuery) {
      return category.questions.some(
        (q) =>
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }
    return true
  })

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Help Center</h1>
          <p className="text-gray-600 mt-2">Find answers, tutorials, and get support</p>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search for help articles, FAQs, or tutorials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 text-lg"
              />
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="pt-6 text-center">
              <Book className="w-8 h-8 mx-auto mb-3 text-blue-600" />
              <h3 className="font-semibold mb-2">Documentation</h3>
              <p className="text-sm text-gray-600">Comprehensive guides and API docs</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="pt-6 text-center">
              <Video className="w-8 h-8 mx-auto mb-3 text-green-600" />
              <h3 className="font-semibold mb-2">Video Tutorials</h3>
              <p className="text-sm text-gray-600">Step-by-step video guides</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="pt-6 text-center">
              <MessageCircle className="w-8 h-8 mx-auto mb-3 text-purple-600" />
              <h3 className="font-semibold mb-2">Live Chat</h3>
              <p className="text-sm text-gray-600">Get instant help from our team</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="pt-6 text-center">
              <Mail className="w-8 h-8 mx-auto mb-3 text-orange-600" />
              <h3 className="font-semibold mb-2">Contact Support</h3>
              <p className="text-sm text-gray-600">Email us for detailed assistance</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="faq" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          {/* FAQ */}
          <TabsContent value="faq" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5" />
                  Frequently Asked Questions
                </CardTitle>
                <CardDescription>Find quick answers to common questions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 mb-6 flex-wrap">
                  <Button
                    variant={selectedCategory === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory("all")}
                  >
                    All Categories
                  </Button>
                  {faqData.map((category) => (
                    <Button
                      key={category.category}
                      variant={selectedCategory === category.category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.category)}
                    >
                      {category.category}
                    </Button>
                  ))}
                </div>

                <div className="space-y-6">
                  {filteredFAQ.map((category) => (
                    <div key={category.category}>
                      <h3 className="text-lg font-semibold mb-4">{category.category}</h3>
                      <Accordion type="single" collapsible className="space-y-2">
                        {category.questions.map((item, index) => (
                          <AccordionItem
                            key={index}
                            value={`${category.category}-${index}`}
                            className="border rounded-lg px-4"
                          >
                            <AccordionTrigger className="text-left hover:no-underline">
                              {item.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-600 pb-4">{item.answer}</AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tutorials */}
          <TabsContent value="tutorials" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="w-5 h-5" />
                  Video Tutorials
                </CardTitle>
                <CardDescription>Learn through step-by-step video guides</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {tutorialVideos.map((video, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-0">
                        <div className="relative">
                          <img
                            src={video.thumbnail || "/placeholder.svg"}
                            alt={video.title}
                            className="w-full h-32 object-cover rounded-t-lg"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                              <Video className="w-6 h-6 text-white ml-1" />
                            </div>
                          </div>
                          <Badge className="absolute top-2 right-2 bg-black/70 text-white">{video.duration}</Badge>
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold mb-2">{video.title}</h3>
                          <p className="text-sm text-gray-600">{video.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Articles */}
          <TabsContent value="articles" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Help Articles
                </CardTitle>
                <CardDescription>Detailed guides and best practices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {supportArticles.map((article, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{article.title}</h3>
                          <Badge variant="secondary" className="text-xs">
                            {article.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{article.description}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          {article.readTime}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Read More
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact */}
          <TabsContent value="contact" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    Contact Support
                  </CardTitle>
                  <CardDescription>Get in touch with our support team</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="font-medium">Email Support</div>
                      <div className="text-sm text-gray-600">support@company.com</div>
                      <div className="text-xs text-gray-500">Response within 24 hours</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <Phone className="w-5 h-5 text-green-600" />
                    <div>
                      <div className="font-medium">Phone Support</div>
                      <div className="text-sm text-gray-600">+1 (555) 123-HELP</div>
                      <div className="text-xs text-gray-500">Mon-Fri, 9 AM - 6 PM EST</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <MessageCircle className="w-5 h-5 text-purple-600" />
                    <div>
                      <div className="font-medium">Live Chat</div>
                      <div className="text-sm text-gray-600">Available now</div>
                      <div className="text-xs text-gray-500">Average response: 2 minutes</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Status</CardTitle>
                  <CardDescription>Current system performance and uptime</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>File Management System</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Operational</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Google Drive Integration</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Operational</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Email Notifications</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Operational</Badge>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="text-sm text-gray-600">
                      <div className="flex justify-between mb-1">
                        <span>Uptime (30 days)</span>
                        <span className="font-medium">99.9%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Average Response Time</span>
                        <span className="font-medium">245ms</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
