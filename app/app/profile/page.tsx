"use client"

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Mail } from "lucide-react";

export default function ProfilePage() {
  const [user, setUser] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedUser = sessionStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  });

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    cityRequest: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would make an API call
    const updatedUser = {
      ...user,
      name: formData.name,
      email: formData.email,
    };
    sessionStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    toast.success("Profile updated successfully");
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New passwords don't match");
      return;
    }
    // In a real app, this would make an API call
    toast.success("Password updated successfully");
    setFormData(prev => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }));
  };

  const handleCityRequest = (e: React.FormEvent) => {
    e.preventDefault();
    // Open email client with pre-filled email
    window.location.href = `mailto:umap@gaf.de?subject=New City Request&body=I would like to request the following city to be added to UMAP:%0D%0A%0D%0A${formData.cityRequest}%0D%0A%0D%0ARegards,%0D%0A${user?.name}`;
    toast.success("Opening email client...");
  };

  return (
    <div className="container max-w-2xl py-8 space-y-8">
      <h1 className="text-3xl font-bold">Profile Settings</h1>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your personal details</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <Button type="submit">Update Profile</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>Ensure your account is secure</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordUpdate} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                name="currentPassword"
                type="password"
                value={formData.currentPassword}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                value={formData.newPassword}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
            </div>
            <Button type="submit">Update Password</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Request New City</CardTitle>
          <CardDescription>Submit a request to add a new city to UMAP</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCityRequest} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cityRequest">City Details</Label>
              <Input
                id="cityRequest"
                name="cityRequest"
                placeholder="City name, country, and why you need it"
                value={formData.cityRequest}
                onChange={handleInputChange}
              />
            </div>
            <Button type="submit" className="flex items-center">
              <Mail className="mr-2 h-4 w-4" />
              Contact UMAP Team
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}