'use client';
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Edit, Eye, Filter } from "lucide-react"
import { useState } from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { CategoryData } from "@/types/structure";

const catList = [
    { id: 1, name: 'KIDDOS', year: "2025", isActive: true },
    { id: 2, name: 'KIDDOS', year: "2023", isActive: false },
    { id: 3, name: 'KIDS', year: "2023", isActive: true },
    { id: 4, name: 'KIDDOS', year: "2024", isActive: true },
    { id: 5, name: 'KIDS', year: "2025", isActive: true },
    { id: 6, name: 'SUPERKIDS', year: "2023", isActive: false },
    { id: 7, name: 'SUPERKIDS', year: "2025", isActive: false },
    { id: 8, name: 'SUPERKIDS', year: "2024", isActive: true },
]

const CategorySection = ({userRole,data}:{userRole:string[],data:CategoryData[]}) => {
    const yearNow = new Date().getFullYear().toString()
    const [selectedCategory, setSelectedCategory] = useState<typeof data[0] | null>(null)
    const [statusFilter, setStatusFilter] = useState<'all' | boolean>(true)
    const [yearFilter, setYearFilter] = useState<string>(yearNow)

    const filteredCategories = data.filter(cat => {
        if (statusFilter !== 'all' && cat.is_active !== statusFilter) return false
        if (yearFilter !== 'all' && cat.year.toString() !== yearFilter) return false
        return true
    })

    const years = Array.from(new Set(data.map(cat => cat.year.toString())))
  return (
    <div>
      {/* Filters Section */}
        <Card className="p-4 mb-6">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">Filters:</span>
                </div>
                
                <Select
                    value={String(statusFilter)}
                    onValueChange={(value) => setStatusFilter(value === 'all' ? 'all' : value === 'true')}
                >
                    <SelectTrigger className="w-[140px] bg-yellow-2">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent className="bg-yellow-2">
                        <SelectItem value="all" className="cursor-pointer hover:bg-yellow-9">All Status</SelectItem>
                        <SelectItem value="true" className="cursor-pointer hover:bg-yellow-9">Active</SelectItem>
                        <SelectItem value="false" className="cursor-pointer hover:bg-yellow-9">Inactive</SelectItem>
                    </SelectContent>
                </Select>

                <Select
                    value={yearFilter}
                    onValueChange={setYearFilter}
                >
                    <SelectTrigger className="w-[140px] bg-yellow-2">
                        <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent className="bg-yellow-2">
                        <SelectItem value="all" className="cursor-pointer hover:bg-yellow-9">All Years</SelectItem>
                        {years.map(year => (
                            <SelectItem key={year} value={year} className="cursor-pointer hover:bg-yellow-9">{year}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </Card>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredCategories.map((category) => (
                <Card 
                    key={category.id}
                    className="p-4 hover:shadow-md transition-shadow duration-200"
                >
                    <div className="space-y-3">
                        <div className="flex justify-between items-start">
                            <h2 className="text-lg font-medium text-gray-900">
                                {category.name}
                            </h2>
                            <div className="flex gap-2">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                                    onClick={() => setSelectedCategory(category)}
                                >
                                    <Eye className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                                    onClick={() => setSelectedCategory(category)}
                                >
                                    <Edit className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2 text-xs">
                                <span className={`inline-block w-2 h-2 rounded-full ${
                                    category.is_active ? 'bg-green-400' : 'bg-gray-400'
                                }`}></span>
                                {category.is_active ? 'Active' : 'Inactive'}
                            </div>
                            <span className="text-xs text-gray-500">
                                Year: {category.year}
                            </span>
                        </div>
                    </div>
                </Card>
            ))}
        </div>

        {/* View/Edit Modal */}
        {selectedCategory && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-20" style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}>
                <Card className="w-full max-w-md p-6 bg-white">
                    <h2 className="text-xl font-semibold mb-4">
                        {selectedCategory.name}
                    </h2>
                    <div className="flex items-center gap-2 mb-4">
                        <span className={`inline-block w-2 h-2 rounded-full ${
                            selectedCategory.is_active ? 'bg-green-400' : 'bg-gray-400'
                        }`}></span>
                        <span className="text-sm text-gray-600">
                            {selectedCategory.is_active ? 'Active' : 'Inactive'}
                        </span>
                        <span className="text-sm text-gray-600 ml-4">
                            Year: {selectedCategory.year}
                        </span>
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button
                            variant="outline"
                            onClick={() => setSelectedCategory(null)}
                        >
                            Close
                        </Button>
                        <Button
                            onClick={() => {
                                // Handle save
                                setSelectedCategory(null)
                            }}
                        >
                            Save Changes
                        </Button>
                    </div>
                </Card>
            </div>
        )}
    </div>
  )
}

export default CategorySection
