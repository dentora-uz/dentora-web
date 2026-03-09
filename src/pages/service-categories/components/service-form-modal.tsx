import { AnimatedModalForm } from "@/components/custom/animated-modal-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { IconServicemark } from "@tabler/icons-react";
import { Globe, Languages } from "lucide-react";
import { ServiceCategoryType } from "@/types/service-categories";
import { useForm, UseFormRegister } from "react-hook-form";
import { toast } from "react-toastify";
import { useLang } from "@/hooks/use-lang";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postServiceCategories } from "@/server/service-categories";
import { useRef } from "react";

function FieldGroup({
  nameLabel,
  namePlaceholder,
  lang,
  descLabel,
  descPlaceholder,
  register,
}: {
  nameLabel: string;
  namePlaceholder: string;
  lang: "uz" | "ru" | "en";
  descLabel: string;
  register: UseFormRegister<ServiceCategoryType>;
  descPlaceholder: string;
}) {
  return (
    <div className="flex flex-col gap-4 py-4">
      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
          {nameLabel}
        </label>
        <Input
          placeholder={namePlaceholder}
          {...register(`name.${lang}`)}
          className="
              border border-blue-200 dark:border-neutral-700
              bg-blue-50/50 dark:bg-neutral-900
              text-gray-800 dark:text-gray-100
              placeholder:text-gray-400 dark:placeholder:text-gray-600
              focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600
              rounded-lg transition-all duration-200
            "
        />
      </div>

      {/* Description */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
          {descLabel}
        </label>
        <textarea
          rows={3}
          {...register(`description.${lang}`)}
          placeholder={descPlaceholder}
          className="
              w-full rounded-lg border border-blue-200 dark:border-neutral-700
              bg-blue-50/50 dark:bg-neutral-900
              text-gray-800 dark:text-gray-100
              placeholder:text-gray-400 dark:placeholder:text-gray-600
              focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600
              px-3 py-2 text-sm resize-none transition-all duration-200
            "
        />
      </div>
    </div>
  );
}

export function ServiceFormModal() {
  const { register, handleSubmit, reset, setValue, watch } =
    useForm<ServiceCategoryType>({
      defaultValues: { active: true },
    });
  const setOpenRef = useRef<((open: boolean) => void) | null>(null);
  const queryClient = useQueryClient(); // ✅

  const { t } = useLang();
  const m = t.service_categories.modal;
  const { mutate, isPending } = useMutation({
    mutationFn: postServiceCategories,
    onSuccess: (res) => {
      toast.success(res.message);
      reset();
      setOpenRef.current?.(false);
      queryClient.invalidateQueries({ queryKey: ["service-ctgs"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  function onSubmit(data: ServiceCategoryType) {
    mutate(data); // ✅ console.log o'rniga mutate
  }
  return (
    <AnimatedModalForm
      formId="service-form"
      isPending={isPending}
      text={t.service_categories.create_service}
      icon={<IconServicemark />}
      onSave={(setOpen) => {
        setOpenRef.current = setOpen;
      }}
    >
      <form id="service-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          {/* Modal title */}
          <div className="flex items-center justify-between mb-1">
            {" "}
            {/* ✅ justify-between */}
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-blue-100 dark:bg-blue-900/40">
                <Languages className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h2 className="text-base font-bold text-gray-800 dark:text-white leading-tight">
                  {m.title}
                </h2>
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  {m.subtitle}
                </p>
              </div>
            </div>
            {/* ✅ Active/Inactive switch */}
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "text-xs font-semibold transition-colors duration-200",
                  watch("active")
                    ? "text-emerald-500 dark:text-emerald-400"
                    : "text-gray-400 dark:text-gray-600",
                )}
              >
                {watch("active") ? t.common.active : t.common.inactive}
              </span>
              <Switch
                checked={watch("active")}
                onCheckedChange={(val) => setValue("active", val)}
                className="data-[state=checked]:bg-emerald-500"
              />
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="uz" className="flex flex-col">
            <TabsList className="w-full grid grid-cols-3 bg-blue-50 dark:bg-neutral-800 rounded-lg p-1">
              <TabsTrigger
                value="uz"
                className="
                  sm:col-span-1
                  col-span-3
                  flex items-center gap-1.5 text-sm font-medium
                  data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-700
                  data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400
                  data-[state=active]:shadow-sm
                  rounded-md transition-all duration-200
                "
              >
                <Globe className="w-3.5 h-3.5" />
                {m.tab_uz}
              </TabsTrigger>
              <TabsTrigger
                value="en"
                className="
                  sm:col-span-1
                  col-span-3
                  flex items-center gap-1.5 text-sm font-medium
                  data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-700
                  data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400
                  data-[state=active]:shadow-sm
                  rounded-md transition-all duration-200
                "
              >
                <Globe className="w-3.5 h-3.5" />
                {m.tab_en}
              </TabsTrigger>
              <TabsTrigger
                value="ru"
                className="
                  sm:col-span-1
                  col-span-3
                  flex items-center gap-1.5 text-sm font-medium
                  data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-700
                  data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400
                  data-[state=active]:shadow-sm
                  rounded-md transition-all duration-200
                "
              >
                <Globe className="w-3.5 h-3.5" />
                {m.tab_ru}
              </TabsTrigger>
            </TabsList>

            {/* UZ */}
            <TabsContent value="uz" className="mt-0">
              <FieldGroup
                register={register}
                nameLabel={m.name_label_uz}
                namePlaceholder={m.name_placeholder_uz}
                descLabel={m.desc_label_uz}
                descPlaceholder={m.desc_placeholder_uz}
                lang="uz"
              />
            </TabsContent>

            {/* ENG */}
            <TabsContent value="en" className="mt-0">
              <FieldGroup
                nameLabel={m.name_label_en}
                namePlaceholder={m.name_placeholder_en}
                descLabel={m.desc_label_en}
                descPlaceholder={m.desc_placeholder_en}
                lang="en"
                register={register}
              />
            </TabsContent>
            {/* ENG */}
            <TabsContent value="ru" className="mt-0">
              <FieldGroup
                nameLabel={m.name_label_ru}
                namePlaceholder={m.name_placeholder_ru}
                descLabel={m.desc_label_ru}
                descPlaceholder={m.desc_placeholder_ru}
                lang="ru"
                register={register}
              />
            </TabsContent>
          </Tabs>
        </div>
      </form>
    </AnimatedModalForm>
  );
}
