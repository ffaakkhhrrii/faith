import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";

export default function Navbar() {
    const router = useRouter();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 100);
        }

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleClick = () => {
        if (scrolled) {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }else{
            router.push('/');
        }
    };


    return (
        <div className={`flex justify-center items-center mt-5 fixed right-0 left-0 z-70`}>
            <nav className={`rounded-4xl px-4 py-2 ${scrolled ? 'bg-black' : 'bg-white '} cursor-pointer`} onClick={handleClick}>
                <div className="flex justify-center items-center relative">
                    <div className="flex">
                        {
                            scrolled ? (
                                <IoIosArrowUp className="text-[#40E0D0] text-2xl" />
                            ) : (
                                <>
                                    <svg className="h-12 rotate-40" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgba(65,225,208,1)"><path d="M11.3807 2.01886C9.91573 3.38768 9 5.3369 9 7.49999C9 11.6421 12.3579 15 16.5 15C18.6631 15 20.6123 14.0843 21.9811 12.6193C21.6613 17.8537 17.3149 22 12 22C6.47715 22 2 17.5228 2 12C2 6.68514 6.14629 2.33869 11.3807 2.01886Z"></path></svg>
                                    <h1 className="text-black z-10 text-2xl pt-2 font-bold">Faith</h1>
                                </>
                            )
                        }
                    </div>
                </div>
            </nav>

        </div>
    );
}