import { Separator } from '@/Components/ui/separator';
import SecurityForm from './SecurityForm';

export default function SettingsSecurityPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Security & Password</h3>
        <p className="text-sm text-muted-foreground">
          Here you can update your password and security.
        </p>
      </div>
      <Separator />
      <SecurityForm />
    </div>
  );
}
