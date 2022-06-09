import { Button } from "./Button";
import { BoxPadding } from "./layout/BoxPadding";
import classes from "./Hero.module.css";
import { Badge } from "./Badge";
import { Social } from "./Social";
import { useContext } from "react";
import { WaitListContext } from "../contexts/HeroContext";
import { Preloader } from "./Preloader/Preloader";
import { useRef } from "react";
import { addToWaitListService } from "../services/services";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Hero = (props) => {
  const emailDataRef = useRef();
  const waitListContext = useContext(WaitListContext);

  async function submitHandler() {
    const userEmail = emailDataRef.current.value;
    try {
      if (userEmail !== "" && userEmail.includes("@")) {
        toast.success("Success! You have been added to the waiting list!");
        emailDataRef.current.value = "";

        waitListContext.setIsLoading(true);
        await waitListContext.addToWaitListService(userEmail);
        waitListContext.setIsLoading(false);
      } else {
        toast.error("Invalid email");
      }
    } catch (error) {
      console.log("The async function had an error which is" + error);
      waitListContext.setIsLoading(false);
    }

    console.log(userEmail);
  }

  return (
    <>
      {waitListContext.isLoading ? <Preloader /> : null}
      <ToastContainer />
      <BoxPadding>
        <div className="md:flex  my-40 ">
          <div
            className={` -my-40 md:min-w-max md:max-w-0 max-w-sm ${classes.hero_image}`}
          >
            <img src="../../hero-image.svg" className="block" />
          </div>
          <div className="hero-texts min-w-2xl md:-my-20  mx-10">
            <h1 className="md:text-5xl md:text-5xl text-3xl md:my-0 mt-40 font-bold ">
              Make changes to live apps on the go!
            </h1>
            <h1 className="md:text-2xl md:text-5xl text-1xl  mt-5 font-bold">
              ⏱ &nbsp; Zero Build Time
            </h1>
            <h1 className="md:text-2xl md:text-5xl text-1xl  mt-5 font-bold">
              ⚙️ &nbsp; Zero Redeploys
            </h1>
            <h1 className="md:text-2xl md:text-5xl text-1xl  mt-5 font-bold">
              ☑️ &nbsp; Supports web, mobile and cloud applications
            </h1>
            <div className="my-4 md:text-md sm:text-md"></div>
            <h5>
              It is a super power 🚀. Join our wait-list as we build in public
            </h5>
            <div className="my-8"></div>
            <form className="flex  flex-wrap p-0" action="">
              <input
                type="text"
                id="fname"
                name="fname"
                placeholder="Email"
                ref={emailDataRef}
                className={`md:px-5 md:mb-0 mb-5 p-5 rounded-t-md flex-grow border-b-2 focus:border-black ${classes.input_form}`}
                required
              ></input>
              <div className="md:mx-4"></div>
              <Button
                title="Join the Wait"
                onClick={(e) => {
                  e.preventDefault();
                  console.log("Testing works");
                  submitHandler();
                }}
              />
            </form>
            <div className="my-16"></div>
            <Badge title="Actively building" />
            <div className="my-5"></div>
            <h1 className="text-2xl font-bold ">Stay Updated as we build.</h1>
            <div className="my-5"></div>
            <Social
              social="Join us on Discord"
              url="https://discord.gg/heDtHPP6Xu"
            />
            <Social
              social="Join us on Twitter"
              url="https://twitter.com/lyannah_app/"
            />
            <Social
              social="Read more"
              url="https://ivory-newsboy-082.notion.site/Overview-5f6b7e90e9764b7ca857dba8dbf76c50"
            />
            <div className="my-5 h-1"></div>
          </div>
        </div>
      </BoxPadding>
    </>
  );
};
