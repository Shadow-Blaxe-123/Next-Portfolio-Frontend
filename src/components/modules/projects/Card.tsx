import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ForwardIcon } from "lucide-react";

async function ProjectCard() {
  const res = await fetch(
    "https://next-portfolio-backend-zeta.vercel.app/api/v1/projects/get-all"
  );
  console.log(await res.json());
  return (
    <div className="grid md:grid-cols-3 gap-10 mx-auto">
      <Card className="w-full max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Project Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
          <CardAction>
            <ForwardIcon />
          </CardAction>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
}
export default ProjectCard;
