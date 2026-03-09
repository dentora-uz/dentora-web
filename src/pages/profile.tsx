import { Scleton } from "@/components/custom/scleton";
import { useQuery } from "@tanstack/react-query";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  User,
  Mail,
  Phone,
  Shield,
  CheckCircle,
  Calendar,
  AtSign,
} from "lucide-react";
import { getMe } from "@/server/auth";
import { useLang } from "@/hooks/use-lang";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" },
  }),
};

interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  index: number;
}

function InfoRow({ icon, label, value, index }: InfoRowProps) {
  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className={cn(
        "flex items-center gap-4 px-5 py-4 rounded-xl",
        "bg-blue-50 dark:bg-neutral-900",
        "border border-blue-100 dark:border-neutral-800",
        "hover:border-blue-300 dark:hover:border-blue-700",
        "transition-all duration-300 group",
      )}
    >
      <div className="text-blue-400 dark:text-blue-500 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-xs text-blue-400 dark:text-neutral-500 font-medium uppercase tracking-widest">
          {label}
        </span>
        <span className="text-sm font-semibold text-blue-900 dark:text-neutral-100 mt-0.5">
          {value}
        </span>
      </div>
    </motion.div>
  );
}

export function Profile() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });
  const { t, lang } = useLang(); // ✅
  const p = t.profile;

  if (isLoading) return <Scleton />;
  if (isError)
    return <h1 className="text-red-500 text-center mt-20">{p.error}</h1>;

  const user = data?.data;
  const joinedDate = new Date(user.createdAt).toLocaleDateString(
    lang === "uz" ? "uz-UZ" : lang === "ru" ? "ru-RU" : "en-US", // ✅ tilga qarab format
    { year: "numeric", month: "long", day: "numeric" },
  );

  const initials = `${user.firstName[0]}${user.lastName[0]}`;

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 flex items-start justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "w-full max-w-lg rounded-2xl overflow-hidden",
          "border border-blue-100 dark:border-neutral-800",
          "shadow-xl shadow-blue-100/40 dark:shadow-none",
          "bg-white dark:bg-neutral-900",
        )}
      >
        {/* Avatar */}
        <div className="flex flex-col items-center mt-8 px-6">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className={cn(
              "w-24 h-24 rounded-2xl flex items-center justify-center",
              "bg-gradient-to-br from-blue-400 to-blue-600",
              "text-white text-3xl font-bold",
              "border-4 border-white dark:border-neutral-900",
              "shadow-lg shadow-blue-200 dark:shadow-blue-900/50",
            )}
          >
            {initials}
          </motion.div>
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-4 text-center"
          >
            <h1 className="text-2xl font-bold text-blue-900 dark:text-white tracking-tight">
              {user.fullName}
            </h1>
            <div className="flex items-center justify-center gap-2 mt-1">
              <span
                className={cn(
                  "text-xs font-semibold px-3 py-1 rounded-full",
                  "bg-blue-100 dark:bg-blue-900/40",
                  "text-blue-600 dark:text-blue-400",
                  "border border-blue-200 dark:border-blue-800",
                )}
              >
                {user.roleName}
              </span>
              {user.active && (
                <span className="flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 px-3 py-1 rounded-full">
                  <CheckCircle size={11} />
                  {p.active}
                </span>
              )}
            </div>
          </motion.div>
        </div>

        {/* Info rows */}
        <div className="px-6 pb-8 mt-6 grid grid-cols-1 gap-3">
          <InfoRow
            icon={<AtSign size={18} />}
            label={p.username}
            value={`@${user.username}`}
            index={1}
          />
          <InfoRow
            icon={<Mail size={18} />}
            label={p.email}
            value={user.email}
            index={2}
          />
          <InfoRow
            icon={<Phone size={18} />}
            label={p.phone}
            value={user.phone}
            index={3}
          />
          <InfoRow
            icon={<Shield size={18} />}
            label={p.role}
            value={user.role}
            index={4}
          />
          <InfoRow
            icon={<User size={18} />}
            label={p.full_name}
            value={user.fullName}
            index={5}
          />
          <InfoRow
            icon={<Calendar size={18} />}
            label={p.joined}
            value={joinedDate}
            index={6}
          />
        </div>
      </motion.div>
    </div>
  );
}
