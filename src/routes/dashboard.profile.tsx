import { createFileRoute } from "@tanstack/react-router";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import {
  Camera,
  CheckCircle2,
  RotateCcw,
  Save,
  Trash2,
  Upload,
  UserRound,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/dashboard/profile")({
  head: () => ({
    meta: [
      {
        title: "Profile — Horse Trails",
      },
      {
        name: "description",
        content:
          "Manage your Horse Trails profile, contact details and medical information.",
      },
    ],
  }),

  component: Profile,
});

type ProfileForm = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  emergencyContact: string;
  nationality: string;
  medicalDetails: string;
  avatar: string;
};

type FormErrors = Partial<
  Record<keyof ProfileForm, string>
>;

const STORAGE_KEY =
  "horse-trails-dashboard-profile";

const defaultProfile: ProfileForm = {
  firstName: "Sophia",
  lastName: "Reyes",
  email: "sophia@email.com",
  phone: "+1 415 555 0100",
  emergencyContact:
    "Miguel Reyes · +1 415 555 0110",
  nationality: "USA",
  medicalDetails: "",
  avatar:
    "https://i.pravatar.cc/160?img=47",
};

function Profile() {
  const [form, setForm] =
    useState<ProfileForm>(defaultProfile);

  const [savedProfile, setSavedProfile] =
    useState<ProfileForm>(defaultProfile);

  const [errors, setErrors] =
    useState<FormErrors>({});

  const [successMessage, setSuccessMessage] =
    useState("");

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const [deleteText, setDeleteText] =
    useState("");

  useEffect(() => {
    const storedProfile =
      window.localStorage.getItem(
        STORAGE_KEY,
      );

    if (!storedProfile) {
      return;
    }

    try {
      const parsedProfile =
        JSON.parse(
          storedProfile,
        ) as ProfileForm;

      setForm(parsedProfile);
      setSavedProfile(parsedProfile);
    } catch {
      window.localStorage.removeItem(
        STORAGE_KEY,
      );
    }
  }, []);

  const hasChanges = useMemo(() => {
    return (
      JSON.stringify(form) !==
      JSON.stringify(savedProfile)
    );
  }, [form, savedProfile]);

  const fullName = `${form.firstName} ${form.lastName}`.trim();

  const updateField = (
    field: keyof ProfileForm,
    value: string,
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setErrors((current) => ({
      ...current,
      [field]: undefined,
    }));

    setSuccessMessage("");
  };

  const validateForm = () => {
    const nextErrors: FormErrors = {};

    if (!form.firstName.trim()) {
      nextErrors.firstName =
        "First name is required.";
    }

    if (!form.lastName.trim()) {
      nextErrors.lastName =
        "Last name is required.";
    }

    if (!form.email.trim()) {
      nextErrors.email =
        "Email address is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        form.email,
      )
    ) {
      nextErrors.email =
        "Enter a valid email address.";
    }

    if (!form.phone.trim()) {
      nextErrors.phone =
        "Phone number is required.";
    } else if (
      !/^[+\d][\d\s()-]{7,}$/.test(
        form.phone,
      )
    ) {
      nextErrors.phone =
        "Enter a valid phone number.";
    }

    if (
      !form.emergencyContact.trim()
    ) {
      nextErrors.emergencyContact =
        "Emergency contact is required.";
    }

    if (!form.nationality.trim()) {
      nextErrors.nationality =
        "Nationality is required.";
    }

    setErrors(nextErrors);

    return (
      Object.keys(nextErrors).length ===
      0
    );
  };

  const handleSave = () => {
    if (!validateForm()) {
      setSuccessMessage("");
      return;
    }

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(form),
    );

    setSavedProfile(form);
    setSuccessMessage(
      "Profile updated successfully.",
    );

    window.setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const handleReset = () => {
    setForm(savedProfile);
    setErrors({});
    setSuccessMessage("");
  };

  const handlePhotoUpload = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const isValidType =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/webp";

    if (!isValidType) {
      window.alert(
        "Please upload JPG, PNG or WEBP image.",
      );

      event.target.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      window.alert(
        "Image size must be less than 2MB.",
      );

      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result;

      if (typeof result !== "string") {
        return;
      }

      updateField("avatar", result);
    };

    reader.readAsDataURL(file);
    event.target.value = "";
  };

  const removePhoto = () => {
    updateField(
      "avatar",
      defaultProfile.avatar,
    );
  };

  const confirmDeleteAccount = () => {
    if (
      deleteText.trim().toUpperCase() !==
      "DELETE"
    ) {
      return;
    }

    window.localStorage.removeItem(
      STORAGE_KEY,
    );

    setForm(defaultProfile);
    setSavedProfile(defaultProfile);
    setErrors({});
    setSuccessMessage("");
    setDeleteText("");
    setDeleteOpen(false);

    window.alert(
      "Demo account data has been removed from this browser.",
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-forest">
          Profile
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage your personal details,
          contact information and riding
          preferences.
        </p>
      </div>

      {successMessage && (
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5" />
            {successMessage}
          </div>

          <button
            type="button"
            onClick={() =>
              setSuccessMessage("")
            }
            className="rounded-full p-1 transition hover:bg-green-100"
            aria-label="Close message"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="glass rounded-3xl p-4 sm:p-6">
        <div className="flex flex-col gap-5 border-b border-border pb-6 sm:flex-row sm:items-center">
          <div className="relative">
            {form.avatar ? (
              <img
                src={form.avatar}
                className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-md"
                alt={fullName || "Profile"}
              />
            ) : (
              <div className="grid h-24 w-24 place-items-center rounded-full bg-forest/10 text-forest">
                <UserRound className="h-10 w-10" />
              </div>
            )}

            <div className="absolute -bottom-1 -right-1 grid h-9 w-9 place-items-center rounded-full border-4 border-white bg-forest text-white">
              <Camera className="h-4 w-4" />
            </div>
          </div>

          <div className="flex-1">
            <h2 className="font-display text-xl font-bold text-forest">
              {fullName ||
                "Horse Trails Member"}
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              {form.email}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-border bg-white px-4 py-2 text-sm font-medium text-forest transition hover:bg-forest hover:text-white">
                <Upload className="h-4 w-4" />
                Upload photo

                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={
                    handlePhotoUpload
                  }
                  className="hidden"
                />
              </label>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={removePhoto}
              >
                Remove photo
              </Button>
            </div>

            <p className="mt-2 text-xs text-muted-foreground">
              JPG, PNG or WEBP. Maximum
              size 2MB.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <FormField
            label="First name"
            error={errors.firstName}
          >
            <Input
              value={form.firstName}
              onChange={(event) =>
                updateField(
                  "firstName",
                  event.target.value,
                )
              }
              className="mt-1 bg-card"
              placeholder="Enter first name"
            />
          </FormField>

          <FormField
            label="Last name"
            error={errors.lastName}
          >
            <Input
              value={form.lastName}
              onChange={(event) =>
                updateField(
                  "lastName",
                  event.target.value,
                )
              }
              className="mt-1 bg-card"
              placeholder="Enter last name"
            />
          </FormField>

          <FormField
            label="Email"
            error={errors.email}
          >
            <Input
              type="email"
              value={form.email}
              onChange={(event) =>
                updateField(
                  "email",
                  event.target.value,
                )
              }
              className="mt-1 bg-card"
              placeholder="name@example.com"
            />
          </FormField>

          <FormField
            label="Phone"
            error={errors.phone}
          >
            <Input
              type="tel"
              value={form.phone}
              onChange={(event) =>
                updateField(
                  "phone",
                  event.target.value,
                )
              }
              className="mt-1 bg-card"
              placeholder="+1 415 555 0100"
            />
          </FormField>

          <FormField
            label="Emergency contact"
            error={
              errors.emergencyContact
            }
          >
            <Input
              value={
                form.emergencyContact
              }
              onChange={(event) =>
                updateField(
                  "emergencyContact",
                  event.target.value,
                )
              }
              className="mt-1 bg-card"
              placeholder="Name and phone number"
            />
          </FormField>

          <FormField
            label="Nationality"
            error={errors.nationality}
          >
            <Input
              value={form.nationality}
              onChange={(event) =>
                updateField(
                  "nationality",
                  event.target.value,
                )
              }
              className="mt-1 bg-card"
              placeholder="Enter nationality"
            />
          </FormField>

          <div className="sm:col-span-2">
            <Label htmlFor="medical-details">
              Medical details
            </Label>

            <Textarea
              id="medical-details"
              rows={4}
              value={form.medicalDetails}
              onChange={(event) =>
                updateField(
                  "medicalDetails",
                  event.target.value,
                )
              }
              className="mt-1 resize-none bg-card"
              placeholder="Allergies, medications, medical conditions or accessibility requirements..."
            />

            <p className="mt-2 text-xs text-muted-foreground">
              Share details that may help
              the guide keep you safe during
              the experience.
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <Button
            type="button"
            variant="outline"
            className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
            onClick={() =>
              setDeleteOpen(true)
            }
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete account
          </Button>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              disabled={!hasChanges}
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset changes
            </Button>

            <Button
              type="button"
              onClick={handleSave}
              disabled={!hasChanges}
              className="bg-forest text-forest-foreground shadow-glow hover:bg-forest/90"
            >
              <Save className="mr-2 h-4 w-4" />
              Save changes
            </Button>
          </div>
        </div>
      </div>

      <Dialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl text-red-600">
              Delete account
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-5">
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
              <p className="text-sm leading-6 text-red-700">
                This demo action will remove
                your saved profile data from
                this browser. Type{" "}
                <strong>DELETE</strong> to
                confirm.
              </p>
            </div>

            <div>
              <Label htmlFor="delete-confirmation">
                Confirmation
              </Label>

              <Input
                id="delete-confirmation"
                value={deleteText}
                onChange={(event) =>
                  setDeleteText(
                    event.target.value,
                  )
                }
                placeholder="Type DELETE"
                className="mt-1"
              />
            </div>

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setDeleteOpen(false);
                  setDeleteText("");
                }}
              >
                Cancel
              </Button>

              <Button
                type="button"
                variant="destructive"
                onClick={
                  confirmDeleteAccount
                }
                disabled={
                  deleteText
                    .trim()
                    .toUpperCase() !==
                  "DELETE"
                }
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete account
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function FormField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label>{label}</Label>

      {children}

      {error && (
        <p className="mt-1 text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}