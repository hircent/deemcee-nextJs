"use client";

import { Button } from "@/components/ui/button";
import { PencilIcon, KeyIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogOverlay,
} from "@/components/ui/dialog";
import { useFormState } from "react-dom";
import { SERVER_ACTION_STATE } from "@/constants/index";
import SubmitButton from "./SubmitButton";
import { useEffect, useRef, useState } from "react";
import { useToast } from "./ui/use-toast";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserFullDetailsData } from "@/types/index";

const EditProfile = ({ data }: { data: UserFullDetailsData }) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="w-full sm:w-auto bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center space-x-2 transition-colors duration-200 text-sm sm:text-base px-3 py-2"
          onClick={() => setOpen(true)}
        >
          <PencilIcon className="w-4 h-4" />
          <span>Edit Profile</span>
        </Button>
      </DialogTrigger>
      <DialogOverlay
        className="bg-black/80"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
      />
      <DialogContent className="w-[95vw] max-w-5xl mx-auto h-auto overflow-y-auto custom-scrollbar bg-white p-4 sm:p-6 rounded-lg">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-xl sm:text-2xl font-semibold">
            Edit Profile
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            Make changes to your details here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form action="" className="mt-4">
          <Tabs defaultValue="basic" className="space-y-6">
            <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
              <TabsList className="bg-white border w-full sm:w-auto flex whitespace-nowrap">
                <TabsTrigger value="basic" className="text-sm sm:text-base">
                  Basic Info
                </TabsTrigger>
                <TabsTrigger value="personal" className="text-sm sm:text-base">
                  Personal
                </TabsTrigger>
                <TabsTrigger value="family" className="text-sm sm:text-base">
                  Family
                </TabsTrigger>
                <TabsTrigger value="banking" className="text-sm sm:text-base">
                  Banking
                </TabsTrigger>
                <TabsTrigger value="address" className="text-sm sm:text-base">
                  Address
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Basic Information */}
            <TabsContent value="basic">
              <Card className="p-4 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm sm:text-base">First Name</Label>
                    <Input
                      defaultValue={data.first_name}
                      className="text-sm sm:text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm sm:text-base">Last Name</Label>
                    <Input
                      defaultValue={data.last_name}
                      className="text-sm sm:text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm sm:text-base">Username</Label>
                    <Input
                      defaultValue={data.username}
                      disabled
                      className="text-sm sm:text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm sm:text-base">Email</Label>
                    <Input
                      defaultValue={data.email}
                      type="email"
                      className="text-sm sm:text-base"
                    />
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Personal Details */}
            <TabsContent value="personal">
              <Card className="p-4 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm sm:text-base">Gender</Label>
                    <Input
                      defaultValue={data.details.gender}
                      className="text-sm sm:text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm sm:text-base">
                      Date of Birth
                    </Label>
                    <Input
                      defaultValue={data.created_at}
                      type="date"
                      className="text-sm sm:text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm sm:text-base">IC Number</Label>
                    <Input
                      defaultValue={data.details.ic_number}
                      className="text-sm sm:text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm sm:text-base">Occupation</Label>
                    <Input
                      defaultValue={data.details.occupation}
                      className="text-sm sm:text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm sm:text-base">
                      Personal Email
                    </Label>
                    <Input
                      defaultValue={data.details.personal_email}
                      type="email"
                      className="text-sm sm:text-base"
                    />
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Family Information */}
            <TabsContent value="family">
              <Card className="p-4 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm sm:text-base">Spouse Name</Label>
                    <Input
                      defaultValue={data.details.spouse_name}
                      className="text-sm sm:text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm sm:text-base">Spouse Phone</Label>
                    <Input
                      defaultValue={data.details.spouse_phone}
                      className="text-sm sm:text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm sm:text-base">
                      Spouse Occupation
                    </Label>
                    <Input
                      defaultValue={data.details.spouse_occupation}
                      className="text-sm sm:text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm sm:text-base">
                      Number of Children
                    </Label>
                    <Input
                      defaultValue={data.details.no_of_children}
                      type="number"
                      min="0"
                      className="text-sm sm:text-base"
                    />
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Banking Details */}
            <TabsContent value="banking">
              <Card className="p-4 sm:p-6">
                <div className="grid grid-cols-1 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm sm:text-base">Bank Name</Label>
                    <Input
                      defaultValue={data.details.bank_name}
                      className="text-sm sm:text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm sm:text-base">Account Name</Label>
                    <Input
                      defaultValue={data.details.bank_account_name}
                      className="text-sm sm:text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm sm:text-base">
                      Account Number
                    </Label>
                    <Input
                      defaultValue={data.details.bank_account_number}
                      className="text-sm sm:text-base"
                    />
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Address */}
            <TabsContent value="address">
              <Card className="p-4 sm:p-6">
                <div className="grid grid-cols-1 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm sm:text-base">
                      Address Line 1
                    </Label>
                    <Input
                      defaultValue={data.address.address_line_1}
                      className="text-sm sm:text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm sm:text-base">
                      Address Line 2
                    </Label>
                    <Input
                      defaultValue={data.address.address_line_2}
                      className="text-sm sm:text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm sm:text-base">
                      Address Line 3
                    </Label>
                    <Input
                      defaultValue={data.address.address_line_3}
                      className="text-sm sm:text-base"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                    <div className="space-y-2">
                      <Label className="text-sm sm:text-base">Postcode</Label>
                      <Input
                        defaultValue={data.address.postcode}
                        className="text-sm sm:text-base"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm sm:text-base">City</Label>
                      <Input
                        defaultValue={data.address.city}
                        className="text-sm sm:text-base"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm sm:text-base">State</Label>
                      <Input
                        defaultValue={data.address.state}
                        className="text-sm sm:text-base"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
          <DialogFooter>
            <SubmitButton label="Save" submitLabel="Saving" />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const ChangePassword = () => {
  const [open, setOpen] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="w-full sm:w-auto bg-purple-600 text-white hover:bg-purple-700 flex items-center justify-center space-x-2 transition-colors duration-200 text-sm sm:text-base px-3 py-2"
          onClick={() => setOpen(true)}
        >
          <KeyIcon className="w-4 h-4" />
          <span>Change Password</span>
        </Button>
      </DialogTrigger>
      <DialogOverlay
        className="bg-black/80"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
      />
      <DialogContent className="w-[95vw] sm:max-w-lg mx-auto h-auto overflow-y-auto custom-scrollbar bg-white p-4 sm:p-6 rounded-lg">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-xl sm:text-2xl font-semibold">
            Change Password
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            Enter your current password and choose a new password.
          </DialogDescription>
        </DialogHeader>
        <form ref={formRef} className="mt-6 space-y-6">
          {/* Old Password */}
          <div className="space-y-2">
            <Label className="text-sm sm:text-base" htmlFor="old_password">
              Current Password
            </Label>
            <div className="relative">
              <Input
                id="old_password"
                name="old_password"
                type={showOldPassword ? "text" : "password"}
                className="pr-10 text-sm sm:text-base"
                placeholder="Enter your current password"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowOldPassword(!showOldPassword)}
              >
                {showOldPassword ? (
                  <EyeOffIcon className="h-4 w-4 text-gray-400" />
                ) : (
                  <EyeIcon className="h-4 w-4 text-gray-400" />
                )}
              </Button>
            </div>
          </div>

          {/* New Password */}
          <div className="space-y-2">
            <Label className="text-sm sm:text-base" htmlFor="new_password">
              New Password
            </Label>
            <div className="relative">
              <Input
                id="new_password"
                name="new_password"
                type={showNewPassword ? "text" : "password"}
                className="pr-10 text-sm sm:text-base"
                placeholder="Enter your new password"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? (
                  <EyeOffIcon className="h-4 w-4 text-gray-400" />
                ) : (
                  <EyeIcon className="h-4 w-4 text-gray-400" />
                )}
              </Button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label className="text-sm sm:text-base" htmlFor="confirm_password">
              Confirm New Password
            </Label>
            <div className="relative">
              <Input
                id="confirm_password"
                name="confirm_password"
                type={showConfirmPassword ? "text" : "password"}
                className="pr-10 text-sm sm:text-base"
                placeholder="Confirm your new password"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOffIcon className="h-4 w-4 text-gray-400" />
                ) : (
                  <EyeIcon className="h-4 w-4 text-gray-400" />
                )}
              </Button>
            </div>
          </div>

          <DialogFooter className="mt-6 sm:mt-8">
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <SubmitButton label="Save" submitLabel="Saving..." />
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const UserProfileActions = ({ data }: { data: UserFullDetailsData }) => {
  return (
    <div className="flex flex-col-reverse sm:flex-row items-start sm:items-center space-y-4 space-y-reverse sm:space-y-0 sm:space-x-4">
      <div className="flex sm:w-auto space-x-3">
        <EditProfile data={data} />
        <ChangePassword />
      </div>
    </div>
  );
};

export default UserProfileActions;
