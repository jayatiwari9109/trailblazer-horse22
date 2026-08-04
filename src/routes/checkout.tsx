import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { CreditCard, Landmark, Wallet, Smartphone, ShieldCheck, Lock } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trails } from "@/lib/data";
import { useState } from "react";


export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [{ title: "Checkout — Horse Trails" }, { name: "robots", content: "noindex" }],
  }),
  component: Checkout,
});

function Checkout() {
  const t = trails[0];
  const subtotal = t.price * 2;
  const tax = subtotal * 0.09;
  const total = subtotal + tax;
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");

  return (
    <SiteLayout>
      <section className="container-wide">
        <div className="mb-6 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-forest">Home</Link> · <Link to="/trails" className="hover:text-forest">Trails</Link> · <span className="text-forest">Checkout</span>
        </div>
        <h1 className="font-display text-4xl font-bold text-forest md:text-5xl">Checkout</h1>
        <p className="mt-2 text-muted-foreground">Almost there — a few details and you're saddled up.</p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_400px]">
          <div className="space-y-6">
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-3xl p-6">
              <h2 className="font-display text-xl font-bold text-forest">Customer information</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {/* <div><Label>Full name</Label><Input className="mt-1 bg-card" placeholder="Elena Marchetti" /></div> */}
                <div>
                  <Label>Full name</Label>
                  <Input
                    className="mt-1 bg-card"
                    placeholder="Elena Marchetti"
                    value={fullName}
                    onChange={(e) =>
                      setFullName(
                        e.target.value.replace(/[^A-Za-z\s]/g, "")
                      )
                    }
                  />
                </div>

                <div>
                  <Label>Email</Label>
                  <Input
                    className="mt-1 bg-card"
                    type="email"
                    placeholder="you@email.com"
                  />
                </div>

                <div>
                  <Label>Phone</Label>
                  <Input
                    className="mt-1 bg-card"
                    placeholder="+1 415 555 0140"
                    value={phone}
                    maxLength={10}
                    onChange={(e) =>
                      setPhone(e.target.value.replace(/\D/g, ""))
                    }
                  />
                </div>

                <div>
                  <Label>Emergency contact</Label>
                  <Input
                    className="mt-1 bg-card"
                    maxLength={10}
                    placeholder="9876543210"
                    onInput={(e) => {
                      e.currentTarget.value =
                        e.currentTarget.value.replace(/\D/g, "");
                    }}
                  />
                </div>

                <div className="sm:col-span-2">
                  <Label>Address</Label>
                  <Input
                    className="mt-1 bg-card"
                    placeholder="Street, city, country"
                  />
                </div>

                <div>
                  <Label>Nationality</Label>
                  <Select>
                    <SelectTrigger className="mt-1 bg-card">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>

                    <SelectContent>
                      {[
                        "USA",
                        "UK",
                        "Canada",
                        "Italy",
                        "Japan",
                        "Australia",
                        "Other",
                      ].map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>ID Proof</Label>

                  <Select>
                    <SelectTrigger className="mt-1 bg-card">
                      <SelectValue placeholder="Select ID Proof" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="passport">
                        Passport
                      </SelectItem>

                      <SelectItem value="driving-license">
                        Driving License
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {/* <div><Label>ID proof (upload)</Label><Input className="mt-1 bg-card" type="file" /></div> */}
              </div>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="glass rounded-3xl p-6">
              <h2 className="font-display text-xl font-bold text-forest">Medical & experience</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <Label>Experience level</Label>
                  <Select><SelectTrigger className="mt-1 bg-card"><SelectValue placeholder="Choose one" /></SelectTrigger>
                    <SelectContent>{["Beginner", "Intermediate", "Advanced", "Expert"].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div><Label>Weight (kg)</Label><Input className="mt-1 bg-card" type="number" placeholder="70" /></div>
                <div className="sm:col-span-2"><Label>Medical information</Label><Textarea rows={3} className="mt-1 bg-card" placeholder="Allergies, injuries, medications..." /></div>
                <div className="sm:col-span-2"><Label>Special requests</Label><Textarea rows={2} className="mt-1 bg-card" placeholder="Anniversary, dietary needs, etc." /></div>
              </div>
              <label className="mt-4 flex items-center gap-2 text-sm"><input type="checkbox" className="rounded" /> I accept the terms, safety waiver, and cancellation policy.</label>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass rounded-3xl p-6">
              <h2 className="font-display text-xl font-bold text-forest">Payment</h2>
              <Tabs defaultValue="card" className="mt-4">
                <TabsList className="grid grid-cols-4 rounded-full">
                  <TabsTrigger value="card" className="gap-1.5 rounded-full"><CreditCard className="h-4 w-4" />Card</TabsTrigger>
                  <TabsTrigger value="upi" className="gap-1.5 rounded-full"><Smartphone className="h-4 w-4" />UPI</TabsTrigger>
                  <TabsTrigger value="net" className="gap-1.5 rounded-full"><Landmark className="h-4 w-4" />Bank</TabsTrigger>
                  <TabsTrigger value="wallet" className="gap-1.5 rounded-full"><Wallet className="h-4 w-4" />Wallet</TabsTrigger>
                </TabsList>
                <TabsContent value="card" className="mt-5 grid gap-4 sm:grid-cols-2">

                  {/* Cardholder Name */}
                  <div className="sm:col-span-2">
                    <Label>Cardholder name</Label>
                    <Input
                      className="mt-1 bg-card"
                      placeholder="Name on card"
                      value={cardHolderName}
                      onChange={(e) =>
                        setCardHolderName(
                          e.target.value.replace(/[^A-Za-z\s]/g, "")
                        )
                      }
                    />
                  </div>

                  {/* Card Number */}
                  <div className="sm:col-span-2">
                    <Label>Card number</Label>
                    <Input
                      className="mt-1 bg-card"
                      placeholder="1234567812345678"
                      value={cardNumber}
                      maxLength={16}
                      onChange={(e) =>
                        setCardNumber(
                          e.target.value.replace(/\D/g, "")
                        )
                      }
                    />
                  </div>

                  {/* Expiry */}
                  <div>
                    <Label>Expiry</Label>
                    <Input
                      className="mt-1 bg-card"
                      placeholder="MMYY"
                      value={expiry}
                      maxLength={4}
                      onChange={(e) =>
                        setExpiry(
                          e.target.value.replace(/\D/g, "")
                        )
                      }
                    />
                  </div>

                  {/* CVC */}
                  <div>
                    <Label>CVC</Label>
                    <Input
                      className="mt-1 bg-card"
                      placeholder="123"
                      value={cvc}
                      maxLength={3}
                      onChange={(e) =>
                        setCvc(
                          e.target.value.replace(/\D/g, "")
                        )
                      }
                    />
                  </div>

                  <div className="sm:col-span-2 flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Lock className="h-3.5 w-3.5" />
                      256-bit encryption
                    </span>
                    <span>Powered by Stripe · Razorpay</span>
                  </div>

                </TabsContent>
                <TabsContent value="upi" className="mt-5"><Label>UPI ID</Label><Input className="mt-1 bg-card" placeholder="you@bank" /></TabsContent>
                <TabsContent value="net" className="mt-5"><Label>Bank</Label>
                  <Select><SelectTrigger className="mt-1 bg-card"><SelectValue placeholder="Select bank" /></SelectTrigger>
                    <SelectContent>{["Chase", "HSBC", "Barclays", "BofA", "ING"].map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}</SelectContent>
                  </Select>
                </TabsContent>
                <TabsContent value="wallet" className="mt-5 grid grid-cols-2 gap-2">
                  {["Apple Pay", "Google Pay", "Paytm", "PayPal"].map(w => <Button key={w} variant="outline">{w}</Button>)}
                </TabsContent>
              </Tabs>

              {/* <Button size="lg" className="mt-6 w-full gap-2 bg-forest text-forest-foreground shadow-glow hover:bg-forest/90"> */}
              <Button
                size="lg"
                className="mt-6 w-full gap-2 bg-forest text-forest-foreground shadow-glow hover:bg-forest/90"
                // onClick={() => {
                //   if (!fullName.trim()) {
                //     alert("Please enter full name");
                //     return;
                //   }

                //   if (phone.length !== 10) {
                //     alert("Please enter valid phone number");
                //     return;
                //   }

                //   if (cardNumber.length !== 16) {
                //     alert("Please enter valid 16 digit card number");
                //     return;
                //   }

                //   alert("Payment Successful");
                // }}
                onClick={() => {
                  if (!fullName.trim()) {
                    alert("Please enter full name");
                    return;
                  }

                  if (phone.length !== 10) {
                    alert("Please enter valid phone number");
                    return;
                  }

                  if (!cardHolderName.trim()) {
                    alert("Please enter cardholder name");
                    return;
                  }

                  if (cardNumber.length !== 16) {
                    alert("Please enter valid 16 digit card number");
                    return;
                  }

                  if (expiry.length !== 4) {
                    alert("Please enter valid expiry (MMYY)");
                    return;
                  }

                  if (cvc.length !== 3) {
                    alert("Please enter valid 3 digit CVC");
                    return;
                  }

                  alert("Payment Successful");
                }}
              >
                <ShieldCheck className="h-4 w-4" />
                Pay ${total.toFixed(2)} securely
              </Button>
            </motion.section>
          </div>

          <aside>
            <div className="glass sticky top-28 rounded-3xl p-6">
              <div className="font-display text-lg font-bold text-forest">Booking summary</div>
              <div className="mt-4 flex gap-3">
                <img src={t.image} alt="" className="h-20 w-20 rounded-2xl object-cover" />
                <div>
                  <div className="font-semibold text-forest">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.location}</div>
                  <div className="text-xs text-muted-foreground">{t.duration} · 2 adults</div>
                </div>
              </div>
              <div className="mt-6 space-y-1 border-t border-border/60 pt-4 text-sm">
                <Line label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
                <Line label="Booking amount (30%)" value={`$${(total * 0.3).toFixed(2)}`} />
                <Line label="Remaining at ranch" value={`$${(total * 0.7).toFixed(2)}`} muted />
                <Line label="Taxes" value={`$${tax.toFixed(2)}`} />
                <Line label="Coupon" value="—" muted />
                <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-3 font-display text-lg font-bold text-forest">
                  <span>Grand total</span><span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </SiteLayout>
  );
}

function Line({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return <div className={`flex justify-between ${muted ? "text-muted-foreground" : ""}`}><span>{label}</span><span>{value}</span></div>;
}
