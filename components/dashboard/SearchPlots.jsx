import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SearchPlots({ searchTerm, setSearchTerm, filteredPlots }) {
  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Search Plots</CardTitle>
        <CardDescription>Find available plots quickly</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2">
          <Input
            placeholder="Search by plot number or type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button>Search</Button>
        </div>
        <ul>
          {filteredPlots.map((plot) => (
            <li key={plot.id}>
              {plot.name} - {plot.size} Marla
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
