import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Main } from "@/components/main";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormValues, formSchema } from "@/validators/auht";
import { useDispatch } from "react-redux";
import { login } from "@/stores/auth";
import { v4 as token } from "uuid";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Card, CardContent } from "@/components/ui/card";
import { ShowPassword } from "./components/show-pwd-btn";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Page() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();
  // const [showAlert, setShowAlert] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const allUserData = Cookie.get();
  const onSubmit = (values: FormValues) => {
    if (Object.keys(allUserData).length === 0) {
      toast({
        title: "Login Failed",
        description: "You haven't create account yet",
        className: "border-red-500 text-red-500",
        duration: 2000,
      });
      return;
    }

    let foundData = false;
    for (const key in allUserData) {
      if (key.startsWith("email") && allUserData[key] === values.email) {
        const passwordKey = key.replace("email", "password");
        if (allUserData[passwordKey] === values.password) {
          foundData = true;
          break;
        }
      }
    }
    console.log("tes");
    if (foundData) {
      dispatch(login());
      Cookie.set("token", token());
      navigate("/products");
    } else if (!foundData) {
      toast({
        title: "Login Failed",
        description: "Your data is wrong",
        className: "border-red-500 text-red-500",
        duration: 2000,
      });
    }
  };

  return (
    <Main className="relative h-[calc(100vh-28px-1.75rem-1.1rem)]">
      <Toaster />
      {/* {showAlert && (
        <Alert variant="destructive" className="w-fit mx-auto px-4 py-1 mt-0 min-[435px]:p-4">
          <AlertTitle>login Failed</AlertTitle>
          <AlertDescription>
            You may haven't create account yet or your data is wrong
          </AlertDescription>
        </Alert>
      )} */}
      <div className="max-w-[435px] w-full absolute -translate-x-1/2 -translate-y-1/2 top-[45%] left-1/2">
        <div className="px-4">
          <div className="flex mb-2 bg-slate-500 p-2 rounded-md justify-between">
            {/* <Button className="rounded-none w-[50%] bg-slate-400 hover:bg-opacity-100">
              Login
            </Button>
            <Button
              className="rounded-none w-[50%] bg-slate-500 hover:underline"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Sign Up
            </Button> */}
            <div className="w-full h-8 cursor-default">
              <h1 className="text-xl text-center text-white">Login</h1>
            </div>
          </div>
          <Card className="min-h-[300px]">
            <CardContent className="mt-5">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="shadcn" {...field} />
                        </FormControl>
                        <FormMessage className="absolute" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="space-y-0">
                        <div>
                          <FormLabel>Password</FormLabel>
                          <ShowPassword />
                          <FormControl>
                            <Input id="password" type="password" placeholder="shadcn" {...field} />
                          </FormControl>
                          <FormMessage className="absolute mt-1" />
                        </div>
                      </FormItem>
                    )}
                  />
                  <div>
                    <Button className="w-full bg-slate-700 mt-4" type="submit">
                      Submit
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Main>
  );
}
