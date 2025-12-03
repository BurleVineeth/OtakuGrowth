import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Controller, useFormContext } from "react-hook-form";

export default function EnergyPatternField({ inputClass }: { inputClass: string }) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col">
      <Controller
        name="energyPattern"
        control={control}
        rules={{ required: "Energy is required" }}
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger className={`h-full select ${inputClass}`}>
              <SelectValue placeholder="Energy pattern" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="morning">Morning person</SelectItem>
              <SelectItem value="afternoon">Afternoon</SelectItem>
              <SelectItem value="evening">Evening</SelectItem>
              <SelectItem value="variable">Variable</SelectItem>
            </SelectContent>
          </Select>
        )}
      />

      {typeof errors.energyPattern?.message === "string" && (
        <span className="mt-1 text-xs text-[var(--error)]">{errors.energyPattern.message}</span>
      )}
    </div>
  );
}
