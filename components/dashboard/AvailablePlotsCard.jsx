import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AvailablePlotsCard({ plots }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Available Plots</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold">{plots?.length || 0}</div>
        <p className="text-muted-foreground">-3% from last month</p>
      </CardContent>
    </Card>
  );
}
