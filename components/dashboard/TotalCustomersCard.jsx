import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TotalCustomersCard({ customers }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Customers</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold">{customers?.length || 0}</div>
        <p className="text-muted-foreground">+2% from last month</p>
      </CardContent>
    </Card>
  );
}
