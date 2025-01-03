import { DiabetesInfoFields } from "./medical/DiabetesInfoFields";
import { GlucoseMonitoringFields } from "./medical/GlucoseMonitoringFields";
import { TreatmentOptionsFields } from "./medical/TreatmentOptionsFields";

interface MedicalProfileStepProps {
  formData: any;
  handleInputChange: (field: string, value: string | boolean) => void;
}

export function MedicalProfileStep({
  formData,
  handleInputChange,
}: MedicalProfileStepProps) {
  return (
    <div className="space-y-4">
      <DiabetesInfoFields formData={formData} handleInputChange={handleInputChange} />
      <GlucoseMonitoringFields formData={formData} handleInputChange={handleInputChange} />
      <TreatmentOptionsFields formData={formData} handleInputChange={handleInputChange} />
    </div>
  );
}