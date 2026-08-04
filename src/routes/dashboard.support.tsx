import { createFileRoute } from "@tanstack/react-router";
import {
  FormEvent,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  CheckCircle2,
  ChevronDown,
  Clock3,
  Headphones,
  HelpCircle,
  Mail,
  MessageCircle,
  Phone,
  Search,
  Send,
  TicketCheck,
  Trash2,
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

export const Route = createFileRoute("/dashboard/support")({
  head: () => ({
    meta: [
      {
        title: "Help & Support — Horse Trails",
      },
      {
        name: "description",
        content:
          "Contact Horse Trails support, browse FAQs and manage support requests.",
      },
    ],
  }),

  component: SupportPage,
});

type FaqItem = {
  question: string;
  answer: string;
};

type ChatMessage = {
  id: number;
  sender: "user" | "support";
  message: string;
  time: string;
};

type SupportTicket = {
  id: string;
  name: string;
  email: string;
  subject: string;
  category: string;
  priority: string;
  message: string;
  status: "Open" | "Resolved";
  createdAt: string;
};

type SupportForm = {
  name: string;
  email: string;
  subject: string;
  category: string;
  priority: string;
  message: string;
};

type SupportFormErrors = Partial<
  Record<keyof SupportForm, string>
>;

const STORAGE_KEY =
  "horse-trails-support-tickets";

const faqs: FaqItem[] = [
  {
    question: "How can I modify my booking?",
    answer:
      "You can modify your booking from the My Bookings section. Select your booking and choose the reschedule or modification option.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "Cancellation policies vary depending on the experience. Check your booking details for the cancellation deadline and applicable charges.",
  },
  {
    question: "How can I get a refund?",
    answer:
      "Eligible refunds are processed according to the cancellation policy. Refunds normally appear in the original payment method after processing.",
  },
  {
    question: "Can I contact the trail guide directly?",
    answer:
      "Once your booking is confirmed, the guide or operator contact details will be visible in your booking information.",
  },
  {
    question: "What should I bring for my horse ride?",
    answer:
      "Wear comfortable clothes, closed shoes and weather-appropriate layers. Carry water, sunscreen and any required medical items.",
  },
  {
    question: "Are beginners allowed?",
    answer:
      "Many experiences are suitable for beginners. Check the experience difficulty level and rider requirements before booking.",
  },
];

const initialForm: SupportForm = {
  name: "",
  email: "",
  subject: "",
  category: "Booking",
  priority: "Normal",
  message: "",
};

function SupportPage() {
  const [openFaq, setOpenFaq] =
    useState<number | null>(0);

  const [faqSearch, setFaqSearch] =
    useState("");

  const [chatOpen, setChatOpen] =
    useState(false);

  const [chatInput, setChatInput] =
    useState("");

  const [chatMessages, setChatMessages] =
    useState<ChatMessage[]>([
      {
        id: 1,
        sender: "support",
        message:
          "Hello! Welcome to Horse Trails support. How can we help you today?",
        time: "Now",
      },
    ]);

  const [form, setForm] =
    useState<SupportForm>(initialForm);

  const [errors, setErrors] =
    useState<SupportFormErrors>({});

  const [tickets, setTickets] =
    useState<SupportTicket[]>([]);

  const [successMessage, setSuccessMessage] =
    useState("");

  const [selectedTicket, setSelectedTicket] =
    useState<SupportTicket | null>(null);

  const [ticketOpen, setTicketOpen] =
    useState(false);

  useEffect(() => {
    const storedTickets =
      window.localStorage.getItem(
        STORAGE_KEY,
      );

    if (!storedTickets) {
      return;
    }

    try {
      setTickets(
        JSON.parse(
          storedTickets,
        ) as SupportTicket[],
      );
    } catch {
      window.localStorage.removeItem(
        STORAGE_KEY,
      );
    }
  }, []);

  const filteredFaqs = useMemo(() => {
    const keyword = faqSearch
      .trim()
      .toLowerCase();

    return faqs.filter((faq) => {
      return (
        faq.question
          .toLowerCase()
          .includes(keyword) ||
        faq.answer
          .toLowerCase()
          .includes(keyword)
      );
    });
  }, [faqSearch]);

  const saveTickets = (
    nextTickets: SupportTicket[],
  ) => {
    setTickets(nextTickets);

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(nextTickets),
    );
  };

  const updateForm = (
    field: keyof SupportForm,
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
    const nextErrors: SupportFormErrors = {};

    if (!form.name.trim()) {
      nextErrors.name =
        "Your name is required.";
    }

    if (!form.email.trim()) {
      nextErrors.email =
        "Your email is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        form.email,
      )
    ) {
      nextErrors.email =
        "Enter a valid email address.";
    }

    if (!form.subject.trim()) {
      nextErrors.subject =
        "Subject is required.";
    }

    if (
      form.message.trim().length < 10
    ) {
      nextErrors.message =
        "Message must contain at least 10 characters.";
    }

    setErrors(nextErrors);

    return (
      Object.keys(nextErrors).length ===
      0
    );
  };

  const submitSupportRequest = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const ticketNumber = `HTS-${Date.now()
      .toString()
      .slice(-6)}`;

    const newTicket: SupportTicket = {
      id: ticketNumber,
      name: form.name.trim(),
      email: form.email.trim(),
      subject: form.subject.trim(),
      category: form.category,
      priority: form.priority,
      message: form.message.trim(),
      status: "Open",
      createdAt:
        new Date().toLocaleString(),
    };

    saveTickets([
      newTicket,
      ...tickets,
    ]);

    setForm(initialForm);
    setErrors({});
    setSuccessMessage(
      `Your support request has been submitted. Ticket ID: ${ticketNumber}`,
    );

    window.setTimeout(() => {
      setSuccessMessage("");
    }, 5000);
  };

  const sendChatMessage = () => {
    const message = chatInput.trim();

    if (!message) {
      return;
    }

    const userMessage: ChatMessage = {
      id: Date.now(),
      sender: "user",
      message,
      time: "Now",
    };

    setChatMessages((current) => [
      ...current,
      userMessage,
    ]);

    setChatInput("");

    window.setTimeout(() => {
      const supportReply: ChatMessage = {
        id: Date.now() + 1,
        sender: "support",
        message:
          "Thanks for your message. A support agent will review your request and assist you shortly.",
        time: "Now",
      };

      setChatMessages((current) => [
        ...current,
        supportReply,
      ]);
    }, 700);
  };

  const openEmailSupport = () => {
    window.location.href =
      "mailto:support@horsetrails.com?subject=Horse%20Trails%20Support";
  };

  const callSupport = () => {
    window.location.href =
      "tel:+18005550198";
  };

  const openTicketDetails = (
    ticket: SupportTicket,
  ) => {
    setSelectedTicket(ticket);
    setTicketOpen(true);
  };

  const markTicketResolved = (
    ticketId: string,
  ) => {
    const updatedTickets = tickets.map(
      (ticket) =>
        ticket.id === ticketId
          ? {
              ...ticket,
              status:
                "Resolved" as const,
            }
          : ticket,
    );

    saveTickets(updatedTickets);

    setSelectedTicket((current) =>
      current?.id === ticketId
        ? {
            ...current,
            status: "Resolved",
          }
        : current,
    );
  };

  const deleteTicket = (
    ticketId: string,
  ) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this support ticket?",
    );

    if (!confirmed) {
      return;
    }

    saveTickets(
      tickets.filter(
        (ticket) =>
          ticket.id !== ticketId,
      ),
    );

    if (
      selectedTicket?.id === ticketId
    ) {
      setSelectedTicket(null);
      setTicketOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-forest">
          Help & Support
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          We're here to help with your
          bookings, payments and
          experiences.
        </p>
      </div>

      {successMessage && (
        <div className="flex items-start justify-between gap-3 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />

            <span>
              {successMessage}
            </span>
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

      <div className="relative overflow-hidden rounded-3xl bg-forest p-7 text-white shadow-xl">
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10" />
        <div className="absolute -bottom-20 right-24 h-44 w-44 rounded-full bg-white/5" />

        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
              <Headphones size={30} />
            </div>

            <h2 className="text-2xl font-bold">
              How can we help you?
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-white/70">
              Our support team is ready to
              assist with questions or
              concerns about your Horse
              Trails experience.
            </p>

            <Button
              type="button"
              onClick={() =>
                setChatOpen(true)
              }
              className="mt-5 bg-white text-forest hover:bg-white/90"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Chat with Support
            </Button>
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-sm">
            <Clock3 size={17} />
            Support available 24/7
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <button
          type="button"
          onClick={() =>
            setChatOpen(true)
          }
          className="rounded-2xl border border-border bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-700">
            <MessageCircle size={21} />
          </div>

          <h3 className="font-bold text-forest">
            Live Chat
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Chat with our support team
            instantly.
          </p>

          <span className="mt-4 inline-flex rounded-xl bg-forest px-4 py-2.5 text-sm font-semibold text-white">
            Start Chat
          </span>
        </button>

        <button
          type="button"
          onClick={openEmailSupport}
          className="rounded-2xl border border-border bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
            <Mail size={21} />
          </div>

          <h3 className="font-bold text-forest">
            Email Support
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Get help from our support team.
          </p>

          <p className="mt-4 break-all text-sm font-semibold text-forest">
            support@horsetrails.com
          </p>
        </button>

        <button
          type="button"
          onClick={callSupport}
          className="rounded-2xl border border-border bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-orange-700">
            <Phone size={21} />
          </div>

          <h3 className="font-bold text-forest">
            Call Us
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Speak directly with our team.
          </p>

          <p className="mt-4 text-sm font-semibold text-forest">
            +1 (800) 555-0198
          </p>
        </button>
      </div>

      <div className="rounded-2xl border border-border bg-white p-4 shadow-sm sm:p-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-xl font-bold text-forest">
              Frequently Asked Questions
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Find quick answers to common
              questions.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-border bg-[#faf8f1] px-3 py-2.5">
            <Search className="h-4 w-4 text-muted-foreground" />

            <input
              type="text"
              value={faqSearch}
              onChange={(event) =>
                setFaqSearch(
                  event.target.value,
                )
              }
              placeholder="Search FAQs..."
              className="w-full bg-transparent text-sm outline-none sm:w-52"
            />

            {faqSearch && (
              <button
                type="button"
                onClick={() =>
                  setFaqSearch("")
                }
                aria-label="Clear FAQ search"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {filteredFaqs.map(
            (faq, index) => (
              <div
                key={faq.question}
                className="overflow-hidden rounded-2xl border border-border bg-[#faf8f1]"
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenFaq(
                      openFaq === index
                        ? null
                        : index,
                    )
                  }
                  className="flex w-full items-center justify-between gap-4 p-4 text-left transition hover:bg-white"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle
                      size={19}
                      className="shrink-0 text-forest"
                    />

                    <span className="font-semibold text-forest">
                      {faq.question}
                    </span>
                  </div>

                  <ChevronDown
                    size={18}
                    className={`shrink-0 transition-transform ${
                      openFaq === index
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </button>

                {openFaq === index && (
                  <div className="border-t border-border px-4 pb-4 pt-3 text-sm leading-6 text-muted-foreground">
                    {faq.answer}
                  </div>
                )}
              </div>
            ),
          )}

          {filteredFaqs.length === 0 && (
            <div className="rounded-2xl border border-dashed border-border px-6 py-12 text-center">
              <HelpCircle className="mx-auto h-10 w-10 text-muted-foreground" />

              <h3 className="mt-3 font-semibold text-forest">
                No FAQ found
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Try a different search
                keyword or send us a
                message.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-white p-4 shadow-sm sm:p-6">
        <div className="mb-5">
          <h2 className="text-xl font-bold text-forest">
            Send Us a Message
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Can't find what you're looking
            for? Create a support ticket.
          </p>
        </div>

        <form
          onSubmit={
            submitSupportRequest
          }
          className="grid gap-5 md:grid-cols-2"
        >
          <FormField
            label="Your name"
            error={errors.name}
          >
            <Input
              value={form.name}
              onChange={(event) =>
                updateForm(
                  "name",
                  event.target.value,
                )
              }
              placeholder="Enter your name"
              className="mt-1 bg-[#faf8f1]"
            />
          </FormField>

          <FormField
            label="Your email"
            error={errors.email}
          >
            <Input
              type="email"
              value={form.email}
              onChange={(event) =>
                updateForm(
                  "email",
                  event.target.value,
                )
              }
              placeholder="name@example.com"
              className="mt-1 bg-[#faf8f1]"
            />
          </FormField>

          <FormField
            label="Subject"
            error={errors.subject}
          >
            <Input
              value={form.subject}
              onChange={(event) =>
                updateForm(
                  "subject",
                  event.target.value,
                )
              }
              placeholder="Briefly describe your issue"
              className="mt-1 bg-[#faf8f1]"
            />
          </FormField>

          <div>
            <Label htmlFor="support-category">
              Category
            </Label>

            <select
              id="support-category"
              value={form.category}
              onChange={(event) =>
                updateForm(
                  "category",
                  event.target.value,
                )
              }
              className="mt-1 h-10 w-full rounded-md border border-input bg-[#faf8f1] px-3 text-sm outline-none focus:ring-2 focus:ring-forest/30"
            >
              <option value="Booking">
                Booking
              </option>

              <option value="Payment">
                Payment
              </option>

              <option value="Refund">
                Refund
              </option>

              <option value="Account">
                Account
              </option>

              <option value="Technical">
                Technical Issue
              </option>

              <option value="Other">
                Other
              </option>
            </select>
          </div>

          <div>
            <Label htmlFor="support-priority">
              Priority
            </Label>

            <select
              id="support-priority"
              value={form.priority}
              onChange={(event) =>
                updateForm(
                  "priority",
                  event.target.value,
                )
              }
              className="mt-1 h-10 w-full rounded-md border border-input bg-[#faf8f1] px-3 text-sm outline-none focus:ring-2 focus:ring-forest/30"
            >
              <option value="Low">
                Low
              </option>

              <option value="Normal">
                Normal
              </option>

              <option value="High">
                High
              </option>

              <option value="Urgent">
                Urgent
              </option>
            </select>
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="support-message">
              How can we help you?
            </Label>

            <Textarea
              id="support-message"
              rows={5}
              value={form.message}
              onChange={(event) =>
                updateForm(
                  "message",
                  event.target.value,
                )
              }
              placeholder="Describe your question or problem..."
              className="mt-1 resize-none bg-[#faf8f1]"
              maxLength={1000}
            />

            <div className="mt-1 flex justify-between gap-3 text-xs">
              <span className="text-red-600">
                {errors.message}
              </span>

              <span className="text-muted-foreground">
                {form.message.length}/1000
              </span>
            </div>
          </div>

          <Button
            type="submit"
            className="w-fit bg-forest text-white hover:bg-forest/90"
          >
            <Send className="mr-2 h-4 w-4" />
            Send Message
          </Button>
        </form>
      </div>

      {tickets.length > 0 && (
        <div className="rounded-2xl border border-border bg-white p-4 shadow-sm sm:p-6">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-forest">
              Your Support Tickets
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Track your submitted support
              requests.
            </p>
          </div>

          <div className="space-y-3">
            {tickets.map((ticket) => (
              <button
                key={ticket.id}
                type="button"
                onClick={() =>
                  openTicketDetails(
                    ticket,
                  )
                }
                className="flex w-full flex-col justify-between gap-4 rounded-2xl border border-border bg-[#faf8f1] p-4 text-left transition hover:-translate-y-0.5 hover:bg-white hover:shadow-md sm:flex-row sm:items-center"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-forest/10 text-forest">
                    <TicketCheck className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-forest">
                      {ticket.subject}
                    </h3>

                    <p className="mt-1 text-xs text-muted-foreground">
                      {ticket.id} ·{" "}
                      {ticket.category} ·{" "}
                      {ticket.createdAt}
                    </p>
                  </div>
                </div>

                <span
                  className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                    ticket.status === "Open"
                      ? "bg-orange-100 text-orange-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {ticket.status}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      <Dialog
        open={chatOpen}
        onOpenChange={setChatOpen}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 font-display text-2xl text-forest">
              <MessageCircle className="h-6 w-6" />
              Live Support Chat
            </DialogTitle>
          </DialogHeader>

          <div className="flex h-[420px] flex-col">
            <div className="mb-4 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-3">
              <span className="h-2.5 w-2.5 rounded-full bg-green-600" />

              <div>
                <p className="text-sm font-semibold text-green-700">
                  Support team online
                </p>

                <p className="text-xs text-green-700/80">
                  Typical response time:
                  under 5 minutes
                </p>
              </div>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto rounded-2xl bg-[#faf8f1] p-4">
              {chatMessages.map(
                (message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender ===
                      "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[82%] rounded-2xl px-4 py-3 ${
                        message.sender ===
                        "user"
                          ? "rounded-br-md bg-forest text-white"
                          : "rounded-bl-md border border-border bg-white text-foreground"
                      }`}
                    >
                      <div className="mb-1 flex items-center gap-2">
                        {message.sender ===
                          "support" && (
                          <UserRound className="h-3.5 w-3.5" />
                        )}

                        <span className="text-xs font-semibold">
                          {message.sender ===
                          "user"
                            ? "You"
                            : "Support"}
                        </span>
                      </div>

                      <p className="text-sm leading-6">
                        {message.message}
                      </p>

                      <p
                        className={`mt-1 text-[10px] ${
                          message.sender ===
                          "user"
                            ? "text-white/70"
                            : "text-muted-foreground"
                        }`}
                      >
                        {message.time}
                      </p>
                    </div>
                  </div>
                ),
              )}
            </div>

            <div className="mt-4 flex gap-2">
              <Input
                value={chatInput}
                onChange={(event) =>
                  setChatInput(
                    event.target.value,
                  )
                }
                onKeyDown={(event) => {
                  if (
                    event.key === "Enter"
                  ) {
                    sendChatMessage();
                  }
                }}
                placeholder="Type your message..."
              />

              <Button
                type="button"
                onClick={sendChatMessage}
                disabled={!chatInput.trim()}
                className="bg-forest text-white hover:bg-forest/90"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={ticketOpen}
        onOpenChange={setTicketOpen}
      >
        <DialogContent className="max-w-xl">
          {selectedTicket && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-2xl text-forest">
                  Support Ticket
                </DialogTitle>
              </DialogHeader>

              <div className="rounded-2xl border border-border bg-[#faf8f1] p-5">
                <div className="flex flex-wrap justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-forest">
                      {
                        selectedTicket.subject
                      }
                    </h3>

                    <p className="mt-1 text-xs text-muted-foreground">
                      {selectedTicket.id}
                    </p>
                  </div>

                  <span
                    className={`h-fit rounded-full px-3 py-1 text-xs font-semibold ${
                      selectedTicket.status ===
                      "Open"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {
                      selectedTicket.status
                    }
                  </span>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <TicketField
                    label="Name"
                    value={
                      selectedTicket.name
                    }
                  />

                  <TicketField
                    label="Email"
                    value={
                      selectedTicket.email
                    }
                  />

                  <TicketField
                    label="Category"
                    value={
                      selectedTicket.category
                    }
                  />

                  <TicketField
                    label="Priority"
                    value={
                      selectedTicket.priority
                    }
                  />

                  <TicketField
                    label="Created"
                    value={
                      selectedTicket.createdAt
                    }
                  />

                  <TicketField
                    label="Status"
                    value={
                      selectedTicket.status
                    }
                  />
                </div>

                <div className="mt-5 rounded-xl border border-border bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Message
                  </p>

                  <p className="mt-2 whitespace-pre-wrap text-sm leading-6">
                    {
                      selectedTicket.message
                    }
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap justify-between gap-3">
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() =>
                    deleteTicket(
                      selectedTicket.id,
                    )
                  }
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>

                <div className="flex gap-2">
                  {selectedTicket.status ===
                    "Open" && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        markTicketResolved(
                          selectedTicket.id,
                        )
                      }
                    >
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Mark Resolved
                    </Button>
                  )}

                  <Button
                    type="button"
                    onClick={() =>
                      setTicketOpen(false)
                    }
                    className="bg-forest text-white hover:bg-forest/90"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </>
          )}
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

function TicketField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">
        {label}
      </p>

      <p className="mt-1 break-words font-semibold text-forest">
        {value}
      </p>
    </div>
  );
}
