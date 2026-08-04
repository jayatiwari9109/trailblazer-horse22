import { createFileRoute } from "@tanstack/react-router";
import {
  FormEvent,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  CheckCircle2,
  CreditCard,
  Eye,
  MoreHorizontal,
  Plus,
  Search,
  ShieldCheck,
  Trash2,
  WalletCards,
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

export const Route = createFileRoute("/dashboard/wallet")({
  head: () => ({
    meta: [
      {
        title: "My Wallet — Horse Trails",
      },
      {
        name: "description",
        content:
          "Manage your Horse Trails wallet balance, cards and transactions.",
      },
    ],
  }),

  component: WalletPage,
});

type TransactionType = "credit" | "debit";

type WalletTransaction = {
  id: string;
  title: string;
  description: string;
  amount: number;
  type: TransactionType;
  date: string;
  status: "Completed" | "Pending";
};

type PaymentCard = {
  id: string;
  cardholderName: string;
  cardNumber: string;
  expiry: string;
  cardType: string;
  isDefault: boolean;
};

type WalletData = {
  balance: number;
  cards: PaymentCard[];
  transactions: WalletTransaction[];
};

const STORAGE_KEY = "horse-trails-wallet";

const initialWalletData: WalletData = {
  balance: 2450,
  cards: [
    {
      id: "card-1",
      cardholderName: "Sophia Reyes",
      cardNumber: "4242424242424242",
      expiry: "12/28",
      cardType: "Visa",
      isDefault: true,
    },
  ],
  transactions: [
    {
      id: "TXN-1001",
      title: "Trail Booking",
      description: "Premium Mountain Trail",
      amount: 450,
      type: "debit",
      date: "Jul 18, 2026",
      status: "Completed",
    },
    {
      id: "TXN-1002",
      title: "Wallet Top Up",
      description: "Visa ending in 4242",
      amount: 1000,
      type: "credit",
      date: "Jul 15, 2026",
      status: "Completed",
    },
    {
      id: "TXN-1003",
      title: "Horse Riding Experience",
      description: "Sunset Riding Experience",
      amount: 280,
      type: "debit",
      date: "Jul 12, 2026",
      status: "Completed",
    },
  ],
};

function WalletPage() {
  const [wallet, setWallet] =
    useState<WalletData>(initialWalletData);

  const [addMoneyOpen, setAddMoneyOpen] =
    useState(false);

  const [sendMoneyOpen, setSendMoneyOpen] =
    useState(false);

  const [cardOpen, setCardOpen] =
    useState(false);

  const [transactionOpen, setTransactionOpen] =
    useState(false);

  const [selectedTransaction, setSelectedTransaction] =
    useState<WalletTransaction | null>(null);

  const [activeCardMenu, setActiveCardMenu] =
    useState<string | null>(null);

  const [editingCardId, setEditingCardId] =
    useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [transactionFilter, setTransactionFilter] =
    useState("All");

  const [addAmount, setAddAmount] = useState("");
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [sendNote, setSendNote] = useState("");

  const [cardholderName, setCardholderName] =
    useState("");

  const [cardNumber, setCardNumber] =
    useState("");

  const [cardExpiry, setCardExpiry] =
    useState("");

  const [successMessage, setSuccessMessage] =
    useState("");

  useEffect(() => {
    const storedWallet =
      window.localStorage.getItem(STORAGE_KEY);

    if (!storedWallet) {
      return;
    }

    try {
      setWallet(
        JSON.parse(storedWallet) as WalletData,
      );
    } catch {
      window.localStorage.removeItem(
        STORAGE_KEY,
      );
    }
  }, []);

  const saveWallet = (
    nextWallet: WalletData,
  ) => {
    setWallet(nextWallet);

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(nextWallet),
    );
  };

  const totalAdded = useMemo(() => {
    return wallet.transactions
      .filter(
        (transaction) =>
          transaction.type === "credit",
      )
      .reduce(
        (total, transaction) =>
          total + transaction.amount,
        0,
      );
  }, [wallet.transactions]);

  const totalSpent = useMemo(() => {
    return wallet.transactions
      .filter(
        (transaction) =>
          transaction.type === "debit",
      )
      .reduce(
        (total, transaction) =>
          total + transaction.amount,
        0,
      );
  }, [wallet.transactions]);

  const filteredTransactions = useMemo(() => {
    const keyword = search
      .trim()
      .toLowerCase();

    return wallet.transactions.filter(
      (transaction) => {
        const matchesSearch =
          transaction.title
            .toLowerCase()
            .includes(keyword) ||
          transaction.description
            .toLowerCase()
            .includes(keyword) ||
          transaction.id
            .toLowerCase()
            .includes(keyword);

        const matchesFilter =
          transactionFilter === "All" ||
          transaction.type ===
            transactionFilter;

        return (
          matchesSearch &&
          matchesFilter
        );
      },
    );
  }, [
    wallet.transactions,
    search,
    transactionFilter,
  ]);

  const showSuccess = (
    message: string,
  ) => {
    setSuccessMessage(message);

    window.setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const handleAddMoney = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const amount =
      Number(addAmount);

    if (
      !Number.isFinite(amount) ||
      amount <= 0
    ) {
      window.alert(
        "Please enter a valid amount.",
      );
      return;
    }

    if (amount > 10000) {
      window.alert(
        "Maximum top-up amount is $10,000.",
      );
      return;
    }

    const defaultCard =
      wallet.cards.find(
        (card) => card.isDefault,
      ) ?? wallet.cards[0];

    if (!defaultCard) {
      window.alert(
        "Please add a payment card first.",
      );
      return;
    }

    const newTransaction: WalletTransaction = {
      id: `TXN-${Date.now()
        .toString()
        .slice(-6)}`,
      title: "Wallet Top Up",
      description: `${defaultCard.cardType} ending in ${getLastFourDigits(
        defaultCard.cardNumber,
      )}`,
      amount,
      type: "credit",
      date: new Date().toLocaleDateString(
        "en-US",
        {
          month: "short",
          day: "2-digit",
          year: "numeric",
        },
      ),
      status: "Completed",
    };

    saveWallet({
      ...wallet,
      balance:
        wallet.balance + amount,
      transactions: [
        newTransaction,
        ...wallet.transactions,
      ],
    });

    setAddAmount("");
    setAddMoneyOpen(false);

    showSuccess(
      `$${amount.toFixed(
        2,
      )} added to your wallet.`,
    );
  };

  const handleSendMoney = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const amount =
      Number(sendAmount);

    if (!recipient.trim()) {
      window.alert(
        "Please enter recipient details.",
      );
      return;
    }

    if (
      !Number.isFinite(amount) ||
      amount <= 0
    ) {
      window.alert(
        "Please enter a valid amount.",
      );
      return;
    }

    if (amount > wallet.balance) {
      window.alert(
        "Insufficient wallet balance.",
      );
      return;
    }

    const newTransaction: WalletTransaction = {
      id: `TXN-${Date.now()
        .toString()
        .slice(-6)}`,
      title: "Money Sent",
      description:
        sendNote.trim() ||
        `Sent to ${recipient.trim()}`,
      amount,
      type: "debit",
      date: new Date().toLocaleDateString(
        "en-US",
        {
          month: "short",
          day: "2-digit",
          year: "numeric",
        },
      ),
      status: "Completed",
    };

    saveWallet({
      ...wallet,
      balance:
        wallet.balance - amount,
      transactions: [
        newTransaction,
        ...wallet.transactions,
      ],
    });

    setRecipient("");
    setSendAmount("");
    setSendNote("");
    setSendMoneyOpen(false);

    showSuccess(
      `$${amount.toFixed(
        2,
      )} sent successfully.`,
    );
  };

  const openAddCard = () => {
    setEditingCardId(null);
    setCardholderName("");
    setCardNumber("");
    setCardExpiry("");
    setCardOpen(true);
  };

  const openEditCard = (
    card: PaymentCard,
  ) => {
    setEditingCardId(card.id);
    setCardholderName(
      card.cardholderName,
    );
    setCardNumber(card.cardNumber);
    setCardExpiry(card.expiry);
    setActiveCardMenu(null);
    setCardOpen(true);
  };

  const saveCard = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const cleanedCardNumber =
      cardNumber.replace(/\s/g, "");

    if (!cardholderName.trim()) {
      window.alert(
        "Cardholder name is required.",
      );
      return;
    }

    if (
      !/^\d{12,19}$/.test(
        cleanedCardNumber,
      )
    ) {
      window.alert(
        "Enter a valid card number.",
      );
      return;
    }

    if (
      !/^(0[1-9]|1[0-2])\/\d{2}$/.test(
        cardExpiry,
      )
    ) {
      window.alert(
        "Enter expiry in MM/YY format.",
      );
      return;
    }

    if (editingCardId) {
      const updatedCards =
        wallet.cards.map((card) =>
          card.id === editingCardId
            ? {
                ...card,
                cardholderName:
                  cardholderName.trim(),
                cardNumber:
                  cleanedCardNumber,
                expiry: cardExpiry,
                cardType:
                  detectCardType(
                    cleanedCardNumber,
                  ),
              }
            : card,
        );

      saveWallet({
        ...wallet,
        cards: updatedCards,
      });

      showSuccess(
        "Payment card updated.",
      );
    } else {
      const newCard: PaymentCard = {
        id: `card-${Date.now()}`,
        cardholderName:
          cardholderName.trim(),
        cardNumber:
          cleanedCardNumber,
        expiry: cardExpiry,
        cardType:
          detectCardType(
            cleanedCardNumber,
          ),
        isDefault:
          wallet.cards.length === 0,
      };

      saveWallet({
        ...wallet,
        cards: [
          ...wallet.cards,
          newCard,
        ],
      });

      showSuccess(
        "Payment card added.",
      );
    }

    setCardOpen(false);
    setEditingCardId(null);
    setCardholderName("");
    setCardNumber("");
    setCardExpiry("");
  };

  const setDefaultCard = (
    cardId: string,
  ) => {
    saveWallet({
      ...wallet,
      cards: wallet.cards.map(
        (card) => ({
          ...card,
          isDefault:
            card.id === cardId,
        }),
      ),
    });

    setActiveCardMenu(null);

    showSuccess(
      "Default payment card updated.",
    );
  };

  const removeCard = (
    cardId: string,
  ) => {
    const confirmed = window.confirm(
      "Remove this payment card?",
    );

    if (!confirmed) {
      return;
    }

    const remainingCards =
      wallet.cards.filter(
        (card) =>
          card.id !== cardId,
      );

    if (
      remainingCards.length > 0 &&
      !remainingCards.some(
        (card) => card.isDefault,
      )
    ) {
      remainingCards[0] = {
        ...remainingCards[0],
        isDefault: true,
      };
    }

    saveWallet({
      ...wallet,
      cards: remainingCards,
    });

    setActiveCardMenu(null);

    showSuccess(
      "Payment card removed.",
    );
  };

  const openTransaction = (
    transaction: WalletTransaction,
  ) => {
    setSelectedTransaction(
      transaction,
    );
    setTransactionOpen(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-forest">
          My Wallet
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage your balance, payment
          methods and recent transactions.
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

      <div className="relative overflow-hidden rounded-3xl bg-forest p-7 text-white shadow-xl">
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10" />
        <div className="absolute -bottom-20 right-20 h-40 w-40 rounded-full bg-white/5" />

        <div className="relative">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-white/70">
                Available Balance
              </p>

              <h2 className="mt-2 text-4xl font-bold">
                $
                {wallet.balance.toLocaleString(
                  "en-US",
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  },
                )}
              </h2>
            </div>

            <div className="rounded-2xl bg-white/10 p-4">
              <WalletCards size={30} />
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() =>
                setAddMoneyOpen(true)
              }
              className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-forest transition hover:bg-white/90"
            >
              <Plus size={17} />
              Add Money
            </button>

            <button
              type="button"
              onClick={() =>
                setSendMoneyOpen(true)
              }
              className="flex items-center gap-2 rounded-xl border border-white/30 px-5 py-3 text-sm font-semibold transition hover:bg-white/10"
            >
              <ArrowUpRight size={17} />
              Send Money
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <button
          type="button"
          onClick={() =>
            setTransactionFilter("credit")
          }
          className="rounded-2xl border border-border bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-700">
            <ArrowDownLeft size={20} />
          </div>

          <p className="text-sm text-muted-foreground">
            Total Added
          </p>

          <h3 className="mt-1 text-2xl font-bold text-forest">
            $
            {totalAdded.toLocaleString(
              "en-US",
              {
                minimumFractionDigits: 2,
              },
            )}
          </h3>
        </button>

        <button
          type="button"
          onClick={() =>
            setTransactionFilter("debit")
          }
          className="rounded-2xl border border-border bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-700">
            <ArrowUpRight size={20} />
          </div>

          <p className="text-sm text-muted-foreground">
            Total Spent
          </p>

          <h3 className="mt-1 text-2xl font-bold text-forest">
            $
            {totalSpent.toLocaleString(
              "en-US",
              {
                minimumFractionDigits: 2,
              },
            )}
          </h3>
        </button>

        <button
          type="button"
          onClick={() =>
            setTransactionFilter("All")
          }
          className="rounded-2xl border border-border bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
            <ShieldCheck size={20} />
          </div>

          <p className="text-sm text-muted-foreground">
            Wallet Status
          </p>

          <h3 className="mt-1 text-2xl font-bold text-green-600">
            Active
          </h3>
        </button>
      </div>

      <div className="rounded-2xl border border-border bg-white p-4 shadow-sm sm:p-6">
        <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-bold text-forest">
              Payment Methods
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Your saved payment methods
            </p>
          </div>

          <button
            type="button"
            onClick={openAddCard}
            className="flex w-fit items-center gap-2 rounded-xl bg-forest px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
          >
            <Plus size={16} />
            Add Card
          </button>
        </div>

        <div className="space-y-3">
          {wallet.cards.map((card) => (
            <div
              key={card.id}
              className="relative flex flex-col justify-between gap-4 rounded-2xl border border-border bg-[#faf8f1] p-4 sm:flex-row sm:items-center"
            >
              <button
                type="button"
                onClick={() =>
                  openEditCard(card)
                }
                className="flex items-center gap-4 text-left"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-forest text-white">
                  <CreditCard size={23} />
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold text-forest">
                      {card.cardType} ending
                      in{" "}
                      {getLastFourDigits(
                        card.cardNumber,
                      )}
                    </p>

                    {card.isDefault && (
                      <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-semibold text-green-700">
                        Default
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground">
                    Expires {card.expiry}
                  </p>
                </div>
              </button>

              <div className="relative">
                <button
                  type="button"
                  onClick={() =>
                    setActiveCardMenu(
                      activeCardMenu ===
                        card.id
                        ? null
                        : card.id,
                    )
                  }
                  className="rounded-lg p-2 text-muted-foreground transition hover:bg-white hover:text-forest"
                  aria-label="Card actions"
                >
                  <MoreHorizontal
                    size={20}
                  />
                </button>

                {activeCardMenu ===
                  card.id && (
                  <div className="absolute right-0 top-11 z-30 w-44 rounded-xl border border-border bg-white p-2 shadow-xl">
                    <button
                      type="button"
                      onClick={() =>
                        openEditCard(card)
                      }
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm hover:bg-muted"
                    >
                      <CreditCard className="h-4 w-4" />
                      Edit Card
                    </button>

                    {!card.isDefault && (
                      <button
                        type="button"
                        onClick={() =>
                          setDefaultCard(
                            card.id,
                          )
                        }
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm hover:bg-muted"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        Set Default
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() =>
                        removeCard(card.id)
                      }
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                      Remove Card
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {wallet.cards.length === 0 && (
            <div className="rounded-2xl border border-dashed border-border px-6 py-10 text-center">
              <CreditCard className="mx-auto h-9 w-9 text-muted-foreground" />

              <h3 className="mt-3 font-semibold text-forest">
                No payment cards
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Add a card to top up your
                wallet.
              </p>

              <Button
                type="button"
                onClick={openAddCard}
                className="mt-4 bg-forest text-white hover:bg-forest/90"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Card
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-white p-4 shadow-sm sm:p-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-xl font-bold text-forest">
              Recent Transactions
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Your latest wallet activity
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="flex items-center gap-2 rounded-xl border border-border bg-[#faf8f1] px-3 py-2">
              <Search className="h-4 w-4 text-muted-foreground" />

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value,
                  )
                }
                placeholder="Search..."
                className="w-full bg-transparent text-sm outline-none sm:w-40"
              />

              {search && (
                <button
                  type="button"
                  onClick={() =>
                    setSearch("")
                  }
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              )}
            </div>

            <select
              value={transactionFilter}
              onChange={(event) =>
                setTransactionFilter(
                  event.target.value,
                )
              }
              className="h-10 rounded-xl border border-border bg-[#faf8f1] px-3 text-sm outline-none"
            >
              <option value="All">
                All Transactions
              </option>

              <option value="credit">
                Money Added
              </option>

              <option value="debit">
                Money Spent
              </option>
            </select>
          </div>
        </div>

        <div className="mt-5 divide-y divide-border">
          {filteredTransactions.map(
            (transaction) => (
              <button
                key={transaction.id}
                type="button"
                onClick={() =>
                  openTransaction(
                    transaction,
                  )
                }
                className="flex w-full items-center justify-between gap-4 py-4 text-left transition first:pt-0 last:pb-0 hover:opacity-80"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                      transaction.type ===
                      "credit"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {transaction.type ===
                    "credit" ? (
                      <ArrowDownLeft size={18} />
                    ) : (
                      <ArrowUpRight size={18} />
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate font-medium text-forest">
                      {transaction.title}
                    </p>

                    <p className="truncate text-xs text-muted-foreground">
                      {
                        transaction.description
                      }{" "}
                      · {transaction.date}
                    </p>
                  </div>
                </div>

                <p
                  className={`shrink-0 font-semibold ${
                    transaction.type ===
                    "credit"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {transaction.type ===
                  "credit"
                    ? "+"
                    : "-"}
                  $
                  {transaction.amount.toFixed(
                    2,
                  )}
                </p>
              </button>
            ),
          )}

          {filteredTransactions.length ===
            0 && (
            <div className="py-12 text-center">
              <WalletCards className="mx-auto h-10 w-10 text-muted-foreground" />

              <h3 className="mt-3 font-semibold text-forest">
                No transactions found
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Change your search or
                transaction filter.
              </p>
            </div>
          )}
        </div>
      </div>

      <Dialog
        open={addMoneyOpen}
        onOpenChange={setAddMoneyOpen}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl text-forest">
              Add Money
            </DialogTitle>
          </DialogHeader>

          <form
            onSubmit={handleAddMoney}
            className="space-y-5"
          >
            <div>
              <Label htmlFor="add-amount">
                Amount
              </Label>

              <Input
                id="add-amount"
                type="number"
                min="1"
                max="10000"
                step="0.01"
                value={addAmount}
                onChange={(event) =>
                  setAddAmount(
                    event.target.value,
                  )
                }
                placeholder="Enter amount"
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[100, 500, 1000].map(
                (amount) => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() =>
                      setAddAmount(
                        String(amount),
                      )
                    }
                    className="rounded-xl border border-border px-3 py-2 text-sm font-semibold text-forest hover:bg-forest hover:text-white"
                  >
                    ${amount}
                  </button>
                ),
              )}
            </div>

            <div className="rounded-xl border border-border bg-[#faf8f1] p-4 text-sm">
              <p className="font-semibold text-forest">
                Payment method
              </p>

              <p className="mt-1 text-muted-foreground">
                {wallet.cards[0]
                  ? `${
                      wallet.cards[0]
                        .cardType
                    } ending in ${getLastFourDigits(
                      wallet.cards[0]
                        .cardNumber,
                    )}`
                  : "No saved card"}
              </p>
            </div>

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  setAddMoneyOpen(false)
                }
              >
                Cancel
              </Button>

              <Button
                type="submit"
                className="bg-forest text-white hover:bg-forest/90"
              >
                Add Money
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={sendMoneyOpen}
        onOpenChange={setSendMoneyOpen}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl text-forest">
              Send Money
            </DialogTitle>
          </DialogHeader>

          <form
            onSubmit={handleSendMoney}
            className="space-y-5"
          >
            <div className="rounded-xl bg-forest/10 p-4">
              <p className="text-xs text-muted-foreground">
                Available balance
              </p>

              <p className="mt-1 text-xl font-bold text-forest">
                $
                {wallet.balance.toFixed(2)}
              </p>
            </div>

            <div>
              <Label htmlFor="recipient">
                Recipient
              </Label>

              <Input
                id="recipient"
                value={recipient}
                onChange={(event) =>
                  setRecipient(
                    event.target.value,
                  )
                }
                placeholder="Name, email or wallet ID"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="send-amount">
                Amount
              </Label>

              <Input
                id="send-amount"
                type="number"
                min="1"
                step="0.01"
                value={sendAmount}
                onChange={(event) =>
                  setSendAmount(
                    event.target.value,
                  )
                }
                placeholder="Enter amount"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="send-note">
                Note
              </Label>

              <Input
                id="send-note"
                value={sendNote}
                onChange={(event) =>
                  setSendNote(
                    event.target.value,
                  )
                }
                placeholder="Optional payment note"
                className="mt-1"
              />
            </div>

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  setSendMoneyOpen(false)
                }
              >
                Cancel
              </Button>

              <Button
                type="submit"
                className="bg-forest text-white hover:bg-forest/90"
              >
                Send Money
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={cardOpen}
        onOpenChange={setCardOpen}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl text-forest">
              {editingCardId
                ? "Edit Card"
                : "Add Payment Card"}
            </DialogTitle>
          </DialogHeader>

          <form
            onSubmit={saveCard}
            className="space-y-5"
          >
            <div>
              <Label htmlFor="cardholder-name">
                Cardholder name
              </Label>

              <Input
                id="cardholder-name"
                value={cardholderName}
                onChange={(event) =>
                  setCardholderName(
                    event.target.value,
                  )
                }
                placeholder="Name on card"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="wallet-card-number">
                Card number
              </Label>

              <Input
                id="wallet-card-number"
                inputMode="numeric"
                value={cardNumber}
                onChange={(event) =>
                  setCardNumber(
                    event.target.value
                      .replace(/\D/g, "")
                      .slice(0, 19),
                  )
                }
                placeholder="4242424242424242"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="card-expiry">
                Expiry date
              </Label>

              <Input
                id="card-expiry"
                value={cardExpiry}
                onChange={(event) =>
                  setCardExpiry(
                    formatExpiry(
                      event.target.value,
                    ),
                  )
                }
                placeholder="MM/YY"
                maxLength={5}
                className="mt-1"
              />
            </div>

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  setCardOpen(false)
                }
              >
                Cancel
              </Button>

              <Button
                type="submit"
                className="bg-forest text-white hover:bg-forest/90"
              >
                {editingCardId
                  ? "Update Card"
                  : "Add Card"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={transactionOpen}
        onOpenChange={setTransactionOpen}
      >
        <DialogContent className="max-w-md">
          {selectedTransaction && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-2xl text-forest">
                  Transaction Details
                </DialogTitle>
              </DialogHeader>

              <div className="rounded-2xl border border-border bg-[#faf8f1] p-5">
                <div
                  className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full ${
                    selectedTransaction.type ===
                    "credit"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {selectedTransaction.type ===
                  "credit" ? (
                    <ArrowDownLeft className="h-6 w-6" />
                  ) : (
                    <ArrowUpRight className="h-6 w-6" />
                  )}
                </div>

                <p className="mt-4 text-center text-lg font-bold text-forest">
                  {
                    selectedTransaction.title
                  }
                </p>

                <p
                  className={`mt-2 text-center text-3xl font-bold ${
                    selectedTransaction.type ===
                    "credit"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {selectedTransaction.type ===
                  "credit"
                    ? "+"
                    : "-"}
                  $
                  {selectedTransaction.amount.toFixed(
                    2,
                  )}
                </p>

                <div className="mt-6 space-y-4">
                  <TransactionField
                    label="Transaction ID"
                    value={
                      selectedTransaction.id
                    }
                  />

                  <TransactionField
                    label="Description"
                    value={
                      selectedTransaction.description
                    }
                  />

                  <TransactionField
                    label="Date"
                    value={
                      selectedTransaction.date
                    }
                  />

                  <TransactionField
                    label="Status"
                    value={
                      selectedTransaction.status
                    }
                  />
                </div>
              </div>

              <Button
                type="button"
                onClick={() =>
                  setTransactionOpen(false)
                }
                className="w-full bg-forest text-white hover:bg-forest/90"
              >
                Close
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function getLastFourDigits(
  cardNumber: string,
) {
  const cleaned =
    cardNumber.replace(/\D/g, "");

  return cleaned.slice(-4);
}

function detectCardType(
  cardNumber: string,
) {
  if (cardNumber.startsWith("4")) {
    return "Visa";
  }

  if (
    /^5[1-5]/.test(cardNumber)
  ) {
    return "Mastercard";
  }

  if (/^3[47]/.test(cardNumber)) {
    return "American Express";
  }

  return "Card";
}

function formatExpiry(value: string) {
  const digits = value
    .replace(/\D/g, "")
    .slice(0, 4);

  if (digits.length <= 2) {
    return digits;
  }

  return `${digits.slice(
    0,
    2,
  )}/${digits.slice(2)}`;
}

function TransactionField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-border pb-3 last:border-0 last:pb-0">
      <p className="text-sm text-muted-foreground">
        {label}
      </p>

      <p className="text-right text-sm font-semibold text-forest">
        {value}
      </p>
    </div>
  );
}