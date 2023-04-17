import Link from "next/link"
import notFound from "../assets/404"
import Avatar from "../components/Avatar"
import Writer from "@/components/Writer"


export default () => {
    return <div className="center-container flex-column">
            <Avatar animation={notFound} width={400} height={400} />
            <Writer center text={"Oops! Looks like the page you were searching for took a wrong turn and ended up in a parallel universe. Our apologies for the inconvenience!"} color={"#fff"}/>
            <Link className="custom-button mt-3" href={"/"}>Discover Further </Link>
        </div>
  }