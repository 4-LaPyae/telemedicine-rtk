import { useLottie } from "lottie-react";
import loading from "../../assets/lottie_animation/loading/loading.json";
export const LoadingAnimation = () => {
    const options = {
        animationData: loading,
        loop: true,
        autoplay: true,
    };
    const { View } = useLottie(options);

    return (
        <div
            style={{
                width: "300px",
                height: "300px",
                margin: "0 auto",
            }}
        >
            {View}
        </div>
    );
};
