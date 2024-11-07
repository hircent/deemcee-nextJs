import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  CalendarIcon, 
  MailIcon, 
  BuildingIcon, 
  UserIcon,
  Users2Icon,
  CreditCardIcon,
  PencilIcon,
  KeyIcon
} from "lucide-react";
import { camelCase, cn, formatDateTime } from '@/lib/utils';
import { getUserFullDetails } from '@/lib/actions/user.actions';

export default async function ProfilePage({ params }:{params:{id:number}}) {
  const { id }= params;

  const profile = await getUserFullDetails({id});

  const { dateOnly } = formatDateTime(new Date(profile.created_at));

  return (
    <div className='home-content'>
      <div className="h-max bg-yellow-2 rounded-md p-8 ">
        <div className="mx-auto space-y-6">
          {/* Header Section */}
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Title Section */}
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-yellow-12 truncate">Profile Details</h1>
              <p className="text-sm sm:text-base text-slate-500 mt-1">Manage your personal information and preferences</p>
            </div>

            {/* Actions Section */}
            <div className="flex flex-col-reverse sm:flex-row items-start sm:items-center space-y-4 space-y-reverse sm:space-y-0 sm:space-x-4">
              {/* Buttons Container */}
              
              <div className="flex w-full sm:w-auto space-x-3">
                <Button 
                  className="flex-1 sm:flex-none bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center space-x-2 transition-colors duration-200 text-sm sm:text-base px-3 py-2"
                >
                  <PencilIcon className="w-4 h-4" />
                  <span>Edit Profile</span>
                </Button>
                <Button 
                  className="flex-1 sm:flex-none bg-purple-600 text-white hover:bg-purple-700 flex items-center justify-center space-x-2 transition-colors duration-200 text-sm sm:text-base px-3 py-2"
                >
                  <KeyIcon className="w-4 h-4" />
                  <span>Change Password</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Main Profile Card */}
          <Card className="bg-white shadow-md">
            <CardHeader className="border-b border-slate-200 bg-slate-50 flex flex-row justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-semibold">
                  {profile.username.charAt(0).toLocaleUpperCase()}
                </div>
                <div>
                  <CardTitle className="text-2xl text-yellow-12">
                    {camelCase(profile.username)}
                  </CardTitle>
                  <div className="flex items-center mt-1 text-slate-500">
                    <BuildingIcon className="w-4 h-4 mr-1" />
                    <span className="capitalize">{profile.user_branch_roles[0].branch_name}</span>
                  </div>
                </div>
              </div>
              <div className='flex'>
                {/* Badge */}
                <Badge
                  className={cn("self-end sm:self-center px-4 py-1", {
                    "bg-success-100 text-success-600": profile.is_active,
                    "bg-error-100 text-error-600": !profile.is_active
                  })}
                >
                  {profile.is_active ? "Active" : "Inactive"}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
              {/* Basic Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-yellow-12">Basic Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-slate-600">
                    <MailIcon className="w-4 h-4" />
                    <span>{profile.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-600">
                    <UserIcon className="w-4 h-4" />
                    <span>{profile.username}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-600">
                    <CalendarIcon className="w-4 h-4" />
                    <span>Joined {dateOnly}</span>
                  </div>
                </div>
              </div>

              {/* Branch Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-yellow-12">Branch Details</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="font-medium text-blue-800 capitalize">
                      {profile.user_branch_roles[0].branch_name.replace(/-/g, ' ')}
                    </div>
                    <div className="text-sm text-blue-600 mt-1">
                      Branch ID: {profile.user_branch_roles[0].branch_id}
                    </div>
                  </div>
                </div>
              </div>

              {/* Family Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-yellow-12">Family Information</h3>
                <div className="space-y-4 bg-white rounded-lg">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Users2Icon className="w-4 h-4 text-slate-500" />
                        <span className="font-medium text-slate-700">Spouse Details</span>
                      </div>
                      <div className="ml-6 grid grid-cols-1 gap-2">
                        <div className="text-sm">
                          <span className="text-slate-500">Name:</span>
                          <span className="ml-2 text-slate-700">{profile.details.spouse_name || 'Not specified'}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-slate-500">Phone:</span>
                          <span className="ml-2 text-slate-700">{profile.details.spouse_phone || 'Not specified'}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-slate-500">Occupation:</span>
                          <span className="ml-2 text-slate-700">{profile.details.spouse_occupation || 'Not specified'}</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Users2Icon className="w-4 h-4 text-slate-500" />
                        <span className="text-sm text-slate-500">Number of Children:</span>
                        <span className="text-slate-700">{profile.details.no_of_children || 'Not specified'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Banking Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-yellow-12">Banking Information</h3>
                <div className="space-y-4 bg-white rounded-lg">
                  <div className="grid grid-cols-1 gap-3">
                    <div className="text-sm flex items-center space-x-2">
                      <CreditCardIcon className="w-4 h-4 text-slate-500" />
                      <span className="text-slate-500">Bank Name:</span>
                      <span className="text-slate-700">{profile.details.bank_name || 'Not specified'}</span>
                    </div>
                    <div className="text-sm flex items-center space-x-2">
                      <UserIcon className="w-4 h-4 text-slate-500" />
                      <span className="text-slate-500">Account Name:</span>
                      <span className="text-slate-700">{profile.details.bank_account_name || 'Not specified'}</span>
                    </div>
                    <div className="text-sm flex items-center space-x-2">
                      <CreditCardIcon className="w-4 h-4 text-slate-500" />
                      <span className="text-slate-500">Account Number:</span>
                      <span className="text-slate-700">{profile.details.bank_account_number || 'Not specified'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-yellow-12">Address</h3>
                <div className="space-y-2 text-slate-600">
                  {profile.address.address_line_1 || profile.address.address_line_2 || 
                  profile.address.address_line_3 ? (
                    <>
                      <p>{profile.address.address_line_1}</p>
                      <p>{profile.address.address_line_2}</p>
                      <p>{profile.address.address_line_3}</p>
                      <p>
                        {profile.address.postcode} {profile.address.city},
                        {profile.address.state}
                      </p>
                    </>
                  ) : (
                    <p className="text-slate-400 italic">No address information provided</p>
                  )}
                </div>
              </div>

              {/* Additional Details */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-yellow-12">Additional Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-slate-500">Personal Email</p>
                    <p className="text-slate-700">{profile.details.personal_email || 'Not specified'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-slate-500">Gender</p>
                    <p className="text-slate-700">{profile.details.gender || 'Not specified'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-slate-500">Date of Birth</p>
                    <p className="text-slate-700">{profile.details.dob || 'Not specified'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-slate-500">IC Number</p>
                    <p className="text-slate-700">{profile.details.ic_number || 'Not specified'}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}