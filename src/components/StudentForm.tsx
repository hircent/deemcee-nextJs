"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useEffect, useRef, useState } from "react";
import { Plus, Search, Check, X } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { cn } from "@/lib/utils";
import SubmitButton from "./SubmitButton";
import {
  GRADE,
  ReferralChannels,
  SERVER_ACTION_STATE,
  StarterKitItems,
} from "@/constants/index";
import { useFormState } from "react-dom";
import { StudentFormErrors } from "@/types/student";
import { createStudent } from "@/lib/actions/student.action";
import MultiSelect from "./MultiSelect";
import { getSearchParents } from "@/lib/actions/user.actions";
import {
  SearchParentListProps,
  StarterKitItem,
  TimeslotData,
} from "@/types/index";
import { getTimeslots } from "@/lib/actions/class.action";
import { getGradeList, getTierList } from "@/lib/actions/structure.actions";
import { GradeData, TierListData } from "@/types/structure";
import Loader from "./Loader";

const StudentForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [referralChannel, setReferralChannel] = useState<string>("");
  const [selectedItems, setSelectedItems] = useState<StarterKitItem[]>([]);
  const [zoderror, setZodError] = useState<StudentFormErrors | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [parentSearchQuery, setParentSearchQuery] = useState<string>("");
  const [selectedParent, setSelectedParent] = useState<any>(null);
  const [gender, setGender] = useState<string | undefined>(undefined);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isSearchable, setIsSearchable] = useState<boolean>(false);
  const [isTierSelected, setIsTierSelected] = useState<boolean>(true);
  const [selectedTier, setSelectedTier] = useState<string | undefined>(
    undefined
  );
  const [grades, setGrades] = useState<GradeData[]>([]);
  const [showParentFields, setShowParentFields] = useState(false);
  const [ableSelectTimeslot, setAbleSelectTimeslot] = useState(false);
  const [ableSelectDate, setAbleSelectDate] = useState(false);
  const [parentResultMsg, setParentResultMsg] = useState<string | undefined>(
    undefined
  );
  const [startingGrade, setStartingGrade] = useState<string | undefined>(
    undefined
  );
  const [startDate, setStartDate] = useState<string | undefined>(undefined);
  const [timeslots, setTimeslots] = useState<TimeslotData[]>([]);
  const [confirmTimeslot, setConfirmTimeslot] = useState<string>("");
  const [parentSearchResults, setParentSearchResults] = useState<
    SearchParentListProps[]
  >([]);
  const [placeholder, setPlaceholder] = useState<string>(
    "Select Grade and Commencement Date"
  );

  const [tiers, setTiers] = useState<TierListData[]>([]);

  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const [state, formAction] = useFormState(createStudent, SERVER_ACTION_STATE);

  const handleCreateNewParent = () => {
    setShowParentFields(true);
    setParentSearchQuery("");
    setParentSearchResults([]);
    setSelectedParent(null);
    setParentResultMsg(undefined);
  };

  // Debounced parent search
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (parentSearchQuery.length >= 2 && isSearchable) {
        setIsSearching(true);
        try {
          // Replace with your actual API endpoint
          const data = await getSearchParents(parentSearchQuery);
          if (data.length === 0) {
            setParentResultMsg("Parent not found");
          } else {
            setParentSearchResults(data);
          }
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to search parents",
            className: "bg-error-100",
          });
        }
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [parentSearchQuery, toast, isSearchable]);

  // ZodErrors
  useEffect(() => {
    if (state.zodErr) {
      setZodError(state.zodErr);
    }
    if (state.success) {
      toast({
        title: "Success",
        description: state.msg,
        className: cn(`bottom-0 left-0`, "bg-success-100"),
        duration: 3000,
      });
      formRef.current?.reset();
      setOpen(false);
      setZodError(null);
      setParentSearchQuery("");
      setParentSearchResults([]);
      setSelectedParent(null);
      setSelectedItems([]);
    }
    if (state.error) {
      toast({
        title: "Error",
        description: state.msg,
        className: cn(`bottom-0 left-0`, "bg-error-100"),
        duration: 3000,
      });
    }
  }, [state, toast]);

  // Get Timeslots
  useEffect(() => {
    const fetchTimeslots = async () => {
      if (startDate && startingGrade) {
        setTimeslots([]);
        try {
          const timeslots = await getTimeslots({
            date: startDate,
            grade: +startingGrade,
          });

          if (timeslots.length === 0) {
            setPlaceholder("No available time slots");
          } else {
            setPlaceholder("Select a time slot");
            setTimeslots(timeslots);
          }
        } catch (error) {
          console.error("Error fetching timeslots:", error);
        }
      }
    };

    fetchTimeslots();
  }, [startDate, startingGrade]);

  const getTiers = async () => {
    const tierList = await getTierList();
    setTiers(tierList);
    setIsLoading(false);
  };

  useEffect(() => {
    if (selectedTier === undefined) return;

    const getGrades = async () => {
      const gradeList = await getGradeList(selectedTier);
      setGrades(gradeList);
    };

    getGrades();
  }, [selectedTier]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="group p-2 bg-gray-100 rounded-md hover:bg-yellow-2"
          onClick={() => {
            getTiers();
          }}
        >
          <Plus size={18} className="text-red-600 group-hover:text-gray-600" />{" "}
          Add
        </Button>
      </DialogTrigger>
      <DialogOverlay
        className="bg-black/80"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
      />
      <DialogContent className="w-[80vw] max-w-[1000px] max-h-[90vh] overflow-y-auto custom-scrollbar bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-semibold">
            Create Student
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        {isLoading ? (
          <Loader />
        ) : (
          <form action={formAction} ref={formRef} className="space-y-4">
            <div className="space-y-4">
              {/* Parent Search Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Parent Information</h3>
                <div className="space-y-2">
                  <Label htmlFor="parent_search">
                    Search Parent <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="hidden"
                    name="parent"
                    value={selectedParent?.id || ""}
                  />
                  <div className="relative">
                    <Input
                      id="parent_search"
                      type="text"
                      placeholder="Search parent by name"
                      value={parentSearchQuery}
                      onChange={(e) => {
                        setParentSearchQuery(e.target.value);
                        setSelectedParent(null);
                        setIsSearchable(true);
                      }}
                      className="pr-10"
                      disabled={showParentFields}
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      {isSearching ? (
                        <div className="animate-spin h-5 w-5 border-2 border-gray-500 rounded-full border-t-transparent" />
                      ) : selectedParent ? (
                        <Check className="h-5 w-5 text-green-500" />
                      ) : (
                        <Search className="h-5 w-5 text-gray-400" />
                      )}
                    </div>

                    {/* Parent search results dropdown */}
                    {parentSearchResults.length > 0 &&
                      parentSearchQuery.length >= 2 &&
                      !showParentFields && (
                        <div className="absolute z-10 w-full bg-white border rounded-md shadow-lg mt-1">
                          {parentSearchResults.map((parent) => (
                            <div
                              key={parent.id}
                              className="p-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() => {
                                setSelectedParent(parent);
                                setParentSearchQuery(parent.email);
                                setParentSearchResults([]);
                                setShowParentFields(false);
                                setIsSearchable(false);
                              }}
                            >
                              {parent.email}
                            </div>
                          ))}
                        </div>
                      )}
                  </div>

                  {parentResultMsg && (
                    <small className="text-red-500 text-xs">
                      {parentResultMsg}
                    </small>
                  )}

                  <div className="mt-2">
                    <Button
                      type="button"
                      onClick={handleCreateNewParent}
                      className="mt-2 bg-yellow-9 text-gray-800 hover:bg-yellow-8"
                    >
                      Create New Parent
                    </Button>
                  </div>

                  {/* New Parent Registration Fields */}
                  {showParentFields && (
                    <div className="mt-4 space-y-4">
                      <h3 className="text-lg font-medium">
                        Parent Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="parent_email">
                            Email <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="parent_email"
                            name="parent_email"
                            type="email"
                            placeholder="Enter email"
                          />
                          <small className="text-red-500">
                            {zoderror?.parent_email}
                          </small>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="parent_first_name">
                            First Name <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="parent_first_name"
                            name="parent_first_name"
                            type="text"
                            placeholder="First Name"
                          />
                          <small className="text-red-500">
                            {zoderror?.parent_first_name}
                          </small>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="parent_last_name">
                            Last Name <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="parent_last_name"
                            name="parent_last_name"
                            type="text"
                            placeholder="Last Name"
                          />
                          <small className="text-red-500">
                            {zoderror?.parent_last_name}
                          </small>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="parent_phone">
                            Phone <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="parent_phone"
                            name="parent_phone"
                            type="text"
                            placeholder="Phone"
                          />
                          <small className="text-red-500">
                            {zoderror?.parent_phone}
                          </small>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="parent_occupation">Occupation</Label>
                          <Input
                            id="parent_occupation"
                            name="parent_occupation"
                            type="text"
                            placeholder="Occupation"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="parent_dob">Date of Birth </Label>
                          <Input
                            id="parent_dob"
                            name="parent_dob"
                            type="date"
                            placeholder="year-month-day"
                          />
                        </div>
                      </div>

                      <Separator className="my-4 bg-gray-300" />
                      <div className="mt-4 space-y-4">
                        <h3 className="text-lg font-medium">Address Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="parent_address_1">
                              Address Line 1
                            </Label>
                            <Input
                              id="parent_address_1"
                              name="parent_address_1"
                              type="text"
                              placeholder="Address"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="parent_address_2">
                              Address Line 2
                            </Label>
                            <Input
                              id="parent_address_2"
                              name="parent_address_2"
                              type="text"
                              placeholder="Address"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="parent_address_3">
                              Address Line 3
                            </Label>
                            <Input
                              id="parent_address_3"
                              name="parent_address_3"
                              type="text"
                              placeholder="Address"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="parent_postcode">Postcode</Label>
                            <Input
                              id="parent_postcode"
                              name="parent_postcode"
                              type="text"
                              placeholder="Postcode"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="parent_state">State</Label>
                            <Input
                              id="parent_state"
                              name="parent_state"
                              type="text"
                              placeholder="State"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="parent_city">City</Label>
                            <Input
                              id="parent_city"
                              name="parent_city"
                              type="text"
                              placeholder="City"
                            />
                          </div>
                        </div>
                      </div>
                      <Button
                        type="button"
                        onClick={() => {
                          setShowParentFields(false);
                          setParentSearchQuery("");
                        }}
                        className="bg-gray-200 text-gray-800 hover:bg-gray-300"
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                  <small className="text-red-500">{zoderror?.parent}</small>
                </div>
                <Separator className="my-4 bg-gray-300" />
              </div>
              <h3 className="text-lg font-medium">Student Information</h3>
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="space-y-2">
                    <Label htmlFor="first_name">
                      First Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="first_name"
                      name="first_name"
                      placeholder="Enter first name"
                    />
                  </div>
                  <small className="text-red-500">{zoderror?.first_name}</small>
                </div>

                <div>
                  <div className="space-y-2">
                    <Label htmlFor="last_name">
                      Last Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="last_name"
                      name="last_name"
                      placeholder="Enter last name"
                    />
                  </div>
                  <small className="text-red-500">{zoderror?.last_name}</small>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="space-y-2">
                    <Label htmlFor="fullname">
                      Fullname <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="fullname"
                      name="fullname"
                      placeholder="Enter fullname name"
                    />
                  </div>
                  <small className="text-red-500">{zoderror?.fullname}</small>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">
                    Gender <span className="text-red-500">*</span>
                  </Label>
                  <Input type="hidden" name="gender" value={gender} />
                  <Select
                    name="gender"
                    onValueChange={(value) => setGender(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent className="select-content">
                      <SelectItem value="Male" className="select-item">
                        Male
                      </SelectItem>
                      <SelectItem value="Female" className="select-item">
                        Female
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <small className="text-red-500">{zoderror?.gender}</small>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="space-y-2">
                    <Label htmlFor="dob">
                      Date of Birth <span className="text-red-500">*</span>
                    </Label>
                    <Input id="dob" name="dob" type="date" />
                  </div>
                  <small className="text-red-500">{zoderror?.dob}</small>
                </div>

                {/* School Information */}
                <div>
                  <div className="space-y-2">
                    <Label htmlFor="school">
                      School <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="school"
                      name="school"
                      placeholder="Enter school name"
                    />
                  </div>
                  <small className="text-red-500">{zoderror?.school}</small>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="space-y-2">
                    <Label htmlFor="tier">
                      Tier <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="tier"
                      value={selectedTier}
                      name="tier"
                      type="hidden"
                    />
                    <Select
                      onValueChange={(value) => {
                        setSelectedTier(value);
                        setIsTierSelected(false);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Tier" />
                      </SelectTrigger>
                      <SelectContent className="select-content">
                        {tiers.map((tier) => (
                          <SelectItem
                            key={tier.id}
                            value={tier.id.toString()}
                            className="select-item"
                          >
                            {tier.name + " (" + tier.year + ")"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <small className="text-red-500">
                    {zoderror?.deemcee_starting_grade}
                  </small>
                </div>

                <div>
                  <div className="space-y-2">
                    <Label htmlFor="deemcee_starting_grade">
                      Starting Grade <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="deemcee_starting_grade"
                      value={startingGrade}
                      name="deemcee_starting_grade"
                      type="hidden"
                    />
                    <Select
                      onValueChange={(value) => {
                        setStartingGrade(value);
                        setAbleSelectDate(true);
                      }}
                    >
                      <SelectTrigger disabled={isTierSelected}>
                        <SelectValue placeholder="Select starting grade" />
                      </SelectTrigger>
                      <SelectContent className="select-content">
                        {grades.map((grade) => (
                          <SelectItem
                            key={grade.id}
                            value={grade.grade_level.toString()}
                            className="select-item"
                          >
                            {"Grade " +
                              grade.grade_level +
                              " - " +
                              grade.currency +
                              " " +
                              grade.price}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <small className="text-red-500">
                    {zoderror?.deemcee_starting_grade}
                  </small>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="space-y-2">
                    <Label htmlFor="start_date">
                      Commencement Date <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="start_date"
                      name="start_date"
                      type="date"
                      onChange={(e) => {
                        setStartDate(e.target.value);
                        setAbleSelectTimeslot(true);
                      }}
                      disabled={!ableSelectDate}
                    />
                  </div>
                  <small className="text-red-500">{zoderror?.start_date}</small>
                </div>

                <div>
                  <div className="space-y-2">
                    <Label htmlFor="timeslot">
                      Time Slot <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="timeslot"
                      name="timeslot"
                      type="hidden"
                      value={confirmTimeslot}
                    />
                    <Select
                      onValueChange={(value) => setConfirmTimeslot(value)}
                    >
                      <SelectTrigger disabled={!ableSelectTimeslot}>
                        <SelectValue placeholder={placeholder} />
                      </SelectTrigger>
                      <SelectContent className="select-content">
                        {timeslots.map((ts) => (
                          <SelectItem
                            disabled={ts.student_in_class! >= 6}
                            key={ts.id}
                            value={ts.id.toString()}
                            className="select-item"
                          >
                            {ts.label +
                              " - " +
                              "(" +
                              ts.student_in_class! +
                              "/6)"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <Separator className="my-4 bg-gray-300" />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Referral Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="referral_channel">Referral Channel</Label>
                  <Input
                    type="hidden"
                    name="referral_channel"
                    value={referralChannel}
                  />
                  <Select
                    name="referral_channel"
                    onValueChange={(value) => setReferralChannel(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select referral channel" />
                    </SelectTrigger>
                    <SelectContent className="select-content">
                      {ReferralChannels.map((channel) => (
                        <SelectItem
                          key={channel}
                          value={channel}
                          className="select-item"
                        >
                          {channel}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {/* <small className="text-red-500">{zoderror?.referral_channel}</small> */}
                </div>

                <div>
                  <div className="space-y-2">
                    <Label htmlFor="referral_name">Referral Name</Label>
                    <Input
                      id="referral_name"
                      name="referral_name"
                      placeholder="Enter referral name"
                    />
                  </div>
                  {/* <small className="text-red-500">{zoderror?.referral_name}</small> */}
                </div>
              </div>
              <Separator className="my-4 bg-gray-300" />
            </div>

            {/* Starter Kits Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Free Gift</h3>
              <div className="space-y-2">
                <Label htmlFor="starter_kits">Starter Kits</Label>
                <Input
                  type="hidden"
                  name="starter_kits"
                  value={JSON.stringify(selectedItems)}
                />
                <div className="flex flex-wrap gap-2 mb-2">
                  {selectedItems.map((kit) => (
                    <div
                      key={kit.value}
                      className="bg-yellow-9 text-gray-800 px-3 py-1 rounded-full flex items-center gap-2"
                    >
                      <span className="text-xs">{kit.label}</span>
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedItems(
                            selectedItems.filter((k) => k !== kit)
                          )
                        }
                        className="hover:text-red-500"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
                <MultiSelect
                  placeholder="Starter Kits"
                  options={StarterKitItems}
                  selectedOptions={selectedItems}
                  setSelectedOptions={setSelectedItems}
                />
                {/* <small className="text-red-500">{zoderror?.starter_kits}</small> */}
              </div>
            </div>

            <DialogFooter className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4 sm:gap-0">
              <SubmitButton label="Save" submitLabel="Saving" />
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default StudentForm;
