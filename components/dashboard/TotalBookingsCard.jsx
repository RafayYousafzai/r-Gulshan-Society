import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TotalBookingsCard({ bookings }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Bookings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold">{bookings?.length || 0}</div>
        <p className="text-muted-foreground">+5% from last month</p>
      </CardContent>
    </Card>
  );
}
