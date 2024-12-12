import Board from "./components/Board";
import NavBar from "./components/NavBar";

function Home() {
    return (
        <section className="bg-slate-200 h-screen py-4 w-screen">
            <div className="flex flex-col items-center px-32">
                <NavBar />
                <Board />
            </div>
        </section>
    );
}

export default Home;
