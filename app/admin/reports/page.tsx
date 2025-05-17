"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Search } from "lucide-react"

// Mock data for reports
const reports = [
  {
    id: "r1",
    type: "Inappropriate content",
    target: "Tech Conference 2023",
    targetType: "event",
    reporter: "john@example.com",
    date: "2023-06-15",
    status: "pending",
  },
  {
    id: "r2",
    type: "Scam",
    target: "Free iPhone Giveaway",
    targetType: "event",
    reporter: "alice@example.com",
    date: "2023-06-12",
    status: "investigating",
  },
  {
    id: "r3",
    type: "Harassment",
    target: "bob@example.com",
    targetType: "user",
    reporter: "jane@example.com",
    date: "2023-06-10",
    status: "resolved",
  },
  {
    id: "r4",
    type: "False information",
    target: "Crypto Investment Seminar",
    targetType: "event",
    reporter: "charlie@example.com",
    date: "2023-06-08",
    status: "dismissed",
  },
  {
    id: "r5",
    type: "Inappropriate behavior",
    target: "david@example.com",
    targetType: "user",
    reporter: "emma@example.com",
    date: "2023-06-05",
    status: "pending",
  },
]

export default function ReportsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredReports = reports.filter(
    (report) =>
      report.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.target.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.reporter.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
        <p className="text-muted-foreground">Manage user reports and content moderation</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search reports..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Target</TableHead>
              <TableHead>Target Type</TableHead>
              <TableHead>Reporter</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReports.map((report) => (
              <TableRow key={report.id}>
                <TableCell>{report.type}</TableCell>
                <TableCell>{report.target}</TableCell>
                <TableCell>
                  <Badge variant="outline">{report.targetType}</Badge>
                </TableCell>
                <TableCell>{report.reporter}</TableCell>
                <TableCell>{report.date}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      report.status === "pending"
                        ? "outline"
                        : report.status === "investigating"
                          ? "default"
                          : report.status === "resolved"
                            ? "success"
                            : "secondary"
                    }
                  >
                    {report.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuItem>Mark as investigating</DropdownMenuItem>
                      <DropdownMenuItem>Mark as resolved</DropdownMenuItem>
                      <DropdownMenuItem>Dismiss report</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Contact reporter</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
