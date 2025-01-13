import Link from "next/link";

const Sidebar = () => {
    return (
        <div className="w-[17.5rem] flex flex-col border border-gray-400 h-fit p-4">
            <Link href="/katalog/plocha" className="hover:underline hover:text-">Настилки на плоча</Link>
            <Link href="/katalog/rulo" className="hover:underline">Настилки на руло</Link>
            <Link href="/katalog/tatami" className="hover:underline">Настилки татами</Link>
            <Link href="/katalog/izkustvena-treva" className="hover:underline">Настилки изкуствена трева</Link>
            <Link href="/katalog/postelki" className="hover:underline">Постелки за фитнес и йога</Link>
            <Link href="/katalog/platformi-podiumi" className="hover:underline">Платформи и подиуми</Link>
            <Link href="/katalog/lepilo" className="hover:underline">Лепило за настилки</Link>
        </div>
    );
};

export default Sidebar;
