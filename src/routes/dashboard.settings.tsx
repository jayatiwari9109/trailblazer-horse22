import {
  createFileRoute,
  Link,
} from "@tanstack/react-router";
import {
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Bell,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  Globe,
  Lock,
  Mail,
  Moon,
  Save,
  Settings as SettingsIcon,
  ShieldCheck,
  Smartphone,
  Trash2,
  User,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const Route = createFileRoute(
  "/dashboard/settings",
)({
  head: () => ({
    meta: [
      {
        title: "Settings — Horse Trails",
      },
      {
        name: "description",
        content:
          "Manage Horse Trails account preferences, notifications, payments and security settings.",
      },
    ],
  }),

  component: SettingsPage,
});

type SettingsData = {
  pushNotifications: boolean;
  emailUpdates: boolean;
  darkMode: boolean;
  bookingReminders: boolean;
  promotionalOffers: boolean;
  language: string;
  currency: string;
};

const STORAGE_KEY =
  "horse-trails-dashboard-settings";

const defaultSettings: SettingsData = {
  pushNotifications: true,
  emailUpdates: true,
  darkMode: false,
  bookingReminders: true,
  promotionalOffers: false,
  language: "English",
  currency: "USD",
};

function SettingsPage() {
  const [settings, setSettings] =
    useState<SettingsData>(
      defaultSettings,
    );

  const [savedSettings, setSavedSettings] =
    useState<SettingsData>(
      defaultSettings,
    );

  const [successMessage, setSuccessMessage] =
    useState("");

  const [securityOpen, setSecurityOpen] =
    useState(false);

  const [paymentOpen, setPaymentOpen] =
    useState(false);

  const [preferencesOpen, setPreferencesOpen] =
    useState(false);

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [cardName, setCardName] =
    useState("Sophia Reyes");

  const [cardNumber, setCardNumber] =
    useState("•••• •••• •••• 4242");

  const hasChanges = useMemo(() => {
    return (
      JSON.stringify(settings) !==
      JSON.stringify(savedSettings)
    );
  }, [settings, savedSettings]);

  useEffect(() => {
    const storedSettings =
      window.localStorage.getItem(
        STORAGE_KEY,
      );

    if (!storedSettings) {
      return;
    }

    try {
      const parsedSettings =
        JSON.parse(
          storedSettings,
        ) as SettingsData;

      setSettings(parsedSettings);
      setSavedSettings(parsedSettings);

      if (parsedSettings.darkMode) {
        document.documentElement.classList.add(
          "dark",
        );
      }
    } catch {
      window.localStorage.removeItem(
        STORAGE_KEY,
      );
    }
  }, []);

  const updateSetting = <
    Key extends keyof SettingsData,
  >(
    key: Key,
    value: SettingsData[Key],
  ) => {
    setSettings((current) => ({
      ...current,
      [key]: value,
    }));

    setSuccessMessage("");

    if (key === "darkMode") {
      document.documentElement.classList.toggle(
        "dark",
        Boolean(value),
      );
    }
  };

  const saveSettings = () => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(settings),
    );

    setSavedSettings(settings);
    setSuccessMessage(
      "Settings saved successfully.",
    );

    window.setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const resetSettings = () => {
    setSettings(savedSettings);

    document.documentElement.classList.toggle(
      "dark",
      savedSettings.darkMode,
    );

    setSuccessMessage("");
  };

  const updatePassword = () => {
    if (
      !currentPassword ||
      !newPassword ||
      !confirmPassword
    ) {
      window.alert(
        "Please complete all password fields.",
      );
      return;
    }

    if (newPassword.length < 8) {
      window.alert(
        "New password must contain at least 8 characters.",
      );
      return;
    }

    if (
      newPassword !== confirmPassword
    ) {
      window.alert(
        "New password and confirmation do not match.",
      );
      return;
    }

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setSecurityOpen(false);

    setSuccessMessage(
      "Password updated successfully.",
    );
  };

  const savePaymentMethod = () => {
    if (
      !cardName.trim() ||
      !cardNumber.trim()
    ) {
      window.alert(
        "Please enter valid payment details.",
      );
      return;
    }

    window.localStorage.setItem(
      "horse-trails-payment-method",
      JSON.stringify({
        cardName,
        cardNumber,
      }),
    );

    setPaymentOpen(false);

    setSuccessMessage(
      "Payment method saved successfully.",
    );
  };

  const removePaymentMethod = () => {
    const confirmed = window.confirm(
      "Remove this saved payment method?",
    );

    if (!confirmed) {
      return;
    }

    window.localStorage.removeItem(
      "horse-trails-payment-method",
    );

    setCardName("");
    setCardNumber("");
    setPaymentOpen(false);

    setSuccessMessage(
      "Payment method removed.",
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-forest">
          Settings
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage your account preferences,
          privacy and notification settings.
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
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="relative overflow-hidden rounded-3xl bg-forest p-7 text-white shadow-xl">
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10" />
        <div className="absolute -bottom-20 right-24 h-44 w-44 rounded-full bg-white/5" />

        <div className="relative flex items-center gap-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
            <SettingsIcon size={32} />
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              Account Settings
            </h2>

            <p className="mt-1 text-sm text-white/70">
              Personalize your Horse Trails
              experience.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-white p-4 shadow-sm sm:p-6">
        <div className="mb-5">
          <h2 className="text-xl font-bold text-forest">
            Account Settings
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage your personal account
            information.
          </p>
        </div>

        <div className="space-y-3">
          <Link
            to="/dashboard/profile"
            className="flex w-full items-center justify-between rounded-2xl border border-border bg-[#faf8f1] p-4 text-left transition hover:-translate-y-0.5 hover:bg-white hover:shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-700">
                <User size={21} />
              </div>

              <div>
                <p className="font-semibold text-forest">
                  Personal Information
                </p>

                <p className="text-sm text-muted-foreground">
                  Update your name, email
                  and profile details.
                </p>
              </div>
            </div>

            <ChevronRight
              size={20}
              className="text-muted-foreground"
            />
          </Link>

          <button
            type="button"
            onClick={() =>
              setSecurityOpen(true)
            }
            className="flex w-full items-center justify-between rounded-2xl border border-border bg-[#faf8f1] p-4 text-left transition hover:-translate-y-0.5 hover:bg-white hover:shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                <Lock size={21} />
              </div>

              <div>
                <p className="font-semibold text-forest">
                  Password & Security
                </p>

                <p className="text-sm text-muted-foreground">
                  Manage your password and
                  account security.
                </p>
              </div>
            </div>

            <ChevronRight
              size={20}
              className="text-muted-foreground"
            />
          </button>

          <button
            type="button"
            onClick={() =>
              setPaymentOpen(true)
            }
            className="flex w-full items-center justify-between rounded-2xl border border-border bg-[#faf8f1] p-4 text-left transition hover:-translate-y-0.5 hover:bg-white hover:shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-orange-700">
                <CreditCard size={21} />
              </div>

              <div>
                <p className="font-semibold text-forest">
                  Payment Preferences
                </p>

                <p className="text-sm text-muted-foreground">
                  Manage your saved payment
                  methods.
                </p>
              </div>
            </div>

            <ChevronRight
              size={20}
              className="text-muted-foreground"
            />
          </button>

          <button
            type="button"
            onClick={() =>
              setPreferencesOpen(true)
            }
            className="flex w-full items-center justify-between rounded-2xl border border-border bg-[#faf8f1] p-4 text-left transition hover:-translate-y-0.5 hover:bg-white hover:shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
                <Globe size={21} />
              </div>

              <div>
                <p className="font-semibold text-forest">
                  Language & Currency
                </p>

                <p className="text-sm text-muted-foreground">
                  {settings.language} ·{" "}
                  {settings.currency}
                </p>
              </div>
            </div>

            <ChevronRight
              size={20}
              className="text-muted-foreground"
            />
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-white p-4 shadow-sm sm:p-6">
        <div className="mb-5">
          <h2 className="text-xl font-bold text-forest">
            Preferences
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Customize how you use Horse
            Trails.
          </p>
        </div>

        <div className="space-y-4">
          <SettingToggle
            icon={Bell}
            iconClassName="bg-purple-100 text-purple-700"
            title="Push Notifications"
            description="Receive updates about your bookings."
            checked={
              settings.pushNotifications
            }
            onChange={(checked) =>
              updateSetting(
                "pushNotifications",
                checked,
              )
            }
          />

          <SettingToggle
            icon={Mail}
            iconClassName="bg-blue-100 text-blue-700"
            title="Email Updates"
            description="Receive offers and important updates by email."
            checked={
              settings.emailUpdates
            }
            onChange={(checked) =>
              updateSetting(
                "emailUpdates",
                checked,
              )
            }
          />

          <SettingToggle
            icon={CalendarIcon}
            iconClassName="bg-green-100 text-green-700"
            title="Booking Reminders"
            description="Get reminders before your scheduled ride."
            checked={
              settings.bookingReminders
            }
            onChange={(checked) =>
              updateSetting(
                "bookingReminders",
                checked,
              )
            }
          />

          <SettingToggle
            icon={Smartphone}
            iconClassName="bg-orange-100 text-orange-700"
            title="Promotional Offers"
            description="Receive discounts and special trail offers."
            checked={
              settings.promotionalOffers
            }
            onChange={(checked) =>
              updateSetting(
                "promotionalOffers",
                checked,
              )
            }
          />

          <SettingToggle
            icon={Moon}
            iconClassName="bg-gray-200 text-gray-700"
            title="Dark Mode"
            description="Change the appearance of your dashboard."
            checked={settings.darkMode}
            onChange={(checked) =>
              updateSetting(
                "darkMode",
                checked,
              )
            }
          />
        </div>
      </div>

      <button
        type="button"
        onClick={() =>
          setSecurityOpen(true)
        }
        className="w-full rounded-2xl border border-border bg-white p-6 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
      >
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700">
              <ShieldCheck size={24} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-forest">
                Privacy & Security
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Your account is protected
                with secure privacy settings.
              </p>
            </div>
          </div>

          <span className="w-fit rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
            Protected
          </span>
        </div>
      </button>

      <div className="flex flex-col justify-end gap-3 sm:flex-row">
        <Button
          type="button"
          variant="outline"
          onClick={resetSettings}
          disabled={!hasChanges}
        >
          Reset Changes
        </Button>

        <Button
          type="button"
          onClick={saveSettings}
          disabled={!hasChanges}
          className="bg-forest text-white shadow-md hover:bg-forest/90"
        >
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <Dialog
        open={securityOpen}
        onOpenChange={setSecurityOpen}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl text-forest">
              Password & Security
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-5">
            <div>
              <Label htmlFor="current-password">
                Current password
              </Label>

              <Input
                id="current-password"
                type="password"
                value={currentPassword}
                onChange={(event) =>
                  setCurrentPassword(
                    event.target.value,
                  )
                }
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="new-password">
                New password
              </Label>

              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(event) =>
                  setNewPassword(
                    event.target.value,
                  )
                }
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="confirm-password">
                Confirm new password
              </Label>

              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(event) =>
                  setConfirmPassword(
                    event.target.value,
                  )
                }
                className="mt-1"
              />
            </div>

            <div className="rounded-xl border border-green-200 bg-green-50 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-green-700">
                <ShieldCheck className="h-4 w-4" />
                Account protected
              </div>

              <p className="mt-1 text-xs text-green-700/80">
                Use at least 8 characters
                with letters, numbers and
                symbols.
              </p>
            </div>

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  setSecurityOpen(false)
                }
              >
                Cancel
              </Button>

              <Button
                type="button"
                onClick={updatePassword}
                className="bg-forest text-white hover:bg-forest/90"
              >
                Update Password
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={paymentOpen}
        onOpenChange={setPaymentOpen}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl text-forest">
              Payment Preferences
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-5">
            <div className="rounded-2xl bg-forest p-5 text-white">
              <p className="text-xs uppercase tracking-wider text-white/70">
                Saved card
              </p>

              <p className="mt-5 text-xl font-semibold tracking-wider">
                {cardNumber ||
                  "No saved card"}
              </p>

              <p className="mt-4 text-sm text-white/80">
                {cardName ||
                  "Card holder"}
              </p>
            </div>

            <div>
              <Label htmlFor="card-name">
                Cardholder name
              </Label>

              <Input
                id="card-name"
                value={cardName}
                onChange={(event) =>
                  setCardName(
                    event.target.value,
                  )
                }
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="card-number">
                Card number
              </Label>

              <Input
                id="card-number"
                value={cardNumber}
                onChange={(event) =>
                  setCardNumber(
                    event.target.value,
                  )
                }
                className="mt-1"
              />
            </div>

            <div className="flex flex-col justify-between gap-3 sm:flex-row">
              <Button
                type="button"
                variant="outline"
                onClick={
                  removePaymentMethod
                }
                className="border-red-200 text-red-600 hover:bg-red-50"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Remove Card
              </Button>

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    setPaymentOpen(false)
                  }
                >
                  Cancel
                </Button>

                <Button
                  type="button"
                  onClick={
                    savePaymentMethod
                  }
                  className="bg-forest text-white hover:bg-forest/90"
                >
                  Save Card
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={preferencesOpen}
        onOpenChange={setPreferencesOpen}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl text-forest">
              Language & Currency
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-5">
            <div>
              <Label htmlFor="language">
                Language
              </Label>

              <select
                id="language"
                value={settings.language}
                onChange={(event) =>
                  updateSetting(
                    "language",
                    event.target.value,
                  )
                }
                className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-forest/30"
              >
                <option value="English">
                  English
                </option>
                <option value="Hindi">
                  Hindi
                </option>
                <option value="Spanish">
                  Spanish
                </option>
                <option value="French">
                  French
                </option>
              </select>
            </div>

            <div>
              <Label htmlFor="currency">
                Currency
              </Label>

              <select
                id="currency"
                value={settings.currency}
                onChange={(event) =>
                  updateSetting(
                    "currency",
                    event.target.value,
                  )
                }
                className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-forest/30"
              >
                <option value="USD">
                  USD — US Dollar
                </option>
                <option value="INR">
                  INR — Indian Rupee
                </option>
                <option value="EUR">
                  EUR — Euro
                </option>
                <option value="GBP">
                  GBP — British Pound
                </option>
              </select>
            </div>

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  setPreferencesOpen(false)
                }
              >
                Close
              </Button>

              <Button
                type="button"
                onClick={() => {
                  saveSettings();
                  setPreferencesOpen(
                    false,
                  );
                }}
                className="bg-forest text-white hover:bg-forest/90"
              >
                Save Preferences
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function SettingToggle({
  icon: Icon,
  iconClassName,
  title,
  description,
  checked,
  onChange,
}: {
  icon: React.ComponentType<{
    className?: string;
    size?: number;
  }>;
  iconClassName: string;
  title: string;
  description: string;
  checked: boolean;
  onChange: (
    checked: boolean,
  ) => void;
}) {
  return (
    <div className="flex flex-col justify-between gap-4 rounded-2xl border border-border bg-[#faf8f1] p-4 sm:flex-row sm:items-center">
      <div className="flex items-center gap-4">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconClassName}`}
        >
          <Icon size={21} />
        </div>

        <div>
          <p className="font-semibold text-forest">
            {title}
          </p>

          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        </div>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() =>
          onChange(!checked)
        }
        className={`relative h-7 w-12 shrink-0 rounded-full transition ${
          checked
            ? "bg-forest"
            : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-all ${
            checked
              ? "left-6"
              : "left-1"
          }`}
        />
      </button>
    </div>
  );
}

function CalendarIcon({
  size = 21,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <Bell
      size={size}
      className={className}
    />
  );
}