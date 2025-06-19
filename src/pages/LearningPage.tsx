
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Filter, 
  Star, 
  Clock, 
  Users, 
  BookOpen,
  Play,
  Calendar
} from "lucide-react";

export const LearningPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    { id: "all", label: "All Courses" },
    { id: "beginner", label: "Beginner" },
    { id: "intermediate", label: "Intermediate" },
    { id: "advanced", label: "Advanced" },
    { id: "zardozi", label: "Zardozi" },
    { id: "beading", label: "Beading" },
    { id: "dabka", label: "Dabka" }
  ];

  const courses = [
    {
      id: 1,
      title: "Zardozi Embroidery Masterclass",
      instructor: "Fatima Al-Maghribi",
      level: "Advanced",
      duration: "6 weeks",
      price: 199,
      rating: 4.9,
      students: 234,
      image: "🧵",
      description: "Learn traditional Zardozi techniques from a master artisan",
      category: "zardozi"
    },
    {
      id: 2,
      title: "Beading Techniques for Beginners",
      instructor: "Amina Hassan",
      level: "Beginner",
      duration: "2 weeks",
      price: 79,
      rating: 4.8,
      students: 156,
      image: "📿",
      description: "Introduction to traditional and modern beading methods",
      category: "beading"
    },
    {
      id: 3,
      title: "Dabka Embroidery Intensive",
      instructor: "Yasmin Berber",
      level: "Intermediate",
      duration: "4 weeks",
      price: 149,
      rating: 4.7,
      students: 89,
      image: "✨",
      description: "Master the art of Dabka with gold and silver threads",
      category: "dabka"
    },
    {
      id: 4,
      title: "Pattern Design Fundamentals",
      instructor: "Omar Tuareg",
      level: "Beginner",
      duration: "3 weeks",
      price: 99,
      rating: 4.6,
      students: 203,
      image: "🎨",
      description: "Create your own traditional patterns and motifs",
      category: "beginner"
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesCategory = activeCategory === "all" || 
      course.level.toLowerCase() === activeCategory || 
      course.category === activeCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Learning Platform</h1>
        <p className="text-gray-600">Master traditional crafts with expert artisans</p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search courses or instructors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(category.id)}
            className={activeCategory === category.id ? "bg-orange-600 hover:bg-orange-700" : ""}
          >
            {category.label}
          </Button>
        ))}
      </div>

      {/* Featured Course */}
      <Card className="p-8 bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <Badge className="mb-4 bg-orange-600">Featured Course</Badge>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Traditional Amazigh Jewelry Making
            </h2>
            <p className="text-gray-600 mb-6">
              Learn ancient silversmithing techniques passed down through generations. 
              Create authentic Amazigh jewelry pieces with master artisan Aicha Tafraout.
            </p>
            <div className="flex items-center gap-6 mb-6">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">8 weeks</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">45 students</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm text-gray-600">4.9 rating</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button className="bg-orange-600 hover:bg-orange-700">
                <Play className="h-4 w-4 mr-2" />
                Enroll Now - $249
              </Button>
              <Button variant="outline">Preview Course</Button>
            </div>
          </div>
          <div className="text-center">
            <div className="w-48 h-48 bg-gradient-to-br from-orange-400 to-red-400 rounded-full mx-auto flex items-center justify-center text-6xl">
              💍
            </div>
          </div>
        </div>
      </Card>

      {/* Course Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            All Courses ({filteredCourses.length})
          </h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Most Popular</Button>
            <Button variant="outline" size="sm">Newest</Button>
            <Button variant="outline" size="sm">Price: Low to High</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center text-6xl">
                {course.image}
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">{course.level}</Badge>
                  <Badge variant="secondary">{course.duration}</Badge>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{course.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                    {course.instructor.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{course.instructor}</p>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-gray-600">{course.rating}</span>
                      <span className="text-xs text-gray-500">({course.students} students)</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-gray-800">${course.price}</span>
                  </div>
                  <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                    Enroll Now
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Upcoming Workshops */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Upcoming Live Workshops</h2>
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            View Calendar
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: "Introduction to Henna Art", date: "Dec 25", time: "2:00 PM EST", spots: 12 },
            { title: "Leather Crafting Basics", date: "Dec 28", time: "10:00 AM EST", spots: 8 },
            { title: "Pottery & Ceramics", date: "Jan 2", time: "3:00 PM EST", spots: 15 }
          ].map((workshop, index) => (
            <Card key={index} className="p-4 border">
              <h4 className="font-semibold mb-2">{workshop.title}</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p>{workshop.date} at {workshop.time}</p>
                <p>{workshop.spots} spots available</p>
              </div>
              <Button size="sm" className="w-full mt-3">Reserve Spot</Button>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
};
