import {WelcomeScreen} from "../screens/WelcomeScreen/WelcomeScreen";
import {useEffect} from "react";

export default function HomePage() {
    useEffect(() => {
        document.title = "Home page";
    }, []);

    return (
        <div className="common-container">
            <WelcomeScreen />
        </div>
    );
}