import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, Users, Baby, Route, Clock, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export function SearchWidget({ compact = false }: { compact?: boolean }) {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [adults, setAdults] = useState("2");
  const [children, setChildren] = useState("0");
  const [type, setType] = useState("");
  const [duration, setDuration] = useState("");

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      onSubmit={(e) => {
        e.preventDefault();
        const params = new URLSearchParams({ location, date, adults, children, type, duration });
        navigate({ to: "/trails", search: Object.fromEntries(params) as never });
      }}
      className={`glass rounded-3xl p-4 shadow-elegant md:p-6 ${compact ? "" : ""}`}
    >
      <div className="grid gap-3 md:grid-cols-6">
        <Field icon={<MapPin className="h-4 w-4" />} label="Location">
          <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Aspen, Big Sur..." className="border-0 bg-transparent p-0 text-sm shadow-none focus-visible:ring-0" />
        </Field>
        <Field icon={<Calendar className="h-4 w-4" />} label="Date">
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="border-0 bg-transparent p-0 text-sm shadow-none focus-visible:ring-0" />
        </Field>
        <Field icon={<Users className="h-4 w-4" />} label="Adults">
          <Select value={adults} onValueChange={setAdults}>
            <SelectTrigger className="border-0 bg-transparent p-0 shadow-none focus:ring-0"><SelectValue /></SelectTrigger>
            <SelectContent>{[1,2,3,4,5,6,7,8].map(n => <SelectItem key={n} value={String(n)}>{n} Adult{n>1?"s":""}</SelectItem>)}</SelectContent>
          </Select>
        </Field>
        <Field icon={<Baby className="h-4 w-4" />} label="Children">
          <Select value={children} onValueChange={setChildren}>
            <SelectTrigger className="border-0 bg-transparent p-0 shadow-none focus:ring-0"><SelectValue /></SelectTrigger>
            <SelectContent>{[0,1,2,3,4,5].map(n => <SelectItem key={n} value={String(n)}>{n} Child{n===1?"":"ren"}</SelectItem>)}</SelectContent>
          </Select>
        </Field>
        <Field icon={<Route className="h-4 w-4" />} label="Trail Type">
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="border-0 bg-transparent p-0 shadow-none focus:ring-0"><SelectValue placeholder="Any" /></SelectTrigger>
            <SelectContent>
              {["Sunrise","Sunset","Family","Couple","Kids","Safari","Trekking","Camping"].map(t => <SelectItem key={t} value={t.toLowerCase()}>{t}</SelectItem>)}
            </SelectContent>
          </Select>
        </Field>
        <Field icon={<Clock className="h-4 w-4" />} label="Duration">
          <Select value={duration} onValueChange={setDuration}>
            <SelectTrigger className="border-0 bg-transparent p-0 shadow-none focus:ring-0"><SelectValue placeholder="Any" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Up to 1 hour</SelectItem>
              <SelectItem value="3">Half day</SelectItem>
              <SelectItem value="6">Full day</SelectItem>
              <SelectItem value="24">Overnight</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </div>
      <Button type="submit" className="mt-4 w-full gap-2 bg-forest text-forest-foreground shadow-glow hover:bg-forest/90 md:h-12 md:text-base">
        <Search className="h-4 w-4" /> Search Trails
      </Button>
    </motion.form>
  );
}

function Field({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card/60 px-4 py-2.5">
      <Label className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        <span className="text-forest">{icon}</span> {label}
      </Label>
      <div className="mt-1">{children}</div>
    </div>
  );
}
