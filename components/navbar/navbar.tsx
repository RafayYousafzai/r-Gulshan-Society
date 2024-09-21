import { Input, Link, Navbar, NavbarContent } from "@nextui-org/react";
import { FeedbackIcon } from "../icons/navbar/feedback-icon";
import { GithubIcon } from "../icons/navbar/github-icon";
import { BurguerButton } from "./burguer-button";
import Search from "./Search";

interface Props {
  children: React.ReactNode;
}

export const NavbarWrapper = ({ children }: Props) => {
  return (
    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <Navbar
        isBordered
        className="w-full"
        classNames={{
          wrapper: "w-full max-w-full",
        }}
      >
        <NavbarContent className="md:hidden">
          <BurguerButton />
        </NavbarContent>
        <NavbarContent className="w-full max-md:hidden">
          <Search />
        </NavbarContent>
        <NavbarContent
          justify="end"
          className="w-fit data-[justify=end]:flex-grow-0"
        >
          <div className="flex items-center gap-2 max-md:hidden">
            <Link href="https://github.com/RafayYousafzai/r-Gulshan-Society/issues">
              <FeedbackIcon />
              <span>Feedback?</span>
            </Link>
          </div>

          <Link href="https://github.com/RafayYousafzai" target={"_blank"}>
            <GithubIcon />
          </Link>
        </NavbarContent>
      </Navbar>
      {children}
    </div>
  );
};
