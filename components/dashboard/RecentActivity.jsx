import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, HomeIcon, UserIcon } from "lucide-react";

export default function Component({ recentActivity }) {
  return (
    <Card className="w-full col-span-2">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recentActivity.map((activity) => (
            <li key={activity.id} className="group">
              <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-primary p-2 transition-transform duration-300 group-hover:scale-110">
                      {activity.action.includes("booking") && (
                        <CalendarIcon
                          className="h-5 w-5 text-primary-foreground"
                          aria-hidden="true"
                        />
                      )}
                      {activity.action.includes("registration") && (
                        <UserIcon
                          className="h-5 w-5 text-primary-foreground"
                          aria-hidden="true"
                        />
                      )}
                      {activity.action.includes("plot") && (
                        <HomeIcon
                          className="h-5 w-5 text-primary-foreground"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="font-medium text-sm">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">
                        {activity.customer || activity.plot}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {activity.date}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
