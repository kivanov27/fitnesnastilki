import Head from "next/head";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const ObshtiUsloviya = () => {
    return (
        <>
            <Head>
                <title>Политика за поверителност</title>
            </Head>
            <div className="flex flex-col">
                <Navbar />
                <div className="flex-1 w-full xl:w-[75rem] mx-auto my-10 px-4 sm:px-12 lg:px-20 xl:px-0 flex flex-col gap-y-4 text-gray-600">
                    <h1 className="text-2xl text-black font-medium">
                        Общи условия за ползване на сайта
                        <span className="font-normal">
                            {" "}
                            www.fitnesnastilki.com
                        </span>
                    </h1>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default ObshtiUsloviya;
