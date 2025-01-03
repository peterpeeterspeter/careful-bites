import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

export function ProfileHeader() {
  const { user } = useAuth();
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={user?.user_metadata?.avatar_url} />
          <AvatarFallback>{user?.email?.[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>{user?.email}</CardTitle>
          <p className="text-sm text-muted-foreground">Member since {new Date(user?.created_at || '').toLocaleDateString()}</p>
        </div>
      </CardHeader>
    </Card>
  );
}