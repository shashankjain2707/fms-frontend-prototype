"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Copy, Mail, Link, Eye, Shield, CheckCircle } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  projectId: string
}

export function ShareModal({ isOpen, onClose, projectId }: ShareModalProps) {
  const [shareType, setShareType] = useState<"public" | "private">("private")
  const [expiryEnabled, setExpiryEnabled] = useState(false)
  const [emailList, setEmailList] = useState("")
  const [message, setMessage] = useState("")
  const [linkGenerated, setLinkGenerated] = useState(false)
  const [shareLink] = useState(`https://fms.company.com/shared/${projectId}/abc123`)

  const handleGenerateLink = () => {
    setLinkGenerated(true)
    toast({
      title: "Share link generated",
      description: "The secure share link has been created successfully.",
    })
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink)
    toast({
      title: "Link copied",
      description: "Share link has been copied to clipboard.",
    })
  }

  const handleSendEmail = () => {
    toast({
      title: "Email sent",
      description: "Share invitations have been sent successfully.",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Share Project Documents</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Share Type Selection */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Share Type</Label>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setShareType("private")}
                className={`p-4 border rounded-lg text-left transition-colors ${
                  shareType === "private" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">Private Link</span>
                </div>
                <p className="text-sm text-gray-600">Only people with the link can access</p>
              </button>

              <button
                onClick={() => setShareType("public")}
                className={`p-4 border rounded-lg text-left transition-colors ${
                  shareType === "public" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Link className="w-5 h-5 text-green-600" />
                  <span className="font-medium">Public Link</span>
                </div>
                <p className="text-sm text-gray-600">Anyone with the link can view</p>
              </button>
            </div>
          </div>

          {/* Access Settings */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Access Settings</Label>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="expiry">Set expiry date</Label>
                <p className="text-sm text-gray-600">Link will expire automatically</p>
              </div>
              <Switch id="expiry" checked={expiryEnabled} onCheckedChange={setExpiryEnabled} />
            </div>

            {expiryEnabled && (
              <div className="space-y-2">
                <Label htmlFor="expiry-date">Expiry Date</Label>
                <Input id="expiry-date" type="date" min={new Date().toISOString().split("T")[0]} />
              </div>
            )}
          </div>

          {/* Generated Link */}
          {linkGenerated && (
            <div className="space-y-2">
              <Label>Share Link</Label>
              <div className="flex gap-2">
                <Input value={shareLink} readOnly className="flex-1" />
                <Button variant="outline" onClick={handleCopyLink}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Eye className="w-4 h-4" />
                <span>View-only access</span>
                <Badge variant="secondary" className="text-xs">
                  {shareType === "private" ? "Private" : "Public"}
                </Badge>
              </div>
            </div>
          )}

          {/* Email Sharing */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Share via Email</Label>

            <div className="space-y-2">
              <Label htmlFor="emails">Email Addresses</Label>
              <Textarea
                id="emails"
                placeholder="Enter email addresses separated by commas..."
                value={emailList}
                onChange={(e) => setEmailList(e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message (Optional)</Label>
              <Textarea
                id="message"
                placeholder="Add a personal message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
              />
            </div>
          </div>

          {/* Permissions Summary */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium mb-2">Permissions Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>View documents</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Download files</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <span className="w-4 h-4 border border-gray-300 rounded-full"></span>
                <span>Upload documents</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <span className="w-4 h-4 border border-gray-300 rounded-full"></span>
                <span>Edit documents</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            {!linkGenerated && (
              <Button onClick={handleGenerateLink}>
                <Link className="w-4 h-4 mr-2" />
                Generate Link
              </Button>
            )}
            {linkGenerated && emailList && (
              <Button onClick={handleSendEmail}>
                <Mail className="w-4 h-4 mr-2" />
                Send Invitations
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
