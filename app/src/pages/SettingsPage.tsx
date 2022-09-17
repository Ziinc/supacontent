import { ReactHTMLElement } from "react";
import Prose from "../components/Prose";
import { SUPABASE_API_KEY, SUPABASE_API_URL } from "../constants";

const SettingsPage = () => (
  <Prose>
    <h1>Settings</h1>

    <div className="flex flex-col gap-4 max-w-lg">
      <h4>Supabase</h4>
      <Input
        label="API Endpoint"
        description="This is the API endpoint where all client requests are sent."
        value={SUPABASE_API_URL}
        disabled
      />
      <Input
        label="API Key"
        description="The public API endpoint key."
        value={SUPABASE_API_KEY}
        disabled
      />
    </div>
  </Prose>
);

interface Props extends Partial<ReactHTMLElement<HTMLInputElement>> {
  label: string;
  description?: string;
  value?: string;
  disabled?: boolean;
}
const Input: React.FC<Props> = ({ label, description, disabled, ...props }) => (
  <div className="form-control">
    <label className="label">
      <span className="label-text">{label}</span>
    </label>
    <input
      type="text"
      className="input input-bordered w-full"
      disabled={disabled}
      {...props}
    />
    {description && (
      <label className="label">
        <span className="label-text-alt">{description}</span>
      </label>
    )}
  </div>
);

export default SettingsPage;
