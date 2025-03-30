
import { Navbar } from "@/components/navbar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { AvatarWithBadge } from "@/components/ui/avatar-with-badge";
import { Camera, X, Plus, Save, Edit, User, Briefcase, GraduationCap, MapPin } from "lucide-react";

const ProfilePage = () => {
  const { toast } = useToast();
  const [editMode, setEditMode] = useState(false);
  
  // Mock user data - in a real app, this would come from an API or context
  const [userData, setUserData] = useState({
    name: "Rahul Patel",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    title: "Full Stack Developer",
    company: "CodeCraft Solutions",
    education: "COEP Pune",
    location: "Pune, Maharashtra",
    bio: "Full stack developer with expertise in MERN stack. I'm passionate about building scalable web applications and mentoring junior developers.",
    skills: ["React", "Node.js", "MongoDB", "Express", "JavaScript", "TypeScript"],
    lookingFor: ["Tech meetups", "Freelance projects", "Co-founder opportunities"],
    email: "rahul.patel@example.com",
    phone: "+91 9876543210",
  });

  const [newSkill, setNewSkill] = useState("");
  const [newInterest, setNewInterest] = useState("");

  const handleSaveProfile = () => {
    setEditMode(false);
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
    });
  };

  const addSkill = () => {
    if (newSkill && !userData.skills.includes(newSkill)) {
      setUserData({
        ...userData,
        skills: [...userData.skills, newSkill],
      });
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setUserData({
      ...userData,
      skills: userData.skills.filter((s) => s !== skill),
    });
  };

  const addInterest = () => {
    if (newInterest && !userData.lookingFor.includes(newInterest)) {
      setUserData({
        ...userData,
        lookingFor: [...userData.lookingFor, newInterest],
      });
      setNewInterest("");
    }
  };

  const removeInterest = (interest: string) => {
    setUserData({
      ...userData,
      lookingFor: userData.lookingFor.filter((i) => i !== interest),
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="md:col-span-1">
            <div className="bg-background rounded-lg border shadow p-6">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <AvatarWithBadge
                    src={userData.avatar}
                    fallback={userData.name}
                    size="lg"
                    className="h-24 w-24"
                  />
                  {editMode && (
                    <button className="absolute bottom-0 right-0 rounded-full bg-primary text-primary-foreground h-8 w-8 flex items-center justify-center">
                      <Camera className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <h2 className="text-xl font-bold mt-4">{userData.name}</h2>
                <p className="text-muted-foreground">{userData.title}</p>
                <div className="w-full mt-4 space-y-2">
                  <div className="flex items-center text-sm">
                    <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
                    {userData.company}
                  </div>
                  <div className="flex items-center text-sm">
                    <GraduationCap className="h-4 w-4 mr-2 text-muted-foreground" />
                    {userData.education}
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                    {userData.location}
                  </div>
                </div>
                <div className="w-full mt-6">
                  {!editMode ? (
                    <Button
                      className="w-full"
                      variant="outline"
                      onClick={() => setEditMode(true)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  ) : (
                    <Button
                      className="w-full"
                      onClick={handleSaveProfile}
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="md:col-span-2">
            <Tabs defaultValue="about">
              <TabsList className="mb-4">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="skills">Skills & Interests</TabsTrigger>
                <TabsTrigger value="contact">Contact Info</TabsTrigger>
              </TabsList>
              
              <TabsContent value="about" className="p-4 bg-background rounded-lg border shadow">
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  About Me
                </h3>
                {editMode ? (
                  <Textarea
                    value={userData.bio}
                    onChange={(e) => setUserData({ ...userData, bio: e.target.value })}
                    className="min-h-[150px]"
                  />
                ) : (
                  <p className="text-muted-foreground">{userData.bio}</p>
                )}
              </TabsContent>
              
              <TabsContent value="skills" className="space-y-6 p-4 bg-background rounded-lg border shadow">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {userData.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-sm">
                        {skill}
                        {editMode && (
                          <button
                            className="ml-1 hover:text-destructive"
                            onClick={() => removeSkill(skill)}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        )}
                      </Badge>
                    ))}
                  </div>
                  {editMode && (
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a skill"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        className="flex-1"
                      />
                      <Button onClick={addSkill} size="sm">
                        <Plus className="h-4 w-4 mr-1" />
                        Add
                      </Button>
                    </div>
                  )}
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Looking for</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {userData.lookingFor.map((interest) => (
                      <Badge key={interest} variant="outline" className="text-sm">
                        {interest}
                        {editMode && (
                          <button
                            className="ml-1 hover:text-destructive"
                            onClick={() => removeInterest(interest)}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        )}
                      </Badge>
                    ))}
                  </div>
                  {editMode && (
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add what you're looking for"
                        value={newInterest}
                        onChange={(e) => setNewInterest(e.target.value)}
                        className="flex-1"
                      />
                      <Button onClick={addInterest} size="sm">
                        <Plus className="h-4 w-4 mr-1" />
                        Add
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="contact" className="p-4 bg-background rounded-lg border shadow">
                <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-muted-foreground">Email</label>
                    {editMode ? (
                      <Input
                        value={userData.email}
                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                      />
                    ) : (
                      <p>{userData.email}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Phone</label>
                    {editMode ? (
                      <Input
                        value={userData.phone}
                        onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                      />
                    ) : (
                      <p>{userData.phone}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Location</label>
                    {editMode ? (
                      <Input
                        value={userData.location}
                        onChange={(e) => setUserData({ ...userData, location: e.target.value })}
                      />
                    ) : (
                      <p>{userData.location}</p>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
