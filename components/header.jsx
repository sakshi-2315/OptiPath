// import {
//   SignedIn,
//   SignInButton,
//   SignedOut,
//   UserButton,
//   SignUpButton,
// } from "@clerk/nextjs";

// import Link from "next/link";
// import { Button } from "./ui/button";
// import Image from "next/image";
// import {
//   ChevronDown,
//   FileTextIcon,
//   GraduationCap,
//   LayoutDashboard,
//   PenBox,
//   StarsIcon,
// } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuTrigger,
//   DropdownMenuContent,
//   DropdownMenuItem,
// } from "./ui/dropdown-menu";
// import { checkUser } from "@/lib/checkUser";

// const Header = async () => {
//   await checkUser();

//   return (
//     <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60">
//       <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
//         {/* Logo */}
//         <Link href="/">
//           <Image
//             src="/logo.png"
//             alt="optipath Logo"
//             width={300}
//             height={200}
//             priority
//           />
//         </Link>

//         {/* Right side */}
//         <div className="flex items-center space-x-2 md:space-x-4">
//           <SignedIn>
//             {/* Dashboard link */}
//             <Link href="/dashboard">
//               <Button variant="outline">
//                 <LayoutDashboard className="h-4 w-4" />
//                 <span className="hidden md:block">Industry Insights</span>
//               </Button>
//             </Link>

//             {/* Dropdown menu */}
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button>
//                   <StarsIcon className="h-4 w-4" />
//                   <span className="hidden md:block">Growth Tools</span>
//                   <ChevronDown className="h-4 w-4" />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent>
//                 <DropdownMenuItem>
//                   <Link href="/resume" className="flex items-center gap-2">
//                     <FileTextIcon className="h-4 w-4" />
//                     <span>Build Resume</span>
//                   </Link>
//                 </DropdownMenuItem>

//                 <DropdownMenuItem>
//                   <Link
//                     href="/ai-cover-letter"
//                     className="flex items-center gap-2"
//                   >
//                     <PenBox className="h-4 w-4" />
//                     <span>Cover Letter</span>
//                   </Link>
//                 </DropdownMenuItem>

//                 <DropdownMenuItem>
//                   <Link href="/interview" className="flex items-center gap-2">
//                     <GraduationCap className="h-4 w-4" />
//                     <span>Interview Prep</span>
//                   </Link>
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </SignedIn>

//           {/* Auth buttons */}
//           <SignedOut>
//             <SignInButton mode="modal" asChild>
//               <Button variant="outline">Sign In</Button>
//             </SignInButton>

//             {/* Uncomment if you also want sign-up */}
//             {/* 
//             <SignUpButton mode="modal" asChild>
//               <Button variant="outline">Sign Up</Button>
//             </SignUpButton>
//             */}
//           </SignedOut>

//           <SignedIn>
//             <UserButton
//               appearance={{
//                 elements: {
//                   avatarBox: "w-10 h-10",
//                   userButtonPopoverCard: "shadow-xl",
//                   userPreviewMainIdentifier: "font-semibold",
//                 },
//               }}
//               afterSignOutUrl="/"
//             />
//           </SignedIn>
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Header;




import {
  SignedIn,
  SignInButton,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import {
  Bot,
  ChevronDown,
  FileSearch,
  FileTextIcon,
  GraduationCap,
  LayoutDashboard,
  PenBox,
  StarsIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { checkUser } from "@/lib/checkUser";

const Header = async () => {
  await checkUser();

  return (
    <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/logo.png"
            alt="optipath Logo"
            width={160}
            height={50}
            priority
          />
        </Link>

        {/* Right side */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <SignedIn>
            {/* Dashboard link */}
            <Link href="/dashboard">
              <Button variant="outline">
                <LayoutDashboard className="h-4 w-4" />
                <span className="hidden md:block">Industry Insights</span>
              </Button>
            </Link>

            {/* Dropdown menu */}
            <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button>
      <StarsIcon className="h-4 w-4" />
      <span className="hidden md:block">Growth Tools</span>
      <ChevronDown className="h-4 w-4" />
    </Button>
  </DropdownMenuTrigger>

  <DropdownMenuContent>
    <DropdownMenuItem>
      <Link href="/resume" className="flex items-center gap-2">
        <FileTextIcon className="h-4 w-4" />
        <span>Build Resume</span>
      </Link>
    </DropdownMenuItem>

    <DropdownMenuItem>
      <Link href="/ai-cover-letter" className="flex items-center gap-2">
        <PenBox className="h-4 w-4" />
        <span>Cover Letter</span>
      </Link>
    </DropdownMenuItem>

    <DropdownMenuItem>
      <Link href="/interview" className="flex items-center gap-2">
        <GraduationCap className="h-4 w-4" />
        <span>Interview Prep</span>
      </Link>
    </DropdownMenuItem>


    {/* --- Your new tools --- */}
    <DropdownMenuItem>
      <Link href="/ai-career-chat" className="flex items-center gap-2">
      <Bot className="h-4 w-4" />
         <span>AI Career Chat</span>
      </Link>
    </DropdownMenuItem>

    <DropdownMenuItem>
      <Link href="/resume-analyzer" className="flex items-center gap-2">
      <FileSearch className="h-4 w-4" />
         <span>Resume Analyzer</span>
      </Link>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
          </SignedIn>

          {/* Auth buttons */}
          <SignedOut>
            {/* Removed asChild here ✅ */}
            <SignInButton mode="modal">
              <Button variant="outline">Sign In</Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                  userButtonPopoverCard: "shadow-xl",
                  userPreviewMainIdentifier: "font-semibold",
                },
              }}
              afterSignOutUrl="/"
            />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default Header;
