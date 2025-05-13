
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthStore } from "@/store/authStore";
import { toast } from "@/components/ui/sonner";

export default function Profile() {
  const { user } = useAuthStore();
  const userMetadata = user?.user_metadata || {};
  const [name, setName] = useState(userMetadata.name || "");
  const [bio, setBio] = useState(userMetadata.bio || "");
  
  const handleSave = () => {
    // In a real app, this would update the user profile in the backend
    toast.success("Profile updated successfully");
  };
  
  return (
    <div className="container max-w-4xl py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      
      <div className="grid gap-6">
        {/* Profile Card */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Update your profile details and personal information
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Avatar */}
            <div className="flex flex-col sm:flex-row gap-6 sm:items-center pb-6 border-b">
              <Avatar className="w-20 h-20">
                <AvatarImage src={userMetadata.avatar_url} />
                <AvatarFallback className="text-2xl bg-brand-accent/10 text-brand-accent">
                  {name ? name[0] : user?.email?.[0] || "U"}
                </AvatarFallback>
              </Avatar>
              
              <div className="space-y-1">
                <h3 className="font-medium text-lg">{name || user?.email}</h3>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
                <div className="pt-2">
                  <Button variant="outline" size="sm">Upload new photo</Button>
                </div>
              </div>
            </div>
            
            {/* Form */}
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="Enter your full name"
                />
              </div>
              
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  value={user?.email || ""} 
                  disabled
                  placeholder="Your email address"
                />
                <p className="text-xs text-muted-foreground">
                  Email cannot be changed
                </p>
              </div>
              
              <div className="grid gap-3">
                <Label htmlFor="bio">Bio</Label>
                <textarea 
                  id="bio" 
                  value={bio} 
                  onChange={(e) => setBio(e.target.value)}
                  className="flex min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Tell us about yourself"
                />
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline">Cancel</Button>
            <Button onClick={handleSave}>Save changes</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
