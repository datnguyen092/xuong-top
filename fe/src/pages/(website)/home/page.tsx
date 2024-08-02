import Banner from "./_components/Banner";
import Choose from "./_components/Choose";
import Comment from "./_components/Comment";
import Dispensary from "./_components/Dispensary";
import Oder from "./_components/Oder";
import Recenty from "./_components/Recenty";
import Service from "./_components/Service";
import Whatmake from "./_components/Whatmake";
import Item from "./_components/Item";
import Education from "./_components/Education";

const HomePage = () => {
    return (
        <>
            <Banner />
            <Service />
            <Dispensary />
            <Comment />
            <Choose />
            <Oder />
            <Whatmake />
            <Recenty />
            <Item />
            <Education />
        </>
    );
};

export default HomePage;
