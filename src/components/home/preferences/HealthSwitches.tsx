import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface HealthSwitchesProps {
  insulinSensitive: boolean;
  lowSodium: boolean;
  kidneyFriendly: boolean;
  onInsulinSensitiveChange: (checked: boolean) => void;
  onLowSodiumChange: (checked: boolean) => void;
  onKidneyFriendlyChange: (checked: boolean) => void;
}

export function HealthSwitches({
  insulinSensitive,
  lowSodium,
  kidneyFriendly,
  onInsulinSensitiveChange,
  onLowSodiumChange,
  onKidneyFriendlyChange,
}: HealthSwitchesProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label htmlFor="insulin-sensitive">Insulin Sensitive</Label>
        <Switch 
          id="insulin-sensitive" 
          checked={insulinSensitive}
          onCheckedChange={onInsulinSensitiveChange}
        />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="low-sodium">Low Sodium Diet</Label>
        <Switch 
          id="low-sodium" 
          checked={lowSodium}
          onCheckedChange={onLowSodiumChange}
        />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="kidney-friendly">Kidney Friendly</Label>
        <Switch 
          id="kidney-friendly" 
          checked={kidneyFriendly}
          onCheckedChange={onKidneyFriendlyChange}
        />
      </div>
    </div>
  );
}