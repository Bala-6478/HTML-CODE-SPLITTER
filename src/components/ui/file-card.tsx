
"use client"

import * as React from "react"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Copy, Check } from "lucide-react"

interface FileCardProps {
  title: string
  fileName: string
  content: string
  icon: React.ReactNode
  language: string
}

export function FileCard({ title, fileName, content, icon, language }: FileCardProps) {
  const [copied, setCopied] = React.useState(false)

  const handleDownload = () => {
    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="flex flex-col h-full border-none shadow-md overflow-hidden bg-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-muted/30">
        <div className="flex items-center gap-2">
          {icon}
          <CardTitle className="text-lg font-headline">{title}</CardTitle>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={handleCopy} title="Copy code">
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-0">
        <div className="relative h-[250px] overflow-auto bg-slate-950 p-4">
          <pre className="font-code text-sm text-slate-50 whitespace-pre-wrap">
            <code>{content || `// No ${title} content extracted`}</code>
          </pre>
        </div>
      </CardContent>
      <CardFooter className="p-4 border-t flex justify-between items-center">
        <span className="text-xs text-muted-foreground font-mono">{fileName}</span>
        <Button 
          onClick={handleDownload} 
          disabled={!content}
          className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Download
        </Button>
      </CardFooter>
    </Card>
  )
}
