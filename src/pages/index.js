import Head from "next/head";
import Avatar from "@/components/Avatar";
import Writer from "@/components/Writer";
import Link from "next/link";
import avatarLotie from "@/assets/avatar"

export default function Home() {
    const text = `Discover your happiness with customized treatment plans!`;

         const avatars = [
            "https://svgsilh.com/svg/1299642.svg",
            "https://svgsilh.com/svg/1299642.svg",
            "https://svgsilh.com/svg/1299642.svg"
          ];

          const handleAvatarSelect = (avatar) => {
            console.log(`Selected avatar: ${avatar}`);
          };

    return (
        <>
            <Head>
                <title>CogniTalk Ai</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>
            <Writer fontSize={"32px"} text={text} color={"#fff"} minHeight={"80px"} />
            <Avatar animation={avatarLotie} width={400} height={400} />
            <Link className="custom-button" href={"/ChatAi"}>
                 CogniTalk
            </Link>
        </>
    );
}
